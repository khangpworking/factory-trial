# Trial runbook

Tools under test: worktrunk `wt` v0.81.0 and agent-autoloop v1.8.3 (commit 1bd9aa2549d9).
Tags used below: **[verified]** = run on this box during setup, output matched; **[unverified]** = needs a model
run or a GitHub repo, not run yet.

## Setup facts

- `wt` user config: `~/.config/worktrunk/config.toml`, worktrees go to `~/.herdr/worktrees/app/<branch>`.
- Project hooks: `.config/wt.toml` (`pre-start` writes `.env` with `PORT={{ branch | hash_port }}`, `pre-merge` runs `npm test`). Approved once with `wt config approvals add --yes` (saved in `~/.config/worktrunk/approvals.toml`). Changing a hook command needs a new approval.
- No shell integration: always pass `--no-cd` (or ignore the "Cannot change directory" warning) and `cd` yourself.
- agent-autoloop: launcher `~/.local/bin/agent-autoloop` (Node 24), data `~/.agent-autoloop`, hub `127.0.0.1:3350`, no system service. Live rules = `~/factory-trial/autoloop/rules.draft.json`.
- Each run's agent starts through `~/factory-trial/autoloop/claude-wt` (or `codex-wt`), which makes or reuses the worktree `order-<brief>-<hash>` for the event subject and `cd`s there.
- Nothing notifies you: there is no channel. Watch with `agent-autoloop status`.

## Start and stop the hub (needed for criteria 1 to 3)

```sh
agent-autoloop up                      # [verified] foreground; prints "listening on 127.0.0.1:3350"
agent-autoloop doctor                  # [verified] "service not running" is expected
curl -s http://127.0.0.1:3350/healthz  # [verified] {"ok":true,"commit":"1bd9aa25..."}
# stop: Ctrl-C in the `up` terminal, or: kill -TERM "$(cat ~/.agent-autoloop/up.pid)"   [verified]
ss -ltnp | grep 3350                   # [verified] prints nothing once stopped
```

Dry runs (no hub, no model):

```sh
agent-autoloop check                                              # [verified]
agent-autoloop rules explain                                      # [verified]
agent-autoloop emit order.new --dry-run --subject orders/01-price-negative.md   # [verified] -> trial-order -> claude
```

## Criterion 1: ask, suspend, answer, resume  [unverified]

```sh
agent-autoloop emit order.ask --subject orders/02-slugify-accents.md --summary "order 02"
agent-autoloop status                  # wait for a card under "waiting for you" (等你); note card id C and run R
ps -ef | grep -c '[c]laude -p'         # the agent process should be gone while the card is open
agent-autoloop answer C 1              # pick option 1
agent-autoloop status                  # a new run starts; it ends with the brief done
agent-autoloop runs trial-order        # two runs for the subject
agent-autoloop why R                   # first run: session id S
agent-autoloop why <second run>        # pass: same session S (claude --resume S), same worktree path
```

The rule prompt tells the agent to ask first when the event type is `order.ask`. An answer is a new run with a new
number; the wrapper keys the worktree on the subject, so the resumed session runs in the same directory.

## Criterion 2: a kill mid-run loses nothing acknowledged  [unverified]

```sh
agent-autoloop up                      # terminal A
agent-autoloop emit order.new --subject orders/03-duration-days.md      # terminal B; note the "交给了" reply
agent-autoloop status                  # wait until the run shows as running (在跑)
kill -9 "$(cat ~/.agent-autoloop/up.pid)"   # kills hub and worker; the agent keeps running (own process group)
ls ~/.agent-autoloop/worker/runs/      # the run folder with entry.json is still there
agent-autoloop up                      # terminal A again
agent-autoloop status; agent-autoloop why <run>   # pass: the event and the run are still recorded and the run ends once, with its result
```

The hub commits each fact (WAL, synchronous=FULL) before it answers; the worker saves the job before starting the
agent and keeps the result until the hub takes it (`worker/worker.ts`, `SECURITY.md`).

## Criterion 3: two parallel orders in separate wt worktrees  [unverified with models; wrapper verified with a fake CLI]

```sh
agent-autoloop emit order.new --subject orders/01-price-negative.md
agent-autoloop emit order.new --subject orders/03-duration-days.md
agent-autoloop status                  # two runs at once (rule parallel 2, worker capacity 2)
git -C ~/factory-trial/app worktree list    # two order-* worktrees under ~/.herdr/worktrees/app/
cat ~/.herdr/worktrees/app/order-*/.env     # different PORT per worktree
grep agent-in-worktree ~/.agent-autoloop/worker/runs/*/stderr-1.log   # which worktree each run used
```

Wrapper test without a model [verified]: two runs at once with a fake `claude` got
`order-01-price-negative-cd28fe` (PORT=13492) and `order-02-slugify-accents-185ae5` (PORT=11063); a later run for
the same subject reused the first worktree; with no run variables set (the `doctor` login check) it ran in place.

Afterwards, per worktree:

```sh
cd ~/.herdr/worktrees/app/<branch> && git log --oneline main..   # did the agent commit?
wt merge                               # [verified] runs npm test via pre-merge, squashes, fast-forwards main, removes the worktree
wt remove <branch> --foreground        # [verified] to drop one without merging (-D if it has unmerged commits)
```

Watch-outs: with `access: edit` Claude runs as `--permission-mode acceptEdits`, so file edits are allowed but shell
commands (npm test, git commit) depend on your Claude permission allowlist. Codex `workspace-write` limits writes to
the worktree; `git commit` writes into `~/factory-trial/app/.git/worktrees/...`, outside it, and may be refused.

## Criterion 4: one PR through the delivery pipeline  [unverified]

Needs the GitHub repo `khangpworking/factory-trial` with Actions on, the labels `deliver`, `deliver-review`,
`deliver-attended`, `ask-owner`, and this repo pushed to `main` (it contains `ops/delivery.json`, the
`## 审查要点` section in `AGENTS.md`, and `.github/workflows/check.yml` with job `check`).

```sh
# once the repo exists:
git -C ~/factory-trial/app remote add origin https://github.com/khangpworking/factory-trial.git
git -C ~/factory-trial/app push -u origin main
for l in deliver deliver-review deliver-attended ask-owner; do gh label create "$l" -R khangpworking/factory-trial; done
# swap in the delivery rules (adds a */2 cron poll; this is what starts model use, via the Codex reviewer):
cp ~/factory-trial/autoloop/rules.delivery.draft.json ~/.agent-autoloop/rules.json && agent-autoloop check
# from a finished order worktree:
cd ~/.herdr/worktrees/app/<branch> && git push -u origin HEAD
gh pr create -R khangpworking/factory-trial --base main --fill
gh pr edit <N> -R khangpworking/factory-trial --add-label deliver
agent-autoloop status                  # delivery run: review (Codex, model gpt-6.1-sol), wait for check, squash merge
gh pr view <N> -R khangpworking/factory-trial --json state,mergedAt,statusCheckRollup
```

Without a `health` block the receipt says merged only ("已合并；项目没有线上服务"). Review findings send the PR back
(status `agent-review` = failure); the same commit is not reviewed again, a new commit is. Hand-run without the hub:
`node ~/.agent-autoloop/app/plugins/delivery/run.ts khangpworking/factory-trial --pr <N>` (Node 24).

## Recorded during setup

- `wt switch --create order-demo --no-cd` -> `~/.herdr/worktrees/app/order-demo`, `.env` `PORT=11179`; `order-two` got `PORT=19699`, `order-json` `PORT=17907`.
- Failing test committed in order-demo: `wt merge` printed `✗ pre-merge project:test failed (exit code 1)`, exit 1, main unchanged.
- After the fix: `wt merge` squashed 2 commits, ran pre-merge, `✓ Merged to main (1 commit, 1 file, +4)`, removed the worktree and branch. That demo merge was later dropped so `main` holds only the baseline commit.
- `herdr worktree list --cwd ~/factory-trial/app` lists wt-made worktrees.

## Results (2026-11-13)

Agents under test: qodercli 1.1.79 (DeepSeek-Flash, reasoning effort high) and opencode 1.19.4
(opencode/deepseek-v4.1-flash-free, effort high), both over ACP (`use: "acp"`). Claude and Codex were not used.
Hub keys were regenerated (data dir wiped, `init --no-service` again) before the hub started.

| Criterion | Result | Key evidence |
|---|---|---|
| 1. ask, suspend, answer, resume (qoder) | pass | Run 1 (`order.qoder.ask`, orders/02) ended with card #1 (two options) in 18 s. While the card was open, 0 qodercli/opencode/bridge processes. `agent-autoloop answer 1 1`. Run 2 (`card.answered`) used the same session `61c7d87a…` (`why 1` / `why 2`, status JSON), the same worktree `order-02-slugify-accents-185ae5`, and qoder stored that session under the worktree's project folder. Run 2 committed `8219623`, 16 tests pass. |
| 2. kill mid-run | pass | Runs 3 and 4 claimed and running (sessions known), `kill -9` of the `up` process at 10:36:13; the 7 bridge/proxy/agent processes kept running (own process groups). `up` restarted 10:36:22; each run was handed in once ("run 3: done", "run 4: done"); 4 runs total, each event recorded once, no re-dispatch. |
| 3. two parallel orders, two worktrees (qoder + opencode) | pass | Run 3 qoder orders/01 and run 4 opencode orders/03 started in the same second. `order-01-price-negative-cd28fe` PORT=13492, commit touching only `src/price.js`, `test/price.test.js`, 11 tests pass; `order-03-duration-days-f0f8f7` PORT=11454, commit touching only `src/duration.js`, `test/duration.test.js`, 13 tests pass. All acceptance checks of orders 01-03 hold. |
| 4. delivery pipeline | pass | PR #4 (order 01, rebased on main) labelled `deliver`; poll run 5 emitted the event, delivery run 6 reviewed with the qodercli reviewer (round 1: no findings, ledger in the PR body), waited for `check` (pull_request, success), squash-merged as `2650283`, closed issue #1. Statuses: `agent-review` success, `delivery` success "已合并；项目没有线上服务". |

Permission behaviour under `access: edit` (risk check):

- qoder asks over ACP for edits and some commands. The bridge allowed reads and edits inside the worktree and
  rejected one `node -e …` command (`reject_once`, qoder option `cancel`); qoder carried on, no hang. qoder ran
  `npm test`, `git add` and `git commit` without asking (its own safe-command handling), and committing inside a
  worktree worked.
- opencode never sent a permission request: it ran bash, writes and edits on its own defaults. `edit` access is not
  enforced for opencode by agent-autoloop; only opencode's own permission config would limit it.

Config changes made for this phase:

- Agents `qoder` and `opencode`: `use: "acp"`, `timeout: 30`, `command` = `node ~/factory-trial/autoloop/acp-in-worktree.mjs --set <effort option>=high -- <agent ACP command>` (qoder also gets `-m DeepSeek-Flash --reasoning-effort high`).
- Rules `order-qoder` (`order.qoder`, `order.qoder.ask`) and `order-opencode` (`order.opencode`, `order.opencode.ask`), cwd `~/factory-trial/app`, group `orders`, parallel 2. The `.ask` type makes the agent ask first.
- `acp-in-worktree.mjs` (workaround, not a supported feature): the ACP plugin ignores `program`, starts `command` with the rule's cwd, sends that cwd in session/new and session/load, and approves edits only inside it. The proxy creates or reuses the worktree for the event subject, starts the agent there, rewrites the cwd in those requests, maps worktree paths to the rule cwd in permission requests (main-checkout paths map outside, so they are refused), and sets effort high through `session/set_config_option` (opencode's ACP session starts at `low`).
- `ops/delivery.json`: `review.command` runs `review-qoder.mjs` (qodercli, all tools disabled, diff inline, prints `{"findings":[…]}`), so the default Codex reviewer is never started.
- For criterion 4 the rules temporarily added `delivery-poll` (cron */2, `gh` only) and `delivery`; afterwards the live rules went back to the two order rules (no cron).
- Adding `origin` changed worktrunk's project id, so hook approvals had to be granted again (`wt config approvals add --yes`). Without them `wt` refuses in a non-interactive run ("Cannot prompt for approval").

Recorded usage: 6 runs (4 order runs, 1 poll, 1 delivery). Tokens and cost: not reported; the ACP plugin has no
usage reporting, so agent-autoloop shows "Token 没上报 · 费用没上报" for all 6.

## Results: factory line live check (13/11/2026)

The factory wiring (`~/factory-trial/autoloop/factory`, rules generated from `factory.config.json`) ran against the
real hub with qodercli and opencode builders, the qodercli reviewer, and MausBot Lead. Health ran on demand
(`health.run`); its 10-minute cron was left out for the session.

| Item | Result | Evidence |
|---|---|---|
| Order 02 adopted (`order.built`) | pass, no fix round | review run 7 approved (reviewer now sees the brief and review points), land 8, record 9: `56b4401`, issue #2 closed |
| Fix rounds in one session | pass | order 04: build 10, review 11 finds an operator-planted defect, fix 12, review 13 one more finding, fix 14, review 15 approved, land 16, record 17: `b2ac288`. Runs 10/12/14 share one qoder session. Hops 0 to 7 |
| Order 03 (opencode branch, 7 commits behind) | pass | review 18 approved, land 19: `wt merge` rebased onto main and ran `npm test` in pre-merge, `be800da`, issue #3 closed |
| Serial landings, push, record | pass (not contended) | 3 factory landings at different times, all pushed, worktrees and branches removed, 3 `jev-route outcome` records |
| Lead escalation | pass in part | run 21 lost Lead's question (bridge bug, fixed); run 22 in the same MausBot conversation made card #2; the answering run was cancelled to stay within the two-run Lead budget |
| Red main | pass | two regressions pushed to main (`db33528`, `483bff0`); each time one fault, one repair brief with the failing output, one qoder repair that landed (`774ec86`, `029990f`) in about 50 s; a second sample while red emitted nothing; recovery once, then silence |
| Blocked agent | pass in part | a pane already blocked, read only, threshold 1 min: one notice, no model call, nothing on the next sample |
| Stale worktrees | pass | clean landed worktree removed and cleared on the next sample; dirty one kept |

Seven bugs in the factory scripts were fixed and covered by offline tests (24 pass). Details are in the factory README.

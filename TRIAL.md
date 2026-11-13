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

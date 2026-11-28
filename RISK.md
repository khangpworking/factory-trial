# Sổ rủi ro của factory-trial/app

Dự án thử của nhà máy: chỉ có các hàm chuỗi và số trong `src/`, không có dữ liệu, đăng nhập, thanh toán hay việc đưa lên mạng.
Nhà máy đọc khối `risk-register` bên dưới từ nhánh chính trước mỗi lượt review. Thêm mục thì Lead, reviewer hay máy đều đề
xuất được; bỏ hay hạ một mục thì chỉ chủ máy.

- `protectedPaths`: không được đụng, trừ khi brief ghi đúng tên. Lấy từ `AGENTS.md` ("Do not touch"), cộng danh sách mặc
  định của nhà máy.
- Không có `highRiskPaths` và không có quy tắc sản phẩm (`sensitiveRules`).

```risk-register
{
  "version": 1,
  "protectedPaths": [
    "ops/",
    ".github/",
    ".config/",
    "AGENTS.md",
    "RISK.md",
    "migrations/",
    "deploy/",
    "wrangler.*",
    "**/Dockerfile",
    "**/.env",
    "**/.env.*"
  ],
  "highRiskPaths": [],
  "externalServices": [],
  "envVars": [
    "PORT"
  ],
  "sensitiveRules": [],
  "askOwner": []
}
```

## Vì sao nhạy cảm, hỏng thì mất gì

| Vùng | Vì sao nhạy cảm | Hỏng thì mất gì |
| --- | --- | --- |
| `ops/`, `.github/`, `.config/` | Cấu hình chạy thử và hook của nhà máy | Đơn thử chạy sai, kết quả đo không còn đúng |
| `AGENTS.md` | Luật cho thợ | Thợ làm sai luật |
| `.env` | Mỗi worktree có `PORT` riêng | Hai worktree tranh cùng một cổng |
| Dữ liệu, đăng nhập, thanh toán, dịch vụ ngoài | Không có | – |

## Lịch sử thay đổi

| Ngày | Đổi gì | Ai duyệt |
| --- | --- | --- |
| 2026-11-28 | Lập sổ từ `AGENTS.md` ("Do not touch") và danh sách mặc định của nhà máy | máy soạn, chủ máy duyệt mở PR |

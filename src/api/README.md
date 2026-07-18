# API 2FA (Two-Factor Authentication)

## Tổng Quan

Hệ thống xác thực 2 yếu tố sử dụng TOTP (Time-based One-Time Password) với Google Authenticator.

## Endpoints

### 1. Setup 2FA
- **Route:** `POST /api/2fa/setup`
- **Mô tả:** Tạo QR code và backup codes cho user
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Không cần (user.id lấy từ JWT)
- **Response:** QR code, secret, backup codes

### 2. Verify & Activate
- **Route:** `POST /api/2fa/verify`
- **Mô tả:** Xác thực OTP và kích hoạt 2FA
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ token: string }`
- **Response:** Trạng thái kích hoạt

### 3. Validate (Login)
- **Route:** `POST /api/2fa/validate`
- **Mô tả:** Xác thực OTP khi đăng nhập
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ token: string }`
- **Response:** Token có hợp lệ không

### 4. Backup Code
- **Route:** `POST /api/2fa/backup-code`
- **Mô tả:** Xác thực backup code (mỗi code dùng 1 lần)
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ backupCode: string }`
- **Response:** Code có hợp lệ không

### 5. Disable 2FA
- **Route:** `POST /api/2fa/disable`
- **Mô tả:** Tắt 2FA sau khi xác thực OTP
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ token: string }`
- **Response:** Trạng thái tắt

## Luồng Sử Dụng

1. **Setup:** User gọi `/setup` → Quét QR code → Lưu backup codes
2. **Activate:** User nhập OTP → Gọi `/verify` → 2FA được kích hoạt
3. **Login:** User đăng nhập → Nhập OTP → Gọi `/validate` → Cho phép truy cập
4. **Recovery:** User mất thiết bị → Nhập backup code → Gọi `/backup-code` → Cho phép truy cập

## Chi Tiết

Xem tài liệu đầy đủ tại: [docs/2FA_IMPLEMENTATION.md](../../../../docs/2FA_IMPLEMENTATION.md)

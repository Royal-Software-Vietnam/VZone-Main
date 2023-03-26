# Virtual Zone Document

* Các biến môi trường bao gồm:
```
    DATABASE = .................................................................
    TOKEN_SECRET = .............................................................
    BASE_URL = .................................................................
    GOOGLE_CLOUD_CLIENT = ......................................................
    GOOGLE_CLOUD_SECRET = ......................................................
    MAIN_EMAIL = ...............................................................
    GOOGLE_CLOUD_REFRESH = .....................................................
```

1. Đăng ký:

    1.1 - Người dùng gửi thông tin dăng ký, bao gồm name, username, email, password

    1.2 - Server trả về lỗi khi email không hợp lệ (đã tồn tại, không đúng định dạng)

    1.3 - Thực hiện tạo user đồng thời gửi về email của người dùng OTP hoặc url (chứa token tạo từ user id) sử dụng để xác thực (xem luồng xác thực)

    1.4 - Gửi về cho người dùng 1 user object, kết thúc

2. Xác thực:

    2.1 - Người dùng truy cập vào link xác thực

    2.2 - Server nhận token của url param, decode nó thành dữ liệu

    2.3 - Dựa vào user id đã decode, tìm và chuyển đổi trạng thái "verified" thành true

    2.4 - Trả về người dùng 1 user object

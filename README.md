🏥 Medical Booking System
📋 Giới thiệu

Hệ thống đặt lịch khám bệnh online giúp bệnh nhân dễ dàng:

Đăng ký tài khoản, đặt lịch khám.

Xem danh sách bác sĩ, chuyên khoa, bệnh viện.

Quản lý hồ sơ bệnh nhân và lịch sử khám.

Phía bác sĩ và quản trị viên có thể:

Quản lý lịch khám, bệnh nhân.

Theo dõi thống kê và cập nhật thông tin bệnh viện.

⚙️ Công nghệ sử dụng
Thành phần	Công nghệ
Backend	Spring Boot (Java 17), JPA, MySQL
Frontend	ReactJS, Axios, Bootstrap
Database	MySQL 8
Container	Docker & Docker Compose
IDE đề xuất	VS Code / IntelliJ IDEA / Eclipse
🗂️ Cấu trúc thư mục
booking-medical-spring/
├── backend/               → Source code Spring Boot
│   ├── src/
│   ├── pom.xml
│   └── application.properties
│
├── frontend/              → Source code ReactJS
│   ├── src/
│   ├── package.json
│   └── public/
│
├── docker-compose.yml     → File chạy toàn bộ project
└── README.md              → Hướng dẫn này

🧩 Yêu cầu cài đặt
🔹 1. Phần mềm cần thiết

Trước khi chạy project, hãy đảm bảo bạn đã cài:

Docker Desktop

Node.js
 (>= 18.x)

Git

(Tùy chọn) [IntelliJ IDEA / Eclipse / VS Code] để chỉnh sửa code.

🚀 Cách chạy project
🔸 Bước 1: Clone project về máy
git clone https://github.com/<tên-nhóm>/<tên-repo>.git
cd booking-medical-spring

🔸 Bước 2: Khởi động bằng Docker


Từ thư mục gốc (nơi có docker-compose.yml):

docker-compose up -d --build


👉 Docker sẽ tự động:

Tạo container MySQL (database: benhvien)

Chạy Spring Boot backend trên localhost:8080

Chạy React frontend trên localhost:3000

🔸 Bước 3: Kiểm tra hệ thống
Thành phần	Đường dẫn
React Frontend	http://localhost:3000

Spring Backend (API)	http://localhost:8080/api

MySQL	localhost:3307 (user: root / pass: 123456)
🧠 Cấu hình backend (Spring Boot)

File application.properties:

spring.datasource.url=jdbc:mysql://mysql:3306/benhvien
spring.datasource.username=root
spring.datasource.password=123456
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080

🎨 Cấu hình frontend (ReactJS)

Tạo file .env trong thư mục frontend:

REACT_APP_API_URL=http://localhost:8080/api


Sau đó chạy thủ công (nếu không dùng Docker):

cd frontend
npm install
npm start

🗄️ Import database thủ công (nếu không dùng Docker)

Nếu bạn muốn chạy MySQL thủ công (VD: bằng XAMPP hoặc Workbench):

Mở MySQL.

Tạo database:

CREATE DATABASE benhvien;


Import file backend/src/main/resources/database/benhvien.sql

📖 Hướng dẫn sử dụng

Mở http://localhost:3000

Đăng ký tài khoản người dùng.

Đăng nhập → Chọn bệnh viện → Chuyên khoa → Bác sĩ → Đặt lịch.

Xem lại lịch khám đã đặt trong trang cá nhân.

Với admin: truy cập /admin để quản lý bác sĩ, bệnh viện, chuyên khoa.

🧹 Các lệnh Docker hữu ích
Lệnh	Mô tả
docker-compose up -d --build	Chạy toàn bộ project
docker ps	Xem container đang chạy
docker logs <container_name>	Xem log chi tiết
docker-compose down	Dừng và xóa container
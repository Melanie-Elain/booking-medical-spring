-- =======================================================
-- 📁 CSDL: QuanLyBenhVien
-- 📅 Ngày cập nhật: 2025-11-05
-- 🧠 Người chỉnh: ChatGPT & Tran Bao Han
-- =======================================================

DROP DATABASE IF EXISTS QuanLyBenhVien;
CREATE DATABASE QuanLyBenhVien CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE QuanLyBenhVien;

-- =======================================================
-- 🧾 1. Bảng users (tài khoản đăng nhập - dùng cho JWT)
-- =======================================================
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    dob DATE,
    gender VARCHAR(10),
    id_card VARCHAR(20),
    health_insurance VARCHAR(50),
    ethnicity VARCHAR(50),
    province VARCHAR(100),
    district VARCHAR(100),
    ward VARCHAR(100),
    address VARCHAR(255),
    occupation VARCHAR(100),
    referral_code VARCHAR(50),
    role ENUM('BENHNHAN', 'BACSI', 'ADMIN') DEFAULT 'BENHNHAN',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =======================================================
-- 🏥 2. Bảng benhvien
-- =======================================================
CREATE TABLE benhvien (
    MaBV INT PRIMARY KEY AUTO_INCREMENT,
    TenBV VARCHAR(100) NOT NULL,
    DiaChi VARCHAR(255),
    SoDienThoai VARCHAR(20),
    Email VARCHAR(100)
);

-- =======================================================
-- 🧠 3. Bảng chuyenkhoa
-- =======================================================
CREATE TABLE chuyenkhoa (
    MaCK INT PRIMARY KEY AUTO_INCREMENT,
    TenCK VARCHAR(100) NOT NULL,
    MoTa TEXT,
    MaBV INT,
    FOREIGN KEY (MaBV) REFERENCES benhvien(MaBV)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- =======================================================
-- 🧑‍⚕️ 4. Bảng bacsi
-- =======================================================
CREATE TABLE bacsi (
    MaBS INT PRIMARY KEY AUTO_INCREMENT,
    TenBS VARCHAR(100) NOT NULL,
    GioiTinh VARCHAR(10),
    SoDienThoai VARCHAR(20),
    Email VARCHAR(100),
    MaCK INT,
    FOREIGN KEY (MaCK) REFERENCES chuyenkhoa(MaCK)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- =======================================================
-- 👩‍🦰 5. Bảng benhnhan
-- =======================================================
CREATE TABLE benhnhan (
    MaBN INT PRIMARY KEY AUTO_INCREMENT,
    TenBN VARCHAR(100) NOT NULL,
    NgaySinh DATE,
    GioiTinh VARCHAR(10),
    SoDienThoai VARCHAR(20),
    DiaChi VARCHAR(255),
    Email VARCHAR(100)
);

-- =======================================================
-- 📅 6. Bảng lichhen
-- =======================================================
CREATE TABLE lichhen (
    MaLich INT PRIMARY KEY AUTO_INCREMENT,
    MaBN INT,
    MaBS INT,
    NgayHen DATE NOT NULL,
    GioHen TIME NOT NULL,
    TrangThai VARCHAR(50) DEFAULT 'Đang chờ',
    GhiChu TEXT,
    FOREIGN KEY (MaBN) REFERENCES benhnhan(MaBN)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (MaBS) REFERENCES bacsi(MaBS)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- =======================================================
-- 🧾 DỮ LIỆU MẪU
-- =======================================================

INSERT INTO benhvien (TenBV, DiaChi, SoDienThoai, Email) VALUES
('Bệnh viện Trung Ương A', '123 Lý Thường Kiệt, Hà Nội', '0241234567', 'contact@bvtwa.vn'),
('Bệnh viện Đa khoa B', '45 Nguyễn Văn Linh, TP.HCM', '0287654321', 'info@bvdkb.vn');

INSERT INTO chuyenkhoa (TenCK, MoTa, MaBV) VALUES
('Nội tổng quát', 'Chuyên điều trị các bệnh lý nội khoa', 1),
('Ngoại thần kinh', 'Phẫu thuật thần kinh, cột sống', 1),
('Tim mạch', 'Điều trị bệnh tim mạch', 2);

INSERT INTO bacsi (TenBS, GioiTinh, SoDienThoai, Email, MaCK) VALUES
('Nguyễn Văn An', 'Nam', '0912345678', 'ngan@bvtwa.vn', 1),
('Trần Thị Bình', 'Nữ', '0923456789', 'tbinh@bvtwa.vn', 2),
('Phạm Minh Cường', 'Nam', '0934567890', 'pcuong@bvdkb.vn', 3);

INSERT INTO benhnhan (TenBN, NgaySinh, GioiTinh, SoDienThoai, DiaChi, Email) VALUES
('Lê Thị Hoa', '1995-05-10', 'Nữ', '0905123456', 'Ba Đình, Hà Nội', 'hoa.le@gmail.com'),
('Ngô Văn Nam', '1988-09-22', 'Nam', '0916234567', 'Quận 1, TP.HCM', 'nam.ngo@gmail.com');

INSERT INTO lichhen (MaBN, MaBS, NgayHen, GioHen, TrangThai, GhiChu) VALUES
(1, 1, '2025-10-15', '09:00:00', 'Đang chờ', 'Khám sức khỏe định kỳ'),
(2, 3, '2025-10-16', '14:30:00', 'Đang chờ', 'Khám tim mạch');

INSERT INTO users (full_name, phone_number, password, email, role)
VALUES
('Lê Thị Hoa', '0905123456', '$2a$10$examplehashedpassword', 'hoa.le@gmail.com', 'BENHNHAN'),
('Phạm Minh Cường', '0934567890', '$2a$10$examplehashedpassword', 'pcuong@bvdkb.vn', 'BACSI'),
('Admin', '0999999999', '$2a$10$examplehashedpassword', 'admin@system.vn', 'ADMIN');

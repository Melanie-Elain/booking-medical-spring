-- =======================================================
-- 📁 CSDL: QuanLyBenhVien
-- 📅 Ngày tạo: 2025-10-09
-- 🧠 Tác giả: Tran Bao Han
-- =======================================================

CREATE DATABASE IF NOT EXISTS QuanLyBenhVien;
USE QuanLyBenhVien;

-- =======================================================
-- 🏥 1. Bảng benhvien
-- =======================================================
CREATE TABLE benhvien (
    MaBV INT PRIMARY KEY AUTO_INCREMENT,
    TenBV VARCHAR(100) NOT NULL,
    DiaChi VARCHAR(255),
    SoDienThoai VARCHAR(20),
    Email VARCHAR(100)
);

-- =======================================================
-- 🧠 2. Bảng chuyenkhoa
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
-- 🧑‍⚕️ 3. Bảng bacsi
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
-- 👩‍🦰 4. Bảng benhnhan
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
-- 📅 5. Bảng lichhen
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
-- 💊 6. (Tuỳ chọn) Bảng taikhoan
-- =======================================================
CREATE TABLE taikhoan (
    MaTK INT PRIMARY KEY AUTO_INCREMENT,
    TenDangNhap VARCHAR(50) UNIQUE NOT NULL,
    MatKhau VARCHAR(255) NOT NULL,
    VaiTro ENUM('BENHNHAN', 'BACSI', 'ADMIN') NOT NULL,
    MaLienKet INT,
    FOREIGN KEY (MaLienKet) REFERENCES benhnhan(MaBN)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- =======================================================
-- 🧾 DỮ LIỆU MẪU
-- =======================================================

-- 🏥 Thêm bệnh viện
INSERT INTO benhvien (TenBV, DiaChi, SoDienThoai, Email) VALUES
('Bệnh viện Trung Ương A', '123 Đường Lý Thường Kiệt, Hà Nội', '0241234567', 'contact@bvtwa.vn'),
('Bệnh viện Đa khoa B', '45 Nguyễn Văn Linh, TP. Hồ Chí Minh', '0287654321', 'info@bvdkb.vn');

-- 🧠 Thêm chuyên khoa
INSERT INTO chuyenkhoa (TenCK, MoTa, MaBV) VALUES
('Nội tổng quát', 'Chuyên điều trị các bệnh lý nội khoa.', 1),
('Ngoại thần kinh', 'Chuyên phẫu thuật thần kinh và cột sống.', 1),
('Tim mạch', 'Chuyên điều trị bệnh về tim mạch.', 2);

-- 🧑‍⚕️ Thêm bác sĩ
INSERT INTO bacsi (TenBS, GioiTinh, SoDienThoai, Email, MaCK) VALUES
('Nguyễn Văn An', 'Nam', '0912345678', 'ngan@bvtwa.vn', 1),
('Trần Thị Bình', 'Nữ', '0923456789', 'tbinh@bvtwa.vn', 2),
('Phạm Minh Cường', 'Nam', '0934567890', 'pcuong@bvdkb.vn', 3);

-- 👩‍🦰 Thêm bệnh nhân
INSERT INTO benhnhan (TenBN, NgaySinh, GioiTinh, SoDienThoai, DiaChi, Email) VALUES
('Lê Thị Hoa', '1995-05-10', 'Nữ', '0905123456', 'Ba Đình, Hà Nội', 'hoa.le@gmail.com'),
('Ngô Văn Nam', '1988-09-22', 'Nam', '0916234567', 'Quận 1, TP. Hồ Chí Minh', 'nam.ngo@gmail.com');

-- 📅 Thêm lịch hẹn
INSERT INTO lichhen (MaBN, MaBS, NgayHen, GioHen, TrangThai, GhiChu) VALUES
(1, 1, '2025-10-15', '09:00:00', 'Đang chờ', 'Khám sức khỏe định kỳ'),
(2, 3, '2025-10-16', '14:30:00', 'Đang chờ', 'Khám tim mạch');

-- 💊 Thêm tài khoản
INSERT INTO taikhoan (TenDangNhap, MatKhau, VaiTro, MaLienKet) VALUES
('lehoa', '123456', 'BENHNHAN', 1),
('ngonam', '123456', 'BENHNHAN', 2),
('admin', 'admin123', 'ADMIN', NULL);

-- =======================================================
-- ✅ Hoàn tất khởi tạo dữ liệu mẫu
-- =======================================================

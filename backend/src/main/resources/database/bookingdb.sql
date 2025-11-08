-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 07, 2025 lúc 03:53 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `bookingdb`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bacsi`
--

CREATE TABLE `bacsi` (
  `MaBS` int(11) NOT NULL,
  `TenBS` varchar(100) NOT NULL,
  `GioiTinh` varchar(10) DEFAULT NULL,
  `SoDienThoai` varchar(20) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `MaCK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `bacsi`
--

INSERT INTO `bacsi` (`MaBS`, `TenBS`, `GioiTinh`, `SoDienThoai`, `Email`, `MaCK`) VALUES
(1, 'Nguyễn Văn An', 'Nam', '0912345678', 'ngan@bvtwa.vn', 1),
(2, 'Trần Thị Bình', 'Nữ', '0923456789', 'tbinh@bvtwa.vn', 2),
(3, 'Phạm Minh Cường', 'Nam', '0934567890', 'pcuong@bvdkb.vn', 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `benhnhan`
--

CREATE TABLE `benhnhan` (
  `MaBN` int(11) NOT NULL,
  `TenBN` varchar(100) NOT NULL,
  `NgaySinh` date DEFAULT NULL,
  `GioiTinh` varchar(10) DEFAULT NULL,
  `SoDienThoai` varchar(20) DEFAULT NULL,
  `DiaChi` varchar(255) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `benhnhan`
--

INSERT INTO `benhnhan` (`MaBN`, `TenBN`, `NgaySinh`, `GioiTinh`, `SoDienThoai`, `DiaChi`, `Email`) VALUES
(1, 'Lê Thị Hoa', '1995-05-10', 'Nữ', '0905123456', 'Ba Đình, Hà Nội', 'hoa.le@gmail.com'),
(2, 'Ngô Văn Nam', '1988-09-22', 'Nam', '0916234567', 'Quận 1, TP.HCM', 'nam.ngo@gmail.com');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `benhvien`
--

CREATE TABLE `benhvien` (
  `MaBV` int(11) NOT NULL,
  `TenBV` varchar(100) NOT NULL,
  `DiaChi` varchar(255) DEFAULT NULL,
  `SoDienThoai` varchar(20) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `benhvien`
--

INSERT INTO `benhvien` (`MaBV`, `TenBV`, `DiaChi`, `SoDienThoai`, `Email`) VALUES
(1, 'Bệnh viện Trung Ương A', '123 Lý Thường Kiệt, Hà Nội', '0241234567', 'contact@bvtwa.vn'),
(2, 'Bệnh viện Đa khoa B', '45 Nguyễn Văn Linh, TP.HCM', '0287654321', 'info@bvdkb.vn');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chuyenkhoa`
--

CREATE TABLE `chuyenkhoa` (
  `MaCK` int(11) NOT NULL,
  `TenCK` varchar(100) NOT NULL,
  `MoTa` text DEFAULT NULL,
  `MaBV` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chuyenkhoa`
--

INSERT INTO `chuyenkhoa` (`MaCK`, `TenCK`, `MoTa`, `MaBV`) VALUES
(1, 'Nội tổng quát', 'Chuyên điều trị các bệnh lý nội khoa', 1),
(2, 'Ngoại thần kinh', 'Phẫu thuật thần kinh, cột sống', 1),
(3, 'Tim mạch', 'Điều trị bệnh tim mạch', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lichhen`
--

CREATE TABLE `lichhen` (
  `MaLich` int(11) NOT NULL,
  `MaBN` int(11) DEFAULT NULL,
  `MaBS` int(11) DEFAULT NULL,
  `NgayHen` date NOT NULL,
  `GioHen` time NOT NULL,
  `TrangThai` varchar(50) DEFAULT 'Đang chờ',
  `GhiChu` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `lichhen`
--

INSERT INTO `lichhen` (`MaLich`, `MaBN`, `MaBS`, `NgayHen`, `GioHen`, `TrangThai`, `GhiChu`) VALUES
(1, 1, 1, '2025-10-15', '09:00:00', 'Đang chờ', 'Khám sức khỏe định kỳ'),
(2, 2, 3, '2025-10-16', '14:30:00', 'Đang chờ', 'Khám tim mạch');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `id_card` varchar(255) DEFAULT NULL,
  `health_insurance` varchar(255) DEFAULT NULL,
  `ethnicity` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `ward` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `referral_code` varchar(255) DEFAULT NULL,
  `role` enum('BENHNHAN','BACSI','ADMIN') DEFAULT 'BENHNHAN',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `full_name`, `phone_number`, `password`, `email`, `dob`, `gender`, `id_card`, `health_insurance`, `ethnicity`, `province`, `district`, `ward`, `address`, `occupation`, `referral_code`, `role`, `created_at`) VALUES
(1, 'Lê Thị Hoa', '0905123456', '$2a$10$examplehashedpassword', 'hoa.le@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BENHNHAN', '2025-11-06 04:10:04'),
(2, 'Phạm Minh Cường', '0934567890', '$2a$10$examplehashedpassword', 'pcuong@bvdkb.vn', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BACSI', '2025-11-06 04:10:04'),
(3, 'Admin', '0999999999', '$2a$10$examplehashedpassword', 'admin@system.vn', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ADMIN', '2025-11-06 04:10:04'),
(4, 'Trần Bảo Hân', '0123456789', '$2a$10$XInCfmmAbNsLrD89bAuGW.gjdYcznnty48lsUteTgUERXgXvLeca2', '', '2025-11-12', 'Nam', '', '', 'Kinh', '', '', '', '', '', '', 'BENHNHAN', '2025-11-06 08:19:24'),
(5, 'Nguyễn Thị Thanh Hằng', '0912345678', '$2a$10$Dq9oY7Zmsybjo5sZdVy0Xe6UCvd2EL2v1KBH.YnymQYCs5q6N0I8m', '', '2025-10-28', 'Nam', '', '', 'Kinh', '', '', '', '', '', '', 'BENHNHAN', '2025-11-06 09:07:31'),
(6, 'Nguyễn Văn A', '0987654321', '$2a$10$c6lFff/P6HFQWuG9JW.2bOhZnHqjx7gzx4zSbSH0qK30B4XQGGf4u', '', '2025-10-28', 'Nam', '', '', 'Kinh', '', '', '', '', '', '', 'BENHNHAN', '2025-11-06 11:43:11');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bacsi`
--
ALTER TABLE `bacsi`
  ADD PRIMARY KEY (`MaBS`),
  ADD KEY `MaCK` (`MaCK`);

--
-- Chỉ mục cho bảng `benhnhan`
--
ALTER TABLE `benhnhan`
  ADD PRIMARY KEY (`MaBN`);

--
-- Chỉ mục cho bảng `benhvien`
--
ALTER TABLE `benhvien`
  ADD PRIMARY KEY (`MaBV`);

--
-- Chỉ mục cho bảng `chuyenkhoa`
--
ALTER TABLE `chuyenkhoa`
  ADD PRIMARY KEY (`MaCK`),
  ADD KEY `MaBV` (`MaBV`);

--
-- Chỉ mục cho bảng `lichhen`
--
ALTER TABLE `lichhen`
  ADD PRIMARY KEY (`MaLich`),
  ADD KEY `MaBN` (`MaBN`),
  ADD KEY `MaBS` (`MaBS`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone_number` (`phone_number`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bacsi`
--
ALTER TABLE `bacsi`
  MODIFY `MaBS` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `benhnhan`
--
ALTER TABLE `benhnhan`
  MODIFY `MaBN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `benhvien`
--
ALTER TABLE `benhvien`
  MODIFY `MaBV` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `chuyenkhoa`
--
ALTER TABLE `chuyenkhoa`
  MODIFY `MaCK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `lichhen`
--
ALTER TABLE `lichhen`
  MODIFY `MaLich` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `bacsi`
--
ALTER TABLE `bacsi`
  ADD CONSTRAINT `bacsi_ibfk_1` FOREIGN KEY (`MaCK`) REFERENCES `chuyenkhoa` (`MaCK`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `chuyenkhoa`
--
ALTER TABLE `chuyenkhoa`
  ADD CONSTRAINT `chuyenkhoa_ibfk_1` FOREIGN KEY (`MaBV`) REFERENCES `benhvien` (`MaBV`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `lichhen`
--
ALTER TABLE `lichhen`
  ADD CONSTRAINT `lichhen_ibfk_1` FOREIGN KEY (`MaBN`) REFERENCES `benhnhan` (`MaBN`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lichhen_ibfk_2` FOREIGN KEY (`MaBS`) REFERENCES `bacsi` (`MaBS`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

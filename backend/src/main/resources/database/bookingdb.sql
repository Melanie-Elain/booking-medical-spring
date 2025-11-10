-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 09, 2025 lúc 04:34 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `medical_booking`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bacsi`
--

CREATE TABLE `bacsi` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `specialty` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `workplace` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `experience_year` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `bacsi`
--

INSERT INTO `bacsi` (`id`, `user_id`, `name`, `specialty`, `address`, `workplace`, `image`, `experience_year`, `description`) VALUES
(1, 2, 'TS.BS Đào Bùi Quý Quyền', 'Nội thận - Tiết niệu', '201B Nguyễn Chí Thanh, Quận 5, TP.HCM', 'Bệnh viện Chợ Rẫy', '/images/doctor/quyen.webp', 22, 'Tiến sĩ, Bác sĩ Đào Bùi Quý Quyền là Trưởng khoa Nội thận - Tiết niệu tại Bệnh viện Chợ Rẫy, chuyên gia hàng đầu trong điều trị sỏi và suy thận.');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bacsi_chuyenkhoa`
--

CREATE TABLE `bacsi_chuyenkhoa` (
  `MaBS` bigint(20) NOT NULL,
  `MaCK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `benhvien`
--

CREATE TABLE `benhvien` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slogan` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `banner` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `benhvien`
--

INSERT INTO `benhvien` (`id`, `name`, `slogan`, `address`, `image`, `description`, `phone`, `banner`) VALUES
(4, 'Bệnh viện Phụ sản Quốc tế Sài Gòn (SIH)', 'Nơi chắp cánh những thiên thần bé bỏng', '63 Bùi Thị Xuân, Phường Phạm Ngũ Lão, Quận 1, TP. Hồ Chí Minh', '/images/hospital/sih_logo.webp', 'Bệnh viện chuyên khoa sản phụ và sơ sinh hàng đầu, cung cấp các dịch vụ theo dõi thai kỳ, đỡ đẻ và chăm sóc mẹ bé theo tiêu chuẩn quốc tế.', '02839253000', 'https://example.com/banners/sih_banner.webp'),
(5, 'Bệnh viện Tâm thần Trung ương 2', 'Khỏe mạnh tinh thần, vững bước tương lai', '158 Hùng Vương, Phường 2, Thành phố Biên Hòa, Đồng Nai', '/images/hospital/tamthan_tw2_logo.webp', 'Là cơ sở y tế chuyên sâu về khám, tư vấn và điều trị các vấn đề tâm thần, tâm lý và sức khỏe hành vi cho mọi lứa tuổi.', '02513822295', 'https://example.com/banners/tamthan_tw2_banner.webp'),
(6, 'Bệnh viện Nhi Đồng 1', 'Tận tâm vì sức khỏe trẻ thơ', '341 Sư Vạn Hạnh, Phường 10, Quận 10, TP. Hồ Chí Minh', '/images/hospital/nhidong1_logo.webp', 'Một trong những bệnh viện Nhi khoa lớn nhất và uy tín nhất Việt Nam, chuyên điều trị các bệnh lý phức tạp ở trẻ em.', '02839271119', 'https://example.com/banners/nhidong1_banner.webp');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `benhvien_chuyenkhoa`
--

CREATE TABLE `benhvien_chuyenkhoa` (
  `MaBV` int(11) NOT NULL,
  `MaCK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `benhvien_chuyenkhoa`
--

INSERT INTO `benhvien_chuyenkhoa` (`MaBV`, `MaCK`) VALUES
(4, 1),
(4, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chuyenkhoa`
--

CREATE TABLE `chuyenkhoa` (
  `MaCK` int(11) NOT NULL,
  `TenCK` varchar(100) NOT NULL,
  `MoTa` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chuyenkhoa`
--

INSERT INTO `chuyenkhoa` (`MaCK`, `TenCK`, `MoTa`) VALUES
(1, 'Nội tổng quát', 'Chuyên điều trị các bệnh lý nội khoa'),
(2, 'Ngoại thần kinh', 'Phẫu thuật thần kinh, cột sống'),
(3, 'Tim mạch', 'Điều trị bệnh tim mạch');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lichhen` (ĐÃ SỬA)
--

CREATE TABLE `lichhen` (
  `MaLich` int(11) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `MaBS` bigint(20) NOT NULL,
  `NgayHen` date NOT NULL,
  `GioHen` time NOT NULL,
  `TrangThai` varchar(50) DEFAULT 'Đang chờ',
  `GhiChu` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `lichhen` (ĐÃ SỬA)
--

INSERT INTO `lichhen` (`MaLich`, `user_id`, `MaBS`, `NgayHen`, `GioHen`, `TrangThai`, `GhiChu`) VALUES
(1, 1, 1, '2025-11-20', '17:30:00', 'Đang chờ', 'Bệnh nhân muốn khám tổng quát, ưu tiên buổi chiều.');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phongkham`
--
CREATE TABLE `phongkham` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `imagesIntro` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`imagesIntro`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `phongkham` (ĐÃ SỬA LỖI CÚ PHÁP)
--
INSERT INTO `phongkham` (`id`, `name`, `address`, `image`, `description`, `imagesIntro`) VALUES
(1, 'Shine Clinic By TS.BS Trần Ngọc Ánh', '06 Trương Quyền, P.6, Q.3, TP.HCM', '/images/clinic/shine_logo.webp', 'Shine Clinic là tâm huyết của Tiến sĩ – Bác sĩ Trần Ngọc Ánh...', '[ \"/images/clinic/profile/shine_1.webp\", \"/images/clinic/profile/shine_2.webp\", \"/images/clinic/profile/shine_3.webp\" ]'),
(2, 'Phòng Khám Nội Tổng Quát Sài Gòn', '152 Nguyễn Trãi, Phường Bến Thành, Q.1, TP.HCM', '/images/clinic/saigon_general.webp', 'Chuyên cung cấp dịch vụ khám và điều trị nội khoa tổng quát...', '[ \"/images/clinic/profile/saigon_1.webp\", \"/images/clinic/profile/saigon_2.webp\" ]'),
(3, 'Phòng Khám Nhi Đồng Tâm', '230 Đường 3/2, P.12, Q.10, TP.HCM', '/images/clinic/nhidongtam.webp', 'Chuyên khoa Nhi, cung cấp dịch vụ tiêm chủng...', '[ \"/images/clinic/profile/nhi_1.webp\", \"/images/clinic/profile/nhi_2.webp\", \"/images/clinic/profile/nhi_3.webp\", \"/images/clinic/profile/nhi_4.webp\" ]');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phongkham_chuyenkhoa`
--
CREATE TABLE `phongkham_chuyenkhoa` (
  `MaPK` int(11) NOT NULL,
  `MaCK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `phongkham_chuyenkhoa` (`MaPK`, `MaCK`) VALUES
(1, 1),
(1, 2),
(1, 3);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_bacsi_user` (`user_id`);

--
-- Chỉ mục cho bảng `bacsi_chuyenkhoa`
--
ALTER TABLE `bacsi_chuyenkhoa`
  ADD PRIMARY KEY (`MaBS`,`MaCK`),
  ADD KEY `MaCK` (`MaCK`);

--
-- Chỉ mục cho bảng `benhvien`
--
ALTER TABLE `benhvien`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `benhvien_chuyenkhoa`
--
ALTER TABLE `benhvien_chuyenkhoa`
  ADD PRIMARY KEY (`MaBV`,`MaCK`),
  ADD KEY `MaCK` (`MaCK`);

--
-- Chỉ mục cho bảng `chuyenkhoa`
--
ALTER TABLE `chuyenkhoa`
  ADD PRIMARY KEY (`MaCK`);

--
-- Chỉ mục cho bảng `lichhen`
--
ALTER TABLE `lichhen`
  ADD PRIMARY KEY (`MaLich`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `MaBS` (`MaBS`);

--
-- Chỉ mục cho bảng `phongkham`
--
ALTER TABLE `phongkham`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `phongkham_chuyenkhoa`
--
ALTER TABLE `phongkham_chuyenkhoa`
  ADD PRIMARY KEY (`MaPK`,`MaCK`),
  ADD KEY `MaCK` (`MaCK`);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `benhvien`
--
ALTER TABLE `benhvien`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `chuyenkhoa`
--
ALTER TABLE `chuyenkhoa`
  MODIFY `MaCK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `lichhen`
--
ALTER TABLE `lichhen`
  MODIFY `MaLich` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `phongkham`
--
ALTER TABLE `phongkham`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  ADD CONSTRAINT `fk_bacsi_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `bacsi_chuyenkhoa`
--
ALTER TABLE `bacsi_chuyenkhoa`
  ADD CONSTRAINT `bacsi_chuyenkhoa_ibfk_1` FOREIGN KEY (`MaBS`) REFERENCES `bacsi` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bacsi_chuyenkhoa_ibfk_2` FOREIGN KEY (`MaCK`) REFERENCES `chuyenkhoa` (`MaCK`) ON DELETE CASCADE;

--
-- Các ràngB buộc cho bảng `benhvien_chuyenkhoa`
--
ALTER TABLE `benhvien_chuyenkhoa`
  ADD CONSTRAINT `benhvien_chuyenkhoa_ibfk_1` FOREIGN KEY (`MaBV`) REFERENCES `benhvien` (`id`),
  ADD CONSTRAINT `benhvien_chuyenkhoa_ibfk_2` FOREIGN KEY (`MaCK`) REFERENCES `chuyenkhoa` (`MaCK`);

--
-- Các ràng buộc cho bảng `lichhen`
--
ALTER TABLE `lichhen`
  ADD CONSTRAINT `fk_lichhen_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `lichhen_ibfk_2` FOREIGN KEY (`MaBS`) REFERENCES `bacsi` (`id`) ON DELETE CASCADE;

--
-- Các ràngá buộc cho bảng `phongkham_chuyenkhoa`
--
ALTER TABLE `phongkham_chuyenkhoa`
  ADD CONSTRAINT `phongkham_chuyenkhoa_ibfk_1` FOREIGN KEY (`MaPK`) REFERENCES `phongkham` (`id`),
  ADD CONSTRAINT `phongkham_chuyenkhoa_ibfk_2` FOREIGN KEY (`MaCK`) REFERENCES `chuyenkhoa` (`MaCK`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
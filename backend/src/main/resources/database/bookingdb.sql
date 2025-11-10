-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 10, 2025 lúc 05:30 AM
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
DROP TABLE IF EXISTS `lichhen`;
DROP TABLE IF EXISTS `lich_gio`;
DROP TABLE IF EXISTS `lich_tong`;
DROP TABLE IF EXISTS `bacsi_chuyenkhoa`;
DROP TABLE IF EXISTS `benhvien_chuyenkhoa`;
DROP TABLE IF EXISTS `phongkham_chuyenkhoa`;
DROP TABLE IF EXISTS `bacsi`;
DROP TABLE IF EXISTS `benhvien`;
DROP TABLE IF EXISTS `phongkham`;
DROP TABLE IF EXISTS `chuyenkhoa`;
DROP TABLE IF EXISTS `users`;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
-- (ĐÃ CẬP NHẬT ENUM 'role')
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
  `role` enum('BENHNHAN','BACSI','ADMIN','BENHVIEN','PHONGKHAM') DEFAULT 'BENHNHAN',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
-- (GIỮ NGUYÊN 8 USERS THEO YÊU CẦU)
--
INSERT INTO `users` (`id`, `full_name`, `phone_number`, `password`, `email`, `dob`, `gender`, `id_card`, `health_insurance`, `ethnicity`, `province`, `district`, `ward`, `address`, `occupation`, `referral_code`, `role`, `created_at`) VALUES
(1, 'Lê Thị Hoaa', '0905123456', '$2a$10$examplehashedpassword', 'hoa.le@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BENHNHAN', '2025-11-06 04:10:04'),
(2, 'Phạm Minh Cường', '0934567890', '$2a$10$examplehashedpassword', 'pcuong@bvdkb.vn', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BACSI', '2025-11-06 04:10:04'),
(3, 'Admin', '0999999999', '$2a$10$examplehashedpassword', 'admin@system.vn', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ADMIN', '2025-11-06 04:10:04'),
(4, 'Trần Bảo Hân', '0123456789', '$2a$10$XInCfmmAbNsLrD89bAuGW.gjdYcznnty48lsUteTgUERXgXvLeca2', '', '2025-11-12', 'Nam', '', '', 'Kinh', '', '', '', '', '', '', 'BENHNHAN', '2025-11-06 08:19:24'),
(5, 'Nguyễn Thị Thanh Hằng', '0912345678', '$2a$10$Dq9oY7Zmsybjo5sZdVy0Xe6UCvd2EL2v1KBH.YnymQYCs5q6N0I8m', '', '2025-10-28', 'Nam', '', '', 'Kinh', '', '', '', '', '', '', 'ADMIN', '2025-11-06 09:07:31'),
(6, 'Nguyễn Văn An', '0987654321', '$2a$10$c6lFff/P6HFQWuG9JW.2bOhZnHqjx7gzx4zSbSH0qK30B4XQGGf4u', '', '2025-10-28', 'Nam', '', '', 'Kinh', '', '', '', '', '', '', 'BENHNHAN', '2025-11-06 11:43:11'),
(7, 'admin', '0123456788', '$2a$10$.TcgDk9d0VgF809f3illqON3sqyRCk6CnMxQlZ8ufx3cDcETk7786', '', '2025-11-10', 'Nam', '', '', 'Kinh', '', '', '', '', '', '', 'ADMIN', '2025-11-10 01:10:18'),
(8, 'BS. Trần Thị Bích Ngọc', '0123654789', '$2a$10$dciPrbeCN7wt7MOVuPE9ouGVPqb2hrsHLx5W2B9E3fYPqmUkltF42', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BACSI', '2025-11-10 03:18:34');

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
-- Đang đổ dữ liệu cho bảng `chuyenkhoa` (10 MẪU - ĐÃ SỬA LỖI)
--
INSERT INTO `chuyenkhoa` (`MaCK`, `TenCK`, `MoTa`) VALUES
(1, 'Nội tổng quát', 'Chuyên điều trị các bệnh lý nội khoa'),
(2, 'Ngoại thần kinh', 'Phẫu thuật thần kinh, cột sống'),
(3, 'Tim mạch', 'Điều trị bệnh tim mạch'),
(4, 'Da liễu', 'Chuyên điều trị các bệnh về da.'),
(5, 'Tiêu hóa', 'Khám và điều trị các bệnh lý đường tiêu hóa, gan, mật.'),
(6, 'Mắt', 'Khám mắt, đo thị lực, phẫu thuật Lasik.'),
(7, 'Tai Mũi Họng', 'Điều trị viêm xoang, viêm họng, các vấn đề về thính lực.'),
(8, 'Sản Phụ khoa', 'Khám thai, theo dõi thai kỳ, điều trị các bệnh phụ khoa.'),
(9, 'Nhi khoa', 'Chăm sóc sức khỏe toàn diện cho trẻ em và trẻ sơ sinh.'),
(10, 'Cơ Xương Khớp', 'Điều trị Gout, thoái hóa khớp, loãng xương.');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `benhvien`
--
CREATE TABLE `benhvien` (
  `id` int(11) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `slogan` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `banner` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `benhvien` (10 MẪU)
--
INSERT INTO `benhvien` (`id`, `user_id`, `name`, `slogan`, `address`, `image`, `description`, `phone`, `banner`) VALUES
(1, NULL, 'Bệnh viện Chợ Rẫy', 'Nơi gửi trọn niềm tin', '201B Nguyễn Chí Thanh, P. 12, Q. 5, TP.HCM', '/images/hospital/cho_ray.webp', 'Bệnh viện đa khoa trung ương hàng đầu tại khu vực phía Nam.', '02838554137', '/images/hospital/banner/cho_ray.webp'),
(2, NULL, 'Bệnh viện Đại học Y Dược TP.HCM', 'Tiên phong - Đẳng cấp - Chuẩn mực', '215 Hồng Bàng, P. 11, Q. 5, TP.HCM', '/images/hospital/ydc.webp', 'Bệnh viện uy tín kết hợp giữa điều trị và giảng dạy y khoa.', '02838554269', '/images/hospital/banner/ydc.webp'),
(3, NULL, 'Bệnh viện Từ Dũ', 'Nơi khởi đầu sự sống', '284 Cống Quỳnh, P. Phạm Ngũ Lão, Q. 1, TP.HCM', '/images/hospital/tu_du.webp', 'Bệnh viện chuyên sản phụ khoa hàng đầu tại Việt Nam.', '02854042829', '/images/hospital/banner/tu_du.webp'),
(4, NULL, 'Bệnh viện Phụ sản Quốc tế Sài Gòn (SIH)', 'Nơi chắp cánh những thiên thần bé bỏng', '63 Bùi Thị Xuân, P. Phạm Ngũ Lão, Q. 1, TP.HCM', '/images/hospital/sih_logo.webp', 'Bệnh viện chuyên khoa sản phụ và sơ sinh hàng đầu, tiêu chuẩn quốc tế.', '02839253000', '/images/hospital/banner/sih.webp'),
(5, NULL, 'Bệnh viện Tâm thần Trung ương 2', 'Khỏe mạnh tinh thần, vững bước tương lai', '158 Hùng Vương, P. 2, TP. Biên Hòa, Đồng Nai', '/images/hospital/tamthan_tw2_logo.webp', 'Cơ sở y tế chuyên sâu về khám và điều trị các vấn đề tâm thần.', '02513822295', '/images/hospital/banner/tamthan.webp'),
(6, NULL, 'Bệnh viện Nhi Đồng 1', 'Tận tâm vì sức khỏe trẻ thơ', '341 Sư Vạn Hạnh, P. 10, Q. 10, TP.HCM', '/images/hospital/nhidong1_logo.webp', 'Bệnh viện Nhi khoa lớn và uy tín nhất Việt Nam.', '02839271119', '/images/hospital/banner/nhidong1.webp'),
(7, NULL, 'Bệnh viện Nhân dân 115', 'Chăm sóc bằng trái tim', '527 Sư Vạn Hạnh, P. 12, Q. 10, TP.HCM', '/images/hospital/115.webp', 'Bệnh viện đa khoa hạng I, mạnh về Ngoại thần kinh và Tim mạch.', '02838652368', '/images/hospital/banner/115.webp'),
(8, NULL, 'Bệnh viện Hùng Vương', 'Ân cần - Tận tụy', '128 Hồng Bàng, P. 12, Q. 5, TP.HCM', '/images/hospital/hung_vuong.webp', 'Một trong những bệnh viện phụ sản lâu đời và uy tín nhất.', '02838558532', '/images/hospital/banner/hung_vuong.webp'),
(9, NULL, 'Bệnh viện Vinmec Central Park', 'Chăm sóc tận tâm, Tiêu chuẩn quốc tế', '208 Nguyễn Hữu Cảnh, P. 22, Q. Bình Thạnh, TP.HCM', '/images/hospital/vinmec.webp', 'Bệnh viện đa khoa quốc tế thuộc hệ thống Vingroup.', '02836221166', '/images/hospital/banner/vinmec.webp'),
(10, NULL, 'Bệnh viện FV', 'Nơi bạn tin tưởng', '6 Nguyễn Lương Bằng, P. Tân Phú, Q. 7, TP.HCM', '/images/hospital/fv.webp', 'Bệnh viện quốc tế với nhiều chuyên khoa sâu.', '02854113333', '/images/hospital/banner/fv.webp');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phongkham`
--
CREATE TABLE `phongkham` (
  `id` int(11) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `imagesIntro` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`imagesIntro`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `phongkham` (10 MẪU)
--
INSERT INTO `phongkham` (`id`, `user_id`, `name`, `address`, `image`, `description`, `imagesIntro`) VALUES
(1, NULL, 'Shine Clinic By TS.BS Trần Ngọc Ánh', '06 Trương Quyền, P.6, Q.3, TP.HCM', '/images/clinic/shine_logo.webp', 'Shine Clinic là tâm huyết của Tiến sĩ – Bác sĩ Trần Ngọc Ánh...', '[ \"/images/clinic/profile/shine_1.webp\"]'),
(2, NULL, 'Phòng Khám Nội Tổng Quát Sài Gòn', '152 Nguyễn Trãi, P. Bến Thành, Q.1, TP.HCM', '/images/clinic/saigon_general.webp', 'Chuyên cung cấp dịch vụ khám và điều trị nội khoa tổng quát...', '[]'),
(3, NULL, 'Phòng Khám Nhi Đồng Tâm', '230 Đường 3/2, P.12, Q.10, TP.HCM', '/images/clinic/nhidongtam.webp', 'Chuyên khoa Nhi, cung cấp dịch vụ tiêm chủng...', '[]'),
(4, NULL, 'Phòng khám Da liễu Pro Skin', '50-52 Ngô Quyền, P. 5, Q. 10, TP.HCM', '/images/clinic/proskin.webp', 'Chuyên trị mụn, sẹo rỗ, nám, tàn nhang bằng công nghệ cao.', '[]'),
(5, NULL, 'Phòng khám Mắt Bác sĩ Bùi Tiến Hùng', '39B Hàng Bài, Q. Hoàn Kiếm, Hà Nội', '/images/clinic/mat_hung.webp', 'BS. Hùng là chuyên gia hàng đầu về phẫu thuật Phaco và Lasik.', '[]'),
(6, NULL, 'Phòng khám Tiêu hóa Bác sĩ Hậu', '270-272 Cộng Hòa, P. 13, Q. Tân Bình, TP.HCM', '/images/clinic/tieuhoa_hau.webp', 'Chuyên nội soi và điều trị các bệnh lý dạ dày, đại tràng.', '[]'),
(7, NULL, 'Phòng khám Victoria Healthcare', '20-20Bis-22 Đinh Tiên Hoàng, P. Đa Kao, Q. 1, TP.HCM', '/images/clinic/victoria.webp', 'Phòng khám đa khoa quốc tế với nhiều bác sĩ nước ngoài.', '[]'),
(8, NULL, 'Phòng khám Xương khớp Bác sĩ Tăng Hà Nam Anh', '16/2 Lý Thường Kiệt, P. 7, Q. Tân Bình, TP.HCM', '/images/clinic/nam_anh.webp', 'Chuyên gia hàng đầu về nội soi và chấn thương chỉnh hình.', '[]'),
(9, NULL, 'Phòng khám Tai Mũi Họng Bác sĩ Hạnh', '123 Võ Văn Tần, P. 6, Q. 3, TP.HCM', '/images/clinic/tmh_hanh.webp', 'Trang thiết bị hiện đại, chuyên nội soi và điều trị viêm xoang.', '[]'),
(10, NULL, 'Phòng khám Vigor Health', '100-102-104-106-108 Trương Định, P. 9, Q. 3, TP.HCM', '/images/clinic/vigor.webp', 'Phòng khám đa khoa lâu đời, cung cấp dịch vụ khám sức khỏe công ty.', '[]');

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
-- Đang đổ dữ liệu cho bảng `bacsi` (10 MẪU)
--
INSERT INTO `bacsi` (`id`, `user_id`, `name`, `specialty`, `address`, `workplace`, `image`, `experience_year`, `description`) VALUES
(1, 2, 'TS.BS Đào Bùi Quý Quyền', 'Nội thận - Tiết niệu', '201B Nguyễn Chí Thanh, Q. 5, TP.HCM', 'Bệnh viện Chợ Rẫy', '/images/doctor/quyen.webp', 22, 'Trưởng khoa Nội thận - Tiết niệu tại Bệnh viện Chợ Rẫy.'),
(2, 8, 'BS. Trần Thị Bích Ngọc', 'Nội Tiêu hóa', '250 Nguyễn Xí, P. 13, Bình Thạnh, TP.HCM', 'Bệnh viện Đại học Y dược TP.HCM', '/images/doctor/ngoc.webp', 15, 'Chuyên gia về nội soi và các bệnh lý dạ dày.'),
(3, NULL, 'GS.TS.BS Võ Thành Nhân', 'Can thiệp Tim mạch', '6 Nguyễn Lương Bằng, Q. 7, TP.HCM', 'Bệnh viện FV', '/images/doctor/nhan.webp', 30, 'Chuyên gia hàng đầu Việt Nam về can thiệp tim mạch, TAVI.'),
(4, NULL, 'BS.CKII Trần Minh Khuyên', 'Nội Thần kinh', '527 Sư Vạn Hạnh, P. 12, Q. 10, TP.HCM', 'Bệnh viện Nhân dân 115', '/images/doctor/khuyen.webp', 20, 'Điều trị chuyên sâu về đột quỵ và các bệnh lý thần kinh.'),
(5, NULL, 'BS. Nguyễn Thị Hồng Hạnh', 'Tai Mũi Họng', '123 Võ Văn Tần, P. 6, Q. 3, TP.HCM', 'Phòng khám Bác sĩ Hạnh', '/images/doctor/hanh.webp', 18, 'Chuyên nội soi và điều trị viêm xoang, viêm họng mãn tính.'),
(6, NULL, 'BS. Trần Ngọc Ánh', 'Da liễu', '06 Trương Quyền, P.6, Q.3, TP.HCM', 'Shine Clinic', '/images/doctor/anh.webp', 35, 'Chuyên gia hàng đầu về điều trị da thẩm mỹ, laser.'),
(7, NULL, 'BS. Bùi Tiến Hùng', 'Nhãn khoa (Mắt)', '39B Hàng Bài, Q. Hoàn Kiếm, Hà Nội', 'Phòng khám Mắt Bác sĩ Hùng', '/images/doctor/hung.webp', 25, 'Chuyên phẫu thuật Phaco và Lasik, điều trị tật khúc xạ.'),
(8, NULL, 'PGS.TS.BS Tăng Hà Nam Anh', 'Cơ Xương Khớp', '16/2 Lý Thường Kiệt, P. 7, Q. Tân Bình', 'Phòng khám Bác sĩ Nam Anh', '/images/doctor/nam_anh.webp', 28, 'Chuyên gia về nội soi và chấn thương thể thao.'),
(9, NULL, 'ThS.BS Nguyễn Thị Tâm', 'Sản Phụ khoa', '284 Cống Quỳnh, Q. 1, TP.HCM', 'Bệnh viện Từ Dũ', '/images/doctor/tam.webp', 12, 'Chuyên theo dõi thai kỳ nguy cơ cao và đỡ đẻ.'),
(10, NULL, 'BS.CKI Nguyễn Vạn Thông', 'Nhi khoa', '341 Sư Vạn Hạnh, Q. 10, TP.HCM', 'Bệnh viện Nhi Đồng 1', '/images/doctor/thong.webp', 16, 'Chuyên điều trị các bệnh lý hô hấp và tiêu hóa ở trẻ em.');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bacsi_chuyenkhoa` (10 MẪU)
--

CREATE TABLE `bacsi_chuyenkhoa` (
  `MaBS` bigint(20) NOT NULL,
  `MaCK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `bacsi_chuyenkhoa` (`MaBS`, `MaCK`) VALUES
(1, 1),
(2, 5),
(3, 3),
(4, 2),
(5, 7),
(6, 4),
(7, 6),
(8, 10),
(9, 8),
(10, 9);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `benhvien_chuyenkhoa` (10 MẪU)
--

CREATE TABLE `benhvien_chuyenkhoa` (
  `MaBV` int(11) NOT NULL,
  `MaCK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `benhvien_chuyenkhoa` (`MaBV`, `MaCK`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 5),
(2, 1),
(2, 5),
(3, 8),
(4, 8),
(6, 9),
(7, 2),
(7, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phongkham_chuyenkhoa` (10 MẪU)
--

CREATE TABLE `phongkham_chuyenkhoa` (
  `MaPK` int(11) NOT NULL,
  `MaCK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `phongkham_chuyenkhoa` (`MaPK`, `MaCK`) VALUES
(1, 4),
(2, 1),
(3, 9),
(4, 4),
(5, 6),
(6, 5),
(7, 1),
(7, 9),
(8, 10),
(9, 7);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lich_tong` (Lịch rảnh)
--

CREATE TABLE `lich_tong` (
  `MaLich` int(11) NOT NULL,
  `LoaiDoiTuong` enum('BACSI','PHONGKHAM','BENHVIEN') NOT NULL COMMENT 'Loại đối tượng (Bác sĩ, Phòng khám, BV)',
  `MaDoiTuong` bigint(20) NOT NULL COMMENT 'ID của bacsi, phongkham, hoặc benhvien',
  `Ngay` date NOT NULL COMMENT 'Ngày làm việc',
  `TenNgay` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `lich_tong` (10 MẪU)
--
INSERT INTO `lich_tong` (`MaLich`, `LoaiDoiTuong`, `MaDoiTuong`, `Ngay`, `TenNgay`) VALUES
(1, 'BACSI', 1, '2025-11-12', 'Thứ 4, 12-11'),
(2, 'BACSI', 1, '2025-11-13', 'Thứ 5, 13-11'),
(3, 'BACSI', 2, '2025-11-12', 'Thứ 4, 12-11'),
(4, 'BACSI', 3, '2025-11-14', 'Thứ 6, 14-11'),
(5, 'BENHVIEN', 1, '2025-11-12', 'Thứ 4, 12-11'),
(6, 'BENHVIEN', 1, '2025-11-13', 'Thứ 5, 13-11'),
(7, 'BENHVIEN', 2, '2025-11-12', 'Thứ 4, 12-11'),
(8, 'PHONGKHAM', 1, '2025-11-15', 'Thứ 7, 15-11'),
(9, 'PHONGKHAM', 2, '2025-11-15', 'Thứ 7, 15-11'),
(10, 'PHONGKHAM', 7, '2025-11-17', 'Thứ 2, 17-11');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lich_gio` (Khung giờ rảnh)
--

CREATE TABLE `lich_gio` (
  `MaGio` int(11) NOT NULL,
  `MaLich` int(11) NOT NULL COMMENT 'Khóa ngoại, liên kết với lich_tong.MaLich',
  `KhungGio` varchar(20) NOT NULL COMMENT 'Ví dụ: 09:00 - 09:15',
  `status` varchar(20) NOT NULL DEFAULT 'Available' COMMENT 'Trạng thái: Available, Booked'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `lich_gio` (30 MẪU)
--
INSERT INTO `lich_gio` (`MaGio`, `MaLich`, `KhungGio`, `status`) VALUES
(1, 1, '08:00 - 08:15', 'Available'),
(2, 1, '08:15 - 08:30', 'Available'),
(3, 1, '08:30 - 08:45', 'Available'),
(4, 2, '14:00 - 14:15', 'Available'),
(5, 2, '14:15 - 14:30', 'Available'),
(6, 2, '14:30 - 14:45', 'Available'),
(7, 3, '09:00 - 09:15', 'Available'),
(8, 3, '09:15 - 09:30', 'Available'),
(9, 3, '09:30 - 09:45', 'Available'),
(10, 4, '10:00 - 10:15', 'Available'),
(11, 4, '10:15 - 10:30', 'Available'),
(12, 4, '10:30 - 10:45', 'Available'),
(13, 5, '08:00 - 08:15', 'Available'),
(14, 5, '08:15 - 08:30', 'Available'),
(15, 5, '08:30 - 08:45', 'Available'),
(16, 6, '13:00 - 13:15', 'Available'),
(17, 6, '13:15 - 13:30', 'Available'),
(18, 6, '13:30 - 13:45', 'Available'),
(19, 7, '07:00 - 07:15', 'Available'),
(20, 7, '07:15 - 07:30', 'Available'),
(21, 7, '07:30 - 07:45', 'Available'),
(22, 8, '17:00 - 17:15', 'Available'),
(23, 8, '17:15 - 17:30', 'Available'),
(24, 8, '17:30 - 17:45', 'Available'),
(25, 9, '18:00 - 18:15', 'Available'),
(26, 9, '18:15 - 18:30', 'Available'),
(27, 9, '18:30 - 18:45', 'Available'),
(28, 10, '08:00 - 08:15', 'Available'),
(29, 10, '08:15 - 08:30', 'Available'),
(30, 10, '08:30 - 08:45', 'Available');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lichhen` (Lịch hẹn đã đặt)
--

CREATE TABLE `lichhen` (
  `MaLichHen` int(11) NOT NULL,
  `user_id` bigint(20) NOT NULL COMMENT 'ID của Bệnh nhân (từ bảng users)',
  `MaGio` int(11) NOT NULL COMMENT 'ID của Khung giờ (từ bảng lich_gio)',
  `TrangThai` varchar(50) DEFAULT 'Đang chờ' COMMENT 'Trạng thái: Đang chờ, Đã xác nhận, Đã hủy',
  `GhiChu` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `lichhen` (10 MẪU)
--
INSERT INTO `lichhen` (`MaLichHen`, `user_id`, `MaGio`, `TrangThai`, `GhiChu`) VALUES
(1, 1, 1, 'Đang chờ', 'Khám tổng quát'),
(2, 4, 4, 'Đã xác nhận', 'Tái khám'),
(3, 6, 7, 'Đang chờ', 'Đau dạ dày'),
(4, 1, 10, 'Đang chờ', 'Khám tim'),
(5, 4, 13, 'Đã hủy', 'Bệnh nhân bận việc'),
(6, 6, 16, 'Đang chờ', 'Khám sức khỏe tổng quát cho công ty'),
(7, 1, 19, 'Đang chờ', 'Đau đầu'),
(8, 4, 22, 'Đã xác nhận', 'Khám da liễu'),
(9, 6, 25, 'Đang chờ', 'Khám nội soi'),
(10, 1, 28, 'Đang chờ', 'Khám mắt');

--
-- CẬP NHẬT TRẠNG THÁI 'lich_gio' CHO 10 LỊCH HẸN TRÊN
--
UPDATE `lich_gio` SET `status` = 'Booked' WHERE `MaGio` IN (1, 4, 7, 10, 13, 16, 19, 22, 25, 28);

-- --------------------------------------------------------

--
-- Chỉ mục cho các bảng đã đổ
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone_number` (`phone_number`);
ALTER TABLE `chuyenkhoa`
  ADD PRIMARY KEY (`MaCK`);
ALTER TABLE `benhvien`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_benhvien_user` (`user_id`);
ALTER TABLE `phongkham`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_phongkham_user` (`user_id`);
ALTER TABLE `bacsi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_bacsi_user` (`user_id`);
ALTER TABLE `bacsi_chuyenkhoa`
  ADD PRIMARY KEY (`MaBS`,`MaCK`),
  ADD KEY `MaCK` (`MaCK`);
ALTER TABLE `benhvien_chuyenkhoa`
  ADD PRIMARY KEY (`MaBV`,`MaCK`),
  ADD KEY `MaCK` (`MaCK`);
ALTER TABLE `phongkham_chuyenkhoa`
  ADD PRIMARY KEY (`MaPK`,`MaCK`),
  ADD KEY `MaCK` (`MaCK`);
ALTER TABLE `lich_tong`
  ADD PRIMARY KEY (`MaLich`);
ALTER TABLE `lich_gio`
  ADD PRIMARY KEY (`MaGio`),
  ADD KEY `FK_gio_ngay` (`MaLich`);
ALTER TABLE `lichhen`
  ADD PRIMARY KEY (`MaLichHen`),
  ADD UNIQUE KEY `UNI_MaGio` (`MaGio`),
  ADD KEY `FK_hen_user` (`user_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
ALTER TABLE `chuyenkhoa`
  MODIFY `MaCK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
ALTER TABLE `benhvien`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
ALTER TABLE `phongkham`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
ALTER TABLE `bacsi`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
ALTER TABLE `lich_tong`
  MODIFY `MaLich` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
ALTER TABLE `lich_gio`
  MODIFY `MaGio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
ALTER TABLE `lichhen`
  MODIFY `MaLichHen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Các ràng buộc cho các bảng đã đổ
--
ALTER TABLE `benhvien`
  ADD CONSTRAINT `fk_benhvien_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `phongkham`
  ADD CONSTRAINT `fk_phongkham_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `bacsi`
  ADD CONSTRAINT `fk_bacsi_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `bacsi_chuyenkhoa`
  ADD CONSTRAINT `bacsi_chuyenkhoa_ibfk_1` FOREIGN KEY (`MaBS`) REFERENCES `bacsi` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bacsi_chuyenkhoa_ibfk_2` FOREIGN KEY (`MaCK`) REFERENCES `chuyenkhoa` (`MaCK`) ON DELETE CASCADE;
ALTER TABLE `benhvien_chuyenkhoa`
  ADD CONSTRAINT `benhvien_chuyenkhoa_ibfk_1` FOREIGN KEY (`MaBV`) REFERENCES `benhvien` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `benhvien_chuyenkhoa_ibfk_2` FOREIGN KEY (`MaCK`) REFERENCES `chuyenkhoa` (`MaCK`) ON DELETE CASCADE;
ALTER TABLE `phongkham_chuyenkhoa`
  ADD CONSTRAINT `phongkham_chuyenkhoa_ibfk_1` FOREIGN KEY (`MaPK`) REFERENCES `phongkham` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `phongkham_chuyenkhoa_ibfk_2` FOREIGN KEY (`MaCK`) REFERENCES `chuyenkhoa` (`MaCK`) ON DELETE CASCADE;
ALTER TABLE `lich_gio`
  ADD CONSTRAINT `FK_gio_ngay` FOREIGN KEY (`MaLich`) REFERENCES `lich_tong` (`MaLich`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `lichhen`
  ADD CONSTRAINT `FK_hen_gio` FOREIGN KEY (`MaGio`) REFERENCES `lich_gio` (`MaGio`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_hen_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
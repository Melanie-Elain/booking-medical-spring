-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 16, 2025 lúc 03:10 PM
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
  `description` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `bacsi`
--

INSERT INTO `bacsi` (`id`, `user_id`, `name`, `specialty`, `address`, `workplace`, `image`, `experience_year`, `description`) VALUES
(1, 14, 'TS.BS Đào Bùi Quý Quyền', 'Nội thận - Tiết niệu', '201B Nguyễn Chí Thanh, Q. 5, TP.HCM', 'Bệnh viện Chợ Rẫy', 'https://cdn.youmed.vn/photos/931bb6a5-da4f-4f74-a442-a927d188bb98.jpg?width=100&aspect_ratio=1:1', 22, 'Trưởng khoa Nội thận - Tiết niệu tại Bệnh viện Chợ Rẫy.'),
(2, 8, 'BS. Trần Thị Bích Ngọc', 'Nội Tiêu hóa', '250 Nguyễn Xí, P. 13, Bình Thạnh, TP.HCM', 'Bệnh viện Đại học Y dược TP.HCM', 'https://cdn.youmed.vn/photos/8d963988-516b-44ed-a7bf-49f26dcc88b7.jpg?width=100&aspect_ratio=1:1', 15, 'Chuyên gia về nội soi và các bệnh lý dạ dày.'),
(3, 15, 'GS.TS.BS Võ Thành Nhân', 'Can thiệp Tim mạch', '6 Nguyễn Lương Bằng, Q. 7, TP.HCM', 'Bệnh viện FV', 'https://cdn.youmed.vn/photos/d9bdabb7-7afb-419a-8533-db34a775e504.jpg?width=100&aspect_ratio=1:1', 30, 'Chuyên gia hàng đầu Việt Nam về can thiệp tim mạch, TAVI.'),
(4, 23, 'BS.CKII Trần Minh Khuyên', 'Nội Thần kinh', '527 Sư Vạn Hạnh, P. 12, Q. 10, TP.HCM', 'Bệnh viện Nhân dân 115', 'https://cdn.youmed.vn/photos/09f68f6c-131b-45ed-97d6-afdc89fa51e3.jpg?width=100&aspect_ratio=1:1', 20, 'Điều trị chuyên sâu về đột quỵ và các bệnh lý thần kinh.'),
(5, 17, 'BS. Nguyễn Thị Hồng Hạnh', 'Tai Mũi Họng', '123 Võ Văn Tần, P. 6, Q. 3, TP.HCM', 'Phòng khám Bác sĩ Hạnh', 'https://cdn.youmed.vn/photos/68c2307d-18f8-4e97-9ef3-99fea20a286d.png?width=100&aspect_ratio=1:1', 18, 'Chuyên nội soi và điều trị viêm xoang, viêm họng mãn tính.'),
(6, 18, 'BS. Trần Ngọc Ánh', 'Da liễu', '06 Trương Quyền, P.6, Q.3, TP.HCM', 'Shine Clinic', 'https://cdn.youmed.vn/photos/b7125d2f-c83d-45c4-bfa9-29a6eb863653.jpg?width=100&aspect_ratio=1:1', 35, 'Chuyên gia hàng đầu về điều trị da thẩm mỹ, laser.'),
(7, 19, 'BS. Bùi Tiến Hùng', 'Nhãn khoa (Mắt)', '39B Hàng Bài, Q. Hoàn Kiếm, Hà Nội', 'Phòng khám Mắt Bác sĩ Hùng', 'https://cdn.youmed.vn/photos/5b6e849b-9836-4a3c-8355-b75da10be70b.JPG?width=100&aspect_ratio=1:1', 25, 'Chuyên phẫu thuật Phaco và Lasik, điều trị tật khúc xạ.'),
(8, 20, 'PGS.TS.BS Tăng Hà Nam Anh', 'Cơ Xương Khớp', '16/2 Lý Thường Kiệt, P. 7, Q. Tân Bình', 'Phòng khám Bác sĩ Nam Anh', 'https://cdn.youmed.vn/photos/570c0b98-89cd-4788-90bf-9cbfb7711936.jpg?width=100&aspect_ratio=1:1', 28, 'Chuyên gia về nội soi và chấn thương thể thao.'),
(9, 21, 'ThS.BS Nguyễn Thị Tâm', 'Sản Phụ khoa', '284 Cống Quỳnh, Q. 1, TP.HCM', 'Bệnh viện Từ Dũ', 'https://cdn.youmed.vn/photos/899be4cb-948f-4af5-b3d2-387fccb29a7d.jpg?width=100&aspect_ratio=1:1', 12, 'Chuyên theo dõi thai kỳ nguy cơ cao và đỡ đẻ.'),
(10, 22, 'BS.CKI Nguyễn Vạn Thông', 'Nhi khoa', '341 Sư Vạn Hạnh, Q. 10, TP.HCM', 'Bệnh viện Nhi Đồng 1', 'https://cdn.youmed.vn/photos/305541b6-72ae-4fde-a3e8-647e2b171d63.jpg?width=100&aspect_ratio=1:1', 16, 'Chuyên điều trị các bệnh lý hô hấp và tiêu hóa ở trẻ em.');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bacsi_chuyenkhoa`
--

CREATE TABLE `bacsi_chuyenkhoa` (
  `MaBS` bigint(20) NOT NULL,
  `MaCK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `bacsi_chuyenkhoa`
--

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
-- Cấu trúc bảng cho bảng `benhvien`
--

CREATE TABLE `benhvien` (
  `id` int(11) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `slogan` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` tinytext DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `banner` varchar(255) DEFAULT NULL,
  `imageIntro` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `benhvien`
--

INSERT INTO `benhvien` (`id`, `user_id`, `name`, `slogan`, `address`, `image`, `description`, `phone`, `banner`, `imageIntro`) VALUES
(1, 10, 'Bệnh viện Chợ Rẫy', 'Nơi gửi trọn niềm tin', '201B Nguyễn Chí Thanh, P. 12, Q. 5, TP.HCM', 'https://cdn.youmed.vn/photos/14c1b0c8-1b44-48e6-ab0d-b4b989a86b45.png?width=100&aspect_ratio=1:1', 'Bệnh viện đa khoa trung ương hàng đầu tại khu vực phía Nam.', '0123456777', 'https://cdn.youmed.vn/photos/c90bc798-1748-4cfa-9472-53882038476c.png?width=300', NULL),
(2, 24, 'Bệnh viện Đại học Y Dược TP.HCM', 'Tiên phong - Đẳng cấp - Chuẩn mực', '215 Hồng Bàng, P. 11, Q. 5, TP.HCM', 'https://cdn.youmed.vn/photos/186f542e-45e0-416b-9050-b258bfd2317b.png?width=100&aspect_ratio=1:1', 'Bệnh viện uy tín kết hợp giữa điều trị và giảng dạy y khoa.', '02838554269', 'https://cdn.youmed.vn/photos/0eecce02-6958-4007-9fcc-78d5d644e33b.png?width=300', NULL),
(3, 25, 'Bệnh viện Từ Dũ', 'Nơi khởi đầu sự sống', '284 Cống Quỳnh, P. Phạm Ngũ Lão, Q. 1, TP.HCM', 'https://cdn.youmed.vn/photos/fb4179f1-d0e9-4e2a-98a2-26e6efe7add8.png?width=100&aspect_ratio=1:1', 'Bệnh viện chuyên sản phụ khoa hàng đầu tại Việt Nam.', '02854042829', 'https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2020/08/yhct.jpg?width=300', NULL),
(4, 26, 'Bệnh viện Phụ sản Quốc tế Sài Gòn (SIH)', 'Nơi chắp cánh những thiên thần bé bỏng', '63 Bùi Thị Xuân, P. Phạm Ngũ Lão, Q. 1, TP.HCM', 'https://cdn.youmed.vn/photos/4d510848-8b6c-480b-b28f-a4c4a3ef1e4c.png?width=100&aspect_ratio=1:1', 'Bệnh viện chuyên khoa sản phụ và sơ sinh hàng đầu, tiêu chuẩn quốc tế.', '02839253000', 'https://cdn.youmed.vn/photos/ff27f5b6-4fe5-456b-a3be-ded96837a656.png?width=300', NULL),
(5, 27, 'Bệnh viện Tâm thần Trung ương 2', 'Khỏe mạnh tinh thần, vững bước tương lai', '158 Hùng Vương, P. 2, TP. Biên Hòa, Đồng Nai', 'https://cdn.youmed.vn/photos/5d25ccd4-9ed8-4455-81fa-dca65d1c2604.png?width=100&aspect_ratio=1:1', 'Cơ sở y tế chuyên sâu về khám và điều trị các vấn đề tâm thần.', '02513822295', 'https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2020/08/rhmtphcm.jpg?width=300', NULL),
(6, 28, 'Bệnh viện Nhi Đồng 1', 'Tận tâm vì sức khỏe trẻ thơ', '341 Sư Vạn Hạnh, P. 10, Q. 10, TP.HCM', 'https://cdn.youmed.vn/photos/b7674b50-09f5-46ce-a7d3-abba422f62c6.png?width=100&aspect_ratio=1:1', 'Bệnh viện Nhi khoa lớn và uy tín nhất Việt Nam.', '02839271119', 'https://cdn.youmed.vn/photos/93bdf6dd-82c5-4faf-8f8a-eae0a4363814.png?width=300', NULL),
(7, 29, 'Bệnh viện Nhân dân 115', 'Chăm sóc bằng trái tim', '527 Sư Vạn Hạnh, P. 12, Q. 10, TP.HCM', 'https://cdn.youmed.vn/photos/b7674b50-09f5-46ce-a7d3-abba422f62c6.png?width=100&aspect_ratio=1:1', 'Bệnh viện đa khoa hạng I, mạnh về Ngoại thần kinh và Tim mạch.', '02838652368', 'https://cdn.youmed.vn/photos/93bdf6dd-82c5-4faf-8f8a-eae0a4363814.png?width=300', NULL),
(8, 30, 'Bệnh viện Hùng Vương', 'Ân cần - Tận tụy', '128 Hồng Bàng, P. 12, Q. 5, TP.HCM', 'https://cdn.youmed.vn/photos/fb4179f1-d0e9-4e2a-98a2-26e6efe7add8.png?width=100&aspect_ratio=1:1', 'Một trong những bệnh viện phụ sản lâu đời và uy tín nhất.', '02838558532', 'https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2...\n', NULL),
(9, 31, 'Bệnh viện Vinmec Central Park', 'Chăm sóc tận tâm, Tiêu chuẩn quốc tế', '208 Nguyễn Hữu Cảnh, P. 22, Q. Bình Thạnh, TP.HCM', 'https://cdn.youmed.vn/photos/14c1b0c8-1b44-48e6-ab0d-b4b989a86b45.png?width=100&aspect_ratio=1:1', 'Bệnh viện đa khoa quốc tế thuộc hệ thống Vingroup.', '02836221166', 'https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2020/08/rhmtphcm.jpg?width=300', NULL),
(10, 32, 'Bệnh viện FV', 'Nơi bạn tin tưởng', '6 Nguyễn Lương Bằng, P. Tân Phú, Q. 7, TP.HCM', 'https://cdn.youmed.vn/photos/186f542e-45e0-416b-9050-b258bfd2317b.png?width=100&aspect_ratio=1:1', 'Bệnh viện quốc tế với nhiều chuyên khoa sâu.', '02854113333', 'https://cdn.youmed.vn/photos/0eecce02-6958-4007-9fcc-78d5d644e33b.png?width=300', NULL),
(11, NULL, '123', '123', '1234', '', '', '0123654799', '', NULL);

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
(1, 1),
(1, 2),
(1, 3),
(1, 4),
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
-- Cấu trúc bảng cho bảng `chuyenkhoa`
--

CREATE TABLE `chuyenkhoa` (
  `MaCK` int(11) NOT NULL,
  `TenCK` varchar(100) NOT NULL,
  `mo_ta` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chuyenkhoa`
--

INSERT INTO `chuyenkhoa` (`MaCK`, `TenCK`, `mo_ta`) VALUES
(1, 'Nội tổng quát ', 'Chuyên điều trị các bệnh lý nội khoa'),
(2, 'Ngoại thần kinh', 'Phẫu thuật thần kinh, cột sống'),
(3, 'Tim mạch', 'Điều trị bệnh tim mạch'),
(4, 'Da liễu', 'Chuyên điều trị các bệnh về da.'),
(5, 'Tiêu hóa', 'Khám và điều trị các bệnh lý đường tiêu hóa, gan, mật.'),
(6, 'Mắt', 'Khám mắt, đo thị lực, phẫu thuật Lasik.'),
(7, 'Tai Mũi Họng', 'Điều trị viêm xoang, viêm họng, các vấn đề về thính lực.'),
(8, 'Sản Phụ khoa', 'Khám thai, theo dõi thai kỳ, điều trị các bệnh phụ khoa.'),
(9, 'Nhi khoa', 'Chăm sóc sức khỏe toàn diện cho trẻ em và trẻ sơ sinh.'),
(10, 'Cơ Xương Khớp', 'Điều trị Gout, thoái hóa khớp, loãng xương.'),
(11, '123', '123456789');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lichhen`
--

CREATE TABLE `lichhen` (
  `ma_lich_hen` int(11) NOT NULL,
  `user_id` bigint(20) NOT NULL COMMENT 'ID của Bệnh nhân (từ bảng users)',
  `ma_gio` int(11) NOT NULL COMMENT 'ID của Khung giờ (từ bảng lich_gio)',
  `trang_thai` varchar(255) DEFAULT NULL,
  `ghi_chu` tinytext DEFAULT NULL,
  `hinh_thuc_kham` varchar(50) DEFAULT NULL COMMENT 'Hình thức khám (thuong/bhyt)',
  `tong_tien` decimal(10,2) DEFAULT 0.00 COMMENT 'Giá cuối cùng tại thời điểm đặt lịch'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `lichhen`
--

INSERT INTO `lichhen` (`ma_lich_hen`, `user_id`, `ma_gio`, `trang_thai`, `ghi_chu`, `hinh_thuc_kham`, `tong_tien`) VALUES
(68, 4, 20, 'Đang chờ thanh toán', '123456', 'thuong', 50600.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lich_gio`
--

CREATE TABLE `lich_gio` (
  `ma_gio` int(11) NOT NULL,
  `ma_lich` int(11) NOT NULL COMMENT 'Khóa ngoại, liên kết với lich_tong.MaLich',
  `khung_gio` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `lich_gio`
--

INSERT INTO `lich_gio` (`ma_gio`, `ma_lich`, `khung_gio`, `status`) VALUES
(1, 1, '08:00 - 08:15', 'Available'),
(2, 1, '08:15 - 08:30', 'Available'),
(3, 1, '08:30 - 08:45', 'Booked'),
(4, 2, '14:00 - 14:15', 'Available'),
(5, 2, '14:15 - 14:30', 'Available'),
(6, 2, '14:30 - 14:45', 'Available'),
(7, 3, '09:00 - 09:15', 'Available'),
(8, 3, '09:15 - 09:30', 'Available'),
(9, 3, '09:30 - 09:45', 'Available'),
(10, 4, '10:00 - 10:15', 'Available'),
(11, 4, '10:15 - 10:30', 'Available'),
(12, 4, '10:30 - 10:45', 'Available'),
(13, 5, '08:00 - 08:15', 'Booked'),
(14, 5, '08:15 - 08:30', 'Booked'),
(15, 5, '08:30 - 08:45', 'Booked'),
(16, 6, '13:00 - 13:15', 'Booked'),
(17, 6, '13:15 - 13:30', 'Booked'),
(18, 6, '13:30 - 13:45', 'Booked'),
(19, 7, '07:00 - 07:15', 'Booked'),
(20, 7, '07:15 - 07:30', 'Booked'),
(21, 7, '07:30 - 07:45', 'Booked'),
(22, 8, '17:00 - 17:15', 'Available'),
(23, 8, '17:15 - 17:30', 'Available'),
(24, 8, '17:30 - 17:45', 'Available'),
(25, 9, '18:00 - 18:15', 'Available'),
(26, 9, '18:15 - 18:30', 'Available'),
(27, 9, '18:30 - 18:45', 'Available'),
(28, 10, '08:00 - 08:15', 'Booked'),
(29, 10, '08:15 - 08:30', 'Available'),
(30, 10, '08:30 - 08:45', 'Available'),
(31, 7, '07:15 - 07:30', 'Booked');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lich_tong`
--

CREATE TABLE `lich_tong` (
  `ma_lich` int(11) NOT NULL,
  `loai_doi_tuong` varchar(50) NOT NULL,
  `ma_doi_tuong` bigint(20) NOT NULL COMMENT 'ID của bacsi, phongkham, hoặc benhvien',
  `ngay` date NOT NULL COMMENT 'Ngày làm việc',
  `ten_ngay` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `lich_tong`
--

INSERT INTO `lich_tong` (`ma_lich`, `loai_doi_tuong`, `ma_doi_tuong`, `ngay`, `ten_ngay`) VALUES
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
-- Cấu trúc bảng cho bảng `phongkham`
--

CREATE TABLE `phongkham` (
  `id` int(11) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` tinytext DEFAULT NULL,
  `images_intro` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `phongkham`
--

INSERT INTO `phongkham` (`id`, `user_id`, `name`, `address`, `image`, `description`, `images_intro`) VALUES
(1, 33, 'Shine Clinic By TS.BS Trần Ngọc Ánh', '06 Trương Quyền, P.6, Q.3, TP.HCM', 'https://cdn.youmed.vn/photos/cc099fec-bf59-4ec6-a222-1fc862d4f430.jpg?width=100&aspect_ratio=1:1', 'Shine Clinic là tâm huyết của Tiến sĩ – Bác sĩ Trần Ngọc Ánh...', '[ \"/images/clinic/profile/shine_1.webp\"]'),
(2, 34, 'Phòng Khám Nội Tổng Quát Sài Gòn', '152 Nguyễn Trãi, P. Bến Thành, Q.1, TP.HCM', 'https://cdn.youmed.vn/photos/0a865d20-8ad2-4e8a-a5ee-c888ab2628b4.jpg?width=100&aspect_ratio=1:1', 'Chuyên cung cấp dịch vụ khám và điều trị nội khoa tổng quát...', '[]'),
(3, NULL, 'Phòng Khám Nhi Đồng Tâm', '230 Đường 3/2, P.12, Q.10, TP.HCM', 'https://cdn.youmed.vn/photos/db03a22a-fe3b-46d9-b006-d84207b2ce62.jpg?width=100&aspect_ratio=1:1', 'Chuyên khoa Nhi, cung cấp dịch vụ tiêm chủng...', '[]'),
(4, NULL, 'Phòng khám Da liễu Pro Skin', '50-52 Ngô Quyền, P. 5, Q. 10, TP.HCM', 'https://cdn.youmed.vn/photos/e2bfe920-070b-4c64-8594-b5f9a50591fc.jpg?width=100&aspect_ratio=1:1', 'Chuyên trị mụn, sẹo rỗ, nám, tàn nhang bằng công nghệ cao.', '[]'),
(5, NULL, 'Phòng khám Mắt Bác sĩ Bùi Tiến Hùng', '39B Hàng Bài, Q. Hoàn Kiếm, Hà Nội', '/images/clinic/mat_hung.webp', 'BS. Hùng là chuyên gia hàng đầu về phẫu thuật Phaco và Lasik.', '[]'),
(6, NULL, 'Phòng khám Tiêu hóa Bác sĩ Hậu', '270-272 Cộng Hòa, P. 13, Q. Tân Bình, TP.HCM', '/images/clinic/tieuhoa_hau.webp', 'Chuyên nội soi và điều trị các bệnh lý dạ dày, đại tràng.', '[]'),
(7, NULL, 'Phòng khám Victoria Healthcare', '20-20Bis-22 Đinh Tiên Hoàng, P. Đa Kao, Q. 1, TP.HCM', '/images/clinic/victoria.webp', 'Phòng khám đa khoa quốc tế với nhiều bác sĩ nước ngoài.', '[]'),
(8, NULL, 'Phòng khám Xương khớp Bác sĩ Tăng Hà Nam Anh', '16/2 Lý Thường Kiệt, P. 7, Q. Tân Bình, TP.HCM', '/images/clinic/nam_anh.webp', 'Chuyên gia hàng đầu về nội soi và chấn thương chỉnh hình.', '[]'),
(9, NULL, 'Phòng khám Tai Mũi Họng Bác sĩ Hạnh', '123 Võ Văn Tần, P. 6, Q. 3, TP.HCM', '/images/clinic/tmh_hanh.webp', 'Trang thiết bị hiện đại, chuyên nội soi và điều trị viêm xoang.', '[]'),
(10, NULL, 'Phòng khám Vigor Health', '100-102-104-106-108 Trương Định, P. 9, Q. 3, TP.HCM', '/images/clinic/vigor.webp', 'Phòng khám đa khoa lâu đời, cung cấp dịch vụ khám sức khỏe công ty.', '[]');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phongkham_chuyenkhoa`
--

CREATE TABLE `phongkham_chuyenkhoa` (
  `MaPK` int(11) NOT NULL,
  `MaCK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `phongkham_chuyenkhoa`
--

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
-- Cấu trúc bảng cho bảng `thanhtoan`
--

CREATE TABLE `thanhtoan` (
  `id` bigint(20) NOT NULL,
  `ma_lich_hen` int(11) NOT NULL COMMENT 'Liên kết với lichhen.ma_lich_hen',
  `momo_order_id` varchar(255) NOT NULL COMMENT 'Mã đơn hàng gửi lên MoMo',
  `momo_trans_id` varchar(255) DEFAULT NULL COMMENT 'Mã giao dịch MoMo trả về',
  `amount` decimal(10,2) NOT NULL COMMENT 'Số tiền thanh toán',
  `status` varchar(50) NOT NULL COMMENT 'Trạng thái (PENDING, PAID, FAILED, CANCELED)',
  `momo_result_code` varchar(50) DEFAULT NULL COMMENT 'Mã kết quả từ MoMo',
  `payment_method` varchar(50) NOT NULL DEFAULT 'MOMO',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `role` enum('BENHNHAN','BACSI','ADMIN','BENHVIEN','PHONGKHAM') DEFAULT 'BENHNHAN',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `avatar_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `full_name`, `phone_number`, `password`, `email`, `dob`, `gender`, `id_card`, `health_insurance`, `ethnicity`, `province`, `district`, `ward`, `address`, `occupation`, `referral_code`, `role`, `created_at`, `avatar_url`) VALUES
(4, 'Trần Bảo Hân', '0123456789', '$2a$10$XInCfmmAbNsLrD89bAuGW.gjdYcznnty48lsUteTgUERXgXvLeca2', 'azunastart0101@gmail.com', '2025-11-12', 'Nam', '', '', 'Kinh', 'Tỉnh Bắc Giang', 'Huyện Hiệp Hòa', 'Xã Xuân Cẩm', '', '', '', 'BENHNHAN', '2025-11-06 08:19:24', 'https://res.cloudinary.com/dlqpohz0j/image/upload/v1763301058/hrqleepptczcdp7fmsum.jpg'),
(5, 'Nguyễn Thị Thanh Hằng', '0912345678', '$2a$10$Dq9oY7Zmsybjo5sZdVy0Xe6UCvd2EL2v1KBH.YnymQYCs5q6N0I8m', 'th@gmail.com', '2025-10-28', 'Nam', '', '', 'Kinh', '', '', '', '', '', '', 'BENHNHAN', '2025-11-06 09:07:31', NULL),
(6, 'Admin', '0987654321', '$2a$10$c6lFff/P6HFQWuG9JW.2bOhZnHqjx7gzx4zSbSH0qK30B4XQGGf4u', 'ad@gmail.com', '2025-10-28', 'Nam', '', '', 'Kinh', '', '', '', '', '', '', 'ADMIN', '2025-11-06 11:43:11', NULL),
(7, 'Bùi Viết Bảo Huy', '0123456788', '$2a$10$.TcgDk9d0VgF809f3illqON3sqyRCk6CnMxQlZ8ufx3cDcETk7786', 'bvbh@gmail.com', '2025-11-10', 'Nam', '', '', 'Kinh', '', '', '', '', '', '', 'BENHNHAN', '2025-11-10 01:10:18', NULL),
(8, 'BS. Trần Thị Bích Ngọc', '0123654789', '$2a$10$dciPrbeCN7wt7MOVuPE9ouGVPqb2hrsHLx5W2B9E3fYPqmUkltF42', 'ngoc@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BACSI', '2025-11-10 03:18:34', NULL),
(10, 'Bệnh viện Chợ rẫy', '0123456777', '$2a$10$cMVq0MXvuLanOBygDrqzJOcMrwUipBD29v75Df3at4RIMVPAG8dSO', 'bvcr@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BENHVIEN', '2025-11-10 13:19:26', NULL),
(12, 'Ngô Trường Hiếu', '0987220775', '$2a$10$u52aiDjv72ZXnwAmMSZYEekH/faRqDlxmx0v5J5Zr2D7E9EdBnH5y', 'nthbh@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BENHNHAN', '2025-11-10 13:26:57', NULL),
(14, 'TS.BS Đào Bùi Quý Quyền', '0934567890', '$2a$10$/uY9jmKOMTWbp52jSOONXeKrFFiHYDd8dDZndjn5qK00PCfnuu2ji', 'dbqq@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BACSI', '2025-11-10 14:27:55', NULL),
(15, 'GS.TS.BS Võ Thành Nhân', '0867223626', '$2a$10$lTkybfwtJ2Gk2D0Fu9okKeD/V.Pm9UKD50zK4MyBBzEYvsAjqzONO', 'vtn@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BACSI', '2025-11-10 14:29:06', NULL),
(17, 'BS. Nguyễn Thị Hồng Hạnh', '0122234562', '$2a$10$s7LhM4HmHN11cOv5GT2/2u/rCJqEO6xbibGR5tmWsTmdxaVkrVIxi', 'nthh@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BACSI', '2025-11-11 08:27:47', NULL),
(18, 'BS. Trần Ngọc Ánh', '0867223622', '$2a$10$We65CXC.564o5uL7e7Hj5ON3HKITjOVAKdw1iJhPcjtfV2ypHcMsi', 'tna@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BACSI', '2025-11-11 08:40:19', NULL),
(19, 'BS. Bùi Tiến Hùng', '0867233625', '$2a$10$J3y2uXGFnNe0FTBwprQ8heXeVZTI1ca80iGs7Qbdc6IZcrqGe1Y86', 'bth@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BACSI', '2025-11-11 08:40:42', NULL),
(20, 'PGS.TS.BS Tăng Hà Nam Anh', '0857223625', '$2a$10$UkkwdbXl5bUmXbJtINsVMOyE7uroj.I2weRKNmoHrBOxMMQ8wbo.6', 'thna@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BACSI', '2025-11-11 08:41:03', NULL),
(21, 'ThS.BS Nguyễn Thị Tâm', '0867221625', '$2a$10$7rFMHDfwrNYykKNO0oRJguLbWR1.ZVqEpje4mGLZ4yrGsea.DEZqG', 'ntt@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BACSI', '2025-11-11 08:41:29', NULL),
(22, 'BS.CKI Nguyễn Vạn Thông', '0817223625', '$2a$10$m83IT7fAKjsiJp1evl/.pOPJtrsn5CGWbkRxWlSV8Y8G9H9O0HEt6', 'nvt@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BACSI', '2025-11-11 08:41:58', NULL),
(23, 'BS.CKII Trần Minh Khuyên', '0867223632', '$2a$10$igl3lL/W217RdaDTO3uRX.lV3VUtq/yRk5yGFDSFHVDONcVH5lFWi', 'tmk@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BACSI', '2025-11-11 08:45:18', NULL),
(24, 'Bệnh viện Đại học Y Dược TP.HCM', '02838554269', '$2a$10$EneBzO914QggGecMILB7IuAZ9h2eYkVuadzaM33yLyOGUfmgK9iC6', 'dhyd@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BENHVIEN', '2025-11-11 08:50:07', NULL),
(25, 'Bệnh viện Từ Dũ', '02854042829', '$2a$10$mqmvT/ew7Js23/moMz78pO3rTJNoM/ZZlh4Q9G7inYsfVN66HO7a2', 'bvtd@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BENHVIEN', '2025-11-11 08:50:36', NULL),
(26, 'Bệnh viện Phụ sản Quốc tế Sài Gòn (SIH)', '02839253000', '$2a$10$dkWSzhZI8l5ckE2fgbuYi.Lf7k918DkHT1VLTeZWcMxKCgxHRzNYu', 'sih@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BENHVIEN', '2025-11-11 08:50:58', NULL),
(27, 'Bệnh viện Tâm thần Trung ương 2', '02513822295', '$2a$10$EXqAPk5o7NBmCwjflA9JzuPZZyeDJzad0HeuC7CFHc1bwaATKzZpC', 'bvtttw2@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BENHVIEN', '2025-11-11 08:51:27', NULL),
(28, 'Bệnh viện Nhi Đồng 1', '02839271119', '$2a$10$4BmU/vGAk.EWG/b8vrB1ie34gkTR4.iQbcmHeV.Na6CBjzPN3Nq/y', 'bvnd1@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BENHVIEN', '2025-11-11 08:51:50', NULL),
(29, 'Bệnh viện Nhân dân 115', '02838652368', '$2a$10$QZlbEB9bHle8n7zeLk9k4uRsFy5UmqA4XFpHvbc.n9ARJCLHQtiPu', 'bvnd@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BENHVIEN', '2025-11-11 08:52:12', NULL),
(30, 'Bệnh viện Hùng Vương', '02838558532', '$2a$10$sbttWqazHC2DzF5hVciTkeUCtU9GbZ6ccRFtvcqLhqmxGeRfSqeSu', 'bvhv@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BENHVIEN', '2025-11-11 08:52:35', NULL),
(31, 'Bệnh viện Vinmec Central Park', '02836221166', '$2a$10$Ja0yDbFCBP9/9sP/GA5EDOf6ndaDEnP6WEXijkE3JtxXi.p9NRAVa', 'bvvcp@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BENHVIEN', '2025-11-11 08:52:59', NULL),
(32, 'Bệnh viện FV', '02854113333', '$2a$10$lKbxifOJrL2/iwBfWHfFget9s1XD/j/N2F/voh1Hb3Lom3SCjwqyy', 'bvfv@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BENHVIEN', '2025-11-11 08:53:24', NULL),
(33, 'Shine Clinic By TS.BS Trần Ngọc Ánh', '0807223625', '$2a$10$NZAL5B56LPQOBzrAYVhmmuytJzFi9c7tP6a1Gj1ANS0uNG/We2wGC', 'scb@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'PHONGKHAM', '2025-11-11 08:57:44', NULL),
(34, 'Phòng Khám Nội Tổng Quát Sài Gòn', '0809223625', '$2a$10$Ut8jrPS6tiZkX9RHF/pGb.qnaMOXXEECuJ4QPGeJC1Rc0QfSttDgq', 'pkntq@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'PHONGKHAM', '2025-11-11 08:58:19', NULL);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_benhvien_user` (`user_id`);

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
  ADD PRIMARY KEY (`ma_lich_hen`),
  ADD UNIQUE KEY `UNI_MaGio` (`ma_gio`),
  ADD KEY `FK_hen_user` (`user_id`);

--
-- Chỉ mục cho bảng `lich_gio`
--
ALTER TABLE `lich_gio`
  ADD PRIMARY KEY (`ma_gio`),
  ADD KEY `FK_gio_ngay` (`ma_lich`);

--
-- Chỉ mục cho bảng `lich_tong`
--
ALTER TABLE `lich_tong`
  ADD PRIMARY KEY (`ma_lich`);

--
-- Chỉ mục cho bảng `phongkham`
--
ALTER TABLE `phongkham`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_phongkham_user` (`user_id`);

--
-- Chỉ mục cho bảng `phongkham_chuyenkhoa`
--
ALTER TABLE `phongkham_chuyenkhoa`
  ADD PRIMARY KEY (`MaPK`,`MaCK`),
  ADD KEY `MaCK` (`MaCK`);

--
-- Chỉ mục cho bảng `thanhtoan`
--
ALTER TABLE `thanhtoan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `momo_order_id` (`momo_order_id`),
  ADD UNIQUE KEY `uni_momo_order_id` (`momo_order_id`),
  ADD KEY `FK_thanhtoan_lichhen` (`ma_lich_hen`);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `benhvien`
--
ALTER TABLE `benhvien`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `chuyenkhoa`
--
ALTER TABLE `chuyenkhoa`
  MODIFY `MaCK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `lichhen`
--
ALTER TABLE `lichhen`
  MODIFY `ma_lich_hen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT cho bảng `lich_gio`
--
ALTER TABLE `lich_gio`
  MODIFY `ma_gio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT cho bảng `lich_tong`
--
ALTER TABLE `lich_tong`
  MODIFY `ma_lich` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `phongkham`
--
ALTER TABLE `phongkham`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `thanhtoan`
--
ALTER TABLE `thanhtoan`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

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
-- Các ràng buộc cho bảng `benhvien`
--
ALTER TABLE `benhvien`
  ADD CONSTRAINT `fk_benhvien_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `benhvien_chuyenkhoa`
--
ALTER TABLE `benhvien_chuyenkhoa`
  ADD CONSTRAINT `benhvien_chuyenkhoa_ibfk_1` FOREIGN KEY (`MaBV`) REFERENCES `benhvien` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `benhvien_chuyenkhoa_ibfk_2` FOREIGN KEY (`MaCK`) REFERENCES `chuyenkhoa` (`MaCK`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `lichhen`
--
ALTER TABLE `lichhen`
  ADD CONSTRAINT `FK_hen_gio` FOREIGN KEY (`ma_gio`) REFERENCES `lich_gio` (`ma_gio`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_hen_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `lich_gio`
--
ALTER TABLE `lich_gio`
  ADD CONSTRAINT `FK_gio_ngay` FOREIGN KEY (`ma_lich`) REFERENCES `lich_tong` (`ma_lich`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `phongkham`
--
ALTER TABLE `phongkham`
  ADD CONSTRAINT `fk_phongkham_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `phongkham_chuyenkhoa`
--
ALTER TABLE `phongkham_chuyenkhoa`
  ADD CONSTRAINT `phongkham_chuyenkhoa_ibfk_1` FOREIGN KEY (`MaPK`) REFERENCES `phongkham` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `phongkham_chuyenkhoa_ibfk_2` FOREIGN KEY (`MaCK`) REFERENCES `chuyenkhoa` (`MaCK`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `thanhtoan`
--
ALTER TABLE `thanhtoan`
  ADD CONSTRAINT `FK_thanhtoan_lichhen` FOREIGN KEY (`ma_lich_hen`) REFERENCES `lichhen` (`ma_lich_hen`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

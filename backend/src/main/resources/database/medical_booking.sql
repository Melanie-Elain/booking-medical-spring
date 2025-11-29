-- MySQL dump 10.13  Distrib 9.5.0, for Linux (x86_64)
--
-- Host: medical-booking-db-booking-medical.i.aivencloud.com    Database: defaultdb
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bacsi`
--

DROP TABLE IF EXISTS `bacsi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bacsi` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `specialty` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `workplace` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `experience_year` int DEFAULT NULL,
  `description` tinytext COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  KEY `fk_bacsi_user` (`user_id`),
  CONSTRAINT `fk_bacsi_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bacsi`
--

LOCK TABLES `bacsi` WRITE;
/*!40000 ALTER TABLE `bacsi` DISABLE KEYS */;
INSERT INTO `bacsi` VALUES (1,14,'TS.BS Đào Bùi Quý Quyền','Nội thận - Tiết niệu','201B Nguyễn Chí Thanh, Q. 5, TP.HCM','Bệnh viện Chợ Rẫy','https://cdn.youmed.vn/photos/931bb6a5-da4f-4f74-a442-a927d188bb98.jpg?width=100&aspect_ratio=1:1',22,'Trưởng khoa Nội thận - Tiết niệu tại Bệnh viện Chợ Rẫy.'),(2,8,'BS. Trần Thị Bích Ngọc','Nội Tiêu hóa','250 Nguyễn Xí, P. 13, Bình Thạnh, TP.HCM','Bệnh viện Đại học Y dược TP.HCM','https://cdn.youmed.vn/photos/8d963988-516b-44ed-a7bf-49f26dcc88b7.jpg?width=100&aspect_ratio=1:1',15,'Chuyên gia về nội soi và các bệnh lý dạ dày.'),(3,15,'GS.TS.BS Võ Thành Nhân','Can thiệp Tim mạch','6 Nguyễn Lương Bằng, Q. 7, TP.HCM','Bệnh viện FV','https://cdn.youmed.vn/photos/d9bdabb7-7afb-419a-8533-db34a775e504.jpg?width=100&aspect_ratio=1:1',30,'Chuyên gia hàng đầu Việt Nam về can thiệp tim mạch, TAVI.'),(4,23,'BS.CKII Trần Minh Khuyên','Nội Thần kinh','527 Sư Vạn Hạnh, P. 12, Q. 10, TP.HCM','Bệnh viện Nhân dân 115','https://cdn.youmed.vn/photos/09f68f6c-131b-45ed-97d6-afdc89fa51e3.jpg?width=100&aspect_ratio=1:1',20,'Điều trị chuyên sâu về đột quỵ và các bệnh lý thần kinh.'),(5,17,'BS. Nguyễn Thị Hồng Hạnh','Tai Mũi Họng','123 Võ Văn Tần, P. 6, Q. 3, TP.HCM','Phòng khám Bác sĩ Hạnh','https://cdn.youmed.vn/photos/68c2307d-18f8-4e97-9ef3-99fea20a286d.png?width=100&aspect_ratio=1:1',18,'Chuyên nội soi và điều trị viêm xoang, viêm họng mãn tính.'),(6,18,'BS. Trần Ngọc Ánh','Da liễu','06 Trương Quyền, P.6, Q.3, TP.HCM','Shine Clinic','https://cdn.youmed.vn/photos/b7125d2f-c83d-45c4-bfa9-29a6eb863653.jpg?width=100&aspect_ratio=1:1',35,'Chuyên gia hàng đầu về điều trị da thẩm mỹ, laser.'),(7,19,'BS. Bùi Tiến Hùng','Nhãn khoa (Mắt)','39B Hàng Bài, Q. Hoàn Kiếm, Hà Nội','Phòng khám Mắt Bác sĩ Hùng','https://cdn.youmed.vn/photos/5b6e849b-9836-4a3c-8355-b75da10be70b.JPG?width=100&aspect_ratio=1:1',25,'Chuyên phẫu thuật Phaco và Lasik, điều trị tật khúc xạ.'),(8,20,'PGS.TS.BS Tăng Hà Nam Anh','Cơ Xương Khớp','16/2 Lý Thường Kiệt, P. 7, Q. Tân Bình','Phòng khám Bác sĩ Nam Anh','https://cdn.youmed.vn/photos/570c0b98-89cd-4788-90bf-9cbfb7711936.jpg?width=100&aspect_ratio=1:1',28,'Chuyên gia về nội soi và chấn thương thể thao.'),(9,21,'ThS.BS Nguyễn Thị Tâm','Sản Phụ khoa','284 Cống Quỳnh, Q. 1, TP.HCM','Bệnh viện Từ Dũ','https://cdn.youmed.vn/photos/899be4cb-948f-4af5-b3d2-387fccb29a7d.jpg?width=100&aspect_ratio=1:1',12,'Chuyên theo dõi thai kỳ nguy cơ cao và đỡ đẻ.'),(10,22,'BS.CKI Nguyễn Vạn Thông','Nhi khoa','341 Sư Vạn Hạnh, Q. 10, TP.HCM','Bệnh viện Nhi Đồng 1','https://cdn.youmed.vn/photos/305541b6-72ae-4fde-a3e8-647e2b171d63.jpg?width=100&aspect_ratio=1:1',16,'Chuyên điều trị các bệnh lý hô hấp và tiêu hóa ở trẻ em.');
/*!40000 ALTER TABLE `bacsi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bacsi_chuyenkhoa`
--

DROP TABLE IF EXISTS `bacsi_chuyenkhoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bacsi_chuyenkhoa` (
  `MaBS` bigint NOT NULL,
  `MaCK` int NOT NULL,
  PRIMARY KEY (`MaBS`,`MaCK`),
  KEY `MaCK` (`MaCK`),
  CONSTRAINT `bacsi_chuyenkhoa_ibfk_1` FOREIGN KEY (`MaBS`) REFERENCES `bacsi` (`id`) ON DELETE CASCADE,
  CONSTRAINT `bacsi_chuyenkhoa_ibfk_2` FOREIGN KEY (`MaCK`) REFERENCES `chuyenkhoa` (`MaCK`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bacsi_chuyenkhoa`
--

LOCK TABLES `bacsi_chuyenkhoa` WRITE;
/*!40000 ALTER TABLE `bacsi_chuyenkhoa` DISABLE KEYS */;
INSERT INTO `bacsi_chuyenkhoa` VALUES (4,2),(3,3),(6,4),(1,5),(2,5),(7,6),(5,7),(1,8),(9,8),(10,9),(8,10);
/*!40000 ALTER TABLE `bacsi_chuyenkhoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `benhvien`
--

DROP TABLE IF EXISTS `benhvien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `benhvien` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `slogan` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` tinytext COLLATE utf8mb4_general_ci,
  `phone` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `banner` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `imageIntro` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  KEY `fk_benhvien_user` (`user_id`),
  CONSTRAINT `fk_benhvien_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `benhvien`
--

LOCK TABLES `benhvien` WRITE;
/*!40000 ALTER TABLE `benhvien` DISABLE KEYS */;
INSERT INTO `benhvien` VALUES (1,10,'Bệnh viện Chợ Rẫy','Nơi gửi trọn niềm tin','201B Nguyễn Chí Thanh, P. 12, Q. 5, TP.HCM','https://cdn.youmed.vn/photos/14c1b0c8-1b44-48e6-ab0d-b4b989a86b45.png?width=100&aspect_ratio=1:1','Bệnh viện đa khoa trung ương hàng đầu tại khu vực phía Nam.','0123456777','https://cdn.youmed.vn/photos/c90bc798-1748-4cfa-9472-53882038476c.png?width=300',NULL),(2,24,'Bệnh viện Đại học Y Dược TP.HCM','Tiên phong - Đẳng cấp - Chuẩn mực','215 Hồng Bàng, P. 11, Q. 5, TP.HCM','https://cdn.youmed.vn/photos/186f542e-45e0-416b-9050-b258bfd2317b.png?width=100&aspect_ratio=1:1','Bệnh viện uy tín kết hợp giữa điều trị và giảng dạy y khoa.','02838554269','https://cdn.youmed.vn/photos/0eecce02-6958-4007-9fcc-78d5d644e33b.png?width=300',NULL),(3,25,'Bệnh viện Từ Dũ','Nơi khởi đầu sự sống','284 Cống Quỳnh, P. Phạm Ngũ Lão, Q. 1, TP.HCM','https://cdn.youmed.vn/photos/fb4179f1-d0e9-4e2a-98a2-26e6efe7add8.png?width=100&aspect_ratio=1:1','Bệnh viện chuyên sản phụ khoa hàng đầu tại Việt Nam.','02854042829','https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2020/08/yhct.jpg?width=300',NULL),(4,26,'Bệnh viện Phụ sản Quốc tế Sài Gòn (SIH)','Nơi chắp cánh những thiên thần bé bỏng','63 Bùi Thị Xuân, P. Phạm Ngũ Lão, Q. 1, TP.HCM','https://cdn.youmed.vn/photos/4d510848-8b6c-480b-b28f-a4c4a3ef1e4c.png?width=100&aspect_ratio=1:1','Bệnh viện chuyên khoa sản phụ và sơ sinh hàng đầu, tiêu chuẩn quốc tế.','02839253000','https://cdn.youmed.vn/photos/ff27f5b6-4fe5-456b-a3be-ded96837a656.png?width=300',NULL),(5,27,'Bệnh viện Tâm thần Trung ương 2','Khỏe mạnh tinh thần, vững bước tương lai','158 Hùng Vương, P. 2, TP. Biên Hòa, Đồng Nai','https://cdn.youmed.vn/photos/5d25ccd4-9ed8-4455-81fa-dca65d1c2604.png?width=100&aspect_ratio=1:1','Cơ sở y tế chuyên sâu về khám và điều trị các vấn đề tâm thần.','02513822295','https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2020/08/rhmtphcm.jpg?width=300',NULL),(6,28,'Bệnh viện Nhi Đồng 1','Tận tâm vì sức khỏe trẻ thơ','341 Sư Vạn Hạnh, P. 10, Q. 10, TP.HCM','https://cdn.youmed.vn/photos/b7674b50-09f5-46ce-a7d3-abba422f62c6.png?width=100&aspect_ratio=1:1','Bệnh viện Nhi khoa lớn và uy tín nhất Việt Nam.','02839271119','https://cdn.youmed.vn/photos/93bdf6dd-82c5-4faf-8f8a-eae0a4363814.png?width=300',NULL),(7,29,'Bệnh viện Nhân dân 115','Chăm sóc bằng trái tim','527 Sư Vạn Hạnh, P. 12, Q. 10, TP.HCM','https://cdn.youmed.vn/photos/b7674b50-09f5-46ce-a7d3-abba422f62c6.png?width=100&aspect_ratio=1:1','Bệnh viện đa khoa hạng I, mạnh về Ngoại thần kinh và Tim mạch.','02838652368','https://cdn.youmed.vn/photos/93bdf6dd-82c5-4faf-8f8a-eae0a4363814.png?width=300',NULL),(8,30,'Bệnh viện Hùng Vương','Ân cần - Tận tụy','128 Hồng Bàng, P. 12, Q. 5, TP.HCM','https://cdn.youmed.vn/photos/fb4179f1-d0e9-4e2a-98a2-26e6efe7add8.png?width=100&aspect_ratio=1:1','Một trong những bệnh viện phụ sản lâu đời và uy tín nhất.','02838558532','https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2...\n',NULL),(9,31,'Bệnh viện Vinmec Central Park','Chăm sóc tận tâm, Tiêu chuẩn quốc tế','208 Nguyễn Hữu Cảnh, P. 22, Q. Bình Thạnh, TP.HCM','https://cdn.youmed.vn/photos/14c1b0c8-1b44-48e6-ab0d-b4b989a86b45.png?width=100&aspect_ratio=1:1','Bệnh viện đa khoa quốc tế thuộc hệ thống Vingroup.','02836221166','https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2020/08/rhmtphcm.jpg?width=300',NULL),(10,32,'Bệnh viện FV','Nơi bạn tin tưởng','6 Nguyễn Lương Bằng, P. Tân Phú, Q. 7, TP.HCM','https://cdn.youmed.vn/photos/186f542e-45e0-416b-9050-b258bfd2317b.png?width=100&aspect_ratio=1:1','Bệnh viện quốc tế với nhiều chuyên khoa sâu.','02854113333','https://cdn.youmed.vn/photos/0eecce02-6958-4007-9fcc-78d5d644e33b.png?width=300',NULL),(11,NULL,'123','123','1234','','','0123654799','',NULL);
/*!40000 ALTER TABLE `benhvien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `benhvien_chuyenkhoa`
--

DROP TABLE IF EXISTS `benhvien_chuyenkhoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `benhvien_chuyenkhoa` (
  `MaBV` int NOT NULL,
  `MaCK` int NOT NULL,
  PRIMARY KEY (`MaBV`,`MaCK`),
  KEY `MaCK` (`MaCK`),
  CONSTRAINT `benhvien_chuyenkhoa_ibfk_1` FOREIGN KEY (`MaBV`) REFERENCES `benhvien` (`id`) ON DELETE CASCADE,
  CONSTRAINT `benhvien_chuyenkhoa_ibfk_2` FOREIGN KEY (`MaCK`) REFERENCES `chuyenkhoa` (`MaCK`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `benhvien_chuyenkhoa`
--

LOCK TABLES `benhvien_chuyenkhoa` WRITE;
/*!40000 ALTER TABLE `benhvien_chuyenkhoa` DISABLE KEYS */;
INSERT INTO `benhvien_chuyenkhoa` VALUES (1,1),(2,1),(1,2),(7,2),(1,3),(7,3),(1,4),(1,5),(2,5),(3,8),(4,8),(6,9);
/*!40000 ALTER TABLE `benhvien_chuyenkhoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chuyenkhoa`
--

DROP TABLE IF EXISTS `chuyenkhoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chuyenkhoa` (
  `MaCK` int NOT NULL AUTO_INCREMENT,
  `TenCK` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `mo_ta` tinytext COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`MaCK`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chuyenkhoa`
--

LOCK TABLES `chuyenkhoa` WRITE;
/*!40000 ALTER TABLE `chuyenkhoa` DISABLE KEYS */;
INSERT INTO `chuyenkhoa` VALUES (1,'Nội tổng quát 1','Chuyên điều trị các bệnh lý nội khoa'),(2,'Ngoại thần kinh','Phẫu thuật thần kinh, cột sống'),(3,'Tim mạch','Điều trị bệnh tim mạch'),(4,'Da liễu','Chuyên điều trị các bệnh về da.'),(5,'Tiêu hóa','Khám và điều trị các bệnh lý đường tiêu hóa, gan, mật.'),(6,'Mắt','Khám mắt, đo thị lực, phẫu thuật Lasik.'),(7,'Tai Mũi Họng','Điều trị viêm xoang, viêm họng, các vấn đề về thính lực.'),(8,'Sản Phụ khoa','Khám thai, theo dõi thai kỳ, điều trị các bệnh phụ khoa.'),(9,'Nhi khoa','Chăm sóc sức khỏe toàn diện cho trẻ em và trẻ sơ sinh.'),(10,'Cơ Xương Khớp','Điều trị Gout, thoái hóa khớp, loãng xương.'),(11,'123','123456789');
/*!40000 ALTER TABLE `chuyenkhoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lich_gio`
--

DROP TABLE IF EXISTS `lich_gio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lich_gio` (
  `ma_gio` int NOT NULL AUTO_INCREMENT,
  `ma_lich` int NOT NULL COMMENT 'Khóa ngoại, liên kết với lich_tong.MaLich',
  `khung_gio` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`ma_gio`),
  KEY `FK_gio_ngay` (`ma_lich`),
  CONSTRAINT `FK_gio_ngay` FOREIGN KEY (`ma_lich`) REFERENCES `lich_tong` (`ma_lich`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lich_gio`
--

LOCK TABLES `lich_gio` WRITE;
/*!40000 ALTER TABLE `lich_gio` DISABLE KEYS */;
INSERT INTO `lich_gio` VALUES (1,1,'08:00 - 08:15','Booked'),(2,1,'08:15 - 08:30','Booked'),(3,1,'08:30 - 08:45','Booked'),(4,2,'14:00 - 14:15','Booked'),(5,2,'14:15 - 14:30','Booked'),(6,2,'14:30 - 14:45','Booked'),(7,3,'09:00 - 09:15','Booked'),(8,3,'09:15 - 09:30','Booked'),(9,3,'09:30 - 09:45','Booked'),(10,4,'10:00 - 10:15','Available'),(11,4,'10:15 - 10:30','Available'),(12,4,'10:30 - 10:45','Booked'),(13,5,'08:00 - 08:15','Booked'),(14,5,'08:15 - 08:30','Booked'),(15,5,'08:30 - 08:45','Booked'),(16,6,'13:00 - 13:15','Booked'),(17,6,'13:15 - 13:30','Booked'),(18,6,'13:30 - 13:45','Booked'),(19,7,'07:00 - 07:15','Available'),(20,7,'07:15 - 07:30','Available'),(21,7,'07:30 - 07:45','Booked'),(22,8,'17:00 - 17:15','Available'),(23,8,'17:15 - 17:30','Available'),(24,8,'17:30 - 17:45','Available'),(25,9,'18:00 - 18:15','Available'),(26,9,'18:15 - 18:30','Available'),(27,9,'18:30 - 18:45','Available'),(28,10,'08:00 - 08:15','Available'),(29,10,'08:15 - 08:30','Available'),(30,10,'08:30 - 08:45','Available'),(31,7,'07:15 - 07:30','Booked'),(32,11,'07:00 - 11:30','Booked'),(33,12,'07:00 - 11:30','Booked'),(34,12,'13:00 - 16:30','Booked'),(35,13,'07:00 - 07:30','Available'),(36,13,'08:00 - 08:30','Available'),(37,13,'09:00 - 09:30','Booked'),(38,13,'10:00 - 10:30','Available'),(39,14,'08:00 - 08:30','Booked'),(40,14,'09:00 - 09:30','Available'),(41,14,'10:00 - 10:30','Available'),(42,15,'07:00 - 07:30','Booked'),(43,15,'08:00 - 08:30','Available'),(44,15,'09:00 - 09:30','Available'),(45,16,'07:00 - 11:30','Booked'),(46,16,'13:00 - 16:30','Booked'),(47,17,'07:00 - 11:30','Booked'),(48,17,'13:00 - 16:30','Booked'),(49,18,'07:00 - 07:30','Booked'),(50,18,'08:00 - 08:30','Booked'),(51,18,'09:00 - 09:30','Booked'),(52,18,'10:00 - 10:30','Booked'),(53,19,'07:00 - 11:30','Booked'),(54,19,'13:00 - 16:30','Booked'),(55,20,'07:00 - 07:30','Available'),(56,20,'08:00 - 08:30','Available'),(57,20,'09:00 - 09:30','Available'),(58,21,'08:00 - 08:30','Available'),(59,21,'09:00 - 09:30','Available'),(60,22,'07:00 - 07:30','Available'),(61,22,'09:00 - 09:30','Available'),(62,22,'10:00 - 10:30','Available'),(63,23,'08:00 - 08:30','Available'),(64,23,'09:00 - 09:30','Available'),(65,23,'10:00 - 10:30','Available'),(66,21,'10:00 - 10:30','Available'),(67,21,'07:00 - 07:30','Booked'),(68,24,'07:00 - 07:30','Available'),(69,25,'07:00 - 07:30','Available'),(70,26,'07:00 - 07:30','Available'),(71,26,'08:00 - 08:30','Available'),(72,27,'13:00 - 16:30','Booked'),(73,27,'07:00 - 11:30','Booked'),(74,28,'07:00 - 11:30','Booked'),(75,28,'13:00 - 16:30','Booked'),(76,11,'13:00 - 16:30','Booked'),(77,29,'07:00 - 07:30','Booked'),(78,29,'08:00 - 08:30','Booked'),(79,29,'10:30 - 11:00','Booked'),(80,30,'09:00 - 09:30','Booked'),(81,30,'10:30 - 11:00','Booked'),(82,30,'09:30 - 10:00','Booked'),(83,31,'07:00 - 11:30','Booked'),(84,32,'07:00 - 11:30','Booked'),(85,32,'13:00 - 16:30','Booked'),(86,33,'07:00 - 11:30','Booked'),(87,33,'13:00 - 16:30','Booked'),(88,34,'07:00 - 07:30','Booked'),(89,34,'08:00 - 08:30','Booked'),(90,34,'09:00 - 09:30','Booked'),(91,34,'10:00 - 10:30','Available'),(92,29,'10:00 - 10:30','Booked'),(93,29,'09:00 - 09:30','Booked'),(94,35,'07:00 - 11:30','Booked'),(95,35,'13:00 - 16:30','Booked'),(96,36,'07:00 - 07:30','Booked'),(97,36,'08:00 - 08:30','Booked'),(98,36,'09:00 - 09:30','Available'),(99,37,'07:00 - 07:30','Booked'),(101,37,'09:00 - 09:30','Booked'),(102,38,'08:00 - 08:30','Booked'),(103,38,'09:00 - 09:30','Available'),(104,38,'11:00 - 11:30','Available'),(105,39,'07:00 - 07:30','Booked'),(106,39,'09:00 - 09:30','Booked'),(107,39,'10:00 - 10:30','Available'),(108,30,'07:00 - 07:30','Booked'),(109,30,'08:00 - 08:30','Booked'),(110,40,'07:00 - 11:30','Booked'),(111,40,'13:00 - 16:30','Available'),(112,41,'07:00 - 11:30','Booked'),(113,41,'13:00 - 16:30','Available'),(114,42,'07:00 - 11:30','Booked'),(115,42,'13:00 - 16:30','Booked'),(116,43,'07:00 - 11:30','Booked'),(117,43,'13:00 - 16:30','Booked'),(118,44,'07:00 - 11:30','Booked'),(119,44,'13:00 - 16:30','Available'),(120,45,'07:00 - 07:30','Available'),(121,45,'08:00 - 08:30','Booked'),(122,45,'09:00 - 09:30','Booked');
/*!40000 ALTER TABLE `lich_gio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lich_tong`
--

DROP TABLE IF EXISTS `lich_tong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lich_tong` (
  `ma_lich` int NOT NULL AUTO_INCREMENT,
  `loai_doi_tuong` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ma_doi_tuong` bigint NOT NULL COMMENT 'ID của bacsi, phongkham, hoặc benhvien',
  `ngay` date NOT NULL COMMENT 'Ngày làm việc',
  `ten_ngay` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`ma_lich`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lich_tong`
--

LOCK TABLES `lich_tong` WRITE;
/*!40000 ALTER TABLE `lich_tong` DISABLE KEYS */;
INSERT INTO `lich_tong` VALUES (1,'BACSI',1,'2025-11-12','Thứ 4, 12-11'),(2,'BACSI',1,'2025-11-13','Thứ 5, 13-11'),(3,'BACSI',2,'2025-11-12','Thứ 4, 12-11'),(4,'BACSI',3,'2025-11-14','Thứ 6, 14-11'),(5,'BENHVIEN',1,'2025-11-12','Thứ 4, 12-11'),(6,'BENHVIEN',1,'2025-11-13','Thứ 5, 13-11'),(7,'BENHVIEN',2,'2025-11-12','Thứ 4, 12-11'),(8,'PHONGKHAM',1,'2025-11-15','Thứ 7, 15-11'),(9,'PHONGKHAM',2,'2025-11-15','Thứ 7, 15-11'),(10,'PHONGKHAM',7,'2025-11-17','Thứ 2, 17-11'),(11,'BENHVIEN',1,'2025-11-27','Thứ 5, 27/11/2025'),(12,'BENHVIEN',1,'2025-11-28','Thứ 6, 28/11/2025'),(13,'PHONGKHAM',2,'2025-11-27','Thứ 5, 27/11/2025'),(14,'PHONGKHAM',2,'2025-12-26','Thứ 6, 26/12/2025'),(15,'PHONGKHAM',2,'2025-11-30','Chủ nhật, 30/11/2025'),(16,'BENHVIEN',1,'2025-11-20','Thứ 5, 20/11/2025'),(17,'BENHVIEN',1,'2025-11-21','Thứ 6, 21/11/2025'),(18,'BACSI',1,'2025-11-21','Thứ 6, 21/11/2025'),(19,'BENHVIEN',1,'2025-12-24','Thứ 4, 24/12/2025'),(20,'BACSI',2,'2025-11-21','Thứ 6, 21/11/2025'),(21,'BACSI',2,'2025-11-22','Thứ 7, 22/11/2025'),(22,'BACSI',2,'2025-11-28','Thứ 6, 28/11/2025'),(23,'BACSI',2,'2025-11-26','Thứ 4, 26/11/2025'),(24,'BACSI',2,'2025-11-29','Thứ 7, 29/11/2025'),(25,'BACSI',2,'2025-11-20','Thứ 5, 20/11/2025'),(26,'BACSI',2,'2025-12-22','Thứ 2, 22/12/2025'),(27,'BENHVIEN',1,'2025-11-25','Thứ 3, 25/11/2025'),(28,'BENHVIEN',1,'2025-11-30','Chủ nhật, 30/11/2025'),(29,'BACSI',1,'2025-11-28','Thứ 6, 28/11/2025'),(30,'BACSI',1,'2025-11-29','Thứ 7, 29/11/2025'),(31,'BENHVIEN',1,'2025-12-19','Thứ 6, 19/12/2025'),(32,'BENHVIEN',1,'2025-12-06','Thứ 7, 06/12/2025'),(33,'BENHVIEN',1,'2025-12-03','Thứ 4, 03/12/2025'),(34,'PHONGKHAM',1,'2025-11-27','Thứ 5, 27/11/2025'),(35,'BENHVIEN',1,'2025-12-01','Thứ 2, 01/12/2025'),(36,'BACSI',1,'2025-12-02','Thứ 3, 02/12/2025'),(37,'BACSI',1,'2025-11-27','Thứ 5, 27/11/2025'),(38,'BACSI',1,'2025-12-04','Thứ 5, 04/12/2025'),(39,'PHONGKHAM',1,'2025-12-06','Thứ 7, 06/12/2025'),(40,'BENHVIEN',1,'2025-12-26','Thứ 6, 26/12/2025'),(41,'BENHVIEN',1,'2025-12-12','Thứ 6, 12/12/2025'),(42,'BENHVIEN',1,'2025-11-26','Thứ 4, 26/11/2025'),(43,'BENHVIEN',1,'2025-11-29','Thứ 7, 29/11/2025'),(44,'BENHVIEN',1,'2025-12-07','Chủ nhật, 07/12/2025'),(45,'BACSI',1,'2025-11-30','Chủ nhật, 30/11/2025');
/*!40000 ALTER TABLE `lich_tong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lichhen`
--

DROP TABLE IF EXISTS `lichhen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lichhen` (
  `ma_lich_hen` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL COMMENT 'ID của Bệnh nhân (từ bảng users)',
  `ma_gio` int NOT NULL COMMENT 'ID của Khung giờ (từ bảng lich_gio)',
  `trang_thai` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ghi_chu` tinytext COLLATE utf8mb4_general_ci,
  `hinh_thuc_kham` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Hình thức khám (thuong/bhyt)',
  `tong_tien` decimal(10,2) DEFAULT '0.00' COMMENT 'Giá cuối cùng tại thời điểm đặt lịch',
  PRIMARY KEY (`ma_lich_hen`),
  KEY `FK_hen_user` (`user_id`),
  KEY `FK_hen_gio` (`ma_gio`),
  CONSTRAINT `FK_hen_gio` FOREIGN KEY (`ma_gio`) REFERENCES `lich_gio` (`ma_gio`) ON DELETE CASCADE,
  CONSTRAINT `FK_hen_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=220 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lichhen`
--

LOCK TABLES `lichhen` WRITE;
/*!40000 ALTER TABLE `lichhen` DISABLE KEYS */;
INSERT INTO `lichhen` VALUES (110,5,13,'Đã xác nhận','','thuong',50600.00),(111,5,14,'Đã xác nhận','','thuong',50600.00),(112,5,15,'Đã thanh toán','','thuong',50600.00),(113,5,18,'Đã thanh toán','','thuong',50600.00),(114,5,17,'Đã thanh toán','','thuong',50600.00),(115,5,16,'Đã thanh toán','','thuong',50600.00),(116,5,21,'Đã thanh toán','','thuong',50600.00),(117,5,31,'Đã thanh toán','','thuong',50600.00),(118,5,32,'Đã thanh toán','','thuong',50600.00),(119,5,3,'Đang chờ','',NULL,0.00),(120,5,39,'Đang chờ','',NULL,0.00),(121,5,1,'Đang chờ','',NULL,0.00),(122,5,42,'Đang chờ','',NULL,0.00),(123,5,33,'Đã thanh toán','','thuong',50600.00),(124,5,45,'Đã thanh toán','','thuong',50600.00),(125,5,46,'Đã thanh toán','','thuong',50600.00),(126,4,2,'Đã xác nhận','',NULL,0.00),(127,5,48,'Đã thanh toán','','thuong',50600.00),(128,5,6,'Đã xác nhận','',NULL,0.00),(132,5,5,'Đã hủy','',NULL,0.00),(134,5,47,'Đang chờ thanh toán','','thuong',50600.00),(135,5,47,'Đang chờ thanh toán','','thuong',50600.00),(136,5,47,'Đang chờ thanh toán','','thuong',50600.00),(137,5,47,'Đã thanh toán','','thuong',50600.00),(138,5,47,'Đang chờ thanh toán','','thuong',50600.00),(139,5,47,'Đã thanh toán','','thuong',50600.00),(140,5,34,'Đang chờ thanh toán','','thuong',50600.00),(141,5,34,'Thanh toán thất bại','','thuong',50600.00),(142,5,54,'Đã thanh toán','','thuong',50600.00),(143,5,53,'Đã thanh toán','','thuong',50600.00),(144,5,4,'Đã hủy','',NULL,0.00),(145,5,4,'Đang chờ','',NULL,0.00),(146,5,34,'Thanh toán thất bại','','thuong',50600.00),(147,5,34,'Thanh toán thất bại','','thuong',50600.00),(148,5,34,'Thanh toán thất bại','','thuong',50600.00),(149,5,34,'Đã thanh toán','','thuong',50600.00),(150,5,6,'Đã xác nhận','',NULL,0.00),(151,5,73,'Đã hủy','','thuong',50600.00),(152,4,72,'Đã xác nhận','123','bhyt',0.00),(153,4,49,'Đã xác nhận','',NULL,0.00),(156,6,75,'Đã thanh toán','abc','thuong',50600.00),(157,5,5,'Đã xác nhận','',NULL,0.00),(158,5,74,'Đang chờ thanh toán','','thuong',50600.00),(159,5,74,'Đang chờ thanh toán','','thuong',50600.00),(160,5,74,'Đang chờ thanh toán','','thuong',50600.00),(161,5,74,'Đã thanh toán','','thuong',50600.00),(162,5,76,'Đã thanh toán','','thuong',50600.00),(163,4,12,'Đang chờ','',NULL,0.00),(164,4,50,'Đã xác nhận','',NULL,0.00),(165,42,83,'Thanh toán thất bại','','thuong',50600.00),(166,42,83,'Đã thanh toán','','thuong',50600.00),(167,4,51,'Đã xác nhận','',NULL,0.00),(168,5,86,'Thanh toán thất bại','','thuong',50600.00),(169,4,79,'Đã xác nhận','',NULL,0.00),(170,4,67,'Đã xác nhận','',NULL,0.00),(171,4,81,'Đã xác nhận','',NULL,0.00),(172,4,84,'Đã xác nhận','','bhyt',0.00),(173,4,37,'Đã xác nhận','',NULL,0.00),(174,4,78,'Đã xác nhận','',NULL,0.00),(175,4,77,'Đã xác nhận','',NULL,0.00),(176,4,8,'Đã xác nhận','',NULL,0.00),(177,5,86,'Thanh toán thất bại','','thuong',50600.00),(178,5,86,'Đã thanh toán','','thuong',50600.00),(179,43,80,'Đã hủy','',NULL,0.00),(180,43,87,'Đã thanh toán','','thuong',50600.00),(181,4,82,'Đã xác nhận','',NULL,0.00),(182,4,85,'Đã thanh toán','','thuong',50600.00),(183,4,92,'Đã xác nhận','',NULL,0.00),(184,4,93,'Đã xác nhận','',NULL,0.00),(185,4,9,'Đã xác nhận','',NULL,0.00),(186,4,7,'Đã xác nhận','',NULL,0.00),(187,4,96,'Đã xác nhận','',NULL,0.00),(188,4,97,'Đã xác nhận','',NULL,0.00),(189,4,94,'Đã hủy','','thuong',50600.00),(190,4,99,'Đã xác nhận','',NULL,0.00),(191,4,95,'Đã xác nhận','','thuong',50600.00),(192,4,88,'Đã xác nhận','',NULL,0.00),(193,4,101,'Đã xác nhận','',NULL,0.00),(194,4,94,'Đã thanh toán','','thuong',50600.00),(195,4,89,'Đã hủy','',NULL,0.00),(196,4,90,'Đã xác nhận','',NULL,0.00),(197,5,110,'Đã thanh toán','','thuong',50600.00),(198,4,116,'Đang chờ thanh toán','','thuong',50600.00),(199,54,102,'Đã xác nhận','đau đầu',NULL,0.00),(200,54,89,'Đang chờ','ho',NULL,0.00),(201,54,117,'Đang chờ','','bhyt',0.00),(202,54,116,'Đã xác nhận','','thuong',50600.00),(203,56,109,'Đã hủy','ho',NULL,0.00),(204,56,80,'Đã xác nhận','',NULL,0.00),(205,56,114,'Đang chờ thanh toán','','thuong',50600.00),(206,56,115,'Đang chờ thanh toán','','thuong',50600.00),(207,5,114,'Đã thanh toán','','thuong',50600.00),(208,56,111,'Thanh toán thất bại','','thuong',50600.00),(209,57,108,'Đang chờ','nhưc đầu',NULL,0.00),(210,57,115,'Đã thanh toán','','thuong',50600.00),(211,57,105,'Đang chờ','',NULL,0.00),(212,4,109,'Đang chờ','',NULL,0.00),(213,4,121,'Đang chờ','đau đầu',NULL,0.00),(214,4,112,'Đã thanh toán','123','thuong',50600.00),(215,4,106,'Đang chờ','',NULL,0.00),(216,4,122,'Đang chờ','đau đầu',NULL,0.00),(217,4,118,'Đang chờ thanh toán','Đau bụng ','thuong',50600.00),(219,4,118,'Đã xác nhận','Đau bụng','thuong',50600.00);
/*!40000 ALTER TABLE `lichhen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lichsu_thanhtoan`
--

DROP TABLE IF EXISTS `lichsu_thanhtoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lichsu_thanhtoan` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `appointment_id` bigint NOT NULL COMMENT 'ID Lịch hẹn',
  `payment_method` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order_id` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `transaction_no` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `amount` decimal(38,2) DEFAULT NULL,
  `bank_code` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `card_type` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `response_code` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lichsu_thanhtoan`
--

LOCK TABLES `lichsu_thanhtoan` WRITE;
/*!40000 ALTER TABLE `lichsu_thanhtoan` DISABLE KEYS */;
INSERT INTO `lichsu_thanhtoan` VALUES (1,127,'VNPAY','127','15271144',50600.00,'NCB','ATM','00','SUCCESS','2025-11-19 13:46:43'),(2,134,'VNPAY','134','0',50600.00,'VNPAY','QRCODE','24','FAILED','2025-11-19 16:58:00'),(3,135,'VNPAY','135','0',50600.00,'VNPAY','QRCODE','24','FAILED','2025-11-19 17:00:14'),(4,136,'VNPAY','136','0',50600.00,'VNPAY','QRCODE','24','FAILED','2025-11-19 17:07:44'),(5,137,'VNPAY','137','15271350',50600.00,'NCB','ATM','00','SUCCESS','2025-11-19 17:08:37'),(6,139,'VNPAY','139','15271358',50600.00,'NCB','ATM','00','SUCCESS','2025-11-19 17:15:25'),(7,141,'VNPAY','141','0',50600.00,'VNPAY','QRCODE','24','FAILED','2025-11-19 17:22:57'),(8,142,'VNPAY','142','15271391',50600.00,'NCB','ATM','00','SUCCESS','2025-11-19 17:46:51'),(9,143,'VNPAY','143','15271398',50600.00,'NCB','ATM','00','SUCCESS','2025-11-19 17:50:22'),(10,146,'VNPAY','146','0',50600.00,'VNPAY','QRCODE','24','FAILED','2025-11-20 04:54:32'),(11,147,'VNPAY','147','0',50600.00,'VNPAY','QRCODE','24','FAILED','2025-11-20 04:54:49'),(12,148,'VNPAY','148','0',50600.00,'VNPAY','QRCODE','24','FAILED','2025-11-20 04:56:21'),(13,149,'VNPAY','149','15271949',50600.00,'NCB','ATM','00','SUCCESS','2025-11-20 04:57:33'),(14,151,'VNPAY','151','15272104',50600.00,'NCB','ATM','00','SUCCESS','2025-11-20 06:40:24'),(15,155,'VNPAY','155','15273009',50600.00,'NCB','ATM','00','SUCCESS','2025-11-20 10:40:12'),(16,156,'VNPAY','156','15273044',50600.00,'NCB','ATM','00','SUCCESS','2025-11-20 10:51:36'),(17,161,'VNPAY','161','15276503',50600.00,'NCB','ATM','00','SUCCESS','2025-11-21 08:11:57'),(18,162,'VNPAY','162','15276703',50600.00,'NCB','ATM','00','SUCCESS','2025-11-21 09:03:08'),(19,165,'VNPAY','165','0',50600.00,'VNPAY','QRCODE','24','FAILED','2025-11-25 03:55:34'),(20,166,'VNPAY','166','15299748',50600.00,'NCB','ATM','00','SUCCESS','2025-11-25 06:34:03'),(21,168,'VNPAY','168','0',50600.00,'VNPAY','QRCODE','24','FAILED','2025-11-25 07:30:46'),(22,177,'VNPAY','177','15300726',50600.00,'NCB','ATM','24','FAILED','2025-11-25 12:44:53'),(23,178,'VNPAY','178','15300735',50600.00,'NCB','ATM','00','SUCCESS','2025-11-25 12:47:48'),(24,180,'VNPAY','180','15300797',50600.00,'NCB','ATM','00','SUCCESS','2025-11-25 13:22:26'),(25,182,'VNPAY','182','15300887',50600.00,'NCB','ATM','00','SUCCESS','2025-11-25 14:15:52'),(26,189,'VNPAY','189','15301056',50600.00,'NCB','ATM','00','SUCCESS','2025-11-25 15:26:20'),(27,191,'VNPAY','191','15301152',50600.00,'NCB','ATM','00','SUCCESS','2025-11-25 16:06:54'),(28,194,'VNPAY','194','15301214',50600.00,'NCB','ATM','00','SUCCESS','2025-11-25 16:34:27'),(29,197,'VNPAY','197','15302114',50600.00,'NCB','ATM','00','SUCCESS','2025-11-26 12:03:17'),(30,202,'VNPAY','202','15303379',50600.00,'NCB','ATM','00','SUCCESS','2025-11-26 13:23:23'),(31,207,'VNPAY','207','15303973',50600.00,'NCB','ATM','00','SUCCESS','2025-11-27 02:11:33'),(32,208,'VNPAY','208','0',50600.00,'VNPAY','QRCODE','24','FAILED','2025-11-27 02:15:16'),(33,210,'VNPAY','210','15304731',50600.00,'NCB','ATM','00','SUCCESS','2025-11-27 06:10:47'),(34,214,'VNPAY','214','15304806',50600.00,'NCB','ATM','00','SUCCESS','2025-11-27 06:42:09'),(36,219,'VNPAY','219','15309213',50600.00,'NCB','ATM','00','SUCCESS','2025-11-28 21:21:32');
/*!40000 ALTER TABLE `lichsu_thanhtoan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phongkham`
--

DROP TABLE IF EXISTS `phongkham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phongkham` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` tinytext COLLATE utf8mb4_general_ci,
  `images_intro` tinytext COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  KEY `fk_phongkham_user` (`user_id`),
  CONSTRAINT `fk_phongkham_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phongkham`
--

LOCK TABLES `phongkham` WRITE;
/*!40000 ALTER TABLE `phongkham` DISABLE KEYS */;
INSERT INTO `phongkham` VALUES (1,33,'Shine Clinic By TS.BS Trần Ngọc Ánh','06 Trương Quyền, P.6, Q.3, TP.HCM','https://cdn.youmed.vn/photos/cc099fec-bf59-4ec6-a222-1fc862d4f430.jpg?width=100&aspect_ratio=1:1','Shine Clinic là tâm huyết của Tiến sĩ – Bác sĩ Trần Ngọc Ánh...','[ \"/images/clinic/profile/shine_1.webp\"]'),(2,34,'Phòng Khám Nội Tổng Quát Sài Gòn','152 Nguyễn Trãi, P. Bến Thành, Q.1, TP.HCM','https://cdn.youmed.vn/photos/0a865d20-8ad2-4e8a-a5ee-c888ab2628b4.jpg?width=100&aspect_ratio=1:1','Chuyên cung cấp dịch vụ khám và điều trị nội khoa tổng quát...','[]'),(3,NULL,'Phòng Khám Nhi Đồng Tâm','230 Đường 3/2, P.12, Q.10, TP.HCM','https://cdn.youmed.vn/photos/db03a22a-fe3b-46d9-b006-d84207b2ce62.jpg?width=100&aspect_ratio=1:1','Chuyên khoa Nhi, cung cấp dịch vụ tiêm chủng...','[]'),(4,NULL,'Phòng khám Da liễu Pro Skin','50-52 Ngô Quyền, P. 5, Q. 10, TP.HCM','https://cdn.youmed.vn/photos/e2bfe920-070b-4c64-8594-b5f9a50591fc.jpg?width=100&aspect_ratio=1:1','Chuyên trị mụn, sẹo rỗ, nám, tàn nhang bằng công nghệ cao.','[]'),(5,NULL,'Phòng khám Mắt Bác sĩ Bùi Tiến Hùng','39B Hàng Bài, Q. Hoàn Kiếm, Hà Nội','/images/clinic/mat_hung.webp','BS. Hùng là chuyên gia hàng đầu về phẫu thuật Phaco và Lasik.','[]'),(6,NULL,'Phòng khám Tiêu hóa Bác sĩ Hậu','270-272 Cộng Hòa, P. 13, Q. Tân Bình, TP.HCM','/images/clinic/tieuhoa_hau.webp','Chuyên nội soi và điều trị các bệnh lý dạ dày, đại tràng.','[]'),(7,NULL,'Phòng khám Victoria Healthcare','20-20Bis-22 Đinh Tiên Hoàng, P. Đa Kao, Q. 1, TP.HCM','/images/clinic/victoria.webp','Phòng khám đa khoa quốc tế với nhiều bác sĩ nước ngoài.','[]'),(8,NULL,'Phòng khám Xương khớp Bác sĩ Tăng Hà Nam Anh','16/2 Lý Thường Kiệt, P. 7, Q. Tân Bình, TP.HCM','/images/clinic/nam_anh.webp','Chuyên gia hàng đầu về nội soi và chấn thương chỉnh hình.','[]'),(9,NULL,'Phòng khám Tai Mũi Họng Bác sĩ Hạnh','123 Võ Văn Tần, P. 6, Q. 3, TP.HCM','/images/clinic/tmh_hanh.webp','Trang thiết bị hiện đại, chuyên nội soi và điều trị viêm xoang.','[]'),(10,NULL,'Phòng khám Vigor Health','100-102-104-106-108 Trương Định, P. 9, Q. 3, TP.HCM','/images/clinic/vigor.webp','Phòng khám đa khoa lâu đời, cung cấp dịch vụ khám sức khỏe công ty.','[]');
/*!40000 ALTER TABLE `phongkham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phongkham_chuyenkhoa`
--

DROP TABLE IF EXISTS `phongkham_chuyenkhoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phongkham_chuyenkhoa` (
  `MaPK` int NOT NULL,
  `MaCK` int NOT NULL,
  PRIMARY KEY (`MaPK`,`MaCK`),
  KEY `MaCK` (`MaCK`),
  CONSTRAINT `phongkham_chuyenkhoa_ibfk_1` FOREIGN KEY (`MaPK`) REFERENCES `phongkham` (`id`) ON DELETE CASCADE,
  CONSTRAINT `phongkham_chuyenkhoa_ibfk_2` FOREIGN KEY (`MaCK`) REFERENCES `chuyenkhoa` (`MaCK`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phongkham_chuyenkhoa`
--

LOCK TABLES `phongkham_chuyenkhoa` WRITE;
/*!40000 ALTER TABLE `phongkham_chuyenkhoa` DISABLE KEYS */;
INSERT INTO `phongkham_chuyenkhoa` VALUES (2,1),(7,1),(1,4),(4,4),(6,5),(5,6),(9,7),(3,9),(7,9),(8,10);
/*!40000 ALTER TABLE `phongkham_chuyenkhoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_card` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `health_insurance` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ethnicity` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `province` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `district` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ward` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `occupation` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `referral_code` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role` enum('BENHNHAN','BACSI','ADMIN','BENHVIEN','PHONGKHAM') COLLATE utf8mb4_general_ci DEFAULT 'BENHNHAN',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `avatar_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone_number` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'Trần Bảo Hân','0123456789','$2a$10$XInCfmmAbNsLrD89bAuGW.gjdYcznnty48lsUteTgUERXgXvLeca2','azunastart0101@gmail.com','2025-11-12','Nam','','','Kinh','Tỉnh Bắc Giang','Huyện Hiệp Hòa','Xã Xuân Cẩm','','','','BENHNHAN','2025-11-06 08:19:24','https://res.cloudinary.com/dlqpohz0j/image/upload/v1764225511/trn1zcyyldvasbvbxzfc.jpg'),(5,'Nguyễn Thị Thanh Hằng','0912345678','$2a$10$Dq9oY7Zmsybjo5sZdVy0Xe6UCvd2EL2v1KBH.YnymQYCs5q6N0I8m','th@gmail.com','2025-10-28','Nam','','123456789','Kinh','','','','','','','BENHNHAN','2025-11-06 09:07:31','https://res.cloudinary.com/dlqpohz0j/image/upload/v1764055341/qm7n0zpfenzjkma0kuml.jpg'),(6,'Admin','0987654321','$2a$10$c6lFff/P6HFQWuG9JW.2bOhZnHqjx7gzx4zSbSH0qK30B4XQGGf4u','ad@gmail.com','2025-10-28','Nam','','','Kinh','','','','','','','ADMIN','2025-11-06 11:43:11',NULL),(8,'BS. Trần Thị Bích Ngọc','0123654789','$2a$10$dciPrbeCN7wt7MOVuPE9ouGVPqb2hrsHLx5W2B9E3fYPqmUkltF42','ngoc@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BACSI','2025-11-10 03:18:34',NULL),(10,'Bệnh viện Chợ rẫy','0123456777','$2a$10$cMVq0MXvuLanOBygDrqzJOcMrwUipBD29v75Df3at4RIMVPAG8dSO','bvcr@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BENHVIEN','2025-11-10 13:19:26',NULL),(12,'Ngô Trường Hiếu','0987220775','$2a$10$u52aiDjv72ZXnwAmMSZYEekH/faRqDlxmx0v5J5Zr2D7E9EdBnH5y','nthbh@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BENHNHAN','2025-11-10 13:26:57',NULL),(14,'TS.BS Đào Bùi Quý Quyền','0934567890','$2a$10$/uY9jmKOMTWbp52jSOONXeKrFFiHYDd8dDZndjn5qK00PCfnuu2ji','dbqq@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BACSI','2025-11-10 14:27:55',NULL),(15,'GS.TS.BS Võ Thành Nhân','0867223626','$2a$10$lTkybfwtJ2Gk2D0Fu9okKeD/V.Pm9UKD50zK4MyBBzEYvsAjqzONO','vtn@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BACSI','2025-11-10 14:29:06',NULL),(17,'BS. Nguyễn Thị Hồng Hạnh','0122234562','$2a$10$s7LhM4HmHN11cOv5GT2/2u/rCJqEO6xbibGR5tmWsTmdxaVkrVIxi','nthh@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BACSI','2025-11-11 08:27:47',NULL),(18,'BS. Trần Ngọc Ánh','0867223622','$2a$10$We65CXC.564o5uL7e7Hj5ON3HKITjOVAKdw1iJhPcjtfV2ypHcMsi','tna@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BACSI','2025-11-11 08:40:19',NULL),(19,'BS. Bùi Tiến Hùng','0867233625','$2a$10$J3y2uXGFnNe0FTBwprQ8heXeVZTI1ca80iGs7Qbdc6IZcrqGe1Y86','bth@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BACSI','2025-11-11 08:40:42',NULL),(20,'PGS.TS.BS Tăng Hà Nam Anh','0857223625','$2a$10$UkkwdbXl5bUmXbJtINsVMOyE7uroj.I2weRKNmoHrBOxMMQ8wbo.6','thna@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BACSI','2025-11-11 08:41:03',NULL),(21,'ThS.BS Nguyễn Thị Tâm','0867221625','$2a$10$7rFMHDfwrNYykKNO0oRJguLbWR1.ZVqEpje4mGLZ4yrGsea.DEZqG','ntt@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BACSI','2025-11-11 08:41:29',NULL),(22,'BS.CKI Nguyễn Vạn Thông','0817223625','$2a$10$m83IT7fAKjsiJp1evl/.pOPJtrsn5CGWbkRxWlSV8Y8G9H9O0HEt6','nvt@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BACSI','2025-11-11 08:41:58',NULL),(23,'BS.CKII Trần Minh Khuyên','0867223632','$2a$10$igl3lL/W217RdaDTO3uRX.lV3VUtq/yRk5yGFDSFHVDONcVH5lFWi','tmk@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BACSI','2025-11-11 08:45:18',NULL),(24,'Bệnh viện Đại học Y Dược TP.HCM','02838554269','$2a$10$EneBzO914QggGecMILB7IuAZ9h2eYkVuadzaM33yLyOGUfmgK9iC6','dhyd@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BENHVIEN','2025-11-11 08:50:07',NULL),(25,'Bệnh viện Từ Dũ','02854042829','$2a$10$mqmvT/ew7Js23/moMz78pO3rTJNoM/ZZlh4Q9G7inYsfVN66HO7a2','bvtd@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BENHVIEN','2025-11-11 08:50:36',NULL),(26,'Bệnh viện Phụ sản Quốc tế Sài Gòn (SIH)','02839253000','$2a$10$dkWSzhZI8l5ckE2fgbuYi.Lf7k918DkHT1VLTeZWcMxKCgxHRzNYu','sih@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BENHVIEN','2025-11-11 08:50:58',NULL),(27,'Bệnh viện Tâm thần Trung ương 2','02513822295','$2a$10$EXqAPk5o7NBmCwjflA9JzuPZZyeDJzad0HeuC7CFHc1bwaATKzZpC','bvtttw2@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BENHVIEN','2025-11-11 08:51:27',NULL),(28,'Bệnh viện Nhi Đồng 1','02839271119','$2a$10$4BmU/vGAk.EWG/b8vrB1ie34gkTR4.iQbcmHeV.Na6CBjzPN3Nq/y','bvnd1@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BENHVIEN','2025-11-11 08:51:50',NULL),(29,'Bệnh viện Nhân dân 115','02838652368','$2a$10$QZlbEB9bHle8n7zeLk9k4uRsFy5UmqA4XFpHvbc.n9ARJCLHQtiPu','bvnd@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BENHVIEN','2025-11-11 08:52:12',NULL),(30,'Bệnh viện Hùng Vương','02838558532','$2a$10$sbttWqazHC2DzF5hVciTkeUCtU9GbZ6ccRFtvcqLhqmxGeRfSqeSu','bvhv@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BENHVIEN','2025-11-11 08:52:35',NULL),(31,'Bệnh viện Vinmec Central Park','02836221166','$2a$10$Ja0yDbFCBP9/9sP/GA5EDOf6ndaDEnP6WEXijkE3JtxXi.p9NRAVa','bvvcp@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BENHVIEN','2025-11-11 08:52:59',NULL),(32,'Bệnh viện FV','02854113333','$2a$10$lKbxifOJrL2/iwBfWHfFget9s1XD/j/N2F/voh1Hb3Lom3SCjwqyy','bvfv@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BENHVIEN','2025-11-11 08:53:24',NULL),(33,'Shine Clinic By TS.BS Trần Ngọc Ánh','0807223625','$2a$10$NZAL5B56LPQOBzrAYVhmmuytJzFi9c7tP6a1Gj1ANS0uNG/We2wGC','scb@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'PHONGKHAM','2025-11-11 08:57:44',NULL),(34,'Phòng Khám Nội Tổng Quát Sài Gòn','0809223625','$2a$10$Ut8jrPS6tiZkX9RHF/pGb.qnaMOXXEECuJ4QPGeJC1Rc0QfSttDgq','pkntq@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'PHONGKHAM','2025-11-11 08:58:19',NULL),(35,'a','0912345677','$2a$10$qse0xkHSyaCn79wdCuW6oevSTLQsVKHhIULWg6vRYLIiFpKqlMjV.','','2025-11-12','Nữ','','','Kinh','Tỉnh Hà Giang','Huyện Đồng Văn','Xã Phố Cáo','','','','BENHNHAN','2025-11-24 16:02:35',NULL),(37,'a','0912345676','$2a$10$ftQBOy/3Pk0uy9KL.JYHRuyXSs7mn0tDDpMRFYZTm9lvZhMO4nmQ6','','2025-11-05','Nữ','','','Kinh','Tỉnh Cao Bằng','Huyện Bảo Lâm','Xã Mông Ân','','','','BENHNHAN','2025-11-24 16:13:12',NULL),(42,'a','0867223620','$2a$10$uotJWMzwXZ6CzsVIc7PutuQ7LsTClbA94Mfz.HHgo53GdJ4.BXzX2','','2025-11-06','Nữ','','','Kinh','Tỉnh Cao Bằng','Huyện Bảo Lâm','Xã Mông Ân','','','','BENHNHAN','2025-11-25 03:46:29',NULL),(43,'user a','0987654320','$2a$10$BOxtzbiY2Bii8VozMzSheePriu4JE160TjA2qFtYW4IONQDNLYlpy','','2025-11-07','Nữ','','','Kinh','Tỉnh Cao Bằng','Huyện Bảo Lâm','Xã Thái Học','','','','BENHNHAN','2025-11-25 13:21:14',NULL),(44,'user a','0912345670','$2a$10$UzhTwXtQ6YFZikCKAOFRg.NREvtoWIMnP.ZQIJOwWDf4JUQsziEm6','','2025-11-06','Nữ','','','Kinh','Tỉnh Điện Biên','Huyện Mường Nhé','Xã Leng Su Sìn','','','','BENHNHAN','2025-11-25 14:08:58','https://res.cloudinary.com/dlqpohz0j/image/upload/v1764079774/h36oyelhjueru3qpwmm5.jpg'),(45,'user b','0912345669','$2a$10$yHXBW3FaqPidIZ76W2NhQ.j8cIM5tXSCbZldOQ2sM2vtlSFn8d5ta',NULL,'2025-11-07','Nam','','','Kinh','Tỉnh Yên Bái','Thị xã Nghĩa Lộ','Xã Hạnh Sơn','','','','BENHNHAN','2025-11-25 14:12:29','https://res.cloudinary.com/dlqpohz0j/image/upload/v1764079980/klxr4zx5dbwkueh1jp8d.jpg'),(46,'user a','0912345668','$2a$10$wTmPZVSFdDAIaVAcER03f.P29kTyLqaDq8vlEMaqDfE0lwAgf3rNq',NULL,'2025-11-01','Nữ','','','Kinh','Tỉnh Cao Bằng','Huyện Bảo Lạc','Xã Hồng An','','','','BENHNHAN','2025-11-25 14:30:45','https://res.cloudinary.com/dlqpohz0j/image/upload/v1764081071/s3c9kkmyqu9fegw6bvwx.jpg'),(47,'user a','0912345666','$2a$10$NzmBOUOjTYguWGAXUP2iJuRvKaHXpYlnCBUG2xhn7uG1/oD9mdp3m','','2025-11-13','Nữ','','','Kinh','Tỉnh Bắc Kạn','Huyện Pác Nặm','Xã Nhạn Môn','','','','BENHNHAN','2025-11-25 15:19:05',NULL),(48,'user c','0912345665','$2a$10$E.nujdjY3yo7R0ZyY2wxwObr31ESnO.MeEYgOE34.YboJy3Xnypfi',NULL,'2025-11-13','Nam','','','Kinh','Tỉnh Cao Bằng','Huyện Bảo Lạc','Xã Hưng Đạo','','','','BENHNHAN','2025-11-25 15:22:10','https://res.cloudinary.com/dlqpohz0j/image/upload/v1764084161/nl14qpyhmyoef4xtfo82.jpg'),(49,'văn a','0912345600','$2a$10$h0ayWNanAJ6.T/sdu8fQH.KC/1SEjPzQu7gJjyJb/4uQIYhn7MqF6',NULL,'2025-11-20','Nữ','','','Kinh','Tỉnh Yên Bái','Thị xã Nghĩa Lộ','Xã Sơn A','','','','BENHNHAN','2025-11-25 16:02:30','https://res.cloudinary.com/dlqpohz0j/image/upload/v1764086594/wewoxhvwag5afutwaccj.jpg'),(51,'Thanh Hằng','0123455555','$2a$10$UQUyC8mGW854VrVg8eer3O9jrID.VFKG4ZdxuZR7dJQDewHIgEYvu','d@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BENHNHAN','2025-11-25 16:12:59',NULL),(52,'Văn b','0912345500','$2a$10$bK8Dzn5.U067X7uD1nK2Pu/iO.DBHx8XTsmEeylkgAg0R8qb0n1yK',NULL,'2025-11-01','Nam','','','Kinh','Tỉnh Bắc Kạn','Huyện Ngân Sơn','Xã Trung Hoà','','','','BENHNHAN','2025-11-25 16:29:48','https://res.cloudinary.com/dlqpohz0j/image/upload/v1764088222/wbeqmx0vbifbihoqjfxv.jpg'),(54,'văn b','0912345400','$2a$10$UWUozo4tYqvAuT5tyLLZ6e4fNkQcJ/9rs8TzOum.RqBGbGuAv0d5.',NULL,'2025-11-07','Nam','','12345678999','Kinh','Tỉnh Yên Bái','Huyện Mù Căng Chải','Xã Kim Nọi','','','','BENHNHAN','2025-11-26 13:13:44','https://res.cloudinary.com/dlqpohz0j/image/upload/v1764162912/o2lu5hod00kvqbjyrdze.jpg'),(56,'văn a','0912345300','$2a$10$bbAbRUhcQdZd6E5HvI9gq.rr1RJcxv//TO/Ncdp.X9p9gfhSrahgO','','2025-11-07','Nam','','','Kinh','Tỉnh Điện Biên','Huyện Tuần Giáo','Xã Pú Nhung','','Khác','','BENHNHAN','2025-11-27 01:30:17',NULL),(57,'văn ','0912345200','$2a$10$9zo.CXH0vkoh7gSkT73CZuQhDvU5YMiE13xtt0p.Dj.B5MPKu8Fwy',NULL,'2025-11-07','Nam','','','Kinh','Tỉnh Cao Bằng','Huyện Hà Quảng','Xã Lũng Nặm','','','','BENHNHAN','2025-11-27 06:04:48','https://res.cloudinary.com/dlqpohz0j/image/upload/v1764223550/rq1hnuieblz8kxliski9.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-28 16:13:44

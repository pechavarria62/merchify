-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: nextjsproject
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('10bf437b-d8f4-4732-a316-3cab6e8d2758','2d12c573134c2618397cd8c6fb12d58a66a184ad91494136a836b4b179e10f41','2025-06-21 21:19:00.407','20250621211859_init',NULL,NULL,'2025-06-21 21:18:59.839',1),('1e2ec58d-67fd-4cab-9d93-07d644552635','d12e3c59afa6ac8e782859707ddf4683d8559185880020c150123446cce4ca95','2025-06-24 01:15:56.684','20250624011556_init',NULL,NULL,'2025-06-24 01:15:56.603',1),('52e2bc70-fb53-4e49-87c2-2a7cb8514f08','e331d96e11b3b24790bf83a5d5a698d36c60870f586ccf7354846ea0ad69e548','2025-06-24 01:11:19.151','20250624011118_init',NULL,NULL,'2025-06-24 01:11:18.915',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Customer_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('126eed9c-c90c-4ef6-a4a8-fcf7408d3c66','Emil Kowalski','emil@kowalski.com','/customers/emil-kowalski.png'),('13D07535-C59E-4157-A011-F8D2EF4E0CBB','Balazs Orban','balazs@orban.com','/customers/balazs-orban.png'),('3958dc9e-712f-4377-85e9-fec4b6a6442a','Delba de Oliveira','delba@oliveira.com','/customers/delba-de-oliveira.png'),('3958dc9e-737f-4377-85e9-fec4b6a6442a','Hector Simpson','hector@simpson.com','/customers/hector-simpson.png'),('3958dc9e-742f-4377-85e9-fec4b6a6442a','Lee Robinson','lee@robinson.com','/customers/lee-robinson.png'),('3958dc9e-787f-4377-85e9-fec4b6a6442a','Steph Dietz','steph@dietz.com','/customers/steph-dietz.png'),('50ca3e18-62cd-11ee-8c99-0242ac120002</li>','Steven Tey','steven@tey.com','/customers/steven-tey.png'),('76d65c26-f784-44a2-ac19-586678f7c2f2','Michael Novotny','michael@novotny.com','/customers/michael-novotny.png'),('CC27C14A-0ACF-4F4A-A6C9-D45682C144B9','Amy Burns','amy@burns.com','/customers/amy-burns.png'),('d6e15727-9fe1-4961-8c5b-ea44a9bd81aa','Evil Rabbit','evil@rabbit.com','/customers/evil-rabbit.png');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` int NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Invoice_customer_id_fkey` (`customer_id`),
  CONSTRAINT `Invoice_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (1,'3958dc9e-712f-4377-85e9-fec4b6a6442a',15795,'pending','2022-12-06'),(2,'3958dc9e-742f-4377-85e9-fec4b6a6442a',20348,'pending','2022-11-14'),(3,'3958dc9e-787f-4377-85e9-fec4b6a6442a',3040,'paid','2022-10-29'),(4,'50ca3e18-62cd-11ee-8c99-0242ac120002</li>',44800,'paid','2023-09-10'),(5,'76d65c26-f784-44a2-ac19-586678f7c2f2',34577,'pending','2023-08-05'),(6,'126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',54246,'pending','2023-07-16'),(7,'d6e15727-9fe1-4961-8c5b-ea44a9bd81aa',666,'pending','2023-06-27'),(8,'50ca3e18-62cd-11ee-8c99-0242ac120002</li>',32545,'paid','2023-06-09'),(9,'3958dc9e-787f-4377-85e9-fec4b6a6442a',1250,'paid','2023-06-17'),(10,'76d65c26-f784-44a2-ac19-586678f7c2f2',8546,'paid','2023-06-07'),(11,'3958dc9e-742f-4377-85e9-fec4b6a6442a',500,'paid','2023-08-19'),(12,'76d65c26-f784-44a2-ac19-586678f7c2f2',8945,'paid','2023-06-03'),(13,'3958dc9e-737f-4377-85e9-fec4b6a6442a',8945,'paid','2023-06-18'),(14,'3958dc9e-712f-4377-85e9-fec4b6a6442a',8945,'paid','2023-10-04'),(15,'3958dc9e-737f-4377-85e9-fec4b6a6442a',1000,'paid','2022-06-05');
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revenue`
--

DROP TABLE IF EXISTS `revenue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `revenue` (
  `month` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revenue` int NOT NULL,
  PRIMARY KEY (`month`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revenue`
--

LOCK TABLES `revenue` WRITE;
/*!40000 ALTER TABLE `revenue` DISABLE KEYS */;
INSERT INTO `revenue` VALUES ('Apr',2500),('Aug',3700),('Dec',4800),('Feb',1800),('Jan',2000),('Jul',3500),('Jun',3200),('Mar',2200),('May',2300),('Nov',3000),('Oct',2800),('Sep',2500);
/*!40000 ALTER TABLE `revenue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'User','user@nextmail.com','$2b$10$PGT/Qo8A3hCydguTYDRP4.dIHPmfKk4EWhiqdHsDGAUrr3hgAem.2');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-23 20:33:36

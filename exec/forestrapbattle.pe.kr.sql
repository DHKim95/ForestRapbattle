-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: forest_1.0
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `account_emailaddress`
--

DROP TABLE IF EXISTS `account_emailaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_emailaddress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(254) NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `primary` tinyint(1) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `account_emailaddress_user_id_2c513194_fk_user_user_id` (`user_id`),
  CONSTRAINT `account_emailaddress_user_id_2c513194_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_emailaddress`
--

LOCK TABLES `account_emailaddress` WRITE;
/*!40000 ALTER TABLE `account_emailaddress` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_emailaddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_emailconfirmation`
--

DROP TABLE IF EXISTS `account_emailconfirmation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_emailconfirmation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created` datetime(6) NOT NULL,
  `sent` datetime(6) DEFAULT NULL,
  `key` varchar(64) NOT NULL,
  `email_address_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`),
  KEY `account_emailconfirm_email_address_id_5b7f8c58_fk_account_e` (`email_address_id`),
  CONSTRAINT `account_emailconfirm_email_address_id_5b7f8c58_fk_account_e` FOREIGN KEY (`email_address_id`) REFERENCES `account_emailaddress` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_emailconfirmation`
--

LOCK TABLES `account_emailconfirmation` WRITE;
/*!40000 ALTER TABLE `account_emailconfirmation` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_emailconfirmation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add user',1,'add_user'),(2,'Can change user',1,'change_user'),(3,'Can delete user',1,'delete_user'),(4,'Can view user',1,'view_user'),(5,'Can add profile image',2,'add_profileimage'),(6,'Can change profile image',2,'change_profileimage'),(7,'Can delete profile image',2,'delete_profileimage'),(8,'Can view profile image',2,'view_profileimage'),(9,'Can add words',3,'add_words'),(10,'Can change words',3,'change_words'),(11,'Can delete words',3,'delete_words'),(12,'Can view words',3,'view_words'),(13,'Can add rank',4,'add_rank'),(14,'Can change rank',4,'change_rank'),(15,'Can delete rank',4,'delete_rank'),(16,'Can view rank',4,'view_rank'),(17,'Can add match',5,'add_match'),(18,'Can change match',5,'change_match'),(19,'Can delete match',5,'delete_match'),(20,'Can view match',5,'view_match'),(21,'Can add log entry',6,'add_logentry'),(22,'Can change log entry',6,'change_logentry'),(23,'Can delete log entry',6,'delete_logentry'),(24,'Can view log entry',6,'view_logentry'),(25,'Can add permission',7,'add_permission'),(26,'Can change permission',7,'change_permission'),(27,'Can delete permission',7,'delete_permission'),(28,'Can view permission',7,'view_permission'),(29,'Can add group',8,'add_group'),(30,'Can change group',8,'change_group'),(31,'Can delete group',8,'delete_group'),(32,'Can view group',8,'view_group'),(33,'Can add content type',9,'add_contenttype'),(34,'Can change content type',9,'change_contenttype'),(35,'Can delete content type',9,'delete_contenttype'),(36,'Can view content type',9,'view_contenttype'),(37,'Can add session',10,'add_session'),(38,'Can change session',10,'change_session'),(39,'Can delete session',10,'delete_session'),(40,'Can view session',10,'view_session'),(41,'Can add site',11,'add_site'),(42,'Can change site',11,'change_site'),(43,'Can delete site',11,'delete_site'),(44,'Can view site',11,'view_site'),(45,'Can add email address',12,'add_emailaddress'),(46,'Can change email address',12,'change_emailaddress'),(47,'Can delete email address',12,'delete_emailaddress'),(48,'Can view email address',12,'view_emailaddress'),(49,'Can add email confirmation',13,'add_emailconfirmation'),(50,'Can change email confirmation',13,'change_emailconfirmation'),(51,'Can delete email confirmation',13,'delete_emailconfirmation'),(52,'Can view email confirmation',13,'view_emailconfirmation'),(53,'Can add social account',14,'add_socialaccount'),(54,'Can change social account',14,'change_socialaccount'),(55,'Can delete social account',14,'delete_socialaccount'),(56,'Can view social account',14,'view_socialaccount'),(57,'Can add social application',15,'add_socialapp'),(58,'Can change social application',15,'change_socialapp'),(59,'Can delete social application',15,'delete_socialapp'),(60,'Can view social application',15,'view_socialapp'),(61,'Can add social application token',16,'add_socialtoken'),(62,'Can change social application token',16,'change_socialtoken'),(63,'Can delete social application token',16,'delete_socialtoken'),(64,'Can view social application token',16,'view_socialtoken');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_user_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (12,'account','emailaddress'),(13,'account','emailconfirmation'),(1,'accounts','user'),(6,'admin','logentry'),(8,'auth','group'),(7,'auth','permission'),(9,'contenttypes','contenttype'),(5,'game','match'),(2,'game','profileimage'),(4,'game','rank'),(3,'game','words'),(10,'sessions','session'),(11,'sites','site'),(14,'socialaccount','socialaccount'),(15,'socialaccount','socialapp'),(16,'socialaccount','socialtoken');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2022-05-03 01:24:32.420093'),(2,'contenttypes','0002_remove_content_type_name','2022-05-03 01:24:32.515896'),(3,'auth','0001_initial','2022-05-03 01:24:32.790222'),(4,'auth','0002_alter_permission_name_max_length','2022-05-03 01:24:32.850062'),(5,'auth','0003_alter_user_email_max_length','2022-05-03 01:24:32.858071'),(6,'auth','0004_alter_user_username_opts','2022-05-03 01:24:32.866050'),(7,'auth','0005_alter_user_last_login_null','2022-05-03 01:24:32.874029'),(8,'auth','0006_require_contenttypes_0002','2022-05-03 01:24:32.878018'),(9,'auth','0007_alter_validators_add_error_messages','2022-05-03 01:24:32.885997'),(10,'auth','0008_alter_user_username_max_length','2022-05-03 01:24:32.893976'),(11,'auth','0009_alter_user_last_name_max_length','2022-05-03 01:24:32.901954'),(12,'auth','0010_alter_group_name_max_length','2022-05-03 01:24:32.959956'),(13,'auth','0011_update_proxy_permissions','2022-05-03 01:24:32.968932'),(14,'auth','0012_alter_user_first_name_max_length','2022-05-03 01:24:32.975940'),(15,'accounts','0001_initial','2022-05-03 01:24:33.470300'),(16,'account','0001_initial','2022-05-03 01:24:33.802213'),(17,'account','0002_email_max_length','2022-05-03 01:24:33.877520'),(18,'game','0001_initial','2022-05-03 01:24:34.102952'),(19,'accounts','0002_initial','2022-05-03 01:24:34.475694'),(20,'admin','0001_initial','2022-05-03 01:24:34.620059'),(21,'admin','0002_logentry_remove_auto_add','2022-05-03 01:24:34.632027'),(22,'admin','0003_logentry_add_action_flag_choices','2022-05-03 01:24:34.647984'),(23,'sessions','0001_initial','2022-05-03 01:24:34.693107'),(24,'sites','0001_initial','2022-05-03 01:24:34.720004'),(25,'sites','0002_alter_domain_unique','2022-05-03 01:24:34.746932'),(26,'socialaccount','0001_initial','2022-05-03 01:24:35.324053'),(27,'socialaccount','0002_token_max_lengths','2022-05-03 01:24:35.382923'),(28,'socialaccount','0003_extra_data_default_dict','2022-05-03 01:24:35.400917'),(29,'accounts','0003_alter_user_win_point','2022-05-03 04:54:18.129139'),(30,'game','0002_alter_rank_rank','2022-05-11 19:18:16.909940');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('lw2mbdzhnw8cpveh8z0usgibo87epkj6','.eJxVjDsOwjAQBe_iGln-x6ak5wzRenfBAWRLcVIh7o4spYD2zcx7ixn2rcx753VeSJyFFqffLQM-uQ5AD6j3JrHVbV2yHIo8aJfXRvy6HO7fQYFeRs0UknHgbCDwIdMUQFsFhNp5A544BatwitZbzwaJs6VbIpUNRohZfL7xCDiF:1nm3wQ:pjXIBP8FqkkDF21vdHeGKj8_n0xLuPjNjht8JAUDCNg','2022-05-18 01:36:34.019077');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_site`
--

DROP TABLE IF EXISTS `django_site`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_site` (
  `id` int NOT NULL AUTO_INCREMENT,
  `domain` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_site_domain_a2e37b91_uniq` (`domain`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_site`
--

LOCK TABLES `django_site` WRITE;
/*!40000 ALTER TABLE `django_site` DISABLE KEYS */;
INSERT INTO `django_site` VALUES (1,'example.com','example.com');
/*!40000 ALTER TABLE `django_site` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match`
--

DROP TABLE IF EXISTS `match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `match` (
  `match_id` int NOT NULL AUTO_INCREMENT,
  `date` datetime(6) NOT NULL,
  `winner_user_id` bigint NOT NULL,
  `loser_user_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`match_id`),
  KEY `match_user_id_91f8b1d8_fk_user_user_id` (`user_id`),
  CONSTRAINT `match_user_id_91f8b1d8_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match`
--

LOCK TABLES `match` WRITE;
/*!40000 ALTER TABLE `match` DISABLE KEYS */;
INSERT INTO `match` VALUES (4,'2022-05-03 02:36:24.181057',2,3,2),(5,'2022-05-03 02:36:39.954195',3,2,3),(6,'2022-05-03 06:11:09.161952',2,3,3),(7,'2022-05-03 06:11:22.649278',2,3,2);
/*!40000 ALTER TABLE `match` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_image`
--

DROP TABLE IF EXISTS `profile_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile_image` (
  `profile_id` smallint NOT NULL AUTO_INCREMENT,
  `profile_img` longtext NOT NULL,
  PRIMARY KEY (`profile_id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_image`
--

LOCK TABLES `profile_image` WRITE;
/*!40000 ALTER TABLE `profile_image` DISABLE KEYS */;
INSERT INTO `profile_image` VALUES (1,'https://mblogthumb-phinf.pstatic.net/MjAyMTAxMTVfMTc1/MDAxNjEwNzA3OTI5MjE1.h2Wkey1A6JJ3srwPdSibqcCDgkfXCCgvHVmPcoWosXog.h90VLLjXMn_G3MjnGYtWLYmfQoG3-11snzEHWg7u8HEg.JPEG.41minit/1610707720776.jpg?type=w800'),(2,'https://i.ibb.co/WKrjNNX/01-bear.png'),(3,'https://i.ibb.co/WFKn1FK/02-Buffalo.png'),(4,'https://i.ibb.co/Vgmc2jc/03-cat.png'),(5,'https://i.ibb.co/F67HQg6/04-chicken.png'),(6,'https://i.ibb.co/jHSfPSd/05-chik.png'),(7,'https://i.ibb.co/nr3QLNX/06-dog.png'),(8,'https://i.ibb.co/k8ZXgXL/07-duck.png'),(9,'https://i.ibb.co/pKK1d92/08-elephant.png'),(10,'https://i.ibb.co/JC3Ysc5/09-frog.png'),(11,'https://i.ibb.co/VpPGPBq/10-monkey.png'),(12,'https://i.ibb.co/Yk9rtFW/11-pig.png'),(13,'https://i.ibb.co/ccnf4fH/12-rabbit.png'),(14,'https://i.ibb.co/XFTHvqz/13-rhino.png');
/*!40000 ALTER TABLE `profile_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rank`
--

DROP TABLE IF EXISTS `rank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rank` (
  `rank` int NOT NULL,
  `user_id_id` bigint NOT NULL,
  PRIMARY KEY (`rank`),
  KEY `rank_user_id_id_fb61226f_fk_user_user_id` (`user_id_id`),
  CONSTRAINT `rank_user_id_id_fb61226f_fk_user_user_id` FOREIGN KEY (`user_id_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rank`
--

LOCK TABLES `rank` WRITE;
/*!40000 ALTER TABLE `rank` DISABLE KEYS */;
INSERT INTO `rank` VALUES (3,1),(1,2),(2,3);
/*!40000 ALTER TABLE `rank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialaccount`
--

DROP TABLE IF EXISTS `socialaccount_socialaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialaccount` (
  `id` int NOT NULL AUTO_INCREMENT,
  `provider` varchar(30) NOT NULL,
  `uid` varchar(191) NOT NULL,
  `last_login` datetime(6) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `extra_data` longtext NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialaccount_provider_uid_fc810c6e_uniq` (`provider`,`uid`),
  KEY `socialaccount_socialaccount_user_id_8146e70c_fk_user_user_id` (`user_id`),
  CONSTRAINT `socialaccount_socialaccount_user_id_8146e70c_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialaccount`
--

LOCK TABLES `socialaccount_socialaccount` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialaccount` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialapp`
--

DROP TABLE IF EXISTS `socialaccount_socialapp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialapp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `provider` varchar(30) NOT NULL,
  `name` varchar(40) NOT NULL,
  `client_id` varchar(191) NOT NULL,
  `secret` varchar(191) NOT NULL,
  `key` varchar(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialapp`
--

LOCK TABLES `socialaccount_socialapp` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialapp` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialapp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialapp_sites`
--

DROP TABLE IF EXISTS `socialaccount_socialapp_sites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialapp_sites` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `socialapp_id` int NOT NULL,
  `site_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialapp_sites_socialapp_id_site_id_71a9a768_uniq` (`socialapp_id`,`site_id`),
  KEY `socialaccount_socialapp_sites_site_id_2579dee5_fk_django_site_id` (`site_id`),
  CONSTRAINT `socialaccount_social_socialapp_id_97fb6e7d_fk_socialacc` FOREIGN KEY (`socialapp_id`) REFERENCES `socialaccount_socialapp` (`id`),
  CONSTRAINT `socialaccount_socialapp_sites_site_id_2579dee5_fk_django_site_id` FOREIGN KEY (`site_id`) REFERENCES `django_site` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialapp_sites`
--

LOCK TABLES `socialaccount_socialapp_sites` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialapp_sites` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialapp_sites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialtoken`
--

DROP TABLE IF EXISTS `socialaccount_socialtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialtoken` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` longtext NOT NULL,
  `token_secret` longtext NOT NULL,
  `expires_at` datetime(6) DEFAULT NULL,
  `account_id` int NOT NULL,
  `app_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialtoken_app_id_account_id_fca4e0ac_uniq` (`app_id`,`account_id`),
  KEY `socialaccount_social_account_id_951f210e_fk_socialacc` (`account_id`),
  CONSTRAINT `socialaccount_social_account_id_951f210e_fk_socialacc` FOREIGN KEY (`account_id`) REFERENCES `socialaccount_socialaccount` (`id`),
  CONSTRAINT `socialaccount_social_app_id_636a42d7_fk_socialacc` FOREIGN KEY (`app_id`) REFERENCES `socialaccount_socialapp` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialtoken`
--

LOCK TABLES `socialaccount_socialtoken` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `nickname` varchar(8) NOT NULL,
  `game_money` int NOT NULL,
  `total_game_cnt` int NOT NULL,
  `win_cnt` int NOT NULL,
  `lose_cnt` int NOT NULL,
  `win_point` bigint NOT NULL,
  `profile_id` smallint DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `nickname` (`nickname`),
  KEY `user_profile_id_9c2a73e9_fk_profile_image_profile_id` (`profile_id`),
  CONSTRAINT `user_profile_id_9c2a73e9_fk_profile_image_profile_id` FOREIGN KEY (`profile_id`) REFERENCES `profile_image` (`profile_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('pbkdf2_sha256$260000$mBRTeX4Gc9q6WmXlcXNokD$J0cF2bLLjw4L+dKF/YDMH/A3HNTEGbvM5wRDwAdNqy0=','2022-05-04 01:36:34.015088',1,'','',1,1,'2022-05-03 01:25:36.395903',1,'admin@naver.com','admin',0,0,0,0,20,1),('pbkdf2_sha256$260000$Gaye8WBZPgmvQnQV5e7d36$VHaIjIjnqdqxTTW+uvHIxcd/JOfLKf2Eg9jhU+OhX5g=',NULL,0,'','',0,1,'2022-05-03 01:28:08.344382',2,'test01@naver.com','test01',0,2,2,0,36,1),('pbkdf2_sha256$260000$IJmBKHNmFQFrpVZe6jKbP0$HyUlF67bVJpFtIO0bRyUCQYNt74QpFCJEZtA+2ArgDA=',NULL,0,'','',0,1,'2022-05-03 01:28:22.044691',3,'test02@naver.com','test02',0,2,0,2,28,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_followers`
--

DROP TABLE IF EXISTS `user_followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_followers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `from_user_id` bigint NOT NULL,
  `to_user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_followers_from_user_id_to_user_id_18cc1742_uniq` (`from_user_id`,`to_user_id`),
  KEY `user_followers_to_user_id_26f70b38_fk_user_user_id` (`to_user_id`),
  CONSTRAINT `user_followers_from_user_id_9bec8078_fk_user_user_id` FOREIGN KEY (`from_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `user_followers_to_user_id_26f70b38_fk_user_user_id` FOREIGN KEY (`to_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_followers`
--

LOCK TABLES `user_followers` WRITE;
/*!40000 ALTER TABLE `user_followers` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_groups`
--

DROP TABLE IF EXISTS `user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_groups_user_id_group_id_40beef00_uniq` (`user_id`,`group_id`),
  KEY `user_groups_group_id_b76f8aba_fk_auth_group_id` (`group_id`),
  CONSTRAINT `user_groups_group_id_b76f8aba_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `user_groups_user_id_abaea130_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_groups`
--

LOCK TABLES `user_groups` WRITE;
/*!40000 ALTER TABLE `user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_user_permissions`
--

DROP TABLE IF EXISTS `user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_user_permissions_user_id_permission_id_7dc6e2e0_uniq` (`user_id`,`permission_id`),
  KEY `user_user_permission_permission_id_9deb68a3_fk_auth_perm` (`permission_id`),
  CONSTRAINT `user_user_permission_permission_id_9deb68a3_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `user_user_permissions_user_id_ed4a47ea_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_user_permissions`
--

LOCK TABLES `user_user_permissions` WRITE;
/*!40000 ALTER TABLE `user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `words`
--

DROP TABLE IF EXISTS `words`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `words` (
  `word_id` int NOT NULL AUTO_INCREMENT,
  `word_level` smallint NOT NULL,
  `word` longtext NOT NULL,
  PRIMARY KEY (`word_id`)
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `words`
--

LOCK TABLES `words` WRITE;
/*!40000 ALTER TABLE `words` DISABLE KEYS */;
INSERT INTO `words` VALUES (1,1,'가방'),(2,1,'가위'),(3,1,'가지'),(4,1,'고양이'),(5,1,'기린'),(6,1,'나무'),(7,1,'나비'),(8,1,'너구리'),(9,1,'다람쥐'),(10,1,'도토리'),(11,1,'두부'),(12,1,'라면'),(13,1,'라일락'),(14,1,'로봇'),(15,1,'리본'),(16,1,'모자'),(17,1,'바나나'),(18,1,'바이올린'),(19,1,'버섯'),(20,1,'비누'),(21,1,'비둘기'),(22,1,'사과'),(23,1,'사자'),(24,1,'서랍'),(25,1,'시계'),(26,1,'아이스크림'),(27,1,'어항'),(28,1,'자전거'),(29,1,'팬더'),(30,1,'포크'),(31,2,'게살샥스핀'),(32,2,'경찰청 창살'),(33,2,'공간 감각 무감각'),(34,2,'금강산 정상'),(35,2,'깐 콩깍지'),(36,2,'꿀떡 찰떡 콩떡'),(37,2,'난방 방법 변경 방법'),(38,2,'노인성 망막 황반증'),(39,2,'단팥맛 통찐빵'),(40,2,'당뇨병 판정전후'),(41,2,'로얄 뉴로얄'),(42,2,'방송통신심의위원회'),(43,2,'붕당정책 탕평책'),(44,2,'상담 담당 선생님'),(45,2,'서울지방노동청 동부지청'),(46,2,'식품 의약품 안전청'),(47,2,'안양 양장점'),(48,2,'양념 꼼장어'),(49,2,'역전 석점슛'),(50,2,'영동 용봉탕'),(51,2,'영월 칡국수'),(52,2,'유료 샤워장'),(53,2,'참치 꽁치찜'),(54,2,'청송 콩찰떡'),(55,2,'최참판댁'),(56,2,'춘천지방검찰청'),(57,2,'한라산 산삼'),(58,2,'해운항만물류정보센터'),(59,2,'황반변성망막'),(60,2,'훼예포폄'),(61,3,'강변북로 강변북로 강변북로'),(62,3,'개인정보취급방침'),(63,3,'건강검진진료 검진자료'),(64,3,'공동선언실천 북측위원회 위원장'),(65,3,'대관령 대궐 대들보'),(66,3,'도로록 드르륵 두루룩'),(67,3,'돌림판의 룰렛 러시안룰렛'),(68,3,'미트소시지소스스파게티'),(69,3,'반품상품 반품상품 반품상품'),(70,3,'분당 운중동 한국학중앙연구원'),(71,3,'뽕잎쌈생채'),(72,3,'새우 로얄 뉴로얄'),(73,3,'생각이란 생각하면 생각할수록 생각난다'),(74,3,'시골 찹쌀 햇찹쌀'),(75,3,'신분당선 환승역과 신논현역 사이'),(76,3,'안구건조증검사 결과 안구건조증'),(77,3,'양념꽃게장 간장꽃게장'),(78,3,'왕밤빵 왕밤빵 왕밤빵 왕밤빵'),(79,3,'유관 기관과의 관련 문의 협의 완료'),(80,3,'점검 전담반실과 검거 전담반실'),(81,3,'철수 책상 철 책상'),(82,3,'청단풍잎 홍단풍잎'),(83,3,'체다치즈 먹기 최다 우승자 최다은'),(84,3,'크림소시지소스스테이크'),(85,3,'팥 풋 팥죽 팥 풋 팥죽'),(86,3,'페니실린 살균 향균작용'),(87,3,'포도껍질 포도껍질 포도껍질 포도껍질'),(88,3,'홍합 홍합 홍합 홍합'),(89,3,'확률분포표 확률분포표 확률분포표'),(90,3,'희끄무리한 흰머리 희끗희끗'),(91,4,'검찰청 새쇠철창살 헌쇠철창상'),(92,4,'경찰청 검찰청 유리창 중앙 철창살'),(93,4,'경찰청 외철창살 쇠창살 쌍철창살'),(94,4,'고려고 교복은 고급교복'),(95,4,'깐 콩깍지나 안 깐 콩깍지나 다 콩깍지'),(96,4,'내 구름그림은 새털구름 그린 구름그림'),(97,4,'내가 뛸 뜀틀인가 안 뛸 뜀틀인가'),(98,4,'목동 로얄 뉴로얄 레스토랑 뉴메뉴'),(99,4,'박 법학박사랑 백법학박사'),(100,4,'박범복군은 밤벚꽃놀이를 간다'),(101,4,'방범복양은 낮벚꽃놀이를 간다'),(102,4,'삼월 삼십삼일 세시 삼십 삼분'),(103,4,'샥스핀 스시와 삼색참치스시'),(104,4,'서울특별시 특허허가과 허가과장 허과장'),(105,4,'수산물을 수색해내는 운송수송 수색 사원'),(106,4,'스산한 새벽 세시 삼십 삼분 삼십 삼초'),(107,4,'스위스 산새들 속삭이는 산림 숲속'),(108,4,'신인 샹송 가수의 신춘 샹송 쇼'),(109,4,'안 촉촉한 초코칩 나라의 촉촉한 초코칩'),(110,4,'옆집 팥죽 붉은 팥죽 뒷집 콩죽 검은 콩죽'),(111,4,'우리집 깨죽은 검은깨 깨죽'),(112,4,'우리집 옆집 앞집 뒷창살은 흩겹창살'),(113,4,'응엔헨 싱가포르 총리'),(114,4,'작은 토끼 토끼통 옆 큰 토끼 토끼통'),(115,4,'칠월칠일은 평창친구 친정 칠순 잔칫날'),(116,4,'쿵더더덕 덩기더더덕'),(117,4,'탁신 친나왓 전 태국 총리'),(118,4,'한국관광공사 곽진광 관광과장'),(119,4,'한양 양장점 옆 한영 양장점'),(120,4,'햇콩 단콩 콩죽 깨죽 죽먹기'),(121,5,'기체크로마토질량분석법'),(122,5,'뇨소포름알데히드수지'),(123,5,'니코틴아마이드아데닌다이뉴클레오타이드'),(124,5,'다이클로로플루오레세인'),(125,5,'디개미산글리콜에스터'),(126,5,'르샤틀리에브라운법칙'),(127,5,'리액터그레이드지르코늄'),(128,5,'마그네슘옥시클로라이드시멘트'),(129,5,'말레산하이드라자이드'),(130,5,'몰리브데넘산암모늄'),(131,5,'바르비투르산유도체'),(132,5,'박막농축폴라로그라프법'),(133,5,'베타갈락토시다아제'),(134,5,'분취기체크로마토그래피법'),(135,5,'사이클로올레핀계탄화수소'),(136,5,'셀룰로스아세테이트'),(137,5,'스티롤계이온교환수지'),(138,5,'아데노신트리포스파타아제'),(139,5,'아세틸콜린에스테라아제'),(140,5,'에리오크로뮴사이아닌아르'),(141,5,'제조용기체크로마토그래피법'),(142,5,'챠프포프킨과 치스챠코프는 라흐마니노프의 피아노'),(143,5,'카르복시메틸셀룰로오스'),(144,5,'타르타르산안티모닐칼륨'),(145,5,'타르타르산칼륨나트륨'),(146,5,'트라이메틸렌트라이나이트라민'),(147,5,'파라아세트알데하이드'),(148,5,'페놀포름알데히드수지'),(149,5,'하이드록시하이드로퀴논'),(150,5,'황화마그네시아시멘트');
/*!40000 ALTER TABLE `words` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20 12:00:31

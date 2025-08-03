-- MySQL dump 10.13  Distrib 9.0.1, for macos14 (arm64)
--
-- Host: localhost    Database: inventory_management
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `INV_Address`
--

DROP TABLE IF EXISTS `INV_Address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `INV_Address` (
  `addressId` int NOT NULL AUTO_INCREMENT,
  `addressString1` varchar(255) NOT NULL,
  `addressString2` varchar(255) DEFAULT NULL,
  `cityId` int DEFAULT NULL,
  PRIMARY KEY (`addressId`),
  KEY `cityId` (`cityId`),
  CONSTRAINT `inv_address_ibfk_1` FOREIGN KEY (`cityId`) REFERENCES `INV_City` (`cityId`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_bank_details`
--

DROP TABLE IF EXISTS `inv_bank_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inv_bank_details` (
  `bankDetailsId` int NOT NULL AUTO_INCREMENT,
  `bankName` varchar(255) NOT NULL,
  `accountNumber` varchar(50) NOT NULL,
  `ifscCode` varchar(11) NOT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `ownerName` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`bankDetailsId`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `INV_City`
--

DROP TABLE IF EXISTS `INV_City`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `INV_City` (
  `cityId` int NOT NULL AUTO_INCREMENT,
  `cityName` varchar(255) NOT NULL,
  `cityPinCode` varchar(10) NOT NULL,
  `cityDescription` text,
  PRIMARY KEY (`cityId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `INV_Customer`
--

DROP TABLE IF EXISTS `INV_Customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `INV_Customer` (
  `customerId` int NOT NULL AUTO_INCREMENT,
  `customerName` varchar(255) NOT NULL,
  `customerMobile` varchar(15) NOT NULL,
  `customerAddressId` int DEFAULT NULL,
  `gstinNumber` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`customerId`),
  KEY `customerAddressId` (`customerAddressId`),
  CONSTRAINT `inv_customer_ibfk_1` FOREIGN KEY (`customerAddressId`) REFERENCES `INV_Address` (`addressId`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `INV_DISCOUNT`
--

DROP TABLE IF EXISTS `INV_DISCOUNT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `INV_DISCOUNT` (
  `discountId` int NOT NULL AUTO_INCREMENT,
  `discountName` varchar(255) NOT NULL,
  `discountValue` varchar(50) NOT NULL,
  `discountDescription` text,
  PRIMARY KEY (`discountId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_order`
--

DROP TABLE IF EXISTS `inv_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inv_order` (
  `orderId` int NOT NULL AUTO_INCREMENT,
  `customerId` int DEFAULT NULL,
  `hsnCode` varchar(15) DEFAULT NULL,
  `orderPrice` decimal(10,2) NOT NULL,
  `discountId` int DEFAULT NULL,
  `paymentId` int DEFAULT NULL,
  PRIMARY KEY (`orderId`),
  KEY `customerId` (`customerId`),
  KEY `discountId` (`discountId`),
  KEY `paymentId` (`paymentId`),
  CONSTRAINT `inv_order_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `INV_Customer` (`customerId`),
  CONSTRAINT `inv_order_ibfk_2` FOREIGN KEY (`discountId`) REFERENCES `INV_DISCOUNT` (`discountId`),
  CONSTRAINT `inv_order_ibfk_3` FOREIGN KEY (`paymentId`) REFERENCES `INV_Payments` (`paymentId`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_order_product`
--

DROP TABLE IF EXISTS `inv_order_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inv_order_product` (
  `orderProductId` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `productId` bigint NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`orderProductId`),
  KEY `orderId` (`orderId`),
  KEY `productId` (`productId`),
  CONSTRAINT `inv_order_product_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `INV_Order` (`orderId`),
  CONSTRAINT `inv_order_product_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `INV_Product` (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_payment_method`
--

DROP TABLE IF EXISTS `inv_payment_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inv_payment_method` (
  `paymentMethodId` int NOT NULL AUTO_INCREMENT,
  `paymentMethod` varchar(100) NOT NULL,
  `description` text,
  PRIMARY KEY (`paymentMethodId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `INV_Payment_Status`
--

DROP TABLE IF EXISTS `INV_Payment_Status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `INV_Payment_Status` (
  `paymentStatusId` int NOT NULL AUTO_INCREMENT,
  `paymentStatusName` varchar(100) NOT NULL,
  `description` text,
  PRIMARY KEY (`paymentStatusId`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_payments`
--

DROP TABLE IF EXISTS `inv_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inv_payments` (
  `paymentId` int NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,2) NOT NULL,
  `paymentDate` datetime NOT NULL,
  `invoiceId` varchar(50) DEFAULT NULL,
  `paymentMethod` varchar(20) DEFAULT NULL,
  `paymentStatus` varchar(20) DEFAULT NULL,
  `paymentReceivedBy` varchar(255) DEFAULT NULL,
  `transactionId` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`paymentId`),
  KEY `paymentMethodId` (`paymentMethod`),
  KEY `paymentStatusId` (`paymentStatus`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `INV_PRODUCT`
--

DROP TABLE IF EXISTS `INV_PRODUCT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `INV_PRODUCT` (
  `productId` bigint NOT NULL AUTO_INCREMENT,
  `productName` varchar(255) NOT NULL,
  `productDescription` text,
  `pricePerUnit` double NOT NULL,
  `availableQuantity` int NOT NULL,
  PRIMARY KEY (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-03 16:25:18

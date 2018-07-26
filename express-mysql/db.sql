/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 5.6.25-log : Database - express_demo
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`express_demo` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `express_demo`;

/*Table structure for table `school_term` */

DROP TABLE IF EXISTS `school_term`;

CREATE TABLE `school_term` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `school_id` int(11) DEFAULT NULL COMMENT 'school',
  `name` varchar(50) DEFAULT NULL COMMENT '名称',
  `year` int(4) DEFAULT '2018' COMMENT '学年',
  `term` int(2) DEFAULT '1' COMMENT '学期',
  `begin_date` datetime DEFAULT NULL COMMENT '开始时间',
  `end_date` datetime DEFAULT NULL COMMENT '结束时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

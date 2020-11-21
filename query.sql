CREATE DATABASE IF NOT EXISTS `hashpass`
    DEFAULT CHARACTER SET utf8
    DEFAULT COLLATE utf8_general_ci;
USE `hashpass`;

DROP TABLE IF EXISTS `hash`;
CREATE TABLE `hash` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `pass` TEXT NOT NULL,
    `username` CHAR(50) NOT NULL,
    `email` CHAR(100) NOT NULL,
    `link` TEXT DEFAULT NULL,
    `description` TEXT DEFAULT NULL
);
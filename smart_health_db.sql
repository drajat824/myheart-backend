-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 22, 2026 at 10:16 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smart_health_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `heart_issues`
--

CREATE TABLE `heart_issues` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `issue_type` enum('TAKIKARDIA','BRADIKARDIA') NOT NULL,
  `bpm_recorded` int(11) NOT NULL,
  `recorded_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `heart_issues`
--

INSERT INTO `heart_issues` (`id`, `user_id`, `issue_type`, `bpm_recorded`, `recorded_at`) VALUES
(3, 1, 'TAKIKARDIA', 189, '2026-09-22 04:53:44'),
(4, 1, 'TAKIKARDIA', 191, '2026-09-22 04:53:54'),
(5, 1, 'TAKIKARDIA', 189, '2026-09-22 04:54:04'),
(6, 1, 'BRADIKARDIA', 38, '2026-09-22 04:54:10'),
(7, 1, 'BRADIKARDIA', 129, '2026-09-22 04:54:14'),
(8, 1, 'BRADIKARDIA', 36, '2026-09-22 04:54:24'),
(9, 1, 'TAKIKARDIA', 187, '2026-09-22 05:02:06'),
(10, 1, 'TAKIKARDIA', 175, '2026-09-22 05:02:15'),
(11, 1, 'TAKIKARDIA', 184, '2026-09-22 05:02:25'),
(12, 1, 'BRADIKARDIA', 36, '2026-09-22 05:02:26'),
(13, 1, 'BRADIKARDIA', 52, '2026-09-22 05:02:35'),
(14, 1, 'BRADIKARDIA', 10, '2026-09-22 05:02:40'),
(15, 1, 'BRADIKARDIA', 50, '2026-09-22 05:56:10'),
(16, 1, 'TAKIKARDIA', 187, '2026-09-22 05:56:23'),
(17, 1, 'TAKIKARDIA', 159, '2026-09-22 05:56:30'),
(18, 1, 'TAKIKARDIA', 48, '2026-09-22 05:56:34'),
(19, 1, 'TAKIKARDIA', 188, '2026-09-22 05:58:30'),
(20, 1, 'BRADIKARDIA', 17, '2026-09-22 05:59:14'),
(21, 1, 'BRADIKARDIA', 39, '2026-09-22 05:59:20'),
(22, 1, 'BRADIKARDIA', 21, '2026-09-22 05:59:30'),
(23, 1, 'BRADIKARDIA', 22, '2026-09-22 05:59:40'),
(24, 1, 'BRADIKARDIA', 22, '2026-09-22 05:59:50'),
(25, 1, 'BRADIKARDIA', 22, '2026-09-22 06:00:00'),
(26, 1, 'TAKIKARDIA', 169, '2026-09-22 15:39:17'),
(27, 1, 'BRADIKARDIA', 13, '2026-09-22 15:39:24'),
(28, 1, 'BRADIKARDIA', 136, '2026-09-22 15:39:23'),
(29, 1, 'BRADIKARDIA', 11, '2026-09-22 15:39:33'),
(30, 1, 'TAKIKARDIA', 166, '2026-09-22 15:43:20'),
(31, 1, 'TAKIKARDIA', 96, '2026-09-22 15:43:22'),
(32, 1, 'BRADIKARDIA', 22, '2026-09-22 15:43:26'),
(33, 1, 'BRADIKARDIA', 69, '2026-09-22 15:43:32'),
(34, 1, 'TAKIKARDIA', 173, '2026-09-22 15:43:38'),
(35, 1, 'TAKIKARDIA', 118, '2026-09-22 15:43:42'),
(36, 1, 'TAKIKARDIA', 43, '2026-09-22 15:43:46'),
(37, 1, 'TAKIKARDIA', 187, '2026-09-22 15:50:38'),
(38, 1, 'TAKIKARDIA', 182, '2026-09-22 15:50:52'),
(39, 1, 'BRADIKARDIA', 26, '2026-09-22 15:50:57'),
(40, 1, 'BRADIKARDIA', 120, '2026-09-22 15:50:57'),
(41, 1, 'TAKIKARDIA', 177, '2026-09-22 16:05:08'),
(42, 1, 'TAKIKARDIA', 174, '2026-09-22 16:05:18'),
(43, 1, 'TAKIKARDIA', 50, '2026-09-22 16:05:28'),
(44, 1, 'TAKIKARDIA', 173, '2026-09-22 16:05:38'),
(45, 1, 'TAKIKARDIA', 173, '2026-09-22 16:05:45'),
(46, 1, 'TAKIKARDIA', 153, '2026-09-22 16:05:48'),
(47, 1, 'TAKIKARDIA', 174, '2026-09-22 16:05:58'),
(48, 1, 'BRADIKARDIA', 23, '2026-09-22 16:06:03'),
(49, 1, 'TAKIKARDIA', 170, '2026-09-22 16:06:44'),
(50, 1, 'BRADIKARDIA', 20, '2026-09-22 16:06:48'),
(51, 1, 'BRADIKARDIA', 106, '2026-09-22 16:06:48'),
(52, 1, 'TAKIKARDIA', 172, '2026-09-22 16:06:58'),
(53, 1, 'TAKIKARDIA', 33, '2026-09-22 16:06:58'),
(54, 1, 'BRADIKARDIA', 21, '2026-09-22 16:07:02'),
(55, 1, 'TAKIKARDIA', 192, '2026-09-22 20:05:11'),
(56, 1, 'TAKIKARDIA', 170, '2026-09-22 20:05:18'),
(57, 1, 'TAKIKARDIA', 187, '2026-09-22 20:05:29'),
(58, 1, 'TAKIKARDIA', 196, '2026-09-22 20:05:39'),
(59, 1, 'BRADIKARDIA', 38, '2026-09-22 20:06:29'),
(60, 1, 'BRADIKARDIA', 79, '2026-09-22 20:06:30'),
(61, 1, 'TAKIKARDIA', 202, '2026-09-22 20:11:18'),
(62, 1, 'BRADIKARDIA', 51, '2026-09-22 20:11:20'),
(63, 1, 'BRADIKARDIA', 120, '2026-09-22 20:11:20'),
(64, 1, 'TAKIKARDIA', 195, '2026-09-22 20:11:33'),
(65, 1, 'BRADIKARDIA', 48, '2026-09-22 20:11:39'),
(66, 1, 'BRADIKARDIA', 151, '2026-09-22 20:11:40'),
(67, 1, 'TAKIKARDIA', 200, '2026-09-22 20:11:43'),
(68, 1, 'TAKIKARDIA', 186, '2026-09-22 20:52:40'),
(69, 1, 'TAKIKARDIA', 87, '2026-09-22 20:52:40'),
(70, 1, 'TAKIKARDIA', 188, '2026-09-22 20:52:50'),
(71, 1, 'BRADIKARDIA', 39, '2026-09-22 20:52:54'),
(72, 1, 'TAKIKARDIA', 188, '2026-09-22 20:53:09'),
(73, 1, 'TAKIKARDIA', 106, '2026-09-22 20:53:10'),
(74, 1, 'TAKIKARDIA', 186, '2026-09-22 20:53:20'),
(75, 1, 'TAKIKARDIA', 189, '2026-09-22 20:53:30'),
(76, 1, 'TAKIKARDIA', 188, '2026-09-22 20:53:40'),
(77, 1, 'TAKIKARDIA', 187, '2026-09-22 20:53:50'),
(78, 1, 'TAKIKARDIA', 185, '2026-09-22 20:53:59'),
(79, 1, 'TAKIKARDIA', 187, '2026-09-22 20:54:09'),
(80, 1, 'TAKIKARDIA', 192, '2026-09-22 20:54:20'),
(81, 1, 'TAKIKARDIA', 191, '2026-09-22 20:54:30'),
(82, 1, 'TAKIKARDIA', 190, '2026-09-22 20:54:40'),
(83, 1, 'TAKIKARDIA', 189, '2026-09-22 20:54:49'),
(84, 1, 'TAKIKARDIA', 190, '2026-09-22 20:54:59'),
(85, 1, 'TAKIKARDIA', 191, '2026-09-22 20:55:09'),
(86, 1, 'TAKIKARDIA', 191, '2026-09-22 20:55:19'),
(87, 1, 'TAKIKARDIA', 192, '2026-09-22 20:55:30'),
(88, 1, 'TAKIKARDIA', 180, '2026-09-22 21:49:21'),
(89, 1, 'TAKIKARDIA', 141, '2026-09-22 21:49:26'),
(90, 1, 'TAKIKARDIA', 186, '2026-09-22 21:49:46'),
(91, 1, 'TAKIKARDIA', 188, '2026-09-22 21:49:56'),
(92, 1, 'TAKIKARDIA', 192, '2026-09-22 21:50:06'),
(93, 1, 'TAKIKARDIA', 96, '2026-09-22 21:50:17'),
(94, 1, 'TAKIKARDIA', 186, '2026-09-22 21:50:36'),
(95, 1, 'TAKIKARDIA', 187, '2026-09-22 21:50:46'),
(96, 1, 'TAKIKARDIA', 188, '2026-09-22 21:50:56'),
(97, 1, 'TAKIKARDIA', 189, '2026-09-22 21:51:06'),
(98, 1, 'TAKIKARDIA', 188, '2026-09-22 21:51:16'),
(99, 1, 'TAKIKARDIA', 191, '2026-09-22 21:51:26'),
(100, 1, 'TAKIKARDIA', 192, '2026-09-22 21:51:36'),
(101, 1, 'TAKIKARDIA', 186, '2026-09-22 21:51:46'),
(102, 1, 'TAKIKARDIA', 184, '2026-09-22 21:51:56'),
(103, 1, 'TAKIKARDIA', 183, '2026-09-22 21:52:06'),
(104, 1, 'TAKIKARDIA', 186, '2026-09-22 21:52:16'),
(105, 1, 'TAKIKARDIA', 187, '2026-09-22 21:52:26'),
(106, 1, 'TAKIKARDIA', 180, '2026-09-22 21:53:59'),
(107, 1, 'TAKIKARDIA', 129, '2026-09-22 21:54:04'),
(108, 1, 'TAKIKARDIA', 181, '2026-09-22 21:54:14'),
(109, 1, 'TAKIKARDIA', 15, '2026-09-22 21:54:21'),
(110, 1, 'TAKIKARDIA', 185, '2026-09-22 22:25:36'),
(111, 1, 'TAKIKARDIA', 183, '2026-09-22 22:25:46'),
(112, 1, 'TAKIKARDIA', 177, '2026-09-22 22:25:56'),
(113, 1, 'TAKIKARDIA', 183, '2026-09-22 22:26:06'),
(114, 1, 'TAKIKARDIA', 110, '2026-09-22 22:26:06'),
(115, 1, 'TAKIKARDIA', 184, '2026-09-22 22:26:16'),
(116, 1, 'BRADIKARDIA', 32, '2026-09-22 22:26:18'),
(117, 1, 'BRADIKARDIA', 64, '2026-09-22 22:26:26'),
(118, 1, 'BRADIKARDIA', 29, '2026-09-22 22:26:47'),
(119, 1, 'BRADIKARDIA', 33, '2026-09-22 22:26:47'),
(120, 1, 'BRADIKARDIA', 31, '2026-09-22 22:26:59'),
(121, 1, 'BRADIKARDIA', 30, '2026-09-22 22:27:20'),
(122, 1, 'BRADIKARDIA', 29, '2026-09-22 22:27:20'),
(123, 1, 'BRADIKARDIA', 23, '2026-09-22 22:27:27'),
(124, 1, 'BRADIKARDIA', 22, '2026-09-22 22:27:37'),
(125, 1, 'BRADIKARDIA', 27, '2026-09-22 22:27:48'),
(126, 1, 'BRADIKARDIA', 29, '2026-09-22 22:27:57'),
(127, 1, 'BRADIKARDIA', 31, '2026-09-22 22:28:07'),
(128, 1, 'BRADIKARDIA', 35, '2026-09-22 22:28:17'),
(129, 1, 'BRADIKARDIA', 39, '2026-09-22 22:28:27'),
(130, 1, 'BRADIKARDIA', 40, '2026-09-22 22:28:37'),
(131, 1, 'BRADIKARDIA', 35, '2026-09-22 22:28:47'),
(132, 1, 'BRADIKARDIA', 32, '2026-09-22 22:28:57'),
(133, 1, 'BRADIKARDIA', 31, '2026-09-22 22:29:07'),
(134, 1, 'BRADIKARDIA', 33, '2026-09-22 22:29:17'),
(135, 1, 'BRADIKARDIA', 32, '2026-09-22 22:29:26'),
(136, 1, 'BRADIKARDIA', 32, '2026-09-22 22:29:36'),
(137, 1, 'BRADIKARDIA', 38, '2026-09-22 22:29:46'),
(138, 1, 'BRADIKARDIA', 38, '2026-09-22 22:29:56'),
(139, 1, 'BRADIKARDIA', 32, '2026-09-22 22:30:06'),
(140, 1, 'TAKIKARDIA', 185, '2026-09-22 22:52:57'),
(141, 1, 'TAKIKARDIA', 185, '2026-09-22 22:53:07'),
(142, 1, 'TAKIKARDIA', 179, '2026-09-22 22:53:20'),
(143, 1, 'TAKIKARDIA', 182, '2026-09-22 22:53:28'),
(144, 1, 'TAKIKARDIA', 179, '2026-09-22 22:53:42'),
(145, 1, 'TAKIKARDIA', 182, '2026-09-22 22:53:48'),
(146, 1, 'TAKIKARDIA', 182, '2026-09-22 22:53:58'),
(147, 1, 'TAKIKARDIA', 181, '2026-09-22 22:54:09'),
(148, 1, 'TAKIKARDIA', 177, '2026-09-22 22:54:18'),
(149, 1, 'TAKIKARDIA', 174, '2026-09-22 22:54:28'),
(150, 1, 'TAKIKARDIA', 174, '2026-09-22 22:54:38'),
(151, 1, 'TAKIKARDIA', 175, '2026-09-22 22:54:48'),
(152, 1, 'TAKIKARDIA', 185, '2026-09-22 22:54:58'),
(153, 1, 'TAKIKARDIA', 178, '2026-09-22 22:55:08'),
(154, 1, 'TAKIKARDIA', 180, '2026-09-22 22:55:18'),
(155, 1, 'TAKIKARDIA', 188, '2026-09-22 22:55:28'),
(156, 1, 'TAKIKARDIA', 184, '2026-09-22 22:55:38'),
(157, 1, 'TAKIKARDIA', 156, '2026-09-22 22:55:48');

-- --------------------------------------------------------

--
-- Table structure for table `heart_rates`
--

CREATE TABLE `heart_rates` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `bpm` int(11) NOT NULL,
  `start_time` timestamp(6) NULL DEFAULT NULL,
  `end_time` timestamp(6) NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `heart_rates`
--

INSERT INTO `heart_rates` (`id`, `user_id`, `bpm`, `start_time`, `end_time`) VALUES
(791, 1, 87, '2026-09-22 15:38:37.636000', '2026-09-22 15:38:46.598000'),
(792, 1, 85, '2026-09-22 15:38:47.594000', '2026-09-22 15:38:56.554000'),
(793, 1, 83, '2026-09-22 15:38:57.671000', '2026-09-22 15:39:07.520000'),
(794, 1, 83, '2026-09-22 15:39:08.558000', '2026-09-22 15:39:16.615000'),
(795, 1, 77, '2026-09-22 15:39:17.597000', '2026-09-22 15:39:26.559000'),
(796, 1, 73, '2026-09-22 15:39:27.600000', '2026-09-22 15:39:37.539000'),
(797, 1, 70, '2026-09-22 15:39:38.571000', '2026-09-22 15:39:47.536000'),
(798, 1, 69, '2026-09-22 15:39:48.524000', '2026-09-22 15:39:57.564000'),
(799, 1, 69, '2026-09-22 15:39:58.503000', '2026-09-22 15:40:07.509000'),
(800, 1, 73, '2026-09-22 15:40:08.494000', '2026-09-22 15:40:17.497000'),
(801, 1, 71, '2026-09-22 15:40:18.484000', '2026-09-22 15:40:27.444000'),
(802, 1, 67, '2026-09-22 15:40:28.524000', '2026-09-22 15:40:37.472000'),
(803, 1, 66, '2026-09-22 15:40:38.464000', '2026-09-22 15:40:47.482000'),
(804, 1, 69, '2026-09-22 15:40:48.465000', '2026-09-22 15:40:57.454000'),
(805, 1, 77, '2026-09-22 15:40:58.452000', '2026-09-22 15:41:07.533000'),
(806, 1, 85, '2026-09-22 15:41:08.490000', '2026-09-22 15:41:17.474000'),
(807, 1, 77, '2026-09-22 15:41:18.466000', '2026-09-22 15:41:26.485000'),
(808, 1, 0, '2026-09-22 15:41:29.017000', '2026-09-22 15:41:29.017000'),
(809, 1, 81, '2026-09-22 15:44:13.387000', '2026-09-22 15:44:17.343000'),
(810, 1, 0, '2026-09-22 15:44:19.859000', '2026-09-22 15:44:19.859000'),
(811, 1, 41, '2026-09-22 15:44:41.288000', '2026-09-22 15:44:46.862000'),
(812, 1, 185, '2026-09-22 15:52:52.911000', '2026-09-22 15:52:57.946000'),
(813, 1, 185, '2026-09-22 15:52:58.947000', '2026-09-22 15:53:07.228000'),
(814, 1, 179, '2026-09-22 15:53:07.978000', '2026-09-22 15:53:20.729000'),
(815, 1, 182, '2026-09-22 15:53:20.733000', '2026-09-22 15:53:28.909000'),
(816, 1, 179, '2026-09-22 15:53:29.979000', '2026-09-22 15:53:42.413000'),
(817, 1, 182, '2026-09-22 15:53:42.420000', '2026-09-22 15:53:48.938000'),
(818, 1, 182, '2026-09-22 15:53:49.873000', '2026-09-22 15:53:58.883000'),
(819, 1, 181, '2026-09-22 15:53:59.962000', '2026-09-22 15:54:09.055000'),
(820, 1, 177, '2026-09-22 15:54:09.908000', '2026-09-22 15:54:18.862000'),
(821, 1, 174, '2026-09-22 15:54:19.944000', '2026-09-22 15:54:28.854000'),
(822, 1, 174, '2026-09-22 15:54:29.892000', '2026-09-22 15:54:38.889000'),
(823, 1, 175, '2026-09-22 15:54:39.883000', '2026-09-22 15:54:48.978000'),
(824, 1, 185, '2026-09-22 15:54:49.962000', '2026-09-22 15:54:58.961000'),
(825, 1, 178, '2026-09-22 15:54:59.999000', '2026-09-22 15:55:08.903000'),
(826, 1, 180, '2026-09-22 15:55:09.843000', '2026-09-22 15:55:18.849000'),
(827, 1, 188, '2026-09-22 15:55:19.891000', '2026-09-22 15:55:28.838000'),
(828, 1, 184, '2026-09-22 15:55:29.825000', '2026-09-22 15:55:38.923000'),
(829, 1, 156, '2026-09-22 15:55:39.911000', '2026-09-22 15:55:48.364000'),
(830, 1, 0, '2026-09-22 15:55:49.352000', '2026-09-22 15:55:49.495000');

-- --------------------------------------------------------

--
-- Table structure for table `heart_rates_aggregation`
--

CREATE TABLE `heart_rates_aggregation` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `bpm` int(11) NOT NULL,
  `start_time` timestamp(6) NULL DEFAULT NULL,
  `end_time` timestamp(6) NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `medications`
--

CREATE TABLE `medications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `generic_name` varchar(150) NOT NULL,
  `brand_name` varchar(150) DEFAULT NULL,
  `dosage_form` varchar(50) NOT NULL,
  `strength` varchar(50) NOT NULL,
  `route` enum('oral','topical','sublingual','intravenous','intramuscular','subcutaneous','rectal','inhalation') NOT NULL,
  `meal_relation` enum('before_meal','with_meal','after_meal','any_time') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `medication_schedules`
--

CREATE TABLE `medication_schedules` (
  `id` int(11) NOT NULL,
  `medication_id` int(11) NOT NULL,
  `schedule_time` time NOT NULL,
  `schedule_date` date NOT NULL,
  `status` enum('pending','taken','missed') DEFAULT 'pending',
  `takenAt` time DEFAULT NULL,
  `late` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `periodic_checks`
--

CREATE TABLE `periodic_checks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `check_date` date NOT NULL,
  `weight` float NOT NULL COMMENT 'Kilogram',
  `height` float NOT NULL COMMENT 'Centimeter',
  `blood_sugar` float NOT NULL COMMENT 'mg/dL',
  `cholesterol` float NOT NULL COMMENT 'mg/dL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role`, `name`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'Super Admin', 'admin@mail.com', '$2b$10$EP0N1sQo159/n2Zq2vU9wueP9cRj4M5pZ5ZtM7r4u2T3uC9lF7c7y', '2026-08-28 13:40:54', '2026-08-28 13:40:54');

-- --------------------------------------------------------

--
-- Table structure for table `user_3d_models`
--

CREATE TABLE `user_3d_models` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `file_url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `heart_issues`
--
ALTER TABLE `heart_issues`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `heart_rates`
--
ALTER TABLE `heart_rates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `heart_rates_aggregation`
--
ALTER TABLE `heart_rates_aggregation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `medications`
--
ALTER TABLE `medications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `medication_schedules`
--
ALTER TABLE `medication_schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `medication_id` (`medication_id`);

--
-- Indexes for table `periodic_checks`
--
ALTER TABLE `periodic_checks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_3d_models`
--
ALTER TABLE `user_3d_models`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `heart_issues`
--
ALTER TABLE `heart_issues`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT for table `heart_rates`
--
ALTER TABLE `heart_rates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=831;

--
-- AUTO_INCREMENT for table `heart_rates_aggregation`
--
ALTER TABLE `heart_rates_aggregation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `medications`
--
ALTER TABLE `medications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `medication_schedules`
--
ALTER TABLE `medication_schedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `periodic_checks`
--
ALTER TABLE `periodic_checks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_3d_models`
--
ALTER TABLE `user_3d_models`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `heart_issues`
--
ALTER TABLE `heart_issues`
  ADD CONSTRAINT `heart_issues_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `heart_rates`
--
ALTER TABLE `heart_rates`
  ADD CONSTRAINT `heart_rates_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `medications`
--
ALTER TABLE `medications`
  ADD CONSTRAINT `medications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `medication_schedules`
--
ALTER TABLE `medication_schedules`
  ADD CONSTRAINT `medication_schedules_ibfk_1` FOREIGN KEY (`medication_id`) REFERENCES `medications` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `periodic_checks`
--
ALTER TABLE `periodic_checks`
  ADD CONSTRAINT `periodic_checks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_3d_models`
--
ALTER TABLE `user_3d_models`
  ADD CONSTRAINT `user_3d_models_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

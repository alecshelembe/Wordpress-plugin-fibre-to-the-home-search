-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 19, 2024 at 06:04 PM
-- Server version: 5.7.44
-- PHP Version: 8.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `handre_wordpress`
--

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `active` varchar(200) DEFAULT '''yes''',
  `id` int(11) NOT NULL,
  `fibre_network_provider` varchar(200) DEFAULT 'WonderNet',
  `internet_service_provider` varchar(200) DEFAULT NULL,
  `download_speed` int(11) DEFAULT NULL,
  `upload_speed` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT '700',
  `link_to_image` varchar(200) NOT NULL DEFAULT '''https://vignette.wikia.nocookie.net/infotic/images/f/fd/Isp.png/revision/latest?cb=20170827215545&path-prefix=es''',
  `router` varchar(200) DEFAULT '<i class="fa-solid fa-circle-check"></i> <span class=''text-sm''>Free to use</span>',
  `uncapped` varchar(200) DEFAULT '<i class="fa-solid fa-circle-check"></i>',
  `installation` varchar(200) DEFAULT NULL,
  `package_name` varchar(200) DEFAULT NULL,
  `package_date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `link` varchar(200) DEFAULT NULL,
  `contact_person_email` varchar(200) DEFAULT NULL,
  `contact_person_phone` varchar(200) DEFAULT NULL,
  `contact_person_two` varchar(200) DEFAULT NULL,
  `package_created_by_name` varchar(200) DEFAULT NULL,
  `package_created_by_contact` varchar(200) DEFAULT NULL,
  `special` varchar(200) DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`active`, `id`, `fibre_network_provider`, `internet_service_provider`, `download_speed`, `upload_speed`, `price`, `link_to_image`, `router`, `uncapped`, `installation`, `package_name`, `package_date_added`, `link`, `contact_person_email`, `contact_person_phone`, `contact_person_two`, `package_created_by_name`, `package_created_by_contact`, `special`) VALUES
('yes', 416487694, 'Thinkspeed', 'WonderNet', 200, 200, 1000, 'https://vignette.wikia.nocookie.net/infotic/images/f/fd/Isp.png/revision/latest?cb=20170827215545&path-prefix=es', '<i class=\"fa-solid fa-circle-check\"></i> <span class=\"text-sm\">Free to use</span>', '<i class=\"fa-solid fa-circle-check\"></i>', 'Free', 'Test4', '2024-01-06 10:19:43', NULL, NULL, NULL, NULL, NULL, NULL, 'no'),
('yes', 456487694, 'TTConnect', 'WonderNet', 200, 200, 999, 'https://vignette.wikia.nocookie.net/infotic/images/f/fd/Isp.png/revision/latest?cb=20170827215545&path-prefix=es', '<i class=\"fa-solid fa-circle-check\"></i> <span class=\"text-sm\">Free to use</span>', '<i class=\"fa-solid fa-circle-check\"></i>', 'Free', 'Test2', '2024-01-06 10:18:24', NULL, NULL, NULL, NULL, NULL, NULL, 'no'),
('yes', 456780694, 'Century City Connect', 'WonderNet', 200, 200, 700, 'https://vignette.wikia.nocookie.net/infotic/images/f/fd/Isp.png/revision/latest?cb=20170827215545&path-prefix=es', '<i class=\"fa-solid fa-circle-check\"></i> <span class=\"text-sm\">Free to use</span>', '<i class=\"fa-solid fa-circle-check\"></i>', 'R 999.00', 'Test5', '2024-01-06 10:17:43', NULL, NULL, NULL, NULL, NULL, NULL, 'no'),
('yes', 456787653, 'Seacom', 'WonderNet', 1000, 200, 1499, 'https://vignette.wikia.nocookie.net/infotic/images/f/fd/Isp.png/revision/latest?cb=20170827215545&path-prefix=es', '<i class=\"fa-solid fa-circle-check\"></i> <span class=\"text-sm\">Free to use</span>', '<i class=\"fa-solid fa-circle-check\"></i>', 'R 999.00', 'WonderNet', '2024-01-12 14:43:36', 'Fibre To The Business', NULL, NULL, NULL, NULL, NULL, 'no'),
('yes', 456787665, 'Openserve', 'Wondernet', 500, 250, 1349, 'https://vignette.wikia.nocookie.net/infotic/images/f/fd/Isp.png/revision/latest?cb=20170827215545&path-prefix=es', '<i class=\"fa-solid fa-circle-check\"></i> <span class=\"text-sm\">Free to use</span>', '<i class=\"fa-solid fa-circle-check\"></i>', 'Free', 'Wondernet', '2024-01-12 15:12:41', NULL, NULL, NULL, NULL, NULL, NULL, 'no'),
('yes', 456787672, 'Octotel', 'Wondernet', 1000, 200, 1499, 'https://vignette.wikia.nocookie.net/infotic/images/f/fd/Isp.png/revision/latest?cb=20170827215545&path-prefix=es', '<i class=\"fa-solid fa-circle-check\"></i> <span class=\"text-sm\">Free to use</span>', '<i class=\"fa-solid fa-circle-check\"></i>', 'Free', 'Wondernet', '2024-01-12 15:19:36', NULL, NULL, NULL, NULL, NULL, NULL, 'no'),
('yes', 456787680, 'Thinkspeed', 'Wondernet', 1000, 1000, 2499, 'https://vignette.wikia.nocookie.net/infotic/images/f/fd/Isp.png/revision/latest?cb=20170827215545&path-prefix=es', '<i class=\"fa-solid fa-circle-check\"></i> <span class=\"text-sm\">Free to use</span>', '<i class=\"fa-solid fa-circle-check\"></i>', 'R 999.00', 'Wondernet', '2024-01-12 15:23:02', NULL, NULL, NULL, NULL, NULL, NULL, 'no'),
('yes', 456787683, 'TTConnect', 'Wondernet', 50, 50, 899, 'https://vignette.wikia.nocookie.net/infotic/images/f/fd/Isp.png/revision/latest?cb=20170827215545&path-prefix=es', '<i class=\"fa-solid fa-circle-check\"></i> <span class=\"text-sm\">Free to use</span>', '<i class=\"fa-solid fa-circle-check\"></i>', 'Free', 'Wondernet', '2024-01-12 15:27:26', NULL, NULL, NULL, NULL, NULL, NULL, 'no'),
('yes', 456787689, 'Vumatel', 'Wondernet', 1000, 500, 2299, 'https://vignette.wikia.nocookie.net/infotic/images/f/fd/Isp.png/revision/latest?cb=20170827215545&path-prefix=es', '<i class=\"fa-solid fa-circle-check\"></i> <span class=\"text-sm\">Free to use</span>', '<i class=\"fa-solid fa-circle-check\"></i>', 'Free', 'Wondernet', '2024-01-12 15:35:55', NULL, NULL, NULL, NULL, NULL, NULL, 'no'),
('yes', 456787695, 'Metrofibre', 'Wondernet', 75, 75, 749, 'https://vignette.wikia.nocookie.net/infotic/images/f/fd/Isp.png/revision/latest?cb=20170827215545&path-prefix=es', '<i class=\"fa-solid fa-circle-check\"></i> <span class=\"text-sm\">Free to use</span>', '<i class=\"fa-solid fa-circle-check\"></i>', 'Free', 'Wondernet', '2024-01-13 13:22:55', NULL, NULL, NULL, NULL, NULL, NULL, 'no'),
('yes', 456787710, 'Fibre Suburbs', 'Wondernet', 1000, 500, 2499, 'https://vignette.wikia.nocookie.net/infotic/images/f/fd/Isp.png/revision/latest?cb=20170827215545&path-prefix=es', '<i class=\"fa-solid fa-circle-check\"></i> <span class=\"text-sm\">Free to use</span>', '<i class=\"fa-solid fa-circle-check\"></i>', 'R 999.00', 'Wondernet', '2024-01-13 14:31:12', NULL, NULL, NULL, NULL, NULL, NULL, 'no'),
('yes', 456787712, 'Red Networks', 'Wondernet', 20, 20, 659, 'https://vignette.wikia.nocookie.net/infotic/images/f/fd/Isp.png/revision/latest?cb=20170827215545&path-prefix=es', '<i class=\"fa-solid fa-circle-check\"></i> <span class=\"text-sm\">Free to use</span>', '<i class=\"fa-solid fa-circle-check\"></i>', 'R 999.00', 'Wondernet', '2024-01-13 15:24:17', NULL, NULL, NULL, NULL, NULL, NULL, 'no'),
('yes', 456787716, 'Lightwire', 'Wondernet', 100, 100, 899, 'https://vignette.wikia.nocookie.net/infotic/images/f/fd/Isp.png/revision/latest?cb=20170827215545&path-prefix=es', '<i class=\"fa-solid fa-circle-check\"></i> <span class=\"text-sm\">Free to use</span>', '<i class=\"fa-solid fa-circle-check\"></i>', 'R 999.00', 'Wondernet', '2024-01-13 15:28:37', NULL, NULL, NULL, NULL, NULL, NULL, 'no'),
('yes', 456787722, 'DNATel', 'Wondernet', 500, 500, 1199, 'https://vignette.wikia.nocookie.net/infotic/images/f/fd/Isp.png/revision/latest?cb=20170827215545&path-prefix=es', '<i class=\"fa-solid fa-circle-check\"></i> <span class=\"text-sm\">Free to use</span>', '<i class=\"fa-solid fa-circle-check\"></i>', 'R 999.00', 'Wondernet', '2024-01-13 15:31:02', NULL, NULL, NULL, NULL, NULL, NULL, 'no'),
('yes', 456787732, 'Frogfoot', 'WonderNet', 400, 400, 1309, 'https://vignette.wikia.nocookie.net/infotic/images/f/fd/Isp.png/revision/latest?cb=20170827215545&path-prefix=es', '<i class=\"fa-solid fa-circle-check\"></i> <span class=\"text-sm\">Free to use</span>', '<i class=\"fa-solid fa-circle-check\"></i>', 'Free', 'Gigawave', '2024-01-12 14:33:40', NULL, NULL, NULL, NULL, NULL, NULL, 'no');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=456787733;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

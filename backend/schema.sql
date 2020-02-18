-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Servidor: clouddb.cloudsoft.site
-- Tiempo de generación: 17-02-2020 a las 20:07:34
-- Versión del servidor: 5.6.40-log
-- Versión de PHP: 7.0.33-0ubuntu0.16.04.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dev_angular5`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `task`
--

CREATE TABLE `task` (
  `id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `status` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `task`
--

INSERT INTO `task` (`id`, `user_id`, `title`, `description`, `status`, `created_at`, `updated_at`) VALUES
(6, 12, 'Reunión Ese hospital ', 'Hospital Guatica ', 'new', '2019-04-09 17:40:44', '2019-04-09 17:40:44'),
(8, 14, 'manizales', 'flota el ruiz', 'todo', '2019-04-10 11:23:23', '2019-04-10 11:30:38'),
(12, 1, 'numero', '1543', 'todo', '2019-04-14 19:30:06', '2019-04-22 09:45:19'),
(13, 15, 'Cita daniel', 'Czardas', 'finished', '2019-04-16 16:46:32', '2019-04-16 16:46:32'),
(14, 1, 'Casa Combia', 'Espejo de la sala, tarro licuadora cajón de la cocina ', 'finished', '2019-04-22 09:45:06', '2019-04-26 23:30:42'),
(16, 1, 'tienda naturista', 'manimes 19 con 20', 'new', '2019-04-23 10:22:34', '2019-04-23 10:22:34'),
(17, 1, 'Mauricio Vanegas', 'la portada del libro sigue siendo igual pero se le cambia el título en vez de la felicidad pues a sus manos feng Shui, secretos chinos para despertar en cada lugar un ambiente de Confort armonía y prosperidad, para el ser y el alma ', 'finished', '2019-04-23 11:20:43', '2019-05-05 17:18:54'),
(18, 1, 'camilo', 'reunión ', 'todo', '2019-07-03 11:17:15', '2019-08-14 13:45:36'),
(22, 19, 'ghjg', 'gjhg', 'todo', '2019-08-14 18:44:19', '2019-08-14 18:44:19'),
(23, 1, 'reunion con jorge', 'temas de marjeting', 'todo', '2019-10-09 13:15:22', '2019-10-09 13:15:22'),
(24, 1, 'zxsa', 'asas', 'todo', '2019-10-21 18:27:45', '2019-10-21 18:27:45'),
(25, 1, 'reunion santiago bernal', 're encuentro', 'finished', '2019-11-08 17:44:00', '2019-11-08 17:45:35'),
(26, 1, 'lkewjflkwej', 'lkfejlkw', 'todo', '2020-02-01 19:36:21', '2020-02-01 19:36:21'),
(27, 1, 'a', 'a', 'new', '2020-02-08 21:45:00', '2020-02-08 21:45:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `role` varchar(20) DEFAULT NULL,
  `name` varchar(180) DEFAULT NULL,
  `surname` varchar(180) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `role`, `name`, `surname`, `email`, `password`, `created_at`) VALUES
(1, 'User', 'José Daniel', 'Garcés Ospina', 'admin@admin.com', '62886151f3e925a7cad597850938fc2e8c8f3da49029d788db468c2831d33630', '2019-04-09 15:54:28'),
(11, 'User', 'Sebastian Giraldo', 'Giraldo', 'seebasgiraldo@gmail.com', '4dd68e2ab3a30973318ea903e088b3d3480655ef4236109fe47272c1c1582880', '2019-04-09 16:09:01'),
(12, 'User', 'Héctor ', 'Arias', 'Haricar2000@gmail.com', '0d85d6c4d6134b8c201c7ca4928d5d2bc9c6e3d1f7fd7acfc992d922e2eb8ca8', '2019-04-09 17:38:28'),
(13, 'User', 'Emilio ', 'Arias', 'jearias.civil@unilibrepereira.edu.co', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', '2019-04-09 17:57:53'),
(14, 'User', 'diego fernando', 'galvis c', 'galvisdiego@hotmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '2019-04-10 11:21:16'),
(15, 'User', 'Gloria ', 'Serna ', 'Gloritaserna@hotmaul.com', '888df25ae35772424a560c7152a1de794440e0ea5cfee62828333a456a506e05', '2019-04-16 16:44:23'),
(16, 'User', 'Aníbal', 'Quintana ', 'anibal.q.s@hotmail.com', 'c9d9f47c326a5ddd0bc12a8beec91d037d792da52ab84e2dab8803457d93c457', '2019-04-16 16:46:27'),
(17, 'User', 'sebastian', 'Grisales Ortiz', 'sebas.grisales93@hotmail.com', '76ef78698ad4df297e1701c550d1ee71b74c8d9f8e6723dc7a9c0fda9e0b6324', '2019-04-22 23:14:32'),
(18, 'User', 'Pepito', 'Perez', 'webmaster@vascosolutions.com', '02d22aa673003cdb72fafbca0bdc38a1c60d13527ef3346e8ba3f1b6caabc889', '2019-08-08 18:30:30'),
(19, 'User', 'Yeison', 'Hernández', 'yeisonjulian_90@hotmail.com', 'a955e228bba7e99b076da72e4d3ed404b3d5e94e3de565593dea89961955b69a', '2019-08-14 18:42:10'),
(20, 'User', 'Daniel', 'Garces', 'tatanbmx@gmail.com', '62886151f3e925a7cad597850938fc2e8c8f3da49029d788db468c2831d33630', '2020-02-01 19:36:14');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_task_users` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `task`
--
ALTER TABLE `task`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `fk_task_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 02-Dez-2017 às 22:19
-- Versão do servidor: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `composeclub`
--
create database if not exists composeclub;
use composeclub;

-- --------------------------------------------------------

--
-- Estrutura da tabela `comentarios`
--

CREATE TABLE `comentarios` (
  `usuario_id` int(10) UNSIGNED NOT NULL,
  `publicacao_id` int(10) UNSIGNED NOT NULL,
  `comentario` varchar(200) NOT NULL,
  `data_hora` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `comentarios`
--

INSERT INTO `comentarios` (`usuario_id`, `publicacao_id`, `comentario`, `data_hora`) VALUES
(1, 6, 'aaaaaaaa', '2017-12-01 00:22:26'),
(1, 6, 'aaaaaaaa', '2017-12-01 00:22:33'),
(1, 6, 'ORRA', '2017-12-01 00:22:57'),
(1, 6, 'dsd', '2017-12-01 00:25:02'),
(1, 6, 'fdsfdsfsd', '2017-12-01 00:25:14'),
(1, 6, 'PORRA', '2017-12-01 00:25:38'),
(1, 9, 'BELEZA', '2017-12-01 00:32:19'),
(1, 8, 'LEGAL', '2017-12-02 12:25:09');

-- --------------------------------------------------------

--
-- Estrutura da tabela `curtidas`
--

CREATE TABLE `curtidas` (
  `usuario_id` int(10) UNSIGNED NOT NULL,
  `publicacao_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `curtidas`
--

INSERT INTO `curtidas` (`usuario_id`, `publicacao_id`) VALUES
(1, 45),
(1, 46),
(1, 47),
(1, 48),
(1, 53),
(4, 44),
(4, 46),
(4, 47),
(4, 48),
(4, 49),
(4, 50),
(4, 51);

-- --------------------------------------------------------

--
-- Estrutura da tabela `produtos`
--

CREATE TABLE `produtos` (
  `idProdutos` int(11) NOT NULL,
  `NomeProduto` varchar(20) NOT NULL,
  `CategoriaProduto` varchar(20) DEFAULT NULL,
  `CorProduto` varchar(20) DEFAULT NULL,
  `TamanhoProduto` varchar(3) DEFAULT NULL,
  `ImagemProduto` varchar(50) NOT NULL,
  `PrecoProduto` float(7,2) NOT NULL,
  `DisponibilidadeProduto` varchar(20) DEFAULT NULL,
  `QuantidadeProduto` int(5) DEFAULT NULL,
  `DescricaoProduto` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `produtos`
--

INSERT INTO `produtos` (`idProdutos`, `NomeProduto`, `CategoriaProduto`, `CorProduto`, `TamanhoProduto`, `ImagemProduto`, `PrecoProduto`, `DisponibilidadeProduto`, `QuantidadeProduto`, `DescricaoProduto`) VALUES
(13, 'Camisa Palmeiras', 'Vestuario', 'Verde', 'GG', '71461fb1dbe47842ebf9a0ffc1969bf4.jpg', 89.90, 'DisponÃ­vel', 1, 'Sei la mano'),
(14, 'Camisa Palmeiras', 'Vestuario', 'Verde', 'GG', '3e4e988f11bf56a5bfae16ea0be5b0b6.jpg', 89.90, 'DisponÃ­vel', 1, 'Sei la mano'),
(15, 'Camisa Palmeiras', 'Vestuario', 'Verde', 'GG', '7ecf2200c5367db7d4d3c874e81325d6.jpg', 89.90, 'DisponÃ­vel', 1, 'Sei la mano'),
(16, 'Camisa Palmeiras', 'Vestuario', 'Verde', 'GG', '21845af72668e8c143fda23e8b8235e2.jpg', 89.90, 'DisponÃ­vel', 1, 'Sei la mano'),
(17, 'Camisa Palmeiras', 'Vestuario', 'Verde', 'GG', '21845af72668e8c143fda23e8b8235e2.jpg', 89.90, 'DisponÃ­vel', 1, 'Sei la mano'),
(18, 'Camisa Palmeiras', 'Vestuario', 'Verde', 'GG', '9cfdbe97bef67362dc11ba40bf3b8195.jpg', 89.90, 'DisponÃ­vel', 1, 'Sei la mano'),
(19, 'Camisa Palmeiras', 'Vestuario', 'Verde', 'GG', '9cfdbe97bef67362dc11ba40bf3b8195.jpg', 89.90, 'DisponÃ­vel', 1, 'Sei la mano'),
(20, 'Camisa Palmeiras', 'Vestuario', 'Verde', 'GG', 'e95de7388194e9be81c3f5f2386c7308.jpg', 89.90, 'DisponÃ­vel', 1, 'Sei la mano'),
(21, 'Camisa Palmeiras', 'Vestuario', 'Verde', 'GG', '660e837e553af64deaa65f7a3029d496.jpg', 89.90, 'DisponÃ­vel', 1, 'Sei la mano'),
(22, 'Camisa Palmeiras', 'Vestuario', 'Verde', 'GG', '660e837e553af64deaa65f7a3029d496.jpg', 89.90, 'DisponÃ­vel', 1, 'Sei la mano'),
(23, 'Camisa Palmeiras', 'Vestuario', 'Verde', 'GG', '4b3499d372f0e91a6a19f6e238e73e95.jpg', 89.90, 'DisponÃ­vel', 1, 'Sei la mano'),
(24, 'Camisa Palmeiras', 'Vestuario', 'Verde', 'GG', '396846bf07b42285805d5773561f563c.jpg', 89.90, 'DisponÃ­vel', 1, 'Sei la mano'),
(25, 'Camisa Palmeiras', 'Vestuario', 'Verde', 'GG', '8ab9ce316526fff6c50ea7eb4c2d0144.jpg', 89.90, 'DisponÃ­vel', 1, 'Sei la mano'),
(26, 'Camisa Palmeiras', 'Vestuario', 'Verde', 'GG', '8ab9ce316526fff6c50ea7eb4c2d0144.jpg', 89.90, 'DisponÃ­vel', 1, 'Sei la mano'),
(27, 'Camisa Palmeiras', 'Vestuario', 'Verde', 'GG', '3b8dc05f882d5dfe6e389690d757c9fe.jpg', 89.90, 'DisponÃ­vel', 1, 'Sei la mano'),
(28, 'Camisa Palmeiras', 'Vestuario', 'Verde', 'GG', '3b8dc05f882d5dfe6e389690d757c9fe.jpg', 89.90, 'DisponÃ­vel', 1, 'Sei la mano'),
(29, 'Camisa Palmeiras', 'Vestuario', 'Verde', 'GG', '91433f705011359967530880993459dc.jpg', 89.90, 'DisponÃ­vel', 1, 'Sei la mano'),
(30, 'Camisa Palmeiras', 'Vestuario', 'Verde', 'GG', '91433f705011359967530880993459dc.jpg', 89.90, 'DisponÃ­vel', 1, 'Sei la mano'),
(31, 'Camisa Palmeiras', 'Vestuario', 'Verde', 'GG', '91433f705011359967530880993459dc.jpg', 89.90, 'DisponÃ­vel', 1, 'Sei la mano'),
(32, 'Camisa Palmeiras', 'Vestuario', 'Verde', 'GG', 'be66f709aeadc54a257384a73e15743e.jpg', 89.90, 'DisponÃ­vel', 1, 'Sei la mano'),
(33, 'Camisa Palmeiras', 'Vestuario', 'Verde', 'GG', 'be66f709aeadc54a257384a73e15743e.jpg', 89.90, 'DisponÃ­vel', 1, 'Sei la mano'),
(34, 'Camisa Palmeiras', 'Vestuario', 'Verde', 'GG', 'c8bc70d780389fc11ff98729d721dab3.jpg', 89.90, 'DisponÃ­vel', 1, 'Sei la mano'),
(35, 'Camisa Palmeiras', 'Vestuario', 'Verde', 'GG', 'c8bc70d780389fc11ff98729d721dab3.jpg', 89.90, 'DisponÃ­vel', 1, 'Sei la mano'),
(36, 'TESTANDO TESTANDO TE', 'Vestuario', 'Verde', 'M', 'ec30f4ab45675040f9e2a816d839a960.jpg', 89.00, 'DisponÃ­vel', 1, 'fdsfdsfdsfsd'),
(37, 'TESTANDO TESTANDO TE', 'Vestuario', 'Verde', 'GG', '453f26ae3d9b621bc2d2976015c42292.jpg', 49.00, 'DisponÃ­vel', 1, 'fff'),
(38, 'ALGO QUALQUER', 'Calcados', 'Vermelho', 'G', 'f3acb5b2226ae4d6c37066eb83f7041d.png', 49.90, 'DisponÃ­vel', 1, 'FFFF');

-- --------------------------------------------------------

--
-- Estrutura da tabela `publicacao`
--

CREATE TABLE `publicacao` (
  `id` int(10) UNSIGNED NOT NULL,
  `usuario_id` int(10) DEFAULT NULL,
  `data_hora` datetime NOT NULL,
  `titulo` varchar(50) DEFAULT NULL,
  `categoria` varchar(45) DEFAULT NULL,
  `texto` varchar(1500) DEFAULT NULL,
  `participacao` varchar(45) DEFAULT NULL,
  `produzido` varchar(45) DEFAULT NULL,
  `escrito` varchar(45) DEFAULT NULL,
  `soundcloud` varchar(200) DEFAULT NULL,
  `youtube` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `publicacao`
--

INSERT INTO `publicacao` (`id`, `usuario_id`, `data_hora`, `titulo`, `categoria`, `texto`, `participacao`, `produzido`, `escrito`, `soundcloud`, `youtube`) VALUES
(1, 6, '2017-11-30 03:51:53', 'Te Amo DesgraÃ§a', 'rap', '<p style=\"text-align: center;\" data-mce-style=\"text-align: center;\"><span style=\"color: #333333; font-family: \'YouTube Noto\', Roboto, arial, sans-serif; font-size: 13px; text-align: start;\" data-mce-style=\"color: #333333; font-family: \'YouTube Noto\', Roboto, arial, sans-serif; font-size: 13px; text-align: start;\">Bebendo vinho</span><br style=\"color: #333333; font-family: \'YouTube Noto\', Roboto, arial, sans-serif; font-size: 13px; text-align: start;\" data-mce-style=\"color: #333333; font-family: ', '', '', '', 'oloco', 'https://www.youtube.com/watch?v=qeO5EBBCPm0'),
(6, 1, '2017-12-02 19:18:33', 'AAAAAAAAAAAAAAA', 'setanejo', '<p>PQP</p>\r\n<p style=\"text-align: center;\">MANO</p>\r\n<p style=\"text-align: center;\">MEU</p>\r\n<p style=\"text-align: center;\">DEUS</p>\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n<p>\" &gt;</p>', 'AAAAAA', 'SSSSSS', 'DDDDDDD', 'facebook.com', 'youtube.com'),
(7, 4, '2017-12-02 10:52:38', 'qaaaaaaaaa', 'r&b', '<p>aaaaaaaa</p>\n<p>a</p>\n<p>a</p>\n<p>a</p>\n<p>a</p>\n<p>&nbsp;</p>\n<p>a</p>', 'a', '', '', 'BE', ''),
(8, 1, '2017-11-30 15:06:07', 'aaaaaa', 'r&b', '<p style=\"text-align: center;\">a</p>\n<p style=\"text-align: center;\">a</p>\n<p style=\"text-align: center;\">a</p>\n<p style=\"text-align: center;\">a</p>\n<p style=\"text-align: center;\">a</p>\n<p style=\"text-align: center;\">a</p>\n<p style=\"text-align: center;\">a</p>\n<p style=\"text-align: center;\">&nbsp;</p>\n<p style=\"text-align: center;\">a</p>\n<p style=\"text-align: center;\">&nbsp;</p>', 'aaaaaa', 'a', '', '', ''),
(9, 2, '2017-11-30 15:56:45', 'dasdasdasd', 'pop', '<p style=\"text-align: center;\">dasdasdasdasdasdasd</p>', 'dasdasd', 'dasdasd', 'dadasd', '', ''),
(10, 1, '2017-12-01 01:02:05', 'TESTE', 'rap', '<p style=\"text-align: center;\">PUTZ</p>\n<p style=\"text-align: center;\">QUE</p>\n<p style=\"text-align: center;\">PARIU&nbsp;</p>\n<p style=\"text-align: center;\">MEU</p>', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `seguidores`
--

CREATE TABLE `seguidores` (
  `usuario_id` int(10) UNSIGNED NOT NULL,
  `seguidor` int(10) UNSIGNED NOT NULL,
  `data_hora` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(10) UNSIGNED NOT NULL,
  `nome_completo` varchar(200) DEFAULT NULL,
  `nomedeusuario` varchar(100) DEFAULT NULL,
  `telefone` int(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `senha` varchar(200) DEFAULT NULL,
  `fotoperfil` varchar(200) DEFAULT NULL,
  `fotocapa` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome_completo`, `nomedeusuario`, `telefone`, `email`, `senha`, `fotoperfil`, `fotocapa`) VALUES
(1, 'Lucas Martins', 'JackMartins', 38876982, 'lucas_martinsxd@hotmail.com', '25f9e794323b453885f5181f1b624d0b', 'img_usuario/17022534_1391889450871790_4792637070089157213_n.jpg', 'img_usuario/51b075b1dc51e95610.jpg'),
(2, 'Wladimir', 'wladimir123', 38876982, 'wladimir', 'e10adc3949ba59abbe56e057f20f883e', 'img_usuario/1794709_518705651582732_647202122_n.jpg', 'img_usuario/10569106_819355184786783_3742258214084120285_n.jpg'),
(3, 'larissa martins', 'larimartins', 2147483647, 'larissa09_@hotmail.com', 'lari123', NULL, NULL),
(4, 'Weverson de Lara', 'weverson123', 38876984, '38876982', 'e10adc3949ba59abbe56e057f20f883e', 'img_usuario/1238991_730043273689192_885917305_n.jpg', 'img_usuario/16998846_394680227555913_8226343602253697030_n.jpg'),
(5, '', 'lmdfreitas', NULL, '', '', NULL, NULL),
(6, 'giovana enge ', 'giovanaenge', 38876981, '123545454', '827ccb0eea8a706c4c34a16891f84e7b', 'img_usuario/1175361_209664862536315_1646980944_n.jpg', 'img_usuario/1240415_650757708291818_1903414091_n.jpg'),
(7, 'giovana enge ', 'giovanaenge', NULL, '123545454', '12345', NULL, NULL),
(8, 'Weverson de Lara', 'weverson2017', 2147483647, 'sadghsdshagdagsd@gmail.com', '123456789', NULL, NULL),
(9, 'Rafael da Silva Pereira', 'bifaoxd', 38876983, 'rafael@gmail.com', '123', 'img_usuario/b_is_for_buzz_by_glumpy.jpg', 'img_usuario/Club-88-Groove-Urbano-Capa-facebook-26-08-15-patrocinado-2.jpg'),
(10, 'Allan Victor', 'allan', 123887698, 'allan@gmail.com', '74b87337454200d4d33f80c4663dc5e5', 'img_usuario/1505587_423251477804623_1623190566_n.jpg', 'img_usuario/1920x1080.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comentarios`
--
ALTER TABLE `comentarios`
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `publicacao_id` (`publicacao_id`);

--
-- Indexes for table `curtidas`
--
ALTER TABLE `curtidas`
  ADD PRIMARY KEY (`usuario_id`,`publicacao_id`),
  ADD KEY `publicacao_id` (`publicacao_id`);

--
-- Indexes for table `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`idProdutos`);

--
-- Indexes for table `publicacao`
--
ALTER TABLE `publicacao`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seguidores`
--
ALTER TABLE `seguidores`
  ADD PRIMARY KEY (`usuario_id`,`seguidor`),
  ADD KEY `seguidor` (`seguidor`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `produtos`
--
ALTER TABLE `produtos`
  MODIFY `idProdutos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT for table `publicacao`
--
ALTER TABLE `publicacao`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`publicacao_id`) REFERENCES `publicacao` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

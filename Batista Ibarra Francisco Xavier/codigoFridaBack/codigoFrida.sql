-- MySQL dump 10.13  Distrib 5.7.24, for Linux (x86_64)
--
-- Host: localhost    Database: codigoFrida
-- ------------------------------------------------------
-- Server version	5.7.24-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contenido_comentarios`
--

DROP TABLE IF EXISTS `contenido_comentarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contenido_comentarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `idContenido` int(11) NOT NULL,
  `comentario` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `contenido_comentarios_usuarios_id_fk` (`idUsuario`),
  KEY `contenido_comentarios_modulo_contenidos_id_fk` (`idContenido`),
  CONSTRAINT `contenido_comentarios_modulo_contenidos_id_fk` FOREIGN KEY (`idContenido`) REFERENCES `modulo_contenidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contenido_comentarios_usuarios_id_fk` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenido_comentarios`
--

LOCK TABLES `contenido_comentarios` WRITE;
/*!40000 ALTER TABLE `contenido_comentarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `contenido_comentarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contenidoadicional`
--

DROP TABLE IF EXISTS `contenidoadicional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contenidoadicional` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(300) NOT NULL,
  `nombreContenido` varchar(60) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenidoadicional`
--

LOCK TABLES `contenidoadicional` WRITE;
/*!40000 ALTER TABLE `contenidoadicional` DISABLE KEYS */;
/*!40000 ALTER TABLE `contenidoadicional` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ejercicios`
--

DROP TABLE IF EXISTS `ejercicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ejercicios` (
  `idEquipo` int(11) NOT NULL,
  `idContenidoModulo` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `nombreArchivo` varchar(255) NOT NULL,
  `archivoSubido` varchar(255) NOT NULL,
  `calificacion` int(3) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idEquipo`,`idContenidoModulo`),
  KEY `ejercicios_modulo_contenidos_id_fk` (`idContenidoModulo`),
  KEY `ejercicios_usuarios_id_fk` (`idUsuario`),
  CONSTRAINT `ejercicios_equipos_id_fk` FOREIGN KEY (`idEquipo`) REFERENCES `equipos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ejercicios_modulo_contenidos_id_fk` FOREIGN KEY (`idContenidoModulo`) REFERENCES `modulo_contenidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ejercicios_usuarios_id_fk` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ejercicios`
--

LOCK TABLES `ejercicios` WRITE;
/*!40000 ALTER TABLE `ejercicios` DISABLE KEYS */;
/*!40000 ALTER TABLE `ejercicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipos`
--

DROP TABLE IF EXISTS `equipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipos` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Esta es la clave',
  `nombre` varchar(30) NOT NULL,
  `codigo` varchar(6) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipos`
--

LOCK TABLES `equipos` WRITE;
/*!40000 ALTER TABLE `equipos` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipos_insignia`
--

DROP TABLE IF EXISTS `equipos_insignia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipos_insignia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idEquipo` int(11) NOT NULL,
  `idInsignia` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `equipos_insignia_equipos_id_fk` (`idEquipo`),
  KEY `equipos_insignia_insignia_id_fk` (`idInsignia`),
  CONSTRAINT `equipos_insignia_equipos_id_fk` FOREIGN KEY (`idEquipo`) REFERENCES `equipos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `equipos_insignia_insignia_id_fk` FOREIGN KEY (`idInsignia`) REFERENCES `insignia` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipos_insignia`
--

LOCK TABLES `equipos_insignia` WRITE;
/*!40000 ALTER TABLE `equipos_insignia` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipos_insignia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `insignia`
--

DROP TABLE IF EXISTS `insignia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `insignia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idModulo` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `descripcion` varchar(150) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `insignia_modulos_id_fk` (`idModulo`),
  CONSTRAINT `insignia_modulos_id_fk` FOREIGN KEY (`idModulo`) REFERENCES `modulos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insignia`
--

LOCK TABLES `insignia` WRITE;
/*!40000 ALTER TABLE `insignia` DISABLE KEYS */;
INSERT INTO `insignia` VALUES (15,1,'Guiño de Frida','Han logrado terminar el Módulo 1, ¡enhorabuena!','2018-12-03 15:08:42','2018-12-03 15:08:42'),(16,2,'Corona de flores','¡Felicidades! Completaron el Módulo 2 con éxito.','2018-12-03 15:08:42','2018-12-03 15:08:42'),(17,3,'Xolotl','Terminaron el Módulo 3, ¡sigan así!','2018-12-03 15:08:42','2018-12-03 15:08:42'),(18,4,'Alas de colores','Lograron terminar el Módulo 4, ¡felicidades!','2018-12-03 15:08:42','2018-12-03 15:08:42'),(19,5,'Maíz dorado','El Módulo 5 fue un gran reto, ¡enhorabuena!','2018-12-03 15:08:42','2018-12-03 15:08:42'),(20,5,'Calaverita','Felicidades por completar el Módulo 6, qué niñas tan inteligentes.','2018-12-03 15:08:42','2018-12-03 15:08:42'),(21,5,'Alebrije','¡Qué emoción! Realizaron el Módulo 7 con éxito. El final se acerca...','2018-12-03 15:08:42','2018-12-03 15:08:42'),(22,5,'Nopalli','Módulo 8 terminado, y con ello tu participación en Código Frida. ¡Felicidades y gracias por tanta pasión!','2018-12-03 15:08:42','2018-12-03 15:08:42');
/*!40000 ALTER TABLE `insignia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materiales`
--

DROP TABLE IF EXISTS `materiales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `materiales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idContenido` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `archivo` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `materiales_contenidoadicional_id_fk` (`idContenido`),
  CONSTRAINT `materiales_id_fk` FOREIGN KEY (`idContenido`) REFERENCES `modulo_contenidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materiales`
--

LOCK TABLES `materiales` WRITE;
/*!40000 ALTER TABLE `materiales` DISABLE KEYS */;
/*!40000 ALTER TABLE `materiales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materiales_contenidoadicional`
--

DROP TABLE IF EXISTS `materiales_contenidoadicional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `materiales_contenidoadicional` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idContenidoAdicional` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `archivo` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `materiales_contenidoAdicional_contenidoadicional_id_fk` (`idContenidoAdicional`),
  CONSTRAINT `materiales_contenidoAdicional_contenidoadicional_id_fk` FOREIGN KEY (`idContenidoAdicional`) REFERENCES `contenidoadicional` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materiales_contenidoadicional`
--

LOCK TABLES `materiales_contenidoadicional` WRITE;
/*!40000 ALTER TABLE `materiales_contenidoadicional` DISABLE KEYS */;
/*!40000 ALTER TABLE `materiales_contenidoadicional` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modulo_contenidos`
--

DROP TABLE IF EXISTS `modulo_contenidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modulo_contenidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idModulo` int(11) NOT NULL,
  `numero` int(2) NOT NULL,
  `descripcion` text NOT NULL,
  `ejercicio` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `modulo_contenidos_modulos_id_fk` (`idModulo`),
  CONSTRAINT `modulo_contenidos_modulos_id_fk` FOREIGN KEY (`idModulo`) REFERENCES `modulos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modulo_contenidos`
--

LOCK TABLES `modulo_contenidos` WRITE;
/*!40000 ALTER TABLE `modulo_contenidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `modulo_contenidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modulos`
--

DROP TABLE IF EXISTS `modulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modulos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `fechaLimite` date NOT NULL,
  `descripcion` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modulos`
--

LOCK TABLES `modulos` WRITE;
/*!40000 ALTER TABLE `modulos` DISABLE KEYS */;
INSERT INTO `modulos` VALUES (1,1,'Mejorando al mundo un objetivo a la vez','2018-11-20','En este módulo identificarás un problema social a partir de la reflexión de tu contexto inmediato. Para ello conocerás los Objetivos de Desarrollo Sostenible (ODS), impulsados por la Organización de las Naciones Unidas (ONU) y la importancia de generar estrategias de solución rumbo a la Agenda 2030. Al finalizar, redactarás el problema y destacarás por qué es vital abordarlo.','2018-11-17 10:53:55','2018-11-20 19:08:22'),(2,2,'De la idea al prototipo','2018-11-21','En este módulo aprenderás sobre la paleta de colores, combinación y contraste. Además revisarás recursos abiertos para descargar imágenes y elementos que contribuyan con el desarrollo de tu proyecto. Finalmente elaborarás en Proto.io el primer mockup de tu app, el cual te permitirá valorar si estás yendo por el rumbo adecuado.','2018-11-20 19:08:23','2018-12-02 14:13:26'),(3,3,'Introducción a App Inventor','2018-11-22','Esta semana identificarás los principales componentes de App Inventor, una herramienta de programación a partir de bloques en la cual desarrollarás gran parte de tu aplicación móvil. Para ello elaborarás las dos primeras pantallas de tu prototipo, ¿estás lista?','2018-11-20 19:08:23','2018-12-02 14:10:06'),(4,4,'Bloques y variables, App Inventor parte II','2018-11-23','Para continuar materializando tu app, esta semana daremos un vistazo más profundo a App Inventor. Avanzarás en la programación del resto de tu proyecto, guiándote con el mockup que elaboraste en el módulo II. Realizarás algunos ejercicios y además contarás con el apoyo de mentoría para aclarar cualquier duda.','2018-11-20 19:08:23','2018-12-02 14:23:49'),(5,5,'¿Comprarías mi app?','2018-11-24','Ha llegado el momento de identificar el mercado potencial de tu app, así que con ayuda de la herramienta de Forms, diseñaremos una breve encuesta para que identifiques quiénes serían los usuarios principales de tu producto, cuánto están dispuestos a pagar por ella o si la opción de descarga gratuita y venta de publicidad es la adecuada.','2018-11-20 19:08:23','2018-12-02 14:29:22');
/*!40000 ALTER TABLE `modulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificaciones`
--

DROP TABLE IF EXISTS `notificaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notificaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `contenido` varchar(300) NOT NULL,
  `objetivo` varchar(200) NOT NULL,
  `icono` varchar(30) NOT NULL,
  `estadoVisto` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `notificaciones_usuarios_id_fk` (`idUsuario`),
  CONSTRAINT `notificaciones_usuarios_id_fk` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificaciones`
--

LOCK TABLES `notificaciones` WRITE;
/*!40000 ALTER TABLE `notificaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(10) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Frida','2018-11-14 11:06:36','2018-11-14 11:06:36'),(2,'Mentor','2018-11-15 10:20:33','2018-11-15 10:20:33'),(3,'Líder F','2018-11-15 10:20:43','2018-11-15 10:20:43');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sesiones`
--

DROP TABLE IF EXISTS `sesiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sesiones` (
  `token` varchar(36) NOT NULL,
  `usuarioId` int(11) NOT NULL,
  PRIMARY KEY (`token`),
  KEY `sesiones_usuarios_id_fk` (`usuarioId`),
  CONSTRAINT `sesiones_usuarios_id_fk` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sesiones`
--

LOCK TABLES `sesiones` WRITE;
/*!40000 ALTER TABLE `sesiones` DISABLE KEYS */;
/*!40000 ALTER TABLE `sesiones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tiposarchivos`
--

DROP TABLE IF EXISTS `tiposarchivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tiposarchivos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `extension` varchar(10) NOT NULL,
  `icono` varchar(30) NOT NULL,
  `pesoLimite` int(10) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiposarchivos`
--

LOCK TABLES `tiposarchivos` WRITE;
/*!40000 ALTER TABLE `tiposarchivos` DISABLE KEYS */;
INSERT INTO `tiposarchivos` VALUES (3,'PDF','.pdf','0',52428800,'2018-12-02 08:06:05','2018-12-02 08:06:05'),(4,'Archivo de Microsoft Word (2003)','.doc','0',10485760,'2018-12-02 08:09:08','2018-12-02 08:09:08'),(5,'Archivo de Microsoft Word','.docx','0',10485760,'2018-12-02 08:09:08','2018-12-02 08:09:08'),(6,'Archivo de Microsoft Excel (2003)','.xls','0',10485760,'2018-12-02 08:09:08','2018-12-02 08:09:08'),(7,'Archivo de Microsoft Excel','.xlsx','0',10485760,'2018-12-02 08:09:08','2018-12-02 08:09:08'),(8,'Archivo de Microsoft PowerPoint (2003)','.ppt','0',52428800,'2018-12-02 08:09:08','2018-12-02 08:09:08'),(9,'Archivo de Microsoft PowerPoint','.pptx','0',52428800,'2018-12-02 08:09:08','2018-12-02 08:09:08');
/*!40000 ALTER TABLE `tiposarchivos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `apPaterno` varchar(25) NOT NULL,
  `apMaterno` varchar(25) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `correo` varchar(35) NOT NULL,
  `escuela` varchar(50) DEFAULT NULL,
  `disciplina` varchar(50) DEFAULT NULL,
  `contrasena` varchar(64) NOT NULL,
  `sal` varchar(32) NOT NULL,
  `fotografia` varchar(36) DEFAULT NULL,
  `idRol` varchar(10) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (8,'Israel','Chavarín','Castillo','1987-11-06','3127654321','chavarin@ucol.mx','Universidad de Colima','Ingenierías','d6d3f8001d856cecfd7288eefe6c7fa4889763f2bc8d15871b8b946421e0a306','789','0','3','2018-11-17 12:32:58','2018-12-03 15:41:09');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_equipos`
--

DROP TABLE IF EXISTS `usuarios_equipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios_equipos` (
  `idUsuario` int(11) NOT NULL,
  `idEquipo` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idUsuario`,`idEquipo`),
  KEY `usuarios_equipos_equipos_id_fk` (`idEquipo`),
  CONSTRAINT `usuarios_equipos_equipos_id_fk` FOREIGN KEY (`idEquipo`) REFERENCES `equipos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usuarios_equipos_usuarios_id_fk` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Relacion entre Usuarios y Equipos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_equipos`
--

LOCK TABLES `usuarios_equipos` WRITE;
/*!40000 ALTER TABLE `usuarios_equipos` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios_equipos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-03 22:47:31

-- ============================================================================
-- ESQUEMA COMPLETO Y RESILIENTE DE BASE DE DATOS MYSQL — HOSPITAL DR. ORLANDO ALASSIA
-- Sistema Digital de Mensajería, Recetas e Interconsultas
-- ============================================================================
-- Servidor 1 (READ-ONLY / Central): 10.12.4.1 (Base: diagnose)
-- Servidor 2 (READ-WRITE / Portal):  10.12.4.2 (Base: alassia_mensajeria)
-- ============================================================================

-- Desactivar verificación de claves foráneas durante el DDL para evitar Error 1217 y 150
SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

-- ----------------------------------------------------------------------------
-- 1. BASE DE DATOS CENTRAL: diagnose (10.12.4.1)
-- Padrón Centralizado de Pacientes e Historia Clínica Única
-- ----------------------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `diagnose` 
  DEFAULT CHARACTER SET utf8mb4 
  COLLATE utf8mb4_spanish_ci;

USE `diagnose`;

DROP TABLE IF EXISTS `paciente`;
CREATE TABLE `paciente` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nro_doc` VARCHAR(20) NOT NULL COMMENT 'DNI sin puntos ni guiones',
  `hc` VARCHAR(20) NOT NULL COMMENT 'Número de Historia Clínica Única',
  `nombre` VARCHAR(100) NOT NULL,
  `apellido` VARCHAR(100) NOT NULL,
  `fecha_nacimiento` DATE NULL COMMENT 'Fecha de nacimiento (fnac / fecha_nac / fecha_nacimiento)',
  `sexo` CHAR(1) DEFAULT 'M',
  `telefono` VARCHAR(50) NULL,
  `direccion` VARCHAR(255) NULL,
  `email` VARCHAR(150) NULL,
  `fecha_alta` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_nro_doc` (`nro_doc`),
  INDEX `idx_hc` (`hc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Carga o actualización de Pacientes Semilla de Prueba en 'diagnose'
INSERT INTO `paciente` (`nro_doc`, `hc`, `nombre`, `apellido`, `fecha_nacimiento`, `sexo`, `telefono`, `email`) VALUES
('54190431', 'HC-54190', 'Joaquín Benjamín', 'Silva', '2025-11-10', 'M', '0342-4771209', 'familia.silva@gmail.com'),
('48912304', 'HC-9821', 'Mateo', 'Benítez', '2023-03-15', 'M', '0342-4591029', 'familia.benitez@gmail.com'),
('51092381', 'HC-8812', 'Camilo', 'Benavídez', '2021-08-20', 'M', '0342-4819023', 'benavidez.camilo@yahoo.com'),
('49301992', 'HC-10492', 'Valentina', 'Morales', '2019-05-12', 'F', '0342-4192019', 'morales.valen@hotmail.com'),
('50119823', 'HC-40192', 'Sofía Valentina', 'Rossi', '2017-09-04', 'F', '0342-4882190', 'rossi.sofia@gmail.com')
ON DUPLICATE KEY UPDATE `nombre` = VALUES(`nombre`), `apellido` = VALUES(`apellido`);


-- ----------------------------------------------------------------------------
-- 2. BASE DE DATOS DEL PORTAL: alassia_mensajeria (10.12.4.2)
-- Gestión de Cuentas, Solicitudes, Alertas y Auditoría
-- ----------------------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `alassia_mensajeria` 
  DEFAULT CHARACTER SET utf8mb4 
  COLLATE utf8mb4_spanish_ci;

USE `alassia_mensajeria`;

-- Borrado ordenado de tablas (child tables first)
DROP TABLE IF EXISTS `ausentismo_alerta`;
DROP TABLE IF EXISTS `solicitud`;
DROP TABLE IF EXISTS `profesional`;
DROP TABLE IF EXISTS `servicio`;
DROP TABLE IF EXISTS `auditoria_log`;

-- Tabla 1: Servicios Hospitalarios
CREATE TABLE `servicio` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `codigo` VARCHAR(20) NOT NULL UNIQUE,
  `nombre` VARCHAR(150) NOT NULL,
  `email_oficial` VARCHAR(150) NOT NULL,
  `jefe_servicio` VARCHAR(150) NULL,
  `requiere_autorizacion_leches` TINYINT(1) DEFAULT 0,
  `activo` TINYINT(1) DEFAULT 1,
  INDEX `idx_codigo` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Tabla 2: Usuarios y Profesionales de la Salud (RBAC)
CREATE TABLE `profesional` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `dni` VARCHAR(20) NOT NULL UNIQUE COMMENT 'DNI de inicio de sesión',
  `password_hash` VARCHAR(255) NOT NULL COMMENT 'Contraseña encriptada',
  `nombre_completo` VARCHAR(150) NOT NULL,
  `matricula` VARCHAR(50) DEFAULT 'S/N',
  `especialidad_rol` VARCHAR(150) NOT NULL,
  `servicio_id` INT NULL,
  `es_admin` TINYINT(1) DEFAULT 0 COMMENT '1=Administrador General, 0=Médico',
  `email` VARCHAR(150) NOT NULL,
  `activo` TINYINT(1) DEFAULT 1,
  `creado_el` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_dni` (`dni`),
  INDEX `idx_servicio_id` (`servicio_id`),
  CONSTRAINT `fk_profesional_servicio` FOREIGN KEY (`servicio_id`) REFERENCES `servicio` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Tabla 3: Solicitudes, Recetas e Interconsultas
CREATE TABLE `solicitud` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `codigo_unico` VARCHAR(30) NOT NULL UNIQUE COMMENT 'Ej: CARD-9102, NUT-8812',
  `tipo_formulario` ENUM(
    'Interconsulta Cardiología',
    'Interconsulta General',
    'Receta Electrónica',
    'Solicitud de Imágenes',
    'Prescripción Nutricional',
    'Intervención Servicio Social'
  ) NOT NULL,
  `paciente_dni` VARCHAR(20) NOT NULL,
  `paciente_nombre` VARCHAR(150) NOT NULL,
  `paciente_hc` VARCHAR(30) NULL,
  `servicio_origen_id` INT NULL,
  `servicio_destino_id` INT NULL,
  `profesional_solicitante_id` INT NULL,
  `motivo_consulta` TEXT NULL,
  `diagnostico_presuntivo` TEXT NULL,
  `datos_rp1` TEXT NULL COMMENT 'Detalle de medicamentos o fórmula láctea prescrita',
  `es_recurrente` TINYINT(1) DEFAULT 0 COMMENT 'Tratamientos crónicos o retiros mensuales',
  `modulo_actual` INT DEFAULT 1,
  `total_modulos` INT DEFAULT 1,
  `proximo_retiro` DATE NULL,
  `estado` ENUM('Pendiente', 'En Proceso', 'Confirmado / Resuelto', 'Tratamiento Completado', 'Cancelado') DEFAULT 'Pendiente',
  `respuesta_medica` TEXT NULL COMMENT 'Informe médico firmado de resolución',
  `profesional_respondedor_id` INT NULL,
  `fecha_solicitud` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `fecha_resolucion` DATETIME NULL,
  INDEX `idx_codigo_unico` (`codigo_unico`),
  INDEX `idx_paciente_dni` (`paciente_dni`),
  INDEX `idx_estado` (`estado`),
  CONSTRAINT `fk_solicitud_origen` FOREIGN KEY (`servicio_origen_id`) REFERENCES `servicio` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_solicitud_destino` FOREIGN KEY (`servicio_destino_id`) REFERENCES `servicio` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_solicitud_solicitante` FOREIGN KEY (`profesional_solicitante_id`) REFERENCES `profesional` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Tabla 4: Alertas de Ausentismo (Servicio Social Hospitalario)
CREATE TABLE `ausentismo_alerta` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `codigo_alerta` VARCHAR(30) NOT NULL UNIQUE COMMENT 'Ej: SOC-9812',
  `solicitud_id` INT NOT NULL,
  `paciente_dni` VARCHAR(20) NOT NULL,
  `servicio_notificado_id` INT NOT NULL COMMENT 'ID de Servicio Social Hospitalario',
  `profesional_emisor_id` INT NULL,
  `estado_alerta` ENUM('Pendiente', 'En Visita / Contacto', 'Resuelta') DEFAULT 'Pendiente',
  `fecha_despacho` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `respuesta_social` TEXT NULL,
  INDEX `idx_codigo_alerta` (`codigo_alerta`),
  CONSTRAINT `fk_alerta_solicitud` FOREIGN KEY (`solicitud_id`) REFERENCES `solicitud` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_alerta_servicio` FOREIGN KEY (`servicio_notificado_id`) REFERENCES `servicio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Tabla 5: Registro de Auditoría Inmutable (Audit Trail)
CREATE TABLE `auditoria_log` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `categoria` VARCHAR(50) NOT NULL COMMENT 'LOGIN, SOLICITUD, DISPENSA, ALARMA, ADMIN',
  `usuario_dni` VARCHAR(20) NULL,
  `usuario_nombre` VARCHAR(150) NOT NULL,
  `detalle_accion` TEXT NOT NULL,
  `ip_origen` VARCHAR(45) DEFAULT '10.12.4.221',
  `fecha_registro` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_categoria` (`categoria`),
  INDEX `idx_fecha` (`fecha_registro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;


-- ----------------------------------------------------------------------------
-- 3. DATOS SEMILLA (INITIAL SEED DATA)
-- Carga inicial de Servicios y Cuentas de Profesionales
-- ----------------------------------------------------------------------------
INSERT INTO `servicio` (`id`, `codigo`, `nombre`, `email_oficial`, `jefe_servicio`, `requiere_autorizacion_leches`) VALUES
(1, 'GASTRO', 'Gastroenterología Infantil', 'gastroenterologia.alassia@santafe.gob.ar', 'Dra. Mariana López', 1),
(2, 'NEO', 'Neonatología y UCNI', 'neonatologia.alassia@santafe.gob.ar', 'Dra. Silvina Benítez', 1),
(3, 'NUT', 'Nutrición y Lactario', 'lactario.alassia@santafe.gob.ar', 'Maglione Pablo', 1),
(4, 'CARD', 'Cardiología Infantil', 'cardiologia.alassia@santafe.gob.ar', 'Dr. Orlando Alassia', 1),
(5, 'CRON', 'Programa de Tratamientos Crónicos', 'cronicos.alassia@santafe.gob.ar', 'Dr. Hernán Castro', 1),
(6, 'INT', 'Internación General (Salas)', 'internacion.alassia@santafe.gob.ar', 'Dr. Esteban Martínez', 1),
(7, 'CLIN-PED', 'Clínica Pediátrica', 'clinicapediatrica.alassia@santafe.gob.ar', 'Dra. Andrea Morales', 1),
(8, 'FARM', 'Farmacia y Recetas Electrónicas', 'farmacia.alassia@santafe.gob.ar', 'Farm. Carlos Villalba', 0),
(9, 'IMG', 'Diagnóstico por Imágenes', 'imagenes.alassia@santafe.gob.ar', 'Dr. Andrés Cavallo', 0),
(10, 'SOC', 'Servicio Social Hospitalario', 'servicio.social@santafe.gob.ar', 'Lic. Viviana Roldán', 0)
ON DUPLICATE KEY UPDATE `nombre` = VALUES(`nombre`), `email_oficial` = VALUES(`email_oficial`);

-- Cuentas Iniciales de Profesionales
INSERT INTO `profesional` (`dni`, `password_hash`, `nombre_completo`, `matricula`, `especialidad_rol`, `servicio_id`, `es_admin`, `email`) VALUES
('11111111', '$2y$10$abcdef...admin123', 'Dirección Médica (Admin)', 'ADMIN-01', 'Administrador General del Hospital', NULL, 1, 'direccion.alassia@santafe.gob.ar'),
('20341000', '$2y$10$abcdef...cardio123', 'Dr. Orlando Alassia', 'Mat. 3410', 'Jefe de Servicio • Cardiología', 4, 0, 'orlando.alassia@santafe.gob.ar'),
('24105200', '$2y$10$abcdef...nutri123', 'Maglione Pablo', 'Mat. 1052', 'Lic. en Nutrición • Coordinador Lactario', 3, 0, 'pablo.maglione@santafe.gob.ar'),
('22182000', '$2y$10$abcdef...farmacia123', 'Farm. Carlos Villalba', 'Mat. 1820', 'Jefe de Farmacia Hospitalaria', 8, 0, 'carlos.villalba@santafe.gob.ar'),
('23310500', '$2y$10$abcdef...imagenes123', 'Dr. Andrés Cavallo', 'Mat. 3105', 'Jefe de Diagnóstico por Imágenes', 9, 0, 'andres.cavallo@santafe.gob.ar'),
('28410999', '$2y$10$abcdef...social123', 'Lic. Viviana Roldán', 'Mat. 1420', 'Jefa de Servicio Social Hospitalario', 10, 0, 'viviana.roldan@santafe.gob.ar')
ON DUPLICATE KEY UPDATE `nombre_completo` = VALUES(`nombre_completo`), `especialidad_rol` = VALUES(`especialidad_rol`);

-- Re-activar la verificación de claves foráneas
SET FOREIGN_KEY_CHECKS = 1;

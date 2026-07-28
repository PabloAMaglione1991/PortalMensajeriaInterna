-- ==============================================================================
-- SCRIPT DE BASE DE DATOS COMPLETO (SQL DDL & DML SEED)
-- Sistema Digital de Mensajería, Recetas, Interconsultas y Auditoría
-- Hospital de Niños "Dr. Orlando Alassia" — Santa Fe
-- Motor compatible: MySQL 8.0+ / MariaDB 10.5+
-- Charset: utf8mb4 (UTF-8 Unicode estricto)
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `alassia_mensajeria`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `alassia_mensajeria`;

-- ------------------------------------------------------------------------------
-- 1. TABLA DE SERVICIOS HOSPITALARIOS
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `servicio`;
CREATE TABLE `servicio` (
  `id` VARCHAR(50) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `codigo` VARCHAR(20) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL,
  `jefe_servicio` VARCHAR(100) NOT NULL,
  `habilitado` TINYINT(1) NOT NULL DEFAULT 1,
  `autorizado_leches` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 2. TABLA DE PROFESIONALES Y USUARIOS RBAC
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `profesional`;
CREATE TABLE `profesional` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `dni` VARCHAR(20) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `matricula` VARCHAR(50) DEFAULT NULL,
  `rol` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `servicio_id` VARCHAR(50) DEFAULT NULL,
  `is_admin` TINYINT(1) NOT NULL DEFAULT 0,
  `avatar` VARCHAR(10) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_profesional_servicio` FOREIGN KEY (`servicio_id`) 
    REFERENCES `servicio` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 3. TABLA DE PERMISOS GLOBALes DE FORMULARIOS (ADMIN TOGGLES)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `permiso_formulario`;
CREATE TABLE `permiso_formulario` (
  `id` VARCHAR(50) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `tab_id` VARCHAR(50) NOT NULL,
  `habilitado` TINYINT(1) NOT NULL DEFAULT 1,
  `icono` VARCHAR(50) NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 4. TABLA DE PACIENTES (ESQUEMA COMPATIBLE CON BASE CENTRAL 'diagnose')
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `paciente`;
CREATE TABLE `paciente` (
  `nro_doc` VARCHAR(20) NOT NULL,
  `nr0_hc` VARCHAR(20) NOT NULL,
  `ape_y_nom` VARCHAR(100) NOT NULL,
  `st_nombre` VARCHAR(50) DEFAULT NULL,
  `fnac` VARCHAR(30) DEFAULT NULL,
  `sexo` CHAR(1) DEFAULT 'M',
  `telefono` VARCHAR(50) DEFAULT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`nro_doc`),
  KEY `idx_paciente_hc` (`nr0_hc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 5. TABLA PRINCIPAL DE SOLICITUDES, INTERCONSULTAS Y RECETAS
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `solicitud`;
CREATE TABLE `solicitud` (
  `id` VARCHAR(50) NOT NULL,
  `tipo` ENUM('Cardiología', 'Interconsulta General', 'Receta Electrónica', 'Solicitud de Imágenes', 'Prescripción Nutricional') NOT NULL,
  `dni_paciente` VARCHAR(20) NOT NULL,
  `nombre_paciente` VARCHAR(150) NOT NULL,
  `hc_paciente` VARCHAR(20) DEFAULT NULL,
  `edad_paciente` VARCHAR(50) DEFAULT NULL,
  `sexo_paciente` CHAR(1) DEFAULT 'M',
  `servicio_origen` VARCHAR(100) DEFAULT NULL,
  `servicio_destino` VARCHAR(100) NOT NULL,
  `staff_asignado` VARCHAR(150) DEFAULT NULL,
  `medico_emisor` VARCHAR(150) NOT NULL,
  `diagnostico` TEXT DEFAULT NULL,
  `motivo_indicacion` TEXT DEFAULT NULL,
  `rp1_formula` TEXT DEFAULT NULL,
  `rp2_modulo` TEXT DEFAULT NULL,
  `peso_actual` VARCHAR(20) DEFAULT NULL,
  `talla` VARCHAR(20) DEFAULT NULL,
  `email_notificado` VARCHAR(100) DEFAULT NULL,
  `estado` ENUM('Pendiente', 'En Proceso', 'Confirmado / Resuelto', 'Cancelado') NOT NULL DEFAULT 'Pendiente',
  `respuesta_medica` TEXT DEFAULT NULL,
  `medico_respondedor` VARCHAR(150) DEFAULT NULL,
  `is_recurring` TINYINT(1) NOT NULL DEFAULT 0,
  `modulo_actual` INT NOT NULL DEFAULT 1,
  `total_modulos` INT NOT NULL DEFAULT 1,
  `proximo_retiro` DATE DEFAULT NULL,
  `fecha_emision` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_resolucion` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_solicitud_dni` (`dni_paciente`),
  KEY `idx_solicitud_estado` (`estado`),
  KEY `idx_solicitud_servicio` (`servicio_destino`),
  CONSTRAINT `fk_solicitud_paciente` FOREIGN KEY (`dni_paciente`) 
    REFERENCES `paciente` (`nro_doc`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 6. TABLA DE AUDITORÍA E INMUTABILIDAD (AUDIT TRAIL)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `audit_log`;
CREATE TABLE `audit_log` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `codigo_log` VARCHAR(50) NOT NULL,
  `fecha_hora` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `categoria` ENUM('CREACION', 'RESOLUCION', 'LOGIN', 'ADMIN', 'ALARMA', 'CONSULTA', 'LECHES') NOT NULL,
  `usuario` VARCHAR(150) NOT NULL,
  `rol` VARCHAR(150) DEFAULT NULL,
  `servicio` VARCHAR(100) DEFAULT NULL,
  `detalle` TEXT NOT NULL,
  `ip_address` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_audit_categoria` (`categoria`),
  KEY `idx_audit_fecha` (`fecha_hora`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- INSERCIÓN DE DATOS DE PRUEBA Y CONFIGURACIÓN INICIAL (SEED DATA)
-- ==============================================================================

-- 1. Servicios del Hospital Alassia
INSERT INTO `servicio` (`id`, `nombre`, `codigo`, `email`, `jefe_servicio`, `habilitado`, `autorizado_leches`) VALUES
('serv-gastro', 'Gastroenterología Infantil', 'GASTRO', 'gastroenterologia.alassia@santafe.gob.ar', 'Dra. Mariana López', 1, 1),
('serv-neo', 'Neonatología y UCNI', 'NEO', 'neonatologia.alassia@santafe.gob.ar', 'Dra. Silvina Benítez', 1, 1),
('serv-nutri', 'Nutrición y Lactario', 'NUTRI', 'nutricion.alassia@santafe.gob.ar', 'Maglione Pablo', 1, 1),
('serv-cardio', 'Cardiología Infantil', 'CARD', 'cardiologia.alassia@santafe.gob.ar', 'Dr. Orlando Alassia', 1, 1),
('serv-cronicos', 'Programa de Tratamientos Crónicos', 'CRON', 'cronicos.alassia@santafe.gob.ar', 'Dr. Hernán Castro', 1, 1),
('serv-internacion', 'Internación General (Salas)', 'INT', 'internacion.alassia@santafe.gob.ar', 'Dr. Esteban Martínez', 1, 1),
('serv-clinica-ped', 'Clínica Pediátrica', 'CLIN-PED', 'clinicapediatrica.alassia@santafe.gob.ar', 'Dra. Andrea Morales', 1, 1),
('serv-farmacia', 'Farmacia y Recetas Electrónicas', 'FARM', 'farmacia.alassia@santafe.gob.ar', 'Farm. Carlos Villalba', 1, 0),
('serv-imagenes', 'Diagnóstico por Imágenes', 'IMG', 'imagenes.alassia@santafe.gob.ar', 'Dr. Andrés Cavallo', 1, 0);

-- 2. Profesionales y Cuentas de Acceso (Password Hash de prueba: SHA256 / Plain)
INSERT INTO `profesional` (`dni`, `password_hash`, `nombre`, `matricula`, `rol`, `email`, `servicio_id`, `is_admin`, `avatar`) VALUES
('11111111', 'admin123', 'Dirección Médica (Admin)', 'ADMIN-01', 'Administrador General del Hospital', 'direccion.alassia@santafe.gob.ar', NULL, 1, 'ADM'),
('20341000', 'cardio123', 'Dr. Orlando Alassia', '3410', 'Jefe de Servicio • Cardiología', 'orlando.alassia@santafe.gob.ar', 'serv-cardio', 0, 'OA'),
('25392000', 'gastro123', 'Dra. Mariana López', '3920', 'Jefa de Gastroenterología Pediátrica', 'mariana.lopez@santafe.gob.ar', 'serv-gastro', 0, 'ML'),
('24105200', 'nutri123', 'Maglione Pablo', '1052', 'Lic. en Nutrición • Coordinador Lactario', 'pablo.maglione@santafe.gob.ar', 'serv-nutri', 0, 'MP'),
('22182000', 'farmacia123', 'Farm. Carlos Villalba', '1820', 'Jefe de Farmacia Hospitalaria', 'carlos.villalba@santafe.gob.ar', 'serv-farmacia', 0, 'CV'),
('23310500', 'imagenes123', 'Dr. Andrés Cavallo', '3105', 'Jefe de Diagnóstico por Imágenes', 'andres.cavallo@santafe.gob.ar', 'serv-imagenes', 0, 'AC');

-- 3. Permisos Iniciales de Formularios
INSERT INTO `permiso_formulario` (`id`, `nombre`, `tab_id`, `habilitado`, `icono`) VALUES
('cardio', 'Interconsulta Cardiología', 'tab-cardio', 1, 'ri-heart-pulse-line'),
('general', 'Interconsulta General', 'tab-general', 1, 'ri-hospital-line'),
('farmacia', 'Receta Electrónica Farmacia', 'tab-farmacia', 1, 'ri-capsule-line'),
('imagenes', 'Solicitud de Imágenes (RX/TAC)', 'tab-imagenes', 1, 'ri-body-scan-line'),
('nutri', 'Prescripción Leches / Nutrición', 'tab-nutri', 1, 'ri-drop-line');

-- 4. Pacientes Pediátricos Registrados
INSERT INTO `paciente` (`nro_doc`, `nr0_hc`, `ape_y_nom`, `st_nombre`, `fnac`, `sexo`, `telefono`, `email`) VALUES
('48912304', 'HC-9821', 'Benítez', 'Mateo', '2023-03-12', 'M', '0342-4591029', 'familia.benitez@gmail.com'),
('51092381', 'HC-8812', 'Benavídez', 'Camilo', '2021-06-20', 'M', '0342-4819023', 'benavidez.camilo@yahoo.com'),
('49301992', 'HC-10492', 'Morales', 'Valentina', '2019-05-14', 'F', '0342-4192019', 'morales.valen@hotmail.com'),
('50119823', 'HC-40192', 'Rossi', 'Sofía Valentina', '2017-09-08', 'F', '0342-4882190', 'rossi.sofia@gmail.com'),
('52190431', 'HC-5120', 'Silva', 'Joaquín Benjamín', '2025-11-04', 'M', '0342-4771209', 'silva.familia@gmail.com'),
('52890112', 'HC-12049', 'Gómez', 'Lautaro Ezequiel', '2024-11-10', 'M', '0342-4991023', 'gomez.lautaro@gmail.com'),
('53401882', 'HC-14022', 'Ferreyra', 'Emilia Paz', '2026-02-15', 'F', '0342-4229011', 'ferreyra.emilia@gmail.com'),
('51902441', 'HC-9930', 'Mansilla', 'Thiago Agustín', '2020-04-18', 'M', '0342-4661209', 'mansilla.thiago@gmail.com'),
('50812309', 'HC-7741', 'Cabrera', 'Santino Gabriel', '2022-08-30', 'M', '0342-4119023', 'cabrera.santino@gmail.com'),
('54102990', 'HC-15099', 'Benítez', 'Delfina María', '2026-05-01', 'F', '0342-4331092', 'benitez.delfi@gmail.com');

-- 5. Solicitudes Pediátricas Iniciales
INSERT INTO `solicitud` (`id`, `tipo`, `dni_paciente`, `nombre_paciente`, `hc_paciente`, `edad_paciente`, `sexo_paciente`, `servicio_origen`, `servicio_destino`, `staff_asignado`, `medico_emisor`, `diagnostico`, `motivo_indicacion`, `rp1_formula`, `rp2_modulo`, `peso_actual`, `talla`, `email_notificado`, `estado`, `respuesta_medica`, `medico_respondedor`, `is_recurring`, `modulo_actual`, `total_modulos`, `proximo_retiro`, `fecha_emision`) VALUES
('CARD-2026-001', 'Cardiología', '48912304', 'Mateo Benítez', 'HC-9821', '3 años 4 meses', 'M', 'Pediatría II', 'Cardiología Infantil', 'Dr. Orlando Alassia (Jefe)', 'Dra. Lucía Gómez (Mat. 4812)', 'Síndrome febril prolongado / Soplo holosistólico 3/6 en foco mitral', 'Paciente internado en Sala 3 con fiebre de 7 días. Se ausculta soplo rudo. Se solicita Ecocardiograma Doppler Color urgente.', NULL, NULL, NULL, NULL, 'cardiologia.alassia@santafe.gob.ar', 'Pendiente', NULL, NULL, 0, 1, 1, NULL, '2026-07-28 08:30:00'),
('CARD-2026-045', 'Cardiología', '52890112', 'Lautaro Ezequiel Gómez', 'HC-12049', '1 año 8 meses', 'M', 'Cardiología Infantil', 'Cardiología Infantil', 'Dra. Florencia Carrizo', 'Dr. Orlando Alassia (Mat. 3410)', 'Coartación de Aorta / Control Posquirúrgico', 'Evaluación cardiológica pediátrica con Ecocardiograma Doppler Color. Paciente operado de coartación aórtica hace 6 meses. Presenta pulsos femorales simétricos.', NULL, NULL, NULL, NULL, 'cardiologia.alassia@santafe.gob.ar', 'Pendiente', NULL, NULL, 0, 1, 1, NULL, '2026-07-28 09:15:00'),
('GEN-2026-089', 'Interconsulta General', '53401882', 'Emilia Paz Ferreyra', 'HC-14022', '5 meses', 'F', 'Clínica Pediátrica', 'Gastroenterología Infantil', 'Dra. Mariana López (Jefa de Gastroenterología)', 'Dra. Andrea Morales (Mat. 2840)', 'Bronquiolitis Aguda Moderada (VRS (+)) con Rechazo del Alimento', 'Paciente internada en Sala 4 - Cama 18 B. Presenta dificultad respiratoria y rechazo alimentario de 24hs. Se solicita valoración digestiva y sonda SNG.', NULL, NULL, NULL, NULL, 'gastroenterologia.alassia@santafe.gob.ar', 'Pendiente', NULL, NULL, 0, 1, 1, NULL, '2026-07-28 09:40:00'),
('FARM-2026-150', 'Receta Electrónica', '51902441', 'Thiago Agustín Mansilla', 'HC-9930', '6 años', 'M', 'Programa Crónicos', 'Farmacia y Recetas Electrónicas', 'Farm. Carlos Villalba (Jefe de Farmacia)', 'Dra. Romina Fernández (Mat. 4012)', 'Diabetes Mellitus Tipo 1 Pediátrica', NULL, 'Insulina Glargina 100 UI/ml lapicera prellenada (12 UI SC nocturna) + Tiras reactivas glucemia (100 unidades/mes)', NULL, NULL, NULL, 'farmacia.alassia@santafe.gob.ar', 'Pendiente', NULL, NULL, 1, 1, 6, '2026-07-28', '2026-07-28 10:05:00'),
('IMG-2026-112', 'Solicitud de Imágenes', '50812309', 'Santino Gabriel Cabrera', 'HC-7741', '4 años', 'M', 'Internación General', 'Diagnóstico por Imágenes', 'Dr. Andrés Cavallo (Jefe de Imágenes)', 'Dr. Esteban Martínez (Mat. 3990)', 'Neumonía Aguda Adquirida en la Comunidad / Descartar Derrame Pleural', 'Ecografía Pleural + Radiografía RX Tórax Frente y Perfil. Paciente febril de 39.2°C con hypoventilación en base derecha.', NULL, NULL, NULL, NULL, 'imagenes.alassia@santafe.gob.ar', 'Pendiente', NULL, NULL, 0, 1, 1, NULL, '2026-07-28 10:20:00'),
('NUT-2026-030', 'Prescripción Nutricional', '54102990', 'Delfina María Benítez', 'HC-15099', '2 meses', 'F', 'Neonatología y UCNI', 'Nutrición y Lactario', 'Maglione Pablo (Coordinador)', 'Dra. Silvina Benítez (Mat. 3120)', 'Prematurez Extrema / Retraso del Crecimiento Intrauterino (RCIU)', NULL, 'Fórmula para Prematuros con Hierro y Proteínas Concentradas - 15% dilución / 90 cc c/3hs por SNG', 'Módulo Calórico de Triglicéridos de Cadena Media (TCM) - 1.5 ml por toma', '2.450 kg', '44 cm', 'nutricion.alassia@santafe.gob.ar', 'Pendiente', NULL, NULL, 1, 1, 6, '2026-07-28', '2026-07-28 10:25:00'),
('NUT-2026-031', 'Prescripción Nutricional', '52190431', 'Joaquín Benjamín Silva', 'HC-5120', '8 meses', 'M', 'Gastroenterología Infantil', 'Nutrición y Lactario', 'Maglione Pablo (Coordinador)', 'Dra. Mariana López (Mat. 3920)', 'Alergia a la proteína de leche de vaca (APLV) / Lactante menor', NULL, 'Fórmula de Inicio Extensamente Hidrolizada (Sin Lactosa) - 13.5% / 150 cc - 8 tomas cada 3hs (VO)', 'Módulo de Polímeros de Glucosa (Maltodextrina 3%) - 3 g / 100 cc', '6.850 kg', '66 cm', 'nutricion.alassia@santafe.gob.ar', 'En Proceso', 'Formulación Rp1 y Rp2 aprobada y preparada en Lactario.', 'Maglione Pablo (Mat. 1052)', 1, 2, 6, '2026-08-15', '2026-07-26 18:40:00'),
('FARM-2026-102', 'Receta Electrónica', '51092381', 'Camilo Benavídez', 'HC-8812', '5 años', 'M', 'Pediatría I', 'Farmacia y Recetas Electrónicas', 'Farm. Carlos Villalba (Jefe de Farmacia)', 'Dr. Orlando Alassia (Mat. 3410)', 'Tratamiento de Mantenimiento Asma Pediátrico', NULL, 'Fluticasona 125mcg aerosol de inhalación + Cámara Espaciadora Pediátrica — 2 disparos c/12hs', NULL, NULL, NULL, 'farmacia.alassia@santafe.gob.ar', 'En Proceso', 'Procesando orden de medicamentos.', 'Farm. Carlos Villalba (Mat. 1820)', 1, 1, 6, '2026-07-27', '2026-07-27 08:10:00'),
('IMG-2026-088', 'Solicitud de Imágenes', '49301992', 'Valentina Morales', 'HC-10492', '7 años 2 meses', 'F', 'Internación General', 'Diagnóstico por Imágenes', 'Dr. Andrés Cavallo (Jefe de Imágenes)', 'Dr. Gonzalo Torres (Mat. 2840)', 'Traumatismo cerrado de tórax con hipoventilación izquierda', 'Radiografía RX Tórax Frente y Perfil. Descartar neumotórax o fractura costal.', NULL, NULL, NULL, NULL, 'imagenes.alassia@santafe.gob.ar', 'Confirmado / Resuelto', 'RX Tórax realizada: Sin trazo de fractura costal. Silueta cardíaca conservada.', 'Dr. Andrés Cavallo (Mat. 3105)', 0, 1, 1, NULL, '2026-07-27 07:45:00'),
('GEN-2026-042', 'Interconsulta General', '50119823', 'Sofía Valentina Rossi', 'HC-40192', '9 años', 'F', 'Clínica Pediátrica', 'Gastroenterología Infantil', 'Dra. Mariana López (Jefa de Gastroenterología)', 'Dra. Andrea Morales (Mat. 2840)', 'Dolor abdominal agudo en FIDA', 'Cuadro de 48hs de dolor abdominal en fosa ilíaca derecha. Se solicita valoración gastroenterológica.', NULL, NULL, NULL, NULL, 'gastroenterologia.alassia@santafe.gob.ar', 'Confirmado / Resuelto', 'Evaluación completada. Plan nutricional ajustado.', 'Dra. Mariana López (Mat. 3920)', 0, 1, 1, NULL, '2026-07-27 07:15:00');

-- 6. Logs Iniciales de Auditoría (Audit Trail)
INSERT INTO `audit_log` (`codigo_log`, `fecha_hora`, `categoria`, `usuario`, `rol`, `servicio`, `detalle`, `ip_address`) VALUES
('LOG-1001', '2026-07-28 08:30:12', 'CREACION', 'Dra. Lucía Gómez', 'Médica Pediatra (Mat. 4812)', 'Pediatría II', 'Emisión de Interconsulta con Cardiología #CARD-2026-001 (Paciente Mateo Benítez)', '192.168.10.42 (Terminal Sala 3)'),
('LOG-1002', '2026-07-28 09:15:05', 'CREACION', 'Dr. Orlando Alassia', 'Jefe de Servicio (Mat. 3410)', 'Cardiología Infantil', 'Emisión de Interconsulta #CARD-2026-045 para paciente Lautaro Gómez', '192.168.10.15 (Consultorio Cardio)'),
('LOG-1003', '2026-07-28 09:40:20', 'CREACION', 'Dra. Andrea Morales', 'Jefa de Clínica Pediátrica (Mat. 2840)', 'Clínica Pediátrica', 'Emisión de Interconsulta General #GEN-2026-089 para Emilia Ferreyra', '192.168.10.22 (Sala 4)'),
('LOG-1004', '2026-07-28 10:05:00', 'LECHES', 'Dra. Romina Fernández', 'Especialista en Seguimiento Crónico (Mat. 4012)', 'Programa Crónicos', 'Prescripción de Receta Electrónica #FARM-2026-150 para Thiago Mansilla', '192.168.10.19 (Consultorio Crónicos)'),
('LOG-1005', '2026-07-28 10:20:15', 'CREACION', 'Dr. Esteban Martínez', 'Jefe de Internación (Mat. 3990)', 'Internación General', 'Solicitud de Diagnóstico por Imágenes RX/Eco #IMG-2026-112 para Santino Cabrera', '192.168.10.50 (Internación)'),
('LOG-1006', '2026-07-28 10:25:30', 'LECHES', 'Dra. Silvina Benítez', 'Jefa de Neonatología (Mat. 3120)', 'Neonatología y UCNI', 'Emisión de Prescripción Nutricional #NUT-2026-030 para Delfina Benítez (Prematura)', '192.168.10.08 (UCNI Neo)'),
('LOG-1007', '2026-07-28 10:30:00', 'ADMIN', 'Dirección Médica (Admin)', 'Administrador General', 'Todos los Servicios', 'Actualización de permisos globales de emisión de formularios', '192.168.10.1 (Intranet Central)');

-- ==============================================================================
-- FIN DEL SCRIPT DE BASE DE DATOS COMPLETO
-- ==============================================================================

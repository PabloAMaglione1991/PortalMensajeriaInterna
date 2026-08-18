# 📋 FICHA TÉCNICA DE SISTEMA & ARQUITECTURA
## Portal de Mensajería Interna, Interconsultas & Recetas Electrónicas
### Hospital de Niños Dr. Orlando Alassia — Santa Fe

---

## 1. INFORMACIÓN GENERAL DEL SISTEMA

| Parámetro | Detalle |
| :--- | :--- |
| **Nombre del Sistema** | Portal de Mensajería Interna, Interconsultas Médicas y Prescripciones |
| **Institución** | Hospital de Niños Dr. Orlando Alassia • Ministerio de Salud de Santa Fe |
| **Versión Actual** | 2.5.0 (Build 20260818) |
| **Tipo de Aplicación** | Web App Hospitalaria Monolítica Ligera (SPA Vanilla JS + Backend PHP PDO REST) |
| **Entorno de Red** | Red LAN Hospitalaria Cerrada / Intranet Segura |
| **Servidor Web / Host** | Apache 2.4+ / PHP 8.1+ en http://10.12.4.221/mensajeria/ |
| **Repositorio Oficial** | https://github.com/PabloAMaglione1991/PortalMensajeriaInterna.git |

---

## 2. TOPOLOGÍA DE RED E INFRAESTRUCTURA DE SERVIDORES

El sistema opera integrando tres nodos clave en la red privada hospitalaria:

`
                  ┌──────────────────────────────────────────────────────────┐
                  │                   TERMINALES HOSPITAL                    │
                  │   Salas • Guardias • Farmacia • Lactario • Informática   │
                  └─────────────────────────────┬────────────────────────────┘
                                                │ HTTP (Puerto 80)
                                                ▼
┌────────────────────────────────────────────────────────────────────────────────────────────┐
│ SERVIDOR DE APLICACIÓN WEB (10.12.4.221)                                                   │
│ • Apache 2.4 HTTP Server                                                                   │
│ • PHP 8.1+ Engine con PDO MySQL y cURL                                                     │
│ • Archivos Estáticos: index.html, app.js, styles.css, api.php, enviar_mail.php             │
└───────────────────────────┬──────────────────────────────────┬─────────────────────────────┘
                            │                                  │
          MySQL (Puerto 3306)                                  │ MySQL (Puerto 3306)
          Credenciales: sql / sql77                            │ Credenciales: root / root
                            ▼                                  ▼
┌──────────────────────────────────────┐     ┌───────────────────────────────────────────────┐
│ SERVIDOR PORTAL (10.12.4.2)          │     │ SERVIDOR CENTRAL DIAGNOSE (10.12.4.1)         │
│ • BD: alassia_mensajeria             │     │ • BD: diagnose / alassia_diagnose             │
│ • Tablas:                            │     │ • Tablas:                                     │
│   - servicio                         │     │   - paciente (Padrón Maestro HC / DNI)        │
│   - profesional (Cuentas RBAC)       │     │ • Operaciones:                                │
│   - solicitud (Pedidos & Recetas)    │     │   - Búsqueda en vivo de pacientes por DNI     │
│   - ausentismo_alerta (Serv. Social) │     │   - Autocompletado de HC, edad y tutor        │
│   - auditoria_log (Trazabilidad)     │     └───────────────────────────────────────────────┘
└──────────────────────────────────────┘
`

---

## 3. STACK TECNOLÓGICO

### Frontend
- **Lenguaje:** JavaScript Moderno (ES6+ Vanilla, sin dependencias pesadas ni frameworks de compilación).
- **Estructura:** HTML5 Semántico con Arquitectura de Pestañas (SPA) y diseño responsivo móvil/escritorio.
- **Estilos:** CSS3 nativo con Sistema de Tokens de Diseño CSS Custom Properties (paleta hospitalaria sobria y accesible).
- **Tipografía & Iconografía:** Inter, JetBrains Mono (código) y Remix Icon v3.5.0 CDN.
- **Exportación de Documentos:** html2pdf.js v0.10.1 (Generación client-side directa de Hojas Médicas y Recetas Oficiales descargables en PDF).

### Backend
- **Lenguaje:** PHP 8.1+ puro estructurado bajo API RESTful orientada a acciones (pi.php, enviar_mail.php, 	est_conexion.php).
- **Capa de Datos:** PHP Data Objects (PDO_MYSQL) con manejo estricto de excepciones, transacciones y consultas preparadas anti SQL-Injection.
- **Despacho de Correo:** Integración nativa con PHPMailer / Mailer API SMTP sobre servidores de correo institucional de Santa Fe (@santafe.gob.ar).

---

## 4. MODELO DE DATOS Y ESQUEMA RELACIONAL (MySQL 10.12.4.2)

### Base de Datos: lassia_mensajeria

#### 1. Tabla servicio
| Columna | Tipo | Descripción |
| :--- | :--- | :--- |
| id | INT AUTO_INCREMENT (PK) | Identificador único del servicio |
| codigo | VARCHAR(20) UNIQUE | Código corto (ej: CARD, FARM, NUTRI, CIRU) |
| 
ombre | VARCHAR(150) | Nombre oficial del servicio hospitalario |
| email_oficial | VARCHAR(150) | Correo electrónico de notificación del servicio |
| jefe_servicio | VARCHAR(150) | Jefe o responsable de servicio |
| equiere_autorizacion_leches | TINYINT(1) | 1=Habilitado para prescribir leches especiales |
| eportes_habilitados | TINYINT(1) | Permiso de visualización de estadísticas |
| ctivo | TINYINT(1) | 1=Activo, 0=Inactivo |

#### 2. Tabla profesional (Control de Accesos RBAC)
| Columna | Tipo | Descripción |
| :--- | :--- | :--- |
| id | INT AUTO_INCREMENT (PK) | Identificador del profesional |
| dni | VARCHAR(20) UNIQUE | DNI utilizado como usuario de inicio de sesión |
| password_hash | VARCHAR(255) | Contraseña protegida |
| 
ombre_completo | VARCHAR(150) | Nombre y Apellido con título |
| matricula | VARCHAR(50) | Matrícula profesional provincial |
| especialidad_rol | VARCHAR(150) | Especialidad o función hospitalaria |
| servicio_id | INT (FK -> servicio.id) | Servicio de pertenencia |
| es_admin | TINYINT(1) | 1=Administrador / Informática (Acceso Total), 0=Médico/Técnico |
| email | VARCHAR(150) | Correo del profesional |
| ctivo | TINYINT(1) | 1=Activo, 0=Baja |

#### 3. Tabla solicitud (Núcleo de Interconsultas y Recetas)
| Columna | Tipo | Descripción |
| :--- | :--- | :--- |
| id | INT AUTO_INCREMENT (PK) | ID interno secuencial |
| codigo_unico | VARCHAR(30) UNIQUE | Código alfanumérico visible (ej: CARD-2026-812, NUTR-2026-401) |
| 	ipo_formulario | ENUM(...) | 'Interconsulta Cardiología', 'Interconsulta General', 'Receta Electrónica', 'Solicitud de Imágenes', 'Prescripción Nutricional', 'Intervención Servicio Social' |
| paciente_dni | VARCHAR(20) | DNI del paciente pediátrico |
| paciente_nombre | VARCHAR(150) | Nombre completo del paciente |
| paciente_hc | VARCHAR(30) | Número de Historia Clínica |
| paciente_edad | VARCHAR(30) | Edad del paciente al momento del pedido |
| servicio_origen_id | INT (FK -> servicio.id) | ID del servicio emisor |
| servicio_destino_id | INT (FK -> servicio.id) | ID del servicio receptor |
| profesional_solicitante_id| INT (FK -> profesional.id)| ID del médico emisor |
| diagnostico_presuntivo | TEXT | Diagnóstico clínico CIE / presuntivo |
| motivo_consulta | TEXT | Motivo detallado de consulta |
| datos_rp1 | TEXT | Prescripción farmacológica / fórmula láctea / dosificación / retiro |
| es_recurrente | TINYINT(1) | 1=Tratamiento crónico con entregas mensuales |
| modulo_actual | INT | Número de entrega actual (ej: módulo 2 de 6) |
| 	otal_modulos | INT | Total de meses prescritos |
| proximo_retiro | DATE NULL | Fecha programada del próximo retiro |
| estado | ENUM(...) | 'Pendiente', 'En Proceso', 'Confirmado / Resuelto', 'Tratamiento Completado', 'Cancelado' |
| espuesta_medica | TEXT | Dictamen médico o informe de entrega |
| profesional_respondedor_id| INT (FK -> profesional.id)| Profesional que dictamina o entrega |
| medico_respondedor | VARCHAR(150) | Firma y matrícula del profesional respondedor |
| echa_solicitud | TIMESTAMP | Fecha y hora de creación |
| echa_resolucion | DATETIME NULL | Fecha y hora de entrega o cierre |

#### 4. Tabla uditoria_log (Trazabilidad y Seguridad)
| Columna | Tipo | Descripción |
| :--- | :--- | :--- |
| id | INT AUTO_INCREMENT (PK) | ID del log |
| categoria | VARCHAR(50) | LOGIN, CREACION, RESOLUCION, DISPENSA, ADMIN |
| usuario_nombre | VARCHAR(150) | Profesional que ejecutó la acción |
| detalle_accion | TEXT | Descripción auditada de la operación |
| ip_origen | VARCHAR(50) | Dirección IP de la terminal que operó |
| echa_registro | TIMESTAMP | Marca de tiempo exacta |

---

## 5. CATÁLOGO DE ENDPOINTS DE LA API (pi.php)

Todos los endpoints reciben y emiten datos en formato JSON (Content-Type: application/json):

| Acción (?action=...) | Método | Parámetros Principales | Descripción |
| :--- | :---: | :--- | :--- |
| login | POST | dni, password | Autentica al usuario contra MySQL profesional |
| uscar_paciente | GET | dni | Consulta en vivo a 10.12.4.1 (BD diagnose) |
| get_all_data | GET | — | Carga masiva de servicios, profesionales, solicitudes y logs |
| save_record | POST | Objeto 
ewRecord | Inserta o actualiza una solicitud o receta médica |
| esolve_solicitud | POST | id, estado, espuestaMedica, medicoRespondedor | Resuelve, entrega y archiva formalmente una consulta |
| save_user | POST | Objeto usuario | Crea o actualiza un profesional de la salud (RBAC) |
| delete_user | POST | id | Da de baja lógica a un usuario del sistema |
| save_service | POST | Objeto servicio | Crea o actualiza un servicio hospitalario |
| delete_service | POST | id | Elimina o desactiva un servicio |
| log_audit | POST | categoria, usuario, detalle | Registra evento en la tabla uditoria_log |

---

## 6. POLÍTICA DE RESILENCIA & SINCRONIZACIÓN EN TIEMPO REAL

1. **Sondeo Automático de Fondo (15s):** Todas las terminales activas ejecutan una sincronización silenciosa periódica para reflejar nuevas interconsultas, recetas o cambios de estado al instante en toda la red hospitalaria.
2. **Desacople Anti-Caché:** Todo formulario implementa limpieza de draft inmediata y los archivos estáticos (pp.js, styles.css) implementan versionado dinámico por timestamp para garantizar que las terminales corran la última versión compilada sin retener datos obsoletos.
3. **Mapeo Inteligente de Esquemas:** La API inspecciona las columnas disponibles en la base de datos en tiempo de ejecución, evitando errores de clave foránea o nombres de columnas no presentes.

# 🛠️ Guía Técnica y Documentación de Archivos del Proyecto
### Portal Digital de Mensajería, Recetas e Interconsultas — Hospital Alassia (Versión 2026)

---

## 📐 1. Arquitectura de Software y Topología de Entorno

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SERVIDOR CENTRAL DE PATOLOGÍAS (10.12.4.1)                                  │
│ Base de datos: diagnose (READ-ONLY) ➔ Tabla: paciente                       │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ (Conexión PDO / Búsqueda DNI)
┌──────────────────────────────────────▼──────────────────────────────────────┐
│ SERVIDOR DE MENSAJERÍA HOSPITALARIA (10.12.4.2 / Localhost:8000)            │
│ Base de datos: alassia_mensajeria (READ-WRITE)                              │
│ Tablas: servicio, profesional, solicitud, ausentismo_alerta, auditoria_log  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 2. Especificación Técnica Archivo por Archivo

### 1. `index.html` (Vista Principal y Maquetación de Interfaces)
* **Propósito:** Archivo de estructura HTML5 semántica y responsiva que contiene las vistas de la aplicación.
* **Componentes Clave:**
  * `#login-page-screen`: Pantalla de autenticación Split-Screen con identidad del Gobierno de Santa Fe, sello del Hospital Alassia (`Mendoza 4151, Santa Fe Capital`), conmutador de visibilidad de contraseña y selector rápido de credenciales demo por rol.
  * `#sidebar`: Menú lateral izquierdo dinámico filtrado por rol y tarjeta fija del profesional logueado (`#sidebar-user-card`).
  * `#quick-nav-header`: Barra superior fija con perfil activo y accesos directos (`Pendientes`, `Emisión`, `Archivo`).
  * `#tab-inbox`: Tabla de Bandeja de Entrada con buscador instantáneo (`#search-inbox-input`), selectores de alcance (`scope-btn-all`, `scope-btn-received`, `scope-btn-sent`) y matriz visual `Origen ➔ Destino`.
  * `#tab-recurrencia`: Módulo de tratamientos crónicos con buscador en tiempo real (`#search-recurring-input`), botón `[ 🟢 Registrar Entrega ]` y `[ ↩️ Deshacer Entrega ]`.
  * `#tab-archive`: Archivo histórico con buscador instantáneo (`#search-archive-input`).
  * `#tab-admin`: Módulo de Administración exclusivo para Admin con CRUD de Usuarios, CRUD de Servicios Hospitalarios (`#create-service-form`) y toggles de autorización por sector.
  * `#resolve-modal`, `#email-modal`, `#sheet-modal`: Cuadros modales interactivos para firmas, reportes y vistas previa de PDF.

### 2. `app.js` (Lógica del Cliente, Controlador SPA y Estado)
* **Propósito:** Controlador principal en JavaScript vanilla que maneja el estado local (`localStorage`), la reactividad de la interfaz y la lógica de negocio.
* **Funciones Principales:**
  * `togglePasswordVisibility()`: Conmutador de tipo de campo (`password` / `text`) e ícono del ojo en el formulario de login.
  * `fillDemoLogin(dni, pass)`: Función de autocompletado en 1 clic de credenciales por especialidad para demostraciones.
  * `canUserDeliverRecord(record, user)`: Matriz de autorización por rol que habilita el botón `[ 📦 Entregar ]` y los selectores de cambio de estado ÚNICAMENTE a los profesionales del servicio receptor (`r.destino`).
  * `isRecordForService(record, userService)`: Algoritmo de filtrado relacional que permite visibilidad tanto al servicio emisor (para seguimiento) como al servicio receptor (para dispensa).
  * `setInboxScope(scope)`: Conmutador de alcance para alternar entre `all` (Todos), `received` (Recibidos) y `sent` (Enviados).
  * `revertLastDispense(id)`: Permite deshacer la última entrega de un tratamiento mensual (`moduloActual -= 1`), reajustando fechas y registrando la reversión en la auditoría.
  * `handleCreateServiceSubmit()` / `deleteService(id)`: Lógica del CRUD de servicios hospitalarios con persistencia en `alassia_services`.
  * `exportToPDF(elementId, filename)`: Motor de generación directa de recetarios en PDF usando `html2pdf.js`.

### 3. `styles.css` (Sistema de Diseño y Fluid Widescreen Engine)
* **Propósito:** Hoja de estilos en CSS Vanilla con variables de tokens de diseño (`--primary-600`, `--slate-900`, `--radius-md`).
* **Módulos Destacados:**
  * `.login-container-wrap` / `.login-hero-showcase`: Estilos de la pantalla de Login institucional con glassmorphism, gradientes pediátricos santafesinos y animación de pulso de sello.
  * Breakpoints Widescreen `@media (min-width: 1400px)` y `@media (min-width: 1800px)` para aprovechar el 100% del ancho en monitores Full HD, 2K y 4K.
  * Hojas de papel digital e impresas (`.paper-sheet`) diseñadas con tipografía monospace `JetBrains Mono` y fuentes legibles de Google Fonts (`Inter`, `Outfit`).

### 4. `buscar_paciente.php` (Servicio API de Búsqueda de Pacientes)
* **Propósito:** Endpoint PHP con PDO que recibe la consulta `GET ?dni=XXXXX` o `GET ?term=XXXXX`.
* **Manejo de Errores y Robustez:**
  * Sanitización de cadenas (`preg_replace('/[^0-9]/', '', $dni)`).
  * Intenta consultar primero el Servidor Central `diagnose` (`10.12.4.1`). Si falla por red, realiza un failover transparente al Servidor Local `alassia_mensajeria`.
  * Normalización de campos nulos (`$row['fnac'] ?? '2019-05-12'`) para evitar warnings o referencias undefined en JavaScript.

### 5. `test_conexion.php` (Endpoint de Diagnóstico e Infraestructura)
* **Propósito:** Script PHP de salud que evalúa latencia y estado de conexión con ambas bases MySQL (`diagnose` y `alassia_mensajeria`), devolviendo JSON estructurado con el estado de la red hospitalaria.

### 6. `schema_completo_alassia.sql` (Script DDL y Semillero MySQL)
* **Propósito:** Script SQL idempotent de creación e inicialización de la base de datos `alassia_mensajeria`.
* **Características Anti-Errores:**
  * Incluye la protección `SET FOREIGN_KEY_CHECKS = 0;` al inicio y `SET FOREIGN_KEY_CHECKS = 1;` al final para evitar MySQL Error 1217 y 150 durante la reconstrucción de tablas.
  * Inserta registros semilla con `ON DUPLICATE KEY UPDATE` para garantizar ejecuciones seguras en producción.

---

## 📊 3. Modelo de Datos Relacional (`alassia_mensajeria`)

```sql
-- Tabla Principal de Solicitudes, Recetas e Interconsultas
CREATE TABLE IF NOT EXISTS solicitud (
    id VARCHAR(50) PRIMARY KEY,
    tipo VARCHAR(100) NOT NULL,
    paciente_dni VARCHAR(20) NOT NULL,
    paciente_nombre VARCHAR(150) NOT NULL,
    servicio_origen VARCHAR(100) NOT NULL,
    servicio_destino VARCHAR(100) NOT NULL,
    personal_asignado VARCHAR(150) DEFAULT 'Equipo Completo del Servicio',
    estado ENUM('Pendiente', 'En Proceso', 'Confirmado / Resuelto', 'Tratamiento Completado') DEFAULT 'Pendiente',
    respuesta_medica TEXT NULL,
    medico_firmante VARCHAR(150) NULL,
    fecha_emision DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---
*Documentación Técnica Oficial • Hospital Alassia 2026*

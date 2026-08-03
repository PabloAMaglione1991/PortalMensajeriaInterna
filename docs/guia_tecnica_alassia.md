# 🛠️ Documentación Técnica Detallada — Portal Mensajería e Interconsultas
### Hospital de Niños "Dr. Orlando Alassia" • Arquitectura y Especificación por Archivo

---

## 🏗️ 1. Visión General de la Arquitectura

El sistema está estructurado bajo una **Arquitectura Híbrida Desacoplada (Frontend SPA + API Proxy PHP PDO)**:
* **Frontend:** Single Page Application (HTML5, CSS Vanilla Tokens, JavaScript Moderno ES6+).
* **Backend Proxy:** PHP 8.x con PDO y fallback dual entre MySQL de central médica (`10.12.4.1` `diagnose`) y MySQL del portal (`10.12.4.2` `alassia_mensajeria`).
* **Autenticación & Permisos:** RBAC Estricto (Role-Based Access Control) con aislamiento de vistas por especialidad médica.
* **Motor PDF:** Librería cliente `html2pdf.js` para renderizado directo en formato ejecutable cliente sin invocación de controladores de impresión física.

---

## 📁 2. Análisis Detallado Archivo por Archivo

### 📄 1. `index.html` (Estructura de Interfaz y Vistas SPA)
* **Propósito:** Archivo principal de la interfaz Single Page Application. Contiene el diseño semántico HTML5 y la infraestructura de pestañas (Tabs), formularios y modales.
* **Componentes Principales:**
  * `<head>`: Carga metadatos, fuentes Google Fonts, Remixicon `3.5.0` y la librería `html2pdf.js` (`0.10.1`).
  * `#login-page-screen`: Pantalla de inicio de sesión de pantalla completa con campos para DNI y contraseña.
  * `.sidebar`: Menú lateral adaptativo con navegación por roles (`data-tab`), distintivos contadores (`badge-count`) y tarjeta fija del usuario con botón de cierre de sesión (`logoutUser()`).
  * `.top-header`: Cabecera superior con título dinámico, distintivo de rol activo, caja de búsqueda global, selector de modo oscuro/claro, menú de notificaciones por servicio y **Barra de Acceso Rápido (Quick Nav Pills)**.
  * `<main class="content-body">`:
    * `#tab-dashboard`: Panel General filtrado por rol (vista simplificada para médicos, métricas globales para Admin).
    * `#tab-inbox`: Bandeja de entrada de solicitudes pendientes filtrada por servicio.
    * `#tab-archive`: Archivo de solicitudes resueltas con respuestas firmadas y descarga PDF.
    * `#tab-recurrencia`: Control de tratamientos crónicos, entrega de módulos lácteos y botón de alerta a Servicio Social.
    * `#tab-reportes`: Tablero consolidado de métricas mensuales y descargas de reportes PDF.
    * `#tab-admin`: Módulo de Administración General con **Gestión CRUD de Usuarios**, habilitación de leches y permisos.
    * `#tab-services`: Directorio de servicios y asignación de personal médico.
    * `#tab-logs`: Registro de auditoría inmutable de eventos del sistema.
    * `#tab-cardio`, `#tab-general`, `#tab-farmacia`, `#tab-imagenes`, `#tab-nutri`: Formularios de emisión con vista previa en vivo estilo hoja médica oficial (*Live Sheet*).
  * `#detail-modal` & `#resolve-modal`: Modales emergentes para visualización de hojas digitales y carga de dictámenes médicos firmados.

---

### ⚡ 2. `app.js` (Lógica de Negocio, Estado y Motor de Permisos)
* **Propósito:** Corazón lógico de la aplicación client-side. Maneja el estado en tiempo real, autenticación, filtrado por rol, consumo de API PHP PDO, notificaciones y generación de PDF.
* **Secciones y Funciones Clave:**
  * `APP_CONFIG`: Switch de configuración global (`ENV: 'production' | 'testing'`, `SHOW_DEMO_USERS_MODAL`, `ALLOW_MOCK_PATIENTS_FALLBACK`).
  * `INITIAL_SERVICES` & `DEMO_USERS`: Estructura inicial de servicios hospitalarios (*Gastroenterología, Neonatología, Nutrición, Cardiología, Crónicos, Internación, Clínica, Farmacia, Imágenes, Servicio Social*) y usuarios preconfigurados.
  * `applyRoleContextualFiltering()`: Función central de RBAC. Oculta/muestra dinámicamente ítems del menú lateral, tarjetas del dashboard y secciones según el servicio del usuario activo.
  * `renderActiveUser()`: Actualiza la interfaz con la identidad del profesional logueado y ejecuta el guard de navegación.
  * `exportToPDF(selector, filename)`: Motor cliente que toma un elemento del DOM (`.paper-sheet`, `#report-print-area`, etc.) y genera una descarga directa de archivo `.pdf` con calidad de impresión gráfica sin popups de impresora.
  * `triggerAbsenteeismAlert(id)`: Despacha alertas de inasistencia por retiros atrasados **exclusivamente hacia el Servicio Social Hospitalario** (`Lic. Viviana Roldán`), generando una orden de intervención privada.
  * `handleCreateUserSubmit(e)`, `renderUserCrudTable()`, `deleteUserByDNI(dni)`: Administración completa del ciclo de vida de cuentas de usuarios (CRUD) en la pestaña Admin.
  * `buscarPacientePorDNI(...)`: Realiza la petición asíncrona (Fetch) hacia `buscar_paciente.php` para obtener datos reales de la base central `diagnose`.
  * `renderInbox()`, `renderArchiveTable()`, `renderRecurringSection()`: Motores de renderizado de tablas con filtrado por especialidad.

---

### 🎨 3. `styles.css` (Sistema de Diseño y Tokens Responsive)
* **Propósito:** Hojas de estilo CSS Vanilla organizadas mediante variables CSS Custom Properties. Proporciona tematizado (Light/Dark Mode), diseño clínico profesional y soporte fluido para monitores HD, Widescreen y 4K.
* **Componentes Destacados:**
  * `:root` & `[data-theme="dark"]`: Paleta cromática médica (Azul Hospitalario `#0284c7`, Verde Esmeralda, Rosa Alarma, Grises Slate), sombras y bordes.
  * `.app-container`, `.sidebar`, `.main-wrapper`, `.top-header`, `.content-body`: Estructura flexible CSS Flexbox y Grid.
  * `.actions-grid`, `.quick-stats-grid`, `.form-layout-grid`: Disposición adaptable de componentes.
  * `.paper-sheet`: Estilizado de hoja física de recetario médico con sello, membrete e instrucciones de validez.
  * `@media (min-width: 1400px)` & `@media (min-width: 1800px)`: Reglas responsive de alta resolución para monitores 1080p, 1440p y 4K (ampliación de paddings, fuentes y contenedores).

---

### 🐘 4. `buscar_paciente.php` (Proxy de Consulta PDO Dual DB)
* **Propósito:** Endpoint backend PHP encargado de consultar de manera segura y resiliente el padrón de pacientes en MySQL.
* **Características Técnicas:**
  * **Conexión Dual y Failover:** Intenta conectar a `10.12.4.1` (DB `diagnose`, puerto 3306). Si falla la red o el servidor, realiza failover automático a `10.12.4.2` (DB `alassia_mensajeria`).
  * **Consulta Resiliente `SELECT p.*`:** Evita errores SQL `1054 Unknown column` ante variaciones en los nombres de columnas de producción.
  * **Normalización de DNI:** Limpia puntos, guiones y espacios en el parámetro de entrada y utiliza `REPLACE()` en la consulta SQL.
  * **Mapeo Dinámico de Atributos:** Resuelve dinámicamente nombres de campos como `$row['fnac'] ?? $row['fecha_nac'] ?? $row['fecha_nacimiento']`.
  * **Modo Depuración (`?debug=1`):** Devuelve información técnica estructurada de la conexión PDO ante consultas administrativas.

---

### 🧪 5. `test_conexion.php` (Herramienta de Diagnóstico DB)
* **Propósito:** Endpoint de diagnóstico técnico independiente para probar la conectividad y listar las tablas y esquemas de los servidores MySQL `10.12.4.1` y `10.12.4.2`.

---

### 🖼️ 6. `1.jpeg`, `2.jpeg`, `3.jpeg` (Recetarios y Formularios de Referencia)
* **Propósito:** Imágenes físicas de referencia de los recetarios oficiales del Hospital Alassia (*Interconsulta Cardiología*, *Interconsulta General* y *Recetario de Leches/Módulos Calóricos*) utilizadas para la digitalización fiel en el portal.

---
*Documentación oficial mantenida en el repositorio Git del Hospital Alassia*

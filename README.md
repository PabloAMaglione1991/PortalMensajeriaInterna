# 🏥 Portal Digital de Mensajería, Recetas, Interconsultas y Auditoría
## Hospital de Niños "Dr. Orlando Alassia" — Santa Fe

![Licencia](https://img.shields.io/badge/Licencia-Propietaria_Hospital_Alassia-blue.svg)
![Estado](https://img.shields.io/badge/Estado-Producción_v4.0-emerald.svg)
![Stack](https://img.shields.io/badge/Stack-HTML5_|_CSS3_|_ES6_|_PHP_|_MySQL-orange.svg)
![Servidor](https://img.shields.io/badge/Servidor-Ubuntu_Linux_|_Apache2_|_VMware-purple.svg)
![Testing](https://img.shields.io/badge/Testing-PASS_100%25_|_5_Perfiles-brightgreen.svg)

Plataforma web clínica oficial para la digitalización de interconsultas pediátricas, prescripción de leches y fórmulas lácteas, solicitudes de imágenes, recetas electrónicas de farmacia, trazabilidad por auditoría inmutable (`Audit Trail`), filtrado RBAC estricto y administración de usuarios por DNI y clave.

---

## 📑 ÍNDICE GENERAL DEL DOCUMENTO

1. [Ficha Técnica & Arquitectura de Doble Base de Datos](#-1-ficha-técnica--arquitectura-de-doble-base-de-datos)
2. [Manual Oficial de Usuario v4.0 (Operativa Médica)](#-2-manual-oficial-de-usuario-v40-operativa-médica)
3. [Seguridad y Control de Visibilidad por Rol (RBAC)](#-3-seguridad-y-control-de-visibilidad-por-rol-rbac)
4. [Alta y Gestión de Usuarios con DNI y Clave](#-4-alta-y-gestión-de-usuarios-con-dni-y-clave)
5. [Guía de Instalación de Base de Datos MySQL (Esquema v4.0)](#-5-guía-de-instalación-de-base-de-datos-mysql-esquema-v40)
6. [Guía de Despliegue en Apache2 (IP: 10.12.4.221)](#-6-guía-de-despliegue-en-apache2-ip-10124221)
7. [Informe de Testing y Auditoría UX](#-7-informe-de-testing-y-auditoría-ux)
8. [Estructura del Repositorio](#-8-estructura-del-repositorio)

---

## 🏗️ 1. FICHA TÉCNICA & ARQUITECTURA DE DOBLE BASE DE DATOS

### Especificaciones Técnicas v4.0

| Componente | Tecnología / Versión | Descripción y Rol |
| :--- | :--- | :--- |
| **Frontend UI** | HTML5 / Vanilla CSS3 / ES6+ | Diseños responsivos balanceados (Sidebar de 250px), modo claro/oscuro, cero dependencias JS pesadas (< 50ms time-to-first-paint). |
| **APIs Nativas** | Web Audio API / sessionStorage | Tono de aviso audible hospitalario (587Hz -> 880Hz) y guardado automático de borradores ante cortes de energía. |
| **Teclas Rápidas** | Keyboard Shortcuts Engine | `Ctrl+B` (Búsqueda DNI), `Ctrl+Enter` (Enviar pedido), `Ctrl+Shift+L` (Cerrar sesión). |
| **Backend API Proxy** | PHP 8.x FPM / PDO | Endpoint `buscar_paciente.php` con PDO y consultas preparadas sanitizadas. |
| **Servidor Web** | Apache2 con `mod_rewrite` | Procesamiento de peticiones HTTP en Intranet hospitalaria (URL: `http://10.12.4.221/mensajeria/`). |
| **Base de Datos Central** | MySQL 8.0 / MariaDB (`10.12.4.1`) | Base `diagnose` (READ-ONLY) para autocompletar datos de pacientes pediátricos por DNI. |
| **Base de Datos Portal** | MySQL 8.0 / MariaDB (`10.12.4.2`) | Base `alassia_mensajeria` (READ-WRITE) para solicitudes, usuarios RBAC, permisos y auditoría. |
| **Hypervisor** | VMware vSphere 5.5 (ESXi) | Máquina virtual dedicada Ubuntu Server en la VLAN del hospital. |

### Diagrama de Arquitectura de Doble Base de Datos

```mermaid
flowchart TB
    subgraph Client ["Navegador Web (Cliente Intranet)"]
        UI ["UI Compacta Responsiva (HTML5 / Vanilla CSS / ES6)"]
        RBAC ["RBAC Visual Engine (Ocultamiento de Admin & Audit Logs)"]
        Shortcuts ["Keyboard Shortcuts (Ctrl+B, Ctrl+Enter, Ctrl+Shift+L)"]
        Audio ["Web Audio API (Hospital Chime Alerts)"]
        Drafts ["Draft Auto-Save Engine (sessionStorage)"]
        State ["Estado Local (localStorage / SessionGuard)"]
    end

    subgraph WebServer ["Servidor Web Apache2 / PHP 8.x (IP: 10.12.4.221)"]
        Apache ["Servidor Apache2 (Alias /mensajeria)"]
        PHP ["PHP 8.x PDO API Engine (buscar_paciente.php)"]
    end

    subgraph CentralDB ["Servidor Central Hospitalario (IP: 10.12.4.1)"]
        DiagnoseDB [("Base 'diagnose' (READ-ONLY) - Tabla 'paciente'")]
    end

    subgraph AppDB ["Servidor Datos del Portal (IP: 10.12.4.2)"]
        AlassiaDB [("Base 'alassia_mensajeria' (READ-WRITE)")]
        Tables ["solicitud | profesional | servicio | permiso_formulario | audit_log"]
    end

    UI <-->|HTTP / REST JSON| Apache
    Apache <-->|PDO MySQL (TCP 3306 - Read Only)| CentralDB
    Apache <-->|PDO MySQL (TCP 3306 - Read Write)| AppDB
```

---

## 📖 2. MANUAL OFICIAL DE USUARIO v4.0 (OPERATIVA MÉDICA)

### 2.1 Acceso por D.N.I. y Contraseña
1. Abrí el navegador e ingresá a `http://10.12.4.221/mensajeria/` (o `http://alassia.santafe.gob.ar/mensajeria/`).
2. Ingresá tu **D.N.I. del Profesional** y tu **Contraseña Personal**.
3. Presioná **`[ Ingresar al Portal Hospitalario ]`**.
   * *Modo Administrador (Dirección Médica)*: Acceso total a tableros, alta de usuarios con DNI/clave, gestión de personal, habilitación de servicios y suspensión/activación de formularios.
   * *Modo Médico Especialista*: La bandeja de entrada filtra únicamente los pedidos destinados a tu departamento. Los menúes de Administración y Auditoría se ocultan automáticamente por seguridad RBAC.

### 2.2 Teclas Rápidas de Teclado (Shortcuts de Guardia)
* `Ctrl + B` (o `Cmd + B`): Enfoca el campo de **Búsqueda por DNI** del paciente en el formulario activo.
* `Ctrl + Enter`: Registra, emite y notifica el formulario en pantalla con aviso sonoro hospitalario.
* `Ctrl + Shift + L`: Cierra y bloquea la sesión por seguridad.

### 2.3 Auto-Guardado de Borradores (`Draft Auto-Save`)
* El portal guarda en tiempo real en `sessionStorage` cada palabra tipeada.
* Si se interrumpe la conexión o se apaga la PC, el formulario **se restaura automáticamente al volver**.

### 2.4 Autocompletado por D.N.I. (`Base diagnose 10.12.4.1`)
1. En cualquier formulario (*Nutrición, Farmacia, Cardiología, Imágenes e Interconsulta General*), ingresá el DNI del niño (ej: `52190431`) y presioná `Enter` o `Ctrl + B`.
2. El sistema consultará a la base central `diagnose` (`10.12.4.1`) e inyectará automáticamente **Nombre Completo, Historia Clínica (HC), Edad y Sexo**, actualizando la Hoja Digital de Prescripción.

### 2.5 Emisión de Recetas de Leches y Fórmulas Lácteas
> **Restricción de Seguridad:** Únicamente los 7 servicios autorizados (*Gastroenterología, Neonatología, Nutrición, Cardiología, Tratamientos Crónicos, Internación y Clínica Pediátrica*) pueden emitir solicitudes de leches.

1. Seleccioná **`Recetario de Leches`** (Pestaña verde).
2. Seleccioná el departamento emisor autorizado, indicá el DNI del paciente, Peso Actual (PA), Diagnóstico Nutricional y la Formulación Rp1 / Rp2.
3. Si requiere retiro mensual, activá **`Fórmula de Retiro Mensual Programado`** (3, 6 o 12 meses).
4. Presioná `Ctrl + Enter` para enviar y notificar a Lactario.

---

## 🛡️ 3. SEGURIDAD Y CONTROL DE VISIBILIDAD POR ROL (RBAC)

El sistema implementa **Control de Acceso Basado en Roles (RBAC)** estricto:

* **Médicos de Servicio (`isAdmin: false`)**:
  * Ocultamiento automático de las pestañas **`Panel Administración`** y **`Auditoría & Logs`** en el menú lateral.
  * Filtrado de Bandeja de Entrada restringido a las interconsultas de su propio servicio.
* **Dirección Médica (`isAdmin: true`)**:
  * Acceso total a todas las interconsultas, control de formularios suspendidos, alta de usuarios con DNI y clave, y consulta del **Audit Trail**.

---

## 👤 4. ALTA Y GESTIÓN DE USUARIOS CON DNI Y CLAVE

Desde el perfil de **Dirección Médica (Admin)** en la pestaña `Panel Administración`:

1. Ingresá al bloque **`👤 Alta de Nuevos Usuarios y Profesionales de Salud`**.
2. Completá los campos: **D.N.I. (Usuario)**, **Contraseña**, **Nombre y Apellido**, **Matrícula**, **Especialidad/Rol**, **Servicio Asignado**, **Email** y si posee **Privilegios de Administrador**.
3. Presioná **`[ Crear Usuario y Guardar en Sistema ]`**.
4. El nuevo usuario queda registrado en la base de datos `alassia_mensajeria` (`10.12.4.2`) y se habilita inmediatamente para iniciar sesión.

---

## 🗄️ 5. GUÍA DE INSTALACIÓN DE BASE DE DATOS MYSQL (ESQUEMA v4.0)

El archivo [`schema_completo_alassia.sql`](file:///C:/Users/pablo/OneDrive/Desktop/mensajeria/schema_completo_alassia.sql) incluye toda la estructura relacional (DDL) y la carga inicial de datos de prueba (DML).

### Importación en el Servidor del Portal (`10.12.4.2`)

```bash
mysql -h 10.12.4.2 -u gestion_ -pGESTION_77 < schema_completo_alassia.sql
```

### Tablas del Esquema `alassia_mensajeria`:
1. **`servicio`**: Catálogo de departamentos, jefe a cargo, habilitación y bandera `autorizado_leches`.
2. **`profesional`**: Usuarios y médicos del sistema con credenciales DNI, rol, matrícula y FK a `servicio`.
3. **`permiso_formulario`**: Toggles de administración (`cardio`, `general`, `farmacia`, `imagenes`, `nutri`).
4. **`paciente`**: Tabla compatible con la base central `diagnose` (`nro_doc`, `nr0_hc`, `ape_y_nom`, `fnac`, `sexo`).
5. **`solicitud`**: Prescripciones e interconsultas con estado, Rp1, Rp2, peso, módulos mensuales y respuestas médicas.
6. **`audit_log`**: Registro de auditoría inmutable con categoría, usuario, rol, detalle, timestamp e IP.

---

## 🖥️ 6. GUÍA DE DESPLIEGUE EN APACHE2 (IP: 10.12.4.221)

Si tenés tu proyecto actual en `/var/www/Portal Unificado/public`, desplegá el portal en `/var/www/Portal Unificado/public/mensajeria`:

1. Desplegá los archivos y asigná permisos:
   ```bash
   sudo mkdir -p "/var/www/Portal Unificado/public/mensajeria"
   sudo cp -r * "/var/www/Portal Unificado/public/mensajeria/"
   sudo chown -R www-data:www-data "/var/www/Portal Unificado/public/mensajeria"
   sudo chmod -R 755 "/var/www/Portal Unificado/public/mensajeria"
   ```

2. Verificá tu `/etc/apache2/sites-available/000-default.conf`:
   ```apache
   <VirtualHost *:80>
   	ServerAdmin webmaster@localhost
   	DocumentRoot "/var/www/Portal Unificado/public"

   	<Directory "/var/www/Portal Unificado/public">
   		Options Indexes FollowSymLinks
   		AllowOverride All
   		Require all granted
   	</Directory>

   	ErrorLog ${APACHE_LOG_DIR}/error.log
   	CustomLog ${APACHE_LOG_DIR}/access.log combined
   </VirtualHost>
   ```

3. Verificá la sintaxis y reiniciá Apache:
   ```bash
   sudo apache2ctl configtest
   sudo systemctl restart apache2
   ```

---

## 🧪 7. INFORME DE TESTING Y AUDITORÍA UX

* **Pruebas de Integración (End-to-End)**: **PASS 100% ✅** sobre los 5 perfiles hospitalarios (Cardiología, Nutrición, Farmacia, Imágenes y Admin).
* **Análisis Estático de Código**: 114 elementos DOM y 25 funciones de eventos verificadas sin inconsistencias.
* Consulte el informe detallado en [`informe_testing_y_experiencia_usuario_alassia.md`](file:///C:/Users/pablo/.gemini/antigravity-cli/brain/b8f602bc-fc6a-4471-8111-5f6d43b75051/informe_testing_y_experiencia_usuario_alassia.md).

---

## 📁 8. ESTRUCTURA DEL REPOSITORIO

```
mensajeria/
├── README.md                            # Documento Master Completo v4.0 (Ficha Técnica, Usuario, RBAC, BD y Despliegue)
├── index.html                           # Estructura principal HTML5, formulario de alta de usuarios y componentes
├── styles.css                           # Tokens CSS, layout responsivo balanceado de 250px y modo oscuro/claro
├── app.js                               # Lógica cliente ES6+, RBAC estricto, alta de usuarios, shortcuts y chime audio
├── buscar_paciente.php                  # API Proxy PHP PDO para consulta a base diagnose (10.12.4.1)
├── schema_completo_alassia.sql          # Script DDL/DML de base de datos MySQL / MariaDB (10.12.4.2)
└── docs/
    ├── guia_usuario_despliegue_alassia.md   # Manual de Usuario y Guía de Despliegue en Markdown v4.0
    └── documento_tecnico_arquitectura_alassia.md # Especificación Técnica y Arquitectura v4.0
```

---
*Hospital de Niños "Dr. Orlando Alassia" — Santa Fe, Argentina.*

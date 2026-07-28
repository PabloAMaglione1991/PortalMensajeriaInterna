# 🏗️ Documento Técnico de Arquitectura & Tecnologías v3.0
## Portal Digital de Mensajería, Recetas, Interconsultas y Auditoría
### Hospital de Niños "Dr. Orlando Alassia" — Provincia de Santa Fe

---

## 1. Visión General del Sistema y Diagrama de Arquitectura

El **Portal Digital del Hospital Alassia v3.0** es una solución web clínica diseñada bajo principios de **Clean / Screaming Architecture**, orientada a la máxima resiliencia en Intranets médicas, ausencia de dependencias pesadas y cero tiempos de inactividad.

```mermaid
flowchart TB
    subgraph Client ["Navegador Web (Cliente Intranet)"]
        UI ["UI Compacta (HTML5 / Vanilla CSS / ES6)"]
        Events ["Global Keyboard Shortcuts (Ctrl+B, Ctrl+Enter, Ctrl+Shift+L)"]
        Audio ["Web Audio API (Hospital Chime Alerts)"]
        Drafts ["Draft Auto-Save Engine (sessionStorage)"]
        Sync ["Data-Sync Engine (e.target.dataset.sync)"]
        State ["Estado Local (localStorage / SessionGuard)"]
    end

    subgraph WebServer ["Servidor Web Intranet (Ubuntu Linux / ESXi 5.5)"]
        NGINX ["Servidor NGINX (Puerto 80 / 443)"]
        PHP ["PHP 8.x-FPM API Engine (buscar_paciente.php)"]
    end

    subgraph DatabaseServer ["Servidor de Base de Datos Hospitalaria (10.12.4.1)"]
        MySQL [("MySQL 8 / MariaDB (Base 'diagnose')")]
    end

    UI <-->|HTTP / REST JSON| NGINX
    NGINX <-->|FastCGI| PHP
    PHP <-->|PDO MySQL (TCP 3306)| MySQL
```

---

## 2. Stack Tecnológico (Technology Stack v3.0)

### Frontend Engine (Cliente)
* **HTML5 Semántico**: Estándares W3C, accesibilidad y soporte de atributos reactivos nativos (`data-sync`, `data-fallback`).
* **Vanilla CSS3 Custom Tokens System**:
  * Sistema de tokens (`--primary-600`, `--slate-900`, `--emerald-500`, `--shadow-paper`).
  * Soporte nativo de **Modo Oscuro/Claro** mediante `data-theme`.
  * Diseño **Ultra-Compacto & Responsivo**: Adaptativo a notebooks (`1366x768`) y monitores médicos mediante `@media (max-height: 820px)`.
* **JavaScript ES6+ Asíncrono & Web APIs Nativas**:
  * *Zero external JS frameworks*: Carga ultra-rápida (< 50ms time-to-first-paint).
  * **Web Audio API (`AudioContext`)**: Generación sintética de avisos audibles hospitalarios (tono de alta frecuencia 587Hz -> 880Hz) sin archivos MP3 externos.
  * **Keyboard Shortcuts Engine**: Captura global de eventos de teclado (`Ctrl+B`, `Ctrl+Enter`, `Ctrl+Shift+L`).
  * **Draft Auto-Save Manager**: Guardado diferencial en tiempo real dentro de `sessionStorage` para recuperación ante pérdidas de energía.
  * **Reactive Data-Sync Engine**: Delegación de eventos en `document.addEventListener('input')` para sincronización en tiempo real con las hojas digitales de prescripción.

### Backend API Proxy Engine (Servidor Web)
* **Lenguaje**: PHP 8.x con extensión `PDO_MYSQL` habilitada.
* **Servidor Web**: NGINX (o Apache 2.4) configurado con sockets FastCGI (`php-fpm.sock`).
* **Formatos de Intercambio**: JSON con codificación UTF-8 estricta y sanitización de inputs.

### Base de Datos Intranet Hospitalaria
* **Motor BD**: MySQL / MariaDB albergado en la IP `10.12.4.1`.
* **Nombre de Base de Datos**: `diagnose`.
* **Credenciales de Servicio**: Usuario `gestion_` (Proyecto Reminder).

---

## 3. Especificación de Base de Datos Central (`diagnose`)

La API `buscar_paciente.php` consulta de forma segura la tabla principal de pacientes mediante consultas preparadas en PDO:

```sql
SELECT 
    CONCAT(p.ape_y_nom, ' ', IFNULL(p.st_nombre, '')) AS nombre_completo,
    p.nro_doc AS dni,
    p.nr0_hc AS hc,
    p.telefono,
    p.email,
    p.fnac AS fecha_nacimiento,
    p.sexo
FROM paciente p 
WHERE p.nro_doc = :dni OR p.nro_doc = :dniLimpio
LIMIT 1;
```

### Esquema de la Tabla `paciente`:
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `nro_doc` | VARCHAR(20) | Número de D.N.I. del paciente pediátrico (Clave de búsqueda). |
| `ape_y_nom` | VARCHAR(100) | Apellidos y primer nombre. |
| `st_nombre` | VARCHAR(50) | Segundo nombre / nombres adicionales. |
| `nr0_hc` | VARCHAR(20) | Número único de Historia Clínica (HC) del hospital. |
| `telefono` | VARCHAR(40) | Teléfono de contacto de la familia. |
| `email` | VARCHAR(100) | Correo electrónico de contacto. |
| `fnac` | DATE / VARCHAR | Fecha de nacimiento del paciente. |
| `sexo` | CHAR(1) | Sexo registrado (M/F). |

---

## 4. Sistema de Autenticación, RBAC y Auditoría (`Audit Trail`)

### Control de Acceso Basado en Roles (RBAC)
El sistema gestiona 2 niveles principales de acceso:
1. **Administrador General (`isAdmin: true`)**:
   * Acceso total a todas las interconsultas de todos los servicios del hospital.
   * **Control de Habilitación de Formularios (`alassia_form_permissions`)**: Encendido/Apagado dinámico de recetas de Cardiología, General, Farmacia, Imágenes y Nutrición.
   * Gestión de alta/baja de personal por departamento (`alassia_services`).
   * Otorgamiento de permisos de emisión de recetas de leches (`autorizadoLeches`).
2. **Médico de Servicio (`isAdmin: false`)**:
   * Filtrado estricto en la bandeja de entrada: **Solo ve los pedidos dirigidos a su propio departamento**.

### Estructura del Objeto de Registro de Auditoría (`alassia_audit_logs`)
Cada evento significativo genera una entrada inmutable con los siguientes atributos:

```json
{
  "id": "LOG-8419",
  "timestamp": "28/7/2026 09:20:10",
  "category": "CREACION | RESOLUCION | LOGIN | ADMIN | ALARMA | LECHES",
  "user": "Dra. Mariana López",
  "role": "Jefa de Gastroenterología Pediátrica (Mat. 3920)",
  "service": "Gastroenterología Infantil",
  "detail": "Emisión de Prescripción Nutricional #NUT-2026-015 para paciente Joaquín Silva",
  "ip": "192.168.10.42 (Terminal Red)"
}
```

---

## 5. Modelos de Persistencia y Recuperación (`localStorage` & `sessionStorage`)

* **`alassia_records`**: Array de interconsultas y prescripciones activas e históricas.
* **`alassia_audit_logs`**: Array de eventos de trazabilidad y auditoría hospitalaria.
* **`alassia_services`**: Lista de servicios habilitados, personal a cargo y banderas `autorizadoLeches`.
* **`alassia_form_permissions`**: Estado de habilitación global de formularios (`cardio`, `general`, `farmacia`, `imagenes`, `nutri`).
* **`alassia_user`**: Perfil del usuario con sesión activa.
* **`alassia_auth`**: Estado booleano de sesión iniciada (`true`/`false`).
* **`alassia_draft_[formId]`** (En `sessionStorage`): Estado borrador en tiempo real de cada formulario en edición.

---

## 6. Seguridad y Hardening en Entornos Médicos

1. **Inyección SQL**: El endpoint `buscar_paciente.php` utiliza consultas preparadas con binding de parámetros mediante PDO (`:dni`), anulando riesgos de inyección SQL.
2. **Aislamiento Intranet**: El sistema no requiere conexión a Internet externa. Funciona 100% dentro de la red corporativa del Ministerio de Salud.
3. **CORS Restringido**: Cabeceras `Access-Control-Allow-Origin` configuradas para permitir peticiones únicamente dentro del dominio o la IP del servidor web hospitalario.

---
*Documento Técnico de Arquitectura v3.0 — Hospital de Niños "Dr. Orlando Alassia".*

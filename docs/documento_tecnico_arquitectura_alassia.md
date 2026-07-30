# 🏗️ Documento Técnico de Arquitectura & Tecnologías v4.0
## Portal Digital de Mensajería, Recetas, Interconsultas y Auditoría
### Hospital de Niños "Dr. Orlando Alassia" — Provincia de Santa Fe

---

## 1. Visión General del Sistema y Diagrama de Arquitectura de Doble Base de Datos

El **Portal Digital del Hospital Alassia v4.0** implementa una arquitectura híbrida de alta resiliencia con separación estricta de responsabilidades de bases de datos entre consulta histórica central y persistencia transaccional del portal.

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

## 2. Stack Tecnológico (Technology Stack v4.0)

### Frontend Engine (Cliente Web)
* **HTML5 Semántico**: Estándares W3C, accesibilidad y atributos reactivos (`data-sync`, `data-tab`).
* **Vanilla CSS3 Tokens System**:
  * Diseño **Ultra-Compacto & Responsivo**: Ancho lateral de 250px balanceado, truncamiento de texto elegante con `text-overflow: ellipsis`, soporte nativo de **Modo Oscuro/Claro** (`data-theme`).
  * *Zero external JS frameworks*: Carga instantánea (< 50ms time-to-first-paint).
* **Web APIs Nativas**:
  * **Web Audio API (`AudioContext`)**: Tono sintético de confirmación hospitalaria (587Hz -> 880Hz).
  * **Keyboard Shortcuts Engine**: `Ctrl+B` (Búsqueda DNI), `Ctrl+Enter` (Enviar pedido), `Ctrl+Shift+L` (Cerrar sesión).
  * **Draft Auto-Save Manager**: Guardado diferencial en tiempo real en `sessionStorage`.

### Backend API Proxy Engine & Servidor Web
* **Servidor Web**: Apache2 con módulo `mod_rewrite` habilitado y alias `/mensajeria`.
* **Lenguaje**: PHP 8.x con extensión `PDO_MYSQL` habilitada.

### Arquitectura de Bases de Datos Híbrida
1. **Base Central `diagnose` (`10.12.4.1`)**: LECTURA ÚNICAMENTE para autocompletar pacientes pediátricos por DNI.
2. **Base del Portal `alassia_mensajeria` (`10.12.4.2`)**: LECTURA Y ESCRITURA para solicitudes, usuarios RBAC, permisos y registros de auditoría.

---

## 3. Especificación del Control de Acceso por Roles (RBAC Estricto)

### Perfiles de Usuario:
1. **Administrador General (`isAdmin: true`)**:
   * Acceso total a todas las interconsultas de todos los servicios.
   * **Alta de Usuarios con DNI y Clave**: Formulario dinámico en `tab-admin` para registrar médicos y administradores.
   * **Control de Habilitación de Formularios (`alassia_form_permissions`)**: Encendido/Apagado global en tiempo real.
   * **Auditoría & Logs (`Audit Trail`)**: Visualización y exportación de registros inmutables.
2. **Médico de Servicio (`isAdmin: false`)**:
   * **Filtrado Visual del Menú Lateral**: Ocultamiento estricto de las pestañas `Panel Administración` y `Auditoría & Logs`.
   * **Filtrado de Bandeja**: Únicamente visualiza los pedidos dirigidos a su departamento.

---

## 4. Trazabilidad e Inmutabilidad de Auditoría (`Audit Trail`)

Estructura del registro inmutable guardado en `audit_log`:

```json
{
  "id": "LOG-9410",
  "timestamp": "30/7/2026 08:00:12",
  "category": "LOGIN | CREACION | RESOLUCION | ADMIN | LECHES | ALARMA",
  "user": "Dr. Orlando Alassia",
  "role": "Jefe de Servicio (Mat. 3410)",
  "service": "Cardiología Infantil",
  "detail": "Emisión de Interconsulta #CARD-2026-001 para paciente Mateo Benítez",
  "ip": "192.168.10.42 (Terminal Red)"
}
```

---
*Documento Técnico de Arquitectura v4.0 — Hospital de Niños "Dr. Orlando Alassia".*

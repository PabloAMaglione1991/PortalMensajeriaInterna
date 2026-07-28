# 🏥 Portal Digital de Mensajería, Recetas, Interconsultas y Auditoría
## Hospital de Niños "Dr. Orlando Alassia" — Santa Fe

![Licencia](https://img.shields.io/badge/Licencia-Propietaria_Hospital_Alassia-blue.svg)
![Estado](https://img.shields.io/badge/Estado-Producción_v3.0-emerald.svg)
![Stack](https://img.shields.io/badge/Stack-HTML5_|_CSS3_|_ES6_|_PHP_|_MySQL-orange.svg)
![Despliegue](https://img.shields.io/badge/Despliegue-VMware_vSphere_5.5_|_Ubuntu_Server-purple.svg)

Plataforma web clínica oficial para la digitalización de interconsultas pediátricas, prescripción de leches y fórmulas lácteas, solicitudes de imágenes, recetas electrónicas de farmacia, trazabilidad por auditoría inmutable (`Audit Trail`) y control de permisos administrativos.

---

## 📑 ÍNDICE GENERAL DEL DOCUMENTO

1. [Ficha Técnica & Arquitectura del Sistema](#-1-ficha-técnica--arquitectura-del-sistema)
2. [Manual Oficial de Usuario v3.0 (Operativa Médica)](#-2-manual-oficial-de-usuario-v30-operativa-médica)
3. [Guía Completa de Instalación de Base de Datos MySQL](#-3-guía-completa-de-instalación-de-base-de-datos-mysql)
4. [Guía de Despliegue en VMware vSphere 5.5 / Ubuntu Server](#-4-guía-de-despliegue-en-vmware-vsphere-55--ubuntu-server)
5. [Estructura del Repositorio](#-5-estructura-del-repositorio)

---

## 🏗️ 1. FICHA TÉCNICA & ARQUITECTURA DEL SISTEMA

### Especificaciones Técnicas

| Componente | Tecnología / Versión | Descripción y Rol |
| :--- | :--- | :--- |
| **Frontend UI** | HTML5 / Vanilla CSS3 / ES6+ | Diseño responsivo ultra-compacto (`@media max-height: 820px`), soporte modo claro/oscuro, cero dependencias JS pesadas (< 50ms time-to-first-paint). |
| **APIs Nativas** | Web Audio API / sessionStorage | Tono de aviso audible hospitalario (587Hz -> 880Hz) y guardado automático de borradores ante cortes de energía. |
| **Teclas Rápidas** | Keyboard Shortcuts Engine | `Ctrl+B` (Búsqueda DNI), `Ctrl+Enter` (Enviar pedido), `Ctrl+Shift+L` (Cerrar sesión). |
| **Backend API Proxy** | PHP 8.x FPM | Endpoint `buscar_paciente.php` con PDO y consultas preparadas sanitizadas. |
| **Servidor Web** | NGINX 1.18+ / FastCGI | Procesamiento de peticiones HTTP en Intranet hospitalaria. |
| **Base de Datos** | MySQL 8.0+ / MariaDB 10.5+ | Base central `diagnose` (Servidor `10.12.4.1`) y esquema `alassia_mensajeria`. |
| **Hypervisor** | VMware vSphere 5.5 (ESXi) | Máquina virtual dedicada en Ubuntu Server 22.04 LTS (IP: `10.12.4.50`). |

### Diagrama de Arquitectura de Red y Topología

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
        NGINX ["Servidor NGINX (Puerto 80 / 443 - 10.12.4.50)"]
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

## 📖 2. MANUAL OFICIAL DE USUARIO v3.0 (OPERATIVA MÉDICA)

### 2.1 Acceso por D.N.I. y Contraseña
1. Abrí el navegador e ingresá a `http://10.12.4.50` (o `http://alassia.santafe.gob.ar`).
2. Ingresá tu **D.N.I. del Profesional** y tu **Contraseña Personal**.
3. Presioná **`[ Ingresar al Portal Hospitalario ]`**.
   * *Modo Administrador (Dirección Médica)*: Acceso total a tableros, gestión de personal, habilitación de servicios y suspensión/activación de formularios.
   * *Modo Médico Especialista*: La bandeja de entrada filtra en tiempo real únicamente los pedidos destinados a tu departamento.

### 2.2 Teclas Rápidas de Teclado (Shortcuts de Guardia)
* `Ctrl + B` (o `Cmd + B`): Enfoca el campo de **Búsqueda por DNI** del paciente en el formulario activo.
* `Ctrl + Enter`: Registra, emite y notifica el formulario en pantalla con aviso sonoro hospitalario.
* `Ctrl + Shift + L`: Cierra y bloquea la sesión por seguridad.

### 2.3 Auto-Guardado de Borradores (`Draft Auto-Save`)
* El portal guarda en tiempo real en `sessionStorage` cada palabra tipeada.
* Si se interrumpe la conexión o se apaga la PC, el formulario **se restaura automáticamente al volver** mostrando el mensaje: *`ℹ️ Borrador en progreso restaurado automáticamente.`*

### 2.4 Autocompletado de Pacientes por D.N.I. (`Base diagnose`)
1. En cualquier formulario (*Nutrición, Farmacia, Cardiología, Imágenes e Interconsulta General*), ubícate en el campo **D.N.I. del Paciente**.
2. Ingresá el DNI del niño (ej: `52190431`) y presioná `Enter` o usá `Ctrl + B`.
3. El sistema consultará a la base central `diagnose` (`10.12.4.1`) e inyectará automáticamente **Nombre Completo, Historia Clínica (HC), Edad y Sexo**, actualizando la Hoja Digital de Prescripción.

### 2.5 Emisión de Recetas de Leches y Fórmulas Lácteas
> **Restricción de Seguridad:** Únicamente los 7 servicios autorizados (*Gastroenterología, Neonatología, Nutrición, Cardiología, Tratamientos Crónicos, Internación y Clínica Pediátrica*) pueden emitir solicitudes de leches.

1. Seleccioná **`Recetario de Leches`** (Pestaña verde).
2. Seleccioná el departamento emisor autorizado.
3. Indicá el DNI del paciente, Peso Actual (PA), Diagnóstico Nutricional y la Formulación Rp1 / Rp2.
4. Si requiere retiro mensual, activá **`Fórmula de Retiro Mensual Programado`** (3, 6 o 12 meses).
5. Presioná `Ctrl + Enter` para enviar y notificar a Lactario.

### 2.6 Dictamen e Informe Médico en Bandeja de Entrada
1. Ingresá a **`Bandeja de Entrada`** en el menú lateral.
2. Seleccioná la solicitud y tocá **`[ Dictaminar ]`**.
3. Ingresá la respuesta médica e informe especializado y presioná **`[ Guardar Dictamen y Archivar ]`**. La solicitud se archivará automáticamente en la pestaña **`Archivo`**.

### 2.7 Control de Insumos Crónicos y Alarmas por Ausentismo
1. En la pestaña **`Tratamientos Crónicos`**, registrá las entregas mensuales tocando **`[ Registrar Entrega (Módulo X/Y) ]`**.
2. Si el paciente supera los 5 días de atraso en el retiro, la tarjeta mostrará **`🔴 ALARMA AUSENTISMO`**. Presioná **`[ Alerta Trabajo Social ]`** para notificar al Servicio Social.

### 2.8 Panel de Administración v3.0 (`tab-admin`)
Desde el perfil de **Dirección Médica (Admin)** podés:
* **Habilitar/Suspender Formularios (`🎛️ Control de Tipos de Pedidos`)**: Apagar o encender globalmente formularios. Los formularios suspendidos se ocultan automáticamente de la barra lateral y del tablero.
* **Control de Servicios Hospitalarios**: Habilitar/Deshabilitar departamentos enteros y gestionar los permisos de recetas de leches.
* **Asignación de Personal**: Agregar o quitar profesionales de cada especialidad.

---

## 🗄️ 3. GUÍA COMPLETA DE INSTALACIÓN DE BASE DE DATOS MYSQL

El archivo [`schema_completo_alassia.sql`](file:///C:/Users/pablo/OneDrive/Desktop/mensajeria/schema_completo_alassia.sql) incluye toda la estructura relacional (DDL) y la carga inicial de datos de prueba (DML).

### Paso 1: Creación de la Base de Datos e Importación SQL

Ejecutá los siguientes comandos en la consola del servidor MySQL / MariaDB:

```bash
# Opción 1: Importación directa en servidor local o remoto
mysql -u root -p < schema_completo_alassia.sql

# Opción 2: Especificando host IP (Servidor diagnose 10.12.4.1)
mysql -h 10.12.4.1 -u gestion_ -pGESTION_77 alassia_mensajeria < schema_completo_alassia.sql
```

### Paso 2: Tablas Creadas en el Esquema `alassia_mensajeria`

1. **`servicio`**: Catálogo de departamentos, jefe a cargo, habilitación y bandera `autorizado_leches`.
2. **`profesional`**: Usuarios y médicos del sistema con credenciales DNI, rol, matrícula y FK a `servicio`.
3. **`permiso_formulario`**: Toggles de administración (`cardio`, `general`, `farmacia`, `imagenes`, `nutri`).
4. **`paciente`**: Tabla compatible con el formato de la base central `diagnose` (`nro_doc`, `nr0_hc`, `ape_y_nom`, `fnac`, `sexo`).
5. **`solicitud`**: Prescripciones e interconsultas con estado, Rp1, Rp2, peso, módulos mensuales y respuestas médicas.
6. **`audit_log`**: Registro de auditoría inmutable con categoría, usuario, rol, detalle, timestamp e IP.

---

## 🖥️ 4. GUÍA DE DESPLIEGUE EN VMWARE VSPHERE 5.5 / UBUNTU SERVER

### Paso 1: Creación de la Máquina Virtual en VMware ESXi 5.5

1. Abrí **VMware vSphere Client 5.5** y conectate al servidor ESXi.
2. Hacé clic en **New Virtual Machine** (`Ctrl + N`) → Configuración **Custom**.
3. **Nombre**: `VM-ALASSIA-MENSAJERIA`
4. **Guest OS**: Linux → **Ubuntu Linux (64-bit)**.
5. **vCPU**: 2 Cores | **RAM**: 4096 MB (4 GB).
6. **Network**: E1000E o VMXNET3 en la VLAN Intranet del hospital (`10.12.4.X`).
7. **Disco Virtual**: 30 GB Thick Provisioned.
8. Montá la ISO de **Ubuntu Server 22.04 LTS** en la unidad DVD e iniciá la instalación.

### Paso 2: Configuración de IP Fija en Ubuntu Server

Editá la configuración de netplan:

```bash
sudo nano /etc/netplan/00-installer-config.yaml
```

Pegá la configuración de red con la IP estática oficial (`10.12.4.50`):

```yaml
network:
  version: 2
  ethernets:
    ens160:
      dhcp4: no
      addresses:
        - 10.12.4.50/24
      routes:
        - to: default
          via: 10.12.4.1
      nameservers:
        addresses:
          - 10.12.4.1
          - 8.8.8.8
```

Aplicá la red e instalá herramientas de VMware:
```bash
sudo netplan apply
sudo apt update && sudo apt install open-vm-tools -y
```

### Paso 3: Instalación del Servidor Web NGINX y PHP 8.x-FPM

```bash
sudo apt install nginx php-fpm php-mysql php-curl php-json -y
```

### Paso 4: Despliegue de Archivos y Permisos

```bash
# Crear directorio del portal
sudo mkdir -p /var/www/alassia-portal

# Clonar o copiar el proyecto
sudo cp -r * /var/www/alassia-portal/

# Asignar permisos al usuario del servidor web
sudo chown -R www-data:www-data /var/www/alassia-portal
sudo chmod -R 755 /var/www/alassia-portal
```

### Paso 5: Configuración del Virtual Host en NGINX

Editá `/etc/nginx/sites-available/alassia-portal`:

```nginx
server {
    listen 80;
    server_name 10.12.4.50 alassia.santafe.gob.ar;

    root /var/www/alassia-portal;
    index index.html index.php;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

Habilitá el sitio en NGINX y reiniciá el servicio:

```bash
sudo ln -s /etc/nginx/sites-available/alassia-portal /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

### Paso 6: Verificación de Conectividad con la Base `diagnose` (10.12.4.1)

```bash
nc -zv 10.12.4.1 3306
```
Si la respuesta es `succeeded!`, la API `buscar_paciente.php` funcionará a máxima velocidad dentro de la red.

---

## 📁 5. ESTRUCTURA DEL REPOSITORIO

```
mensajeria/
├── README.md                            # Documento Master Completo (Ficha Técnica, Usuario, BD y VMware)
├── index.html                           # Estructura principal HTML5 y componentes del portal
├── styles.css                           # Tokens CSS, modo oscuro/claro y layout responsivo
├── app.js                               # Lógica cliente ES6+, RBAC, shortcuts, borradores y audio chime
├── buscar_paciente.php                  # API Proxy PHP PDO para consulta a base diagnose (10.12.4.1)
├── schema_completo_alassia.sql          # Script DDL/DML de base de datos MySQL / MariaDB
└── docs/
    ├── guia_usuario_despliegue_alassia.md   # Manual de Usuario y Despliegue VMware/Ubuntu en Markdown
    └── documento_tecnico_arquitectura_alassia.md # Especificación Técnica y Arquitectura v3.0
```

---
*Hospital de Niños "Dr. Orlando Alassia" — Santa Fe, Argentina.*

# 🏥 Manual Oficial de Usuario & Guía de Despliegue v3.0
## Hospital de Niños "Dr. Orlando Alassia" — Santa Fe

---

## 📖 PARTE 1: Manual de Operativa Médica para Personal de Salud

### 1. Acceso al Portal y Autenticación por D.N.I.
1. Abrí el navegador web e ingresá a la dirección intranet del hospital: `http://10.12.4.50` (o `http://alassia.santafe.gob.ar`).
2. En la **Pantalla Oficial de Login**, ingresá tu **D.N.I. del Profesional** y tu **Contraseña Personal**.
3. Presioná **`[ Ingresar al Portal Hospitalario ]`**.
   * *Modo Administrador (Dirección Médica)*: Acceso total a tableros, gestión de personal, habilitación de servicios y suspensión/activación de formularios.
   * *Modo Médico Especialista*: La bandeja de entrada filtra en tiempo real únicamente los pedidos destinados a tu departamento.

---

### 2. Teclas Rápidas de Teclado (Shortcuts de Guardia)
Para acelerar la carga en consultorios y guardia pediátrica:
* `Ctrl + B` (o `Cmd + B`): Enfoca e ingresa inmediatamente al campo de **Búsqueda por DNI** del paciente en el formulario activo.
* `Ctrl + Enter`: Registra, emite y notifica el formulario en pantalla de forma instantánea.
* `Ctrl + Shift + L`: Cierra y bloquea la sesión por seguridad.

---

### 3. Recuperación Automática de Borradores (`Draft Auto-Save`)
* El portal guarda en segundo plano cada palabra tipeada en `sessionStorage`.
* Si se interrumpe la conexión, se apaga la PC o cambiás de pestaña por error, el formulario **se restaura automáticamente al volver** mostrando la notificación: *`ℹ️ Borrador en progreso restaurado automáticamente.`*

---

### 4. Autocompletado Automático por D.N.I. (`Base diagnose`)
1. En cualquiera de los formularios de emisión (*Nutrición, Farmacia, Cardiología, Imágenes e Interconsulta General*), posicionate en el campo **D.N.I. del Paciente**.
2. Escribí el número de documento del niño (ej: `52190431`) y presioná **`Enter`**, tocá **`[ 🔍 Buscar ]`** o usá **`Ctrl + B`**.
3. **Respuesta Instantánea:** El sistema consultará a la base de datos central `diagnose` (Servidor `10.12.4.1`) e inyectará automáticamente:
   * **Nombre y Apellido Completo del niño**
   * **Número de Historia Clínica (HC)**
   * **Edad / Fecha de Nacimiento**
   * **Actualización en tiempo real de la Hoja de Papel Digital del lado derecho.**

---

### 5. Emisión de Recetas de Leches y Fórmulas Lácteas (`Nutrición y Lactario`)
> **Restricción de Seguridad:** Únicamente los 7 servicios autorizados (*Gastroenterología, Neonatología, Nutrición, Cardiología, Tratamientos Crónicos, Internación y Clínica Pediátrica*) pueden emitir solicitudes de leches.

1. En el menú lateral, hacé clic en **`Recetario de Leches`** (Pestaña verde).
2. En el desplegable **`🏥 Servicio Solicitante Autorizado`**, seleccioná el departamento al que pertenecés.
3. Ingresá el DNI del paciente y tocá **`[ 🔍 Buscar ]`** para autocompletar sus datos.
4. Indicá el **Peso Actual (PA)** y el **Diagnóstico Nutricional** (ej: *APLV / Lactante menor*).
5. Completá el **Rp1** con la fórmula (ej: *Fórmula de Inicio Extensamente Hidrolizada (Sin Lactosa)*), dilución y número de tomas.
6. **Esquema Recurrente de Retiro Mensual:** Si el paciente debe retirar latas/módulos todos los meses, activá la casilla **`Fórmula de Retiro Mensual Programado`** y seleccioná la duración (3, 6 o 12 meses).
7. Presioná **`[ Prescribir y Enviar por Email a Lactario ]`** o presioná `Ctrl + Enter`. Sonará la alerta audible de confirmación hospitalaria.

---

### 6. Emisión de Interconsultas y Pedidos Pediátricos
1. Seleccioná el formulario según la especialidad requerida:
   * **`Cardiología`**: Para ecocardiogramas, ECG y auscultaciones.
   * **`Interconsulta General`**: Derivaciones clínicas entre salas e internación.
   * **`Farmacia & Recetas`**: Prescripción de medicamentos pediátricos y crónicos.
   * **`Diagnóstico por Imágenes`**: Radiografías (RX), Ecografías, Tomografía (TAC) y Resonancias (RMN).
2. Buscá al paciente por DNI.
3. Seleccioná el **Personal a Cargo Notificado** que recibirá la orden en su bandeja.
4. Escribí el motivo de consulta e indicación clínica.
5. Hacé clic en **`[ Registrar y Notificar Personal ]`**. Podés imprimir la copia física tocando **`[ Imprimir Sheet ]`**.

---

### 7. Dictamen e Informe Médico en Bandeja de Entrada
1. Ingresá a **`Bandeja de Entrada`** en la barra lateral.
2. Seleccioná la solicitud pendiente y tocá **`[ Dictaminar ]`**.
3. Seleccioná el estado **`Confirmado / Resuelto`**, escribí la respuesta médica / informe y presioná **`[ Guardar Dictamen y Archivar ]`**.
4. La solicitud **desaparecerá inmediatamente de la bandeja activa** y quedará resguardada en el historial de **`Archivo`**.

---

### 8. Control de Insumos Crónicos y Alarmas por Ausentismo
1. Ingresá a la pestaña **`Tratamientos Crónicos`**.
2. **Entrega de Módulo:** Cuando la familia concurre a retirar el medicamento/leche, tocá **`[ Registrar Entrega (Módulo X/Y) ]`**. El sistema reprogramará la entrega en 30 días.
3. **Alarma de Ausentismo:** Si pasaron más de 5 días de la fecha fijada y el paciente no retiró, la tarjeta cambiará a **`🔴 ALARMA AUSENTISMO`**. Tocá **`[ Alerta Trabajo Social ]`** para enviar un aviso prioritario a Servicio Social y Pediatría.

---

### 9. Panel de Administración v3.0 (`tab-admin`)
Desde el perfil de **Dirección Médica (Admin)** podés:
1. **Control de Formularios (`🎛️ Control de Tipos de Pedidos`)**: Habilitar o suspender temporalmente la emisión de cualquier formulario (**`🟢 HABILITADO / 🔴 SUSPENDIDO`**).
2. **Control de Servicios Hospitalarios**: Activar/desactivar departamentos enteros.
3. **Autorización de Leches**: Otorgar o revocar privilegios para prescripción de fórmulas lácteas por servicio.
4. **Asignación de Personal**: Agregar o quitar profesionales de la lista a cargo de cada departamento.

---

### 10. Registro de Auditoría y Trazabilidad (`Audit Trail`)
1. En la pestaña **`Auditoría & Logs`**, consultá el historial inmutable con fecha, hora, usuario, matrícula, servicio, acción e IP de la terminal.
2. Filtrá por categoría o tocá **`[ Exportar Audit Log ]`** para imprimir el informe legal para auditorías de salud.

---

## 🖥️ PARTE 2: Guía de Despliegue Técnico en Servidor Ubuntu sobre VMware vSphere 5.5 (ESXi)

### 1. Requisitos Previos e Infraestructura
* **Hypervisor**: VMware vSphere ESXi 5.5 (o vCenter 5.5).
* **Sistema Operativo Guest**: Ubuntu Server 22.04 LTS (o 20.04 LTS) 64-bit.
* **Recursos Recomendados para la VM**:
  * vCPU: 2 Cores
  * RAM: 4 GB
  * Disco Virtual: 30 GB Thick Provisioned / Thin Provisioned (VMFS 5)
  * Red: vSwitch conectado a la VLAN de Intranet (`10.12.4.X`)

---

### 2. Paso 1: Creación e Instalación de la VM en vSphere Client 5.5

1. Abrí **VMware vSphere Client 5.5** y conectate al servidor ESXi o vCenter.
2. Hacé clic derecho sobre el Host/Cluster → **New Virtual Machine** (`Ctrl + N`).
3. Seleccioná configuración **Custom**:
   * **Name**: `VM-ALASSIA-MENSAJERIA`
   * **Guest OS**: Linux → **Ubuntu Linux (64-bit)** (Si no figura 22.04 en vSphere 5.5, elegí *Other Linux 64-bit* o *Ubuntu Linux 64-bit*).
   * **CPUs**: 2 Sockets / 1 Core por socket.
   * **Memory**: 4096 MB.
   * **Network**: E1000E o VMXNET3 (conectado a la red Intranet del hospital).
   * **SCSI Controller**: LSI Logic Parallel / VMware Paravirtual.
   * **Disk**: Create a new virtual disk → 30 GB.
4. Montá la ISO de **Ubuntu Server** en la unidad CD/DVD virtual e iniciá la máquina virtual.
5. Completá la instalación estándar de Ubuntu Server.

---

### 3. Paso 2: Configuración de Red Estática en Ubuntu Server
Conectate por consola o SSH e ingresá a la configuración de netplan:

```bash
sudo nano /etc/netplan/00-installer-config.yaml
```

Configurá una IP fija dentro de la red del hospital (ejemplo `10.12.4.50`):

```yaml
network:
  version: 2
  ethernets:
    ens160: # O el nombre de tu interfaz ethernet
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

Aplicá la configuración e instalá herramientas de VMware:
```bash
sudo netplan apply
sudo apt update && sudo apt upgrade -y
sudo apt install open-vm-tools -y
```

---

### 4. Paso 3: Instalación del Servidor Web (NGINX + PHP FPM)

Instalá NGINX, PHP y el módulo de conexión a MySQL PDO:

```bash
sudo apt install nginx php-fpm php-mysql php-curl php-json -y
```

Verificá la versión de PHP instalada (por ej. `php8.1-fpm` o `php8.2-fpm`):
```bash
php -v
```

---

### 5. Paso 4: Despliegue del Código Fuente del Portal Hospitalario

1. Creá el directorio de la aplicación en el servidor:
```bash
sudo mkdir -p /var/www/alassia-portal
sudo chown -R $USER:www-data /var/www/alassia-portal
```

2. Copiá los archivos del proyecto al servidor (`index.html`, `styles.css`, `app.js`, `buscar_paciente.php`):
```bash
# Podés clonar el repositorio git o copiar por SCP desde tu PC:
scp -r * usuario@10.12.4.50:/var/www/alassia-portal/
```

3. Asegurá los permisos correctos de lectura y ejecución:
```bash
sudo chown -R www-data:www-data /var/www/alassia-portal
sudo chmod -R 755 /var/www/alassia-portal
```

---

### 6. Paso 5: Configuración del Virtual Host en NGINX

Creá el archivo de configuración para NGINX:

```bash
sudo nano /etc/nginx/sites-available/alassia-portal
```

Pegá la siguiente configuración oficial:

```nginx
server {
    listen 80;
    server_name 10.12.4.50 alassia.santafe.gob.ar;

    root /var/www/alassia-portal;
    index index.html index.php;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Procesamiento de API PHP (Conexión a base diagnose 10.12.4.1)
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock; # Ajustar versión de PHP según corresponda
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # Deshabilitar acceso a archivos ocultos
    location ~ /\.ht {
        deny all;
    }

    # Caché optimizada para recursos estáticos
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
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

---

### 7. Paso 6: Verificación de Conectividad con la Base `diagnose` (10.12.4.1)

Verificá desde la máquina virtual Ubuntu que tenés conectividad contra el servidor de base de datos MySQL en `10.12.4.1`:

```bash
nc -zv 10.12.4.1 3306
```

Si responde `Connection to 10.12.4.1 3306 port [tcp/mysql] succeeded!`, la API `buscar_paciente.php` funcionará a máxima velocidad dentro de la red del hospital.

---

### 📌 Resumen de Credenciales y Rutas

* **URL Acceso Intranet**: `http://10.12.4.50`
* **Directorio del Sistema**: `/var/www/alassia-portal`
* **Base de Datos Consultada**: `10.12.4.1` (DB: `diagnose`, Tabla: `paciente`)
* **Logs del Servidor Web**: `/var/log/nginx/error.log`

---
*Manual Oficial v3.0 — Hospital de Niños "Dr. Orlando Alassia".*

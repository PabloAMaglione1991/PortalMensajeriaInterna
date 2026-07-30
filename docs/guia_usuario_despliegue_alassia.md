# 🏥 Manual Oficial de Usuario & Guía de Despliegue v4.0
## Hospital de Niños "Dr. Orlando Alassia" — Santa Fe

---

## 📖 PARTE 1: Manual de Operativa Médica para Personal de Salud

### 1. Acceso al Portal y Autenticación por D.N.I.
1. Abrí el navegador e ingresá a la dirección intranet del hospital: `http://10.12.4.221/mensajeria/` (o `http://alassia.santafe.gob.ar/mensajeria/`).
2. En la **Pantalla Oficial de Login**, ingresá tu **D.N.I. del Profesional** y tu **Contraseña Personal**.
3. Presioná **`[ Ingresar al Portal Hospitalario ]`**.
   * *Modo Administrador (Dirección Médica)*: Acceso total a tableros, gestión de personal, alta de nuevos usuarios con DNI/clave, habilitación de servicios y suspensión/activación de formularios.
   * *Modo Médico Especialista*: La bandeja de entrada filtra en tiempo real únicamente los pedidos destinados a tu departamento. Los menúes de Administración y Auditoría se ocultan automáticamente por seguridad RBAC.

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

### 4. Autocompletado Automático por D.N.I. (`Base diagnose 10.12.4.1`)
1. En cualquiera de los formularios de emisión (*Nutrición, Farmacia, Cardiología, Imágenes e Interconsulta General*), posicionate en el campo **D.N.I. del Paciente**.
2. Escribí el número de documento del niño (ej: `52190431`) y presioná **`Enter`**, tocá **`[ 🔍 Buscar ]`** o usá **`Ctrl + B`**.
3. **Respuesta Instantánea:** El sistema consultará a la base de datos central `diagnose` en modo LECTURA (Servidor `10.12.4.1`) e inyectará automáticamente:
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

### 6. Dictamen e Informe Médico en Bandeja de Entrada
1. Ingresá a **`Bandeja de Entrada`** en la barra lateral.
2. Seleccioná la solicitud pendiente y tocá **`[ Dictaminar ]`**.
3. Seleccioná el estado **`Confirmado / Resuelto`**, escribí la respuesta médica / informe y presioná **`[ Guardar Dictamen y Archivar ]`**.
4. La solicitud **desaparecerá inmediatamente de la bandeja activa** y quedará resguardada en el historial de **`Archivo`**.

---

### 7. Control de Insumos Crónicos y Alarmas por Ausentismo
1. Ingresá a la pestaña **`Tratamientos Crónicos`**.
2. **Entrega de Módulo:** Cuando la familia concurre a retirar el medicamento/leche, tocá **`[ Registrar Entrega (Módulo X/Y) ]`**. El sistema reprogramará la entrega en 30 días.
3. **Alarma de Ausentismo:** Si pasaron más de 5 días de la fecha fijada y el paciente no retiró, la tarjeta cambiará a **`🔴 ALARMA AUSENTISMO`**. Tocá **`[ Alerta Trabajo Social ]`** para enviar un aviso prioritario a Servicio Social y Pediatría.

---

### 8. Panel de Administración v4.0 (`tab-admin`)
Desde el perfil de **Dirección Médica (Admin)** podés:
1. **Alta de Nuevos Usuarios (`👤 Alta de Usuarios y Profesionales`)**: Formulario para crear cuentas con DNI, Contraseña, Matrícula, Servicio asignado y nivel de acceso (Admin o Médico).
2. **Control de Formularios (`🎛️ Control de Tipos de Pedidos`)**: Habilitar o suspender temporalmente la emisión de cualquier formulario (**`🟢 HABILITADO / 🔴 SUSPENDIDO`**).
3. **Control de Servicios Hospitalarios**: Activar/desactivar departamentos enteros.
4. **Autorización de Leches**: Otorgar o revocar privilegios para prescripción de fórmulas lácteas por servicio.

---

### 9. Registro de Auditoría y Trazabilidad (`Audit Trail`)
1. En la pestaña **`Auditoría & Logs`**, consultá el historial inmutable con fecha, hora, usuario, matrícula, servicio, acción e IP de la terminal.
2. Filtrá por categoría (`LOGIN`, `CREACION`, `RESOLUCION`, `ADMIN`, `LECHES`, `ALARMA`) o tocá **`[ Exportar Audit Log ]`** para imprimir el informe legal.

---

## 🖥️ PARTE 2: Guía de Despliegue Técnico en Servidor Ubuntu / Apache2 (IP: 10.12.4.221)

### 1. Arquitectura de Doble Base de Datos
* **Servidor Central (`10.12.4.1`)**: Base `diagnose` (READ-ONLY) para consulta de pacientes.
* **Servidor Aplicación (`10.12.4.2`)**: Base `alassia_mensajeria` (READ-WRITE) para solicitudes, usuarios, permisos y auditoría.

---

### 2. Configuración en Apache2 para Convivencia de Portales (`Alias /mensajeria`)

Si ya tenés un portal corriendo en la raíz `http://10.12.4.221/` (ej: `/var/www/Portal Unificado/public`), desplegá este sistema en `/var/www/Portal Unificado/public/mensajeria` o mediante un Alias:

Editá `/etc/apache2/sites-available/000-default.conf`:

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

Asegúrate de habilitar permisos globales en `/etc/apache2/apache2.conf`:

```apache
<Directory /var/www/>
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>
```

Reiniciá el servidor:
```bash
sudo apache2ctl configtest
sudo systemctl restart apache2
```

---
*Manual Oficial v4.0 — Hospital de Niños "Dr. Orlando Alassia".*

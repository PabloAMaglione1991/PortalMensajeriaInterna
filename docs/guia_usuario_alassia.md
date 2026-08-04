# 📖 Guía de Usuario — Portal Digital de Mensajería, Recetas e Interconsultas
### Hospital de Niños "Dr. Orlando Alassia" • Santa Fe (Versión Oficial Actualizada 2026)

---

## 📌 Introducción
El Portal Digital de Mensajería, Recetas e Interconsultas del Hospital de Niños "Dr. Orlando Alassia" es la plataforma clínica oficial diseñada para agilizar la comunicación inter-hospitalaria, la emisión de solicitudes médicas, la dispensa de recetas y el control de entrega de fórmulas lácteas e insumos pediátricos.

---

## 🔑 1. Inicio de Sesión y Perfiles de Acceso (RBAC)
Cada profesional de la salud accede con sus credenciales personales (**D.N.I.** y **Contraseña**). El sistema detecta automáticamente tu especialidad y adapta la interfaz a tu rol:

### 🎭 Perfiles Hospitalarios Habilitados:
* **Cardiología Infantil:** Emisión y recepción de evaluaciones cardiológicas, ECG y Ecocardiogramas.
* **Nutrición y Lactario:** Prescripción oficial de fórmulas lácteas y módulos calóricos (APLV).
* **Farmacia Hospitalaria:** Emisión y dispensa de recetas electrónicas de medicamentos y tratamientos crónicos.
* **Diagnóstico por Imágenes:** Pedidos de ecografía, radiografía (RX), tomografía (TAC) y resonancia (RMN).
* **Servicio Social Hospitalario:** Recepción exclusiva de alertas privadas por inasistencia/ausentismo de pacientes a retiros.
* **Internación General / Clínica Pediátrica:** Emisión de interconsultas generales entre salas.
* **Dirección Médica (Admin):** Auditoría total, gestión CRUD de cuentas de usuarios, alta de servicios y control de permisos.

---

## 🖥️ 2. Navegación Simplicada y Notificaciones de Equipo
Al ingresar con tu usuario:
* **Dashboard Personalizado:** Ves únicamente la tarjeta de bienvenida con tu nombre y las acciones directas de tu especialidad.
* **Notificación Colectiva al Equipo Completo:** Los pedidos no se asignan a un médico individual (para evitar bloqueos por ausencia o cambio de turno). Al emitir una receta o consulta, **se notifica e ingresa a la bandeja de entrada compartida de todo el equipo receptor**.
* **Barra de Acceso Rápido en la Cabecera:**
  * **`[ 📥 Pendientes ]`** → Acceso en 1 clic a la Bandeja de Entrada.
  * **`[ ➕ Emisión ]`** → Acceso en 1 clic a emitir nuevos pedidos.
  * **`[ 📂 Archivo ]`** → Acceso en 1 clic a consultar solicitudes resueltas.

---

## 📥 3. Bandeja de Entrada y Registro de Entregas (`[ 📦 Entregar ]`)

### A. Pedidos y Recetas de Una Sola Vez (Entregas Únicas):
1. Abrí la **`Bandeja de Entrada`** (`#tab-inbox`).
2. En la lista de solicitudes pendientes, presioná el botón verde **`[ 📦 Entregar ]`**.
3. Se abrirá el modal de confirmación donde podés cargar una breve nota o indicación (ej: *"Amoxicilina entregada en farmacia a la madre"*).
4. Tocá **`[ 🟢 Registrar Entrega y Archivar ]`**. La solicitud se dará por resuelta y pasará automáticamente al **`Archivo de Resueltos`** (`#tab-archive`).

### B. Retiros Mensuales y Tratamientos Crónicos:
1. En la solapa **Retiros Mensuales & Alarmas** (`#tab-recurrencia`), visualizás las tarjetas de tratamientos por módulos (Módulo 1/6, 2/6, etc.).
2. Para registrar cada entrega mensual, tocá **`[ 🟢 Registrar Entrega (Módulo X/Y) ]`**.
3. **¿Te equivocaste o hiciste clic por error?** Tocá el botón amarillo **`[ ↩️ Deshacer Entrega ]`**. El sistema te pedirá confirmación y devolverá el tratamiento exactamente al módulo y fecha anterior sin alterar el historial.

---

## 📄 4. Descarga Directa de PDF (Sin Ventanas de Impresora)
En cualquier formulario, solicitud o dictamen médico:
1. Completá los datos del paciente (búsqueda automática por DNI en la base central `diagnose`).
2. Presioná **`[ Descargar PDF ]`**.
3. El archivo `.pdf` en formato de recetario médico oficial del Hospital Alassia se guardará **directamente en tu carpeta de Descargas** sin abrir ventanas del sistema operativo ni controladores de impresión física.

---

## 🚨 5. Alarmas de Ausentismo a Servicio Social
* Si un paciente supera los días fijados para retirar su insumo o leche, la tarjeta se tornará de color rojo (**`🔴 ALARMA AUSENTISMO`**).
* Al presionar **`[ 🔴 Alerta Trabajo Social ]`**, se genera una orden de intervención que se despacha **de manera privada y exclusiva al perfil de Servicio Social Hospitalario** (`Lic. Viviana Roldán`), para coordinar la visita domiciliaria o llamado a la familia.

---

## 🛡️ 6. Módulo de Administración General (Exclusivo Dirección)
En la solapa **`[ 🛠️ Administración ]`**:
* **CRUD de Usuarios:** Alta de nuevos profesionales con DNI y Clave, y tabla de gestión/borrado de cuentas habilitadas.
* **CRUD de Servicios Hospitalarios:** Alta de nuevos departamentos (código, jefe, email) y botón `[ 🗑️ ]` para eliminar servicios en desuso.
* **Control Quirúrgico de Permisos:** Interruptores para habilitar/deshabilitar formularios de emisión y activar/desactivar la pestaña de *Reportes & Métricas por Sector*.

---

## 🚪 7. Cierre de Sesión Seguro
Al finalizar tu turno o guardia:
* Dirigite al pie del menú lateral.
* Encontrá tu tarjeta profesional fija con tu nombre y matrícula.
* Presioná el botón rojo **`[ 🚪 Cerrar Sesión ]`** para bloquear el portal e ingresar con otro usuario de forma segura.

---
*Hospital de Niños Dr. Orlando Alassia • Ministerio de Salud de Santa Fe*

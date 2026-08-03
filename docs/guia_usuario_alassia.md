# 📖 Guía de Usuario — Portal Digital de Mensajería e Interconsultas
### Hospital de Niños "Dr. Orlando Alassia" • Santa Fe

---

## 📌 Introducción
El Portal Digital de Mensajería, Recetas e Interconsultas del Hospital de Niños "Dr. Orlando Alassia" es una plataforma clínica interna diseñada para agilizar la comunicación inter-hospitalaria, la emisión de solicitudes médicas y el control de entrega de insumos/leches pediátricas.

---

## 🔑 1. Inicio de Sesión y Perfiles de Acceso (RBAC)
Cada profesional de la salud accede con sus credenciales personales (**D.N.I.** y **Contraseña**). 

### 🎭 Perfiles y Especialidades Disponibles:
* **Cardiología Infantil:** Emisión y recepción de evaluaciones cardiológicas, ECG y Ecocardiogramas.
* **Nutrición y Lactario:** Prescripción oficial de fórmulas lácteas y módulos calóricos (APLV).
* **Farmacia Hospitalaria:** Emisión de recetas electrónicas de medicamentos y tratamientos crónicos.
* **Diagnóstico por Imágenes:** Pedidos de ecografía, radiografía (RX), tomografía (TAC) y resonancia (RMN).
* **Servicio Social Hospitalario:** Recepción exclusiva de alertas por inasistencia/ausentismo de pacientes a retiros.
* **Internación General / Clínica Pediátrica:** Emisión de interconsultas generales entre salas.
* **Dirección Médica (Admin):** Auditoría total, gestión CRUD de usuarios y control de permisos por servicio.

---

## 🖥️ 2. Panel General Personalizado (Dashboard)
Al ingresar con tu usuario:
* **Tu espacio es 100% limpio y personalizado:** Ves únicamente la tarjeta de bienvenida con tu nombre y tu servicio activo.
* **Acciones Rápida Directas:** Solo ves las tarjetas de emisión pertenecientes a tu especialidad (por ejemplo, Cardiología solo ve *Interconsulta Cardiología* e *Interconsulta General*).
* **Barra de Acceso Rápido en la Cabecera:**
  * **`[ 📥 Pendientes ]`** → Te lleva directo a tu bandeja de entrada.
  * **`[ ➕ Emisión ]`** → Te lleva a emitir nuevas solicitudes.
  * **`[ 📂 Archivo ]`** → Te lleva a consultar solicitudes resueltas.

---

## 📄 3. Descarga Directa de PDF (Sin Ventanas de Impresora)
En cualquier formulario, solicitud o dictamen médico:
1. Completá los datos del paciente (búsqueda automática por DNI en base central `diagnose`).
2. Presioná **`[ Descargar PDF ]`**.
3. El archivo `.pdf` con formato oficial del Hospital Alassia se guardará **directamente en tu carpeta de Descargas del equipo** sin abrir ventanas emergentes ni impresoras físicas.

---

## 🚨 4. Alarmas de Ausentismo y Alerta a Servicio Social
En la pestaña **Retiros Mensuales & Alarmas** (disponible para servicios que administran tratamientos crónicos):
* Si un paciente se atrasa en el retiro de su fórmula láctea o medicamento, la tarjeta se torna de color rojo (**`🔴 ALARMA AUSENTISMO`**).
* Presioná el botón **`[ 🔴 Alerta Trabajo Social ]`**.
* La alerta se despacha de **manera privada y exclusiva al perfil de Servicio Social Hospitalario** (`Lic. Viviana Roldán`), para que el equipo social gestione el contacto o visita domiciliaria a la familia.

---

## 🚪 5. Cierre de Sesión Seguro
Al finalizar tu turno o guardia:
* Dirigite al pie del menú lateral.
* Encontraras tu tarjeta profesional fija con tu nombre y matrícula.
* Presioná el botón rojo **`[ 🚪 Cerrar Sesión ]`** para bloquear el portal e ingresar con otro usuario de forma segura.

---
*Hospital de Niños Dr. Orlando Alassia • Ministerio de Salud de Santa Fe*

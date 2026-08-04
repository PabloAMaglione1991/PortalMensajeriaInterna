# 📖 Guía de Usuario — Portal Digital de Mensajería, Recetas e Interconsultas
### Hospital de Niños "Dr. Orlando Alassia" • Santa Fe (Versión Oficial Actualizada 2026)

---

## 📌 Introducción
El Portal Digital de Mensajería, Recetas e Interconsultas del Hospital de Niños "Dr. Orlando Alassia" es la plataforma clínica oficial diseñada para agilizar la comunicación inter-hospitalaria, la emisión de solicitudes médicas, la dispensa de recetas y el control de entrega de fórmulas lácteas e insumos pediátricos.

---

## 🔑 1. Pantalla de Acceso Institucional Amigable (Santa Fe Capital)
El portal cuenta con una pantalla de inicio de sesión **simple, cálida y limpia**, diseñada con los colores institucionales pediátricos del **Hospital de Niños Dr. Orlando Alassia • Ministerio de Salud de Santa Fe**:

* **Fondo Pediátrico Cálido:** Gradiente suave en tonos celeste Santa Fe (`#0284c7`) y turquesa/menta hospitalario (`#0d9488`).
* **Tarjeta Central Limpia:** Cuadro de diálogo blanco con el logo oficial del hospital e identificación institucional.
* **Ocultar/Mostrar Contraseña:** Botón con ícono de ojo para revisar la clave antes de ingresar.
* **Acceso Rápido de Prueba (1 Clic):** Botones directos para autocompletar credenciales de prueba (*Dirección Médica*, *Cardiología*, *Nutrición*, *Farmacia* y *Servicio Social*).

---

## 🔍 2. Buscadores en Tiempo Real por DNI, Paciente y Código ID
Dada la masividad asistencial del Hospital Alassia, se incorporaron **buscadores interactivos instantáneos** en las 3 secciones operativas clave:

1. **Buscador en Bandeja de Entrada (`#tab-inbox`):** Campo `🔍 Buscar por DNI, paciente o Código ID...` que filtra en vivo solicitudes pendientes y en seguimiento.
2. **Buscador en Retiros Mensuales & Alarmas (`#tab-recurrencia`):** Campo `🔍 Buscar retiros por DNI, paciente o Código ID...` para ubicar tarjetas de tratamientos crónicos de leches o fármacos en microsegundos.
3. **Buscador en Archivo Histórico (`#tab-archive`):** Campo `🔍 Buscar en archivo por DNI, paciente o ID...` para consultar expedientes o entregas resueltas pasadas.

---

## 📥 3. Matriz de Permisos en la Bandeja de Entrada: Seguimiento vs. Dispensa

El sistema implementa una matriz de visibilidad y autorización quirúrgica:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 📤 SERVICIO EMISOR (Ej: Clínica Pediátrica / Neonatología)                   │
│ ➔ Muestra el pedido en la Bandeja bajo la solapa [ 📤 Enviados en Seguimiento]│
│ ➔ Permite ver el estado en vivo (🟠 Pendiente, 🔵 En Proceso, 🟢 Resuelto) │
│ ➔ Muestra el botón bloqueado: [ 🔒 Entrega por Nutrición / Farmacia ]        │
├─────────────────────────────────────────────────────────────────────────────┤
│ 📥 SERVICIO RECEPTOR (Ej: Nutrición y Lactario / Farmacia)                  │
│ ➔ Muestra el pedido bajo la solapa [ 📥 Recibidos para Entregar ]            │
│ ➔ TIENE AUTORIZACIÓN EXCLUSIVA PARA ENTREGAR Y CAMBIAR ESTADOS              │
│ ➔ Botón verde activo: [ 📦 Entregar ] y selector de estados                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📦 4. Registro de Entregas y Reversión de Errores (`[ 📦 Entregar ]`)

### A. Entrega de Recetas o Formularios Únicos:
1. Al estar logueado en el servicio receptor (ej: *Nutrición* para leches o *Farmacia* para medicamentos), ingresá a la **`Bandeja de Entrada`** (`#tab-inbox`).
2. Presioná el botón verde **`[ 📦 Entregar ]`**.
3. Carga el informe de respuesta o indicación de dispensa (ej: *"Fórmula extensamente hidrolizada 150cc entregada a la madre"*).
4. Presioná **`[ 🟢 Registrar Entrega y Archivar ]`**. La solicitud se dará por resuelta y se archivará.

### B. Retiros Mensuales y Deshacer Errores:
1. En la solapa **Retiros Mensuales & Alarmas** (`#tab-recurrencia`), visualizás las tarjetas de tratamientos por módulos (Módulo 1/6, 2/6, etc.).
2. Para registrar cada entrega mensual, tocá **`[ 🟢 Registrar Entrega (Módulo X/Y) ]`**.
3. **¿Hiciste clic por error?** Tocá el botón amarillo **`[ ↩️ Deshacer Entrega ]`**. El sistema te pedirá confirmación y devolverá el tratamiento al módulo anterior sin borrar el historial de auditoría.

---

## 📄 5. Descarga Directa de PDF (Sin Ventanas de Impresora)
En cualquier formulario, solicitud o dictamen médico:
1. Completá los datos del paciente (búsqueda automática por DNI en la base central `diagnose`).
2. Presioná **`[ Descargar PDF ]`**.
3. El archivo `.pdf` en formato de recetario médico oficial del Hospital Alassia se guardará **directamente en tu carpeta de Descargas** sin abrir ventanas del sistema operativo.

---

## 🚨 6. Alarmas de Ausentismo a Servicio Social
* Si un paciente supera los días fijados para retirar su insumo o leche, la tarjeta se tornará de color rojo (**`🔴 ALARMA AUSENTISMO`**).
* Al presionar **`[ 🔴 Alerta Trabajo Social ]`**, se genera una orden de intervención despachada **de manera privada y exclusiva al perfil de Servicio Social Hospitalario** (`Lic. Viviana Roldán`).

---

## 🛠️ 7. Módulo de Administración General (Exclusivo Dirección)
En la solapa **`[ 🛠️ Administración ]`**:
* **CRUD de Usuarios:** Alta de nuevos profesionales con DNI y Clave, y tabla de gestión/borrado de cuentas habilitadas.
* **CRUD de Servicios Hospitalarios:** Alta de nuevos departamentos (código, jefe, email) y botón `[ 🗑️ ]` para eliminar servicios en desuso.
* **Control Quirúrgico de Permisos:** Interruptores para habilitar/deshabilitar formularios de emisión y activar/desactivar la pestaña de *Reportes & Métricas por Sector*.

---

## 🚪 8. Cierre de Sesión Seguro
Al finalizar tu turno o guardia:
* Dirigite al pie del menú lateral.
* Encontrá tu tarjeta profesional fija con tu nombre y matrícula.
* Presioná el botón rojo **`[ 🚪 Cerrar Sesión ]`** para bloquear el portal e ingresar con otro usuario de forma segura.

---
*Hospital de Niños Dr. Orlando Alassia • Ministerio de Salud de Santa Fe*

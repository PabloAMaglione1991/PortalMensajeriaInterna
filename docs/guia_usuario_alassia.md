# 📖 Guía de Usuario — Portal Digital de Mensajería, Recetas e Interconsultas
### Hospital de Niños "Dr. Orlando Alassia" • Santa Fe (Versión Oficial Actualizada 2026)

---

## 📌 Introducción
El Portal Digital de Mensajería, Recetas e Interconsultas del Hospital de Niños "Dr. Orlando Alassia" es la plataforma clínica oficial diseñada para agilizar la comunicación inter-hospitalaria, la emisión de solicitudes médicas, la dispensa de recetas y el control de entrega de fórmulas lácteas e insumos pediátricos.

---

## 🔑 1. Pantalla de Acceso Institucional Humano (Santa Fe Capital)
La pantalla de inicio de sesión fue diseñada siguiendo **estándares de software gubernamental e institucional humano**, alejándose de plantillas genéricas de IA:

* **Barra Superior Institucional:** Franja superior sobria de color azul noche (`#0f172a`) con el sello oficial **GOBIERNO DE LA PROVINCIA DE SANTA FE • Ministerio de Salud** e identificación de la Red Intranet.
* **Tarjeta Clínica Limpia:** Formulario central sobrio con acento superior azul hospitalario (`#0284c7`), tipografía limpia de alta legibilidad (`Inter` / `Outfit`) y bordes nítidos de 8px.
* **Ocultar/Mostrar Contraseña:** Botón con ícono de ojo para revisar la clave antes de ingresar.
* **Acceso Rápido Asistencial de Prueba:** Lista limpia y ordenada para autocompletar credenciales en 1 clic durante guardias (*Dirección Médica*, *Cardiología*, *Nutrición*, *Farmacia* y *Servicio Social*).

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
* **Control Quirúrgico de Permisos:** Interruptores para habilitar/deshabilitar formularios de emisión.
* **Matriz de Habilitación de Reportes & Métricas:** Panel centralizado para habilitar o restringir el acceso a la pestaña de estadísticas sectoriales por servicio de forma individual (`[ 📊 HABILITADO / 🚫 RESTRINGIDO ]`) o masiva (`[ 📊 Habilitar A TODOS ]` / `[ 🚫 Deshabilitar A TODOS ]`).

---

## 🚪 8. Cierre de Sesión Seguro
Al finalizar tu turno o guardia:
* Dirigite al pie del menú lateral.
* Encontrá tu tarjeta profesional fija con tu nombre y matrícula.
* Presioná el botón rojo **`[ 🚪 Cerrar Sesión ]`** para bloquear el portal e ingresar con otro usuario de forma segura.

---
*Hospital de Niños Dr. Orlando Alassia • Ministerio de Salud de Santa Fe*

# 📖 MANUAL DE USUARIO & OPERACIONES CLÍNICAS
## Portal de Mensajería Interna, Interconsultas & Recetario Digital
### Hospital de Niños Dr. Orlando Alassia • Santa Fe

---

## ÍNDICE DE CONTENIDOS
1. [Acceso al Sistema y Roles de Usuario](#1-acceso-al-sistema-y-roles-de-usuario)
2. [Búsqueda Rápida de Pacientes por DNI (Conexión Central Diagnose)](#2-búsqueda-rápida-de-pacientes-por-dni)
3. [Emisión de Interconsultas Médicas (Cardiología, Especialidades, Imágenes)](#3-emisión-de-interconsultas-médicas)
4. [Emisión de Recetas Electrónicas y Fórmulas Lácteas](#4-emisión-de-recetas-electrónicas-y-fórmulas-lácteas)
5. [Bandeja de Entrada, Filtros de Seguimiento y Notificaciones](#5-bandeja-de-entrada-filtros-de-seguimiento-y-notificaciones)
6. [Registro de Entrega, Dictamen Médico y Archivado de Solicitudes](#6-registro-de-entrega-dictamen-médico-y-archivado-de-solicitudes)
7. [Control de Retiros Mensuales & Alarmas de Ausentismo (Servicio Social)](#7-control-de-retiros-mensuales--alarmas-de-ausentismo)
8. [Descarga e Impresión de PDF Oficial](#8-descarga-e-impresión-de-pdf-oficial)
9. [Módulo de Administración & Gestión de Personal (Solo Informática/Admin)](#9-módulo-de-administración--gestión-de-personal)
10. [Diagnóstico de Red y Solución de Problemas Frecuentes](#10-diagnóstico-de-red-y-solución-de-problemas-frecuentes)

---

## 1. ACCESO AL SISTEMA Y ROLES DE USUARIO

El portal es accesible desde cualquier computadora conectada a la red interna del Hospital Alassia:

1. Abrí tu navegador web (Google Chrome, Microsoft Edge o Mozilla Firefox).
2. Ingresá a la dirección oficial: **http://10.12.4.221/mensajeria/**
3. En la pantalla de inicio de sesión:
   - **DNI:** Tu número de DNI (sin puntos ni espacios).
   - **Contraseña:** Tu contraseña asignada (por defecto dmin123 para administradores o la provista por Informática).
4. Hacé clic en **Ingresar al Portal**.

### Perfiles de Usuario (RBAC)
- **Personal de Informática / Administrador General:** Acceso irrestricto a todas las bandejas, formularios, reportes, auditoría y panel de gestión de servicios y usuarios.
- **Médicos y Especialistas (Cardiología, Cirugía, etc.):** Visualizan solicitudes emitidas por su sala y atienden las interconsultas dirigidas a su especialidad.
- **Farmacia Hospitalaria:** Recepción y dispensa de recetas médicas electrónicas.
- **Nutrición y Lactario:** Gestión de prescripciones nutricionales y entregas mensuales de fórmulas lácteas.
- **Servicio Social:** Recepción de alertas automáticas por ausentismo o incumplimiento de retiros mensuales.

---

## 2. BÚSQUEDA RÁPIDA DE PACIENTES POR DNI

Para agilizar la carga de datos y evitar errores tipográficos:

1. En cualquier formulario (Cardiología, Farmacia, Nutrición, etc.), ingresá el **DNI** del paciente pediátrico.
2. Presioná la tecla **Enter** o hacé clic en el botón **Buscar** (<i class=ri-search-2-line></i>).
3. El sistema se comunicará en vivo con el servidor central **Diagnose (10.12.4.1)** y autocompletará:
   - Nombre y Apellido completo del niño/a.
   - Número de Historia Clínica Única (HC).
   - Edad exacta calculada a partir de su fecha de nacimiento.

---

## 3. EMISIÓN DE INTERCONSULTAS MÉDICAS

### A. Interconsulta de Cardiología Infantil (Formulario #1)
- Seleccioná la pestaña **Cardiología** en el menú lateral.
- Completá los antecedentes cardiovasculares (soplos, cianosis, taquicardias, etc.).
- Indicá el motivo de derivación y prioridad clínica.
- Hacé clic en **Registrar y Notificar Personal**. El pedido llegará automáticamente a la bandeja de Cardiología y se enviará copia por email al equipo.

### B. Interconsulta Médica General (Formulario #2)
- Seleccioná la pestaña **Interconsulta General**.
- Elegí el **Servicio Receptor** en la lista desplegable (ej: *Cirugía Infantil, Traumatología, Gastroenterología, Neurología*).
- Redactá el cuadro clínico, sospecha diagnóstica y conducta requerida.
- Hacé clic en **Enviar Interconsulta Médica**.

### C. Solicitud de Diagnóstico por Imágenes (Formulario #3)
- Seleccioná la pestaña **Imágenes**.
- Indicá la modalidad requerida (*Radiografía Digital, Tomografía Computada, Ecografía Pediátrica, Resonancia Magnética*).
- Detallá la región anatómica y la indicación médica.
- Hacé clic en **Enviar Solicitud a Imágenes**.

---

## 4. EMISIÓN DE RECETAS ELECTRÓNICAS Y FÓRMULAS LÁCTEAS

### A. Receta Electrónica de Medicamentos (Farmacia)
- Seleccioná la pestaña **Receta Farmacia**.
- En el campo **Rp:**, colocá el nombre genérico / comercial del medicamento y su concentración.
- Completá la **Dosis, Vía y Frecuencia** (ej: *5 ml cada 8 hs VO*).
- Completá la **Duración del Tratamiento** (ej: *7 días completación*).
- *(Opcional)* Si el paciente no retira hoy, seleccioná la **Fecha de Retiro Programada**.
- *(Opcional)* Si es un **Tratamiento Crónico**, activá la casilla correspondiente para habilitar el retiro por módulos mensuales.
- Hacé clic en **Emitir Receta y Enviar a Farmacia**.

### B. Prescripción Nutricional y Fórmulas Lácteas (Lactario)
- Seleccioná la pestaña **Nutrición / Leches**.
- Seleccioná la fórmula láctea requerida y el volumen por toma.
- Indicá el diagnóstico nutricional / gastrointestinal.
- Si corresponde a retiro mensual (programa crónico), seleccioná la cantidad de meses (ej: 6 meses).
- Hacé clic en **Prescribir y Enviar por Email a Lactario**.

---

## 5. BANDEJA DE ENTRADA, FILTROS DE SEGUIMIENTO Y NOTIFICACIONES

La pestaña **Bandeja de Entrada** organiza en tiempo real el flujo de trabajo:

- **Filtro Todos:** Muestra la totalidad de pedidos del servicio.
- **Filtro Recibidos (Para Atender):** Muestra las solicitudes dirigidas a tu servicio pendientes de entrega o respuesta médica.
- **Filtro Enviados (En Seguimiento):** Muestra las interconsultas o recetas que vos emitiste hacia otros servicios, para que puedas monitorear cuándo son atendidas.
- **Buscador en Vivo:** Permite filtrar instantáneamente por DNI, Nombre del Paciente o Código único.

---

## 6. REGISTRO DE ENTREGA, DICTAMEN MÉDICO Y ARCHIVADO

Cuando un profesional atiende al paciente, dispensa el medicamento o entrega la fórmula láctea:

1. En la fila de la solicitud en la **Bandeja de Entrada**, hacé clic en el botón verde **Entregar** (<i class=ri-check-double-line></i>).
2. En la ventana emergente:
   - Verificá que el estado esté en **Confirmado / Resuelto (Archivar de la Bandeja)**.
   - Redactá el **Informe de Respuesta o Detalle de la Entrega** (hallazgos clínicos, medicamentos entregados o indicaciones).
   - Verificá tu **Firma y Matrícula Profesional**.
3. Hacé clic en **Registrar Entrega y Archivar**.
4. La solicitud se actualizará de inmediato en la base de datos MySQL 10.12.4.2, desaparecerá de la bandeja de pendientes y pasará al **Archivo e Historial**.

---

## 7. CONTROL DE RETIROS MENSUALES & ALARMAS DE AUSENTISMO

Para pacientes crónicos (fórmulas lácteas o medicación prolongada):

1. Ingresá a la pestaña **Retiros Mensuales**.
2. Cada tarjeta muestra el paciente, el módulo actual (ej: *Módulo 2 de 6*) y la fecha de su próximo retiro.
3. Para registrar una entrega mensual, hacé clic en **Registrar Entrega (1 Mes)** o **Entrega Múltiple** si retira más de un módulo.
4. **Alarmas de Ausentismo (<i class=ri-alarm-warning-line></i>):** Si un paciente tiene más de 10 días de atraso en su retiro programado, la tarjeta se torna roja y genera un botón de **Alerta a Servicio Social** para coordinar visita domiciliaria o contacto telefónico con la familia.

---

## 8. DESCARGA E IMPRESIÓN DE PDF OFICIAL

En cualquier momento podés generar un documento imprimible con validez legal hospitalaria:

1. Hacé clic en el botón **Sheet** o **Descargar PDF** en el formulario.
2. El sistema compilará la Hoja Médica Digital oficial con:
   - Membrete oficial del Hospital Alassia.
   - Datos filiatorios del paciente y tutor.
   - Prescripción médica detallada.
   - Código único de trazabilidad.
   - Firma, aclaración y matrícula del médico emisor y respondedor.
3. El archivo PDF se descargará automáticamente a tu computadora listo para imprimir o adjuntar a la Historia Clínica en papel.

---

## 9. MÓDULO DE ADMINISTRACIÓN & GESTIÓN DE PERSONAL

*(Exclusivo para el Servicio de Informática y Administradores Generales)*

Desde la pestaña **Panel Admin**:

- **Gestión de Personal:** Alta, edición y baja de médicos, especialistas y personal de soporte. Asignación de servicios y permisos de administrador.
- **Gestión de Servicios:** Creación de nuevos servicios hospitalarios, modificación de jefaturas y correos oficiales de notificación.
- **Suspensión / Habilitación de Formularios:** Activar o suspender temporalmente la emisión de ciertos tipos de formularios ante contingencias.
- **Matriz de Permisos de Reportes:** Definir qué servicios tienen acceso a estadísticas globales hospitalarias.
- **Auditoría del Sistema (Audit Trail):** Registro cronológico inalterable con IP, usuario, hora y detalle de cada acción realizada en la plataforma.

---

## 10. DIAGNÓSTICO DE RED Y SOLUCIÓN DE PROBLEMAS FRECUENTES

### A. Comprobación del Estado de los Servidores
Si sospechás que hay un problema de conectividad con las bases de datos:
- Ingresá a: **http://10.12.4.221/mensajeria/test_conexion.php**
- Verificá que ambos servidores figuren como **CONECTADO ✅**:
  - central_diagnose_10.12.4.1 (Padrón de Pacientes)
  - portal_mensajeria_10.12.4.2 (Base de Datos del Portal)

### B. La pantalla no actualiza o muestra datos viejos
- Hacé clic en el botón **🧹 Limpiar Caché** en la barra superior.
- O presioná **Ctrl + F5** en tu teclado para forzar la recarga limpia de estilos y scripts.

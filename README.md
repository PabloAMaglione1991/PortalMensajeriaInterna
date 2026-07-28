# 🏥 Portal Digital de Mensajería, Recetas, Interconsultas y Auditoría
## Hospital de Niños "Dr. Orlando Alassia" — Santa Fe

![Licencia](https://img.shields.io/badge/Licencia-Propropietaria_Hospital_Alassia-blue.svg)
![Estado](https://img.shields.io/badge/Estado-Producción_v3.0-emerald.svg)
![Stack](https://img.shields.io/badge/Stack-HTML5_|_CSS3_|_ES6_|_PHP_|_MySQL-orange.svg)

Plataforma web clínica para la digitalización de interconsultas médicas, emisión de recetas de leches/fórmulas lácteas, solicitudes de imágenes, recetas electrónicas de farmacia y trazabilidad por auditoría inmutable (`Audit Trail`).

---

## 🌟 Características Principales

* **Autenticación por D.N.I. y Contraseña**: Pantalla de acceso restrictiva para profesionales médicos y administradores.
* **Autocompletado de Pacientes por D.N.I.**: Conexión directa a la base de datos central `diagnose` (`10.12.4.1`) vía API PHP en PDO.
* **Fórmulas Lácteas y Leches Pediátricas**: Restricción exclusiva a los 7 servicios autorizados (*Gastroenterología, Neonatología, Nutrición, Cardiología, Tratamientos Crónicos, Internación y Clínica Pediátrica*).
* **Control de Formularios desde Admin**: Habilitación o suspensión global en tiempo real de cualquier tipo de solicitud (`cardio`, `general`, `farmacia`, `imagenes`, `nutri`).
* **Shortcuts de Guardia (`Ctrl+B`, `Ctrl+Enter`, `Ctrl+Shift+L`)**: Teclas rápidas para acelerar la atención en emergencias y consultorios.
* **Auto-Guardado de Borradores (`sessionStorage`)**: Protección contra pérdidas de energía o cierres involuntarios del navegador.
* **Avisos Sonoros Hospitalarios (`Web Audio API`)**: Chimes de audio sintetizados sin dependencias de archivos externos.
* **Trazabilidad & Auditoría (`Audit Trail`)**: Registro inmutable de timestamps, usuario, matrícula, categoría, detalle e IP de origen.

---

## 📁 Estructura del Proyecto

```
mensajeria/
├── index.html                           # Estructura principal y plantillas de formularios
├── styles.css                           # Sistema de tokens CSS, diseño ultra-compacto y modo oscuro/claro
├── app.js                               # Lógica cliente ES6+, RBAC, shortcuts, borradores y audio chime
├── buscar_paciente.php                  # API Proxy PHP PDO para consulta a base diagnose (10.12.4.1)
├── schema_completo_alassia.sql          # Script DDL/DML de base de datos MySQL / MariaDB
└── docs/
    ├── guia_usuario_despliegue_alassia.md   # Manual de Usuario v3.0 y Guía de Despliegue VMware/Ubuntu
    └── documento_tecnico_arquitectura_alassia.md # Documentación Técnica de Arquitectura v3.0
```

---

## 🚀 Despliegue Rápido (Servidor NGINX + PHP-FPM)

1. Clonar el repositorio en el servidor web `/var/www/alassia-portal`:
   ```bash
   git clone <URL_REPOSITORIO_GITHUB> /var/www/alassia-portal
   ```
2. Importar la base de datos SQL:
   ```bash
   mysql -u root -p < schema_completo_alassia.sql
   ```
3. Consultar la guía completa de despliegue en VMware vSphere 5.5 / Ubuntu Server en `docs/guia_usuario_despliegue_alassia.md`.

---
*Hospital de Niños "Dr. Orlando Alassia" — Santa Fe, Argentina.*

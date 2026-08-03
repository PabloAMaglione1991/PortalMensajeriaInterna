/* Global Environment Switch: 'production' | 'testing' */
const APP_CONFIG = {
  ENV: 'production',                  // 'production' (versión real) o 'testing' (versión de pruebas)
  SHOW_DEMO_USERS_MODAL: false,       // En producción se oculta el selector con 1-clic
  ALLOW_MOCK_PATIENTS_FALLBACK: false // En producción NO usar pacientes ficticios, buscar SOLO en base diagnose (10.12.4.1)
};

// Official Hospital Services with Authorized Milk Prescription Flags (autorizadoLeches)
const INITIAL_SERVICES = [
  {
    id: "serv-gastro",
    name: "Gastroenterología Infantil",
    code: "GASTRO",
    email: "gastroenterologia.alassia@santafe.gob.ar",
    headOfService: "Dra. Mariana López",
    enabled: true,
    autorizadoLeches: true,
    staff: [
      { name: "Dra. Mariana López", role: "Jefa de Gastroenterología Pediátrica", mat: "3920", avatar: "ML" },
      { name: "Dr. Ignacio Peralta", role: "Gastroenterólogo Infantil", mat: "4410", avatar: "IP" }
    ]
  },
  {
    id: "serv-neona",
    name: "Neonatología y UCNI",
    code: "NEO",
    email: "neonatologia.alassia@santafe.gob.ar",
    headOfService: "Dra. Silvina Benítez",
    enabled: true,
    autorizadoLeches: true,
    staff: [
      { name: "Dra. Silvina Benítez", role: "Jefa de Neonatología y Cuidados Intensivos", mat: "2910", avatar: "SB" },
      { name: "Dr. Matías Carrizo", role: "Neonatólogo Pediátrico", mat: "3890", avatar: "MC" }
    ]
  },
  {
    id: "serv-nutri",
    name: "Nutrición y Lactario",
    code: "NUT",
    email: "lactario.alassia@santafe.gob.ar",
    headOfService: "Maglione Pablo",
    enabled: true,
    autorizadoLeches: true,
    staff: [
      { name: "Maglione Pablo", role: "Lic. en Nutrición • Coordinador Lactario", mat: "1052", avatar: "MP" },
      { name: "Lic. Paula Gómez", role: "Nutricionista Infantil", mat: "941", avatar: "PG" },
      { name: "Lic. Mariana Varela", role: "Nutricionista Clínica", mat: "1104", avatar: "MV" }
    ]
  },
  {
    id: "serv-cardio",
    name: "Cardiología Infantil",
    code: "CARD",
    email: "cardiologia.alassia@santafe.gob.ar",
    headOfService: "Dr. Orlando Alassia",
    enabled: true,
    autorizadoLeches: true,
    staff: [
      { name: "Dr. Orlando Alassia", role: "Jefe de Servicio • Especialista en Cardiología", mat: "3410", avatar: "OA" },
      { name: "Dra. Florencia Carrizo", role: "Cardióloga Infantil • Ecocardiografía", mat: "4812", avatar: "FC" },
      { name: "Dr. Roberto Rossi", role: "Cardiólogo Pediátrico", mat: "5129", avatar: "RR" }
    ]
  },
  {
    id: "serv-cronicos",
    name: "Programa de Tratamientos Crónicos",
    code: "CRON",
    email: "cronicos.alassia@santafe.gob.ar",
    headOfService: "Dr. Hernán Castro",
    enabled: true,
    autorizadoLeches: true,
    staff: [
      { name: "Dr. Hernán Castro", role: "Coordinador de Tratamientos Crónicos", mat: "3120", avatar: "HC" },
      { name: "Dra. Romina Fernández", role: "Especialista en Seguimiento Crónico", mat: "4012", avatar: "RF" }
    ]
  },
  {
    id: "serv-internacion",
    name: "Internación General (Salas)",
    code: "INT",
    email: "internacion.alassia@santafe.gob.ar",
    headOfService: "Dr. Esteban Martínez",
    enabled: true,
    autorizadoLeches: true,
    staff: [
      { name: "Dr. Esteban Martínez", role: "Jefe de Salas de Internación General", mat: "3990", avatar: "EM" },
      { name: "Dra. Lucía Gómez", role: "Médica Pediatra de Internación", mat: "4812", avatar: "LG" }
    ]
  },
  {
    id: "serv-clinica-ped",
    name: "Clínica Pediátrica",
    code: "CLIN-PED",
    email: "clinicapediatrica.alassia@santafe.gob.ar",
    headOfService: "Dra. Andrea Morales",
    enabled: true,
    autorizadoLeches: true,
    staff: [
      { name: "Dra. Andrea Morales", role: "Jefa de Servicio Clínica Pediátrica", mat: "2840", avatar: "AM" },
      { name: "Dr. Lucas Romero", role: "Médico Pediatra Clínico", mat: "3510", avatar: "LR" }
    ]
  },
  {
    id: "serv-farmacia",
    name: "Farmacia y Recetas Electrónicas",
    code: "FARM",
    email: "farmacia.alassia@santafe.gob.ar",
    headOfService: "Farm. Carlos Villalba",
    enabled: true,
    autorizadoLeches: false,
    staff: [
      { name: "Farm. Carlos Villalba", role: "Jefe de Farmacia Hospitalaria", mat: "1820", avatar: "CV" },
      { name: "Farm. Sofía Mendoza", role: "Farmacéutica Clínica • Dispensa Digital", mat: "2140", avatar: "SM" }
    ]
  },
  {
    id: "serv-imagenes",
    name: "Diagnóstico por Imágenes",
    code: "IMG",
    email: "imagenes.alassia@santafe.gob.ar",
    headOfService: "Dr. Andrés Cavallo",
    enabled: true,
    autorizadoLeches: false,
    staff: [
      { name: "Dr. Andrés Cavallo", role: "Jefe de Diagnóstico por Imágenes", mat: "3105", avatar: "AC" },
      { name: "Dra. Elena Ramos", role: "Radióloga Pediátrica • Ultrasonografía", mat: "4019", avatar: "ER" }
    ]
  }
];

// Pre-seeded Demo Users with DNI and Password Credentials
const DEMO_USERS = [
  {
    id: "user-admin",
    dni: "11111111",
    password: "admin123",
    name: "Dirección Médica (Admin)",
    role: "Administrador General del Hospital",
    avatar: "ADM",
    email: "direccion.alassia@santafe.gob.ar",
    service: "Todos los Servicios (Acceso Total)",
    isAdmin: true
  },
  {
    id: "user-cardio",
    dni: "20341000",
    password: "cardio123",
    name: "Dr. Orlando Alassia",
    role: "Jefe de Servicio • Cardiología (Mat. 3410)",
    avatar: "OA",
    email: "orlando.alassia@santafe.gob.ar",
    service: "Cardiología Infantil",
    isAdmin: false
  },
  {
    id: "user-gastro",
    dni: "25392000",
    password: "gastro123",
    name: "Dra. Mariana López",
    role: "Jefa de Gastroenterología Pediátrica (Mat. 3920)",
    avatar: "ML",
    email: "mariana.lopez@santafe.gob.ar",
    service: "Gastroenterología Infantil",
    isAdmin: false
  },
  {
    id: "user-nutri",
    dni: "24105200",
    password: "nutri123",
    name: "Maglione Pablo",
    role: "Lic. en Nutrición • Coordinador Lactario (Mat. 1052)",
    avatar: "MP",
    email: "pablo.maglione@santafe.gob.ar",
    service: "Nutrición y Lactario",
    isAdmin: false
  },
  {
    id: "user-farmacia",
    dni: "22182000",
    password: "farmacia123",
    name: "Farm. Carlos Villalba",
    role: "Jefe de Farmacia Hospitalaria (Mat. 1820)",
    avatar: "CV",
    email: "carlos.villalba@santafe.gob.ar",
    service: "Farmacia y Recetas Electrónicas",
    isAdmin: false
  },
  {
    id: "user-imagenes",
    dni: "23310500",
    password: "imagenes123",
    name: "Dr. Andrés Cavallo",
    role: "Jefe de Diagnóstico por Imágenes (Mat. 3105)",
    avatar: "AC",
    email: "andres.cavallo@santafe.gob.ar",
    service: "Diagnóstico por Imágenes",
    isAdmin: false
  }
];

// Pre-seeded Demo Patients database for local & offline testing (Database 'diagnose' on 10.12.4.1)
const DEMO_PATIENTS = [
  { dni: "48912304", nombre: "Mateo Benítez", hc: "HC-9821", edad: "3 años 4 meses", sexo: "M", telefono: "0342-4591029", email: "familia.benitez@gmail.com" },
  { dni: "51092381", nombre: "Camilo Benavídez", hc: "HC-8812", edad: "5 años", sexo: "M", telefono: "0342-4819023", email: "benavidez.camilo@yahoo.com" },
  { dni: "49301992", nombre: "Valentina Morales", hc: "HC-10492", edad: "7 años 2 meses", sexo: "F", telefono: "0342-4192019", email: "morales.valen@hotmail.com" },
  { dni: "50119823", nombre: "Sofía Valentina Rossi", hc: "HC-40192", edad: "9 años", sexo: "F", telefono: "0342-4882190", email: "rossi.sofia@gmail.com" },
  { dni: "52190431", nombre: "Joaquín Benjamín Silva", hc: "HC-5120", edad: "8 meses", sexo: "M", telefono: "0342-4771209", email: "silva.familia@gmail.com" },
  { dni: "49812001", nombre: "Lucas Rivas", hc: "HC-3109", edad: "10 años", sexo: "M", telefono: "0342-4559102", email: "rivas.lucas@gmail.com" }
];

async function buscarPacientePorDNI(dniInputId, fieldMap) {
  const inputEl = document.getElementById(dniInputId);
  if (!inputEl) return;

  const rawDni = inputEl.value.trim();
  const cleanDni = rawDni.replace(/\./g, '');

  if (!cleanDni) {
    showToast('⚠️ Por favor ingresá un número de DNI para buscar.');
    return;
  }

  showToast('🔍 Buscando paciente en la base de datos diagnose (10.12.4.1)...');

  try {
    const res = await fetch(`buscar_paciente.php?dni=${encodeURIComponent(cleanDni)}`);
    const data = await res.json();

    if (data && data.success && data.paciente) {
      applyPatientData(data.paciente, fieldMap);
      logEvent('CONSULTA', `Búsqueda exitosa de paciente DNI ${cleanDni} en base diagnose (10.12.4.1)`);
      showToast(`✅ Paciente ${data.paciente.nombre} encontrado e importado desde la base diagnose (10.12.4.1).`);
      return;
    } else if (data && data.success === false && !APP_CONFIG.ALLOW_MOCK_PATIENTS_FALLBACK) {
      showToast(`⚠️ ${data.message || `Paciente con DNI ${rawDni} no encontrado en la base diagnose (10.12.4.1).`}`);
      return;
    }
  } catch (err) {
    console.log("Intranet API offline or PHP error:", err);
  }

  // Fallback to local demo patient dataset only if enabled in APP_CONFIG
  if (APP_CONFIG.ALLOW_MOCK_PATIENTS_FALLBACK) {
    const localMatch = DEMO_PATIENTS.find(p => p.dni === cleanDni || p.hc.toLowerCase().includes(cleanDni.toLowerCase()));

    if (localMatch) {
      applyPatientData(localMatch, fieldMap);
      logEvent('CONSULTA', `Búsqueda local de paciente DNI ${cleanDni}`);
      showToast(`✅ Paciente ${localMatch.nombre} cargado desde la base local de pruebas.`);
      return;
    }
  }

  showToast(`⚠️ No se encontró ningún paciente registrado con DNI ${rawDni} en la base diagnose (10.12.4.1). Podés ingresar los datos manualmente.`);
}

function applyPatientData(paciente, fieldMap) {
  if (fieldMap.nombre) {
    const el = document.getElementById(fieldMap.nombre);
    if (el) {
      el.value = paciente.nombre || paciente.ape_y_nom || '';
      el.dispatchEvent(new Event('input'));
    }
  }
  if (fieldMap.edad) {
    const el = document.getElementById(fieldMap.edad);
    if (el) {
      el.value = paciente.edad || paciente.fecha_nacimiento || '';
      el.dispatchEvent(new Event('input'));
    }
  }
  if (fieldMap.hc) {
    const el = document.getElementById(fieldMap.hc);
    if (el) {
      el.value = `${paciente.dni || ''} / ${paciente.hc || ''}`;
      el.dispatchEvent(new Event('input'));
    }
  }
}

// Initial Audit Trail Logs Data
const INITIAL_LOGS = [
  {
    id: "LOG-1001",
    timestamp: "2026-07-27 08:30:12",
    category: "CREACION",
    user: "Dra. Lucía Gómez",
    role: "Médica Pediatra (Mat. 4812)",
    service: "Pediatría II",
    detail: "Emisión de Interconsulta con Cardiología #CARD-2026-001 (Paciente Mateo Benítez)",
    ip: "192.168.10.42 (Terminal Sala 3)"
  },
  {
    id: "LOG-1002",
    timestamp: "2026-07-27 08:10:05",
    category: "CREACION",
    user: "Dr. Orlando Alassia",
    role: "Jefe de Servicio (Mat. 3410)",
    service: "Cardiología Infantil",
    detail: "Emisión de Receta Electrónica #FARM-2026-102 en Farmacia (Camilo Benavídez)",
    ip: "192.168.10.15 (Consultorio Cardio)"
  },
  {
    id: "LOG-1003",
    timestamp: "2026-07-27 07:45:20",
    category: "RESOLUCION",
    user: "Dr. Andrés Cavallo",
    role: "Jefe de Imágenes (Mat. 3105)",
    service: "Diagnóstico por Imágenes",
    detail: "Dictamen e informe cargado para estudio RX #IMG-2026-088. Estado cambiado a Confirmado/Archivado.",
    ip: "192.168.10.88 (Estación RX 1)"
  },
  {
    id: "LOG-1004",
    timestamp: "2026-07-27 07:00:00",
    category: "LOGIN",
    user: "Dirección Médica (Admin)",
    role: "Administrador General",
    service: "Todos los Servicios",
    detail: "Inicio de sesión exitoso de administración hospitalaria",
    ip: "192.168.10.1 (Intranet Central)"
  }
];

// Seed Data for Interconsultations & Prescriptions History (All 5 Types)
const INITIAL_DATA = [
  {
    id: "CARD-2026-001",
    type: "Cardiología",
    paciente: "Mateo Benítez",
    dni: "48.912.304",
    hc: "HC-9821",
    edad: "3 años 4 meses",
    servicio: "Cardiología Infantil",
    staffAssigned: "Dr. Orlando Alassia (Jefe) / Dra. Florencia Carrizo",
    diagnostico: "Síndrome febril prolongado / Soplo holosistólico 3/6 en foco mitral",
    motivo: "Paciente internado en Sala 3 con fiebre de 7 días. Se ausculta soplo rudo. Se solicita Ecocardiograma Doppler Color urgente.",
    medico: "Dra. Lucía Gómez (Mat. 4812)",
    fecha: "2026-07-28 08:30",
    estado: "Pendiente",
    respuestaMedica: "",
    medicoRespondedor: "",
    isRecurring: false
  },
  {
    id: "CARD-2026-045",
    type: "Cardiología",
    paciente: "Lautaro Ezequiel Gómez",
    dni: "52.890.112",
    hc: "HC-12049",
    edad: "1 año 8 meses",
    servicio: "Cardiología Infantil",
    staffAssigned: "Dra. Florencia Carrizo",
    diagnostico: "Coartación de Aorta / Control Posquirúrgico",
    motivo: "Evaluación cardiológica pediátrica con Ecocardiograma Doppler Color. Paciente operado de coartación aórtica hace 6 meses. Presenta pulsos femorales simétricos.",
    medico: "Dr. Orlando Alassia (Mat. 3410)",
    fecha: "2026-07-28 09:15",
    estado: "Pendiente",
    respuestaMedica: "",
    medicoRespondedor: "",
    isRecurring: false
  },
  {
    id: "GEN-2026-089",
    type: "Interconsulta General",
    paciente: "Emilia Paz Ferreyra",
    dni: "53.401.882",
    hc: "HC-14022",
    edad: "5 meses",
    servicio: "Clínica Pediátrica",
    destino: "Gastroenterología Infantil",
    staffAssigned: "Dra. Mariana López (Jefa de Gastroenterología)",
    diagnostico: "Bronquiolitis Aguda Moderada (VRS (+)) con Rechazo del Alimento",
    motivo: "Paciente internada en Sala 4 - Cama 18 B. Presenta dificultad respiratoria y rechazo alimentario de 24hs. Se solicita valoración digestiva y sonda SNG.",
    medico: "Dra. Andrea Morales (Mat. 2840)",
    fecha: "2026-07-28 09:40",
    estado: "Pendiente",
    respuestaMedica: "",
    medicoRespondedor: "",
    isRecurring: false
  },
  {
    id: "FARM-2026-150",
    type: "Receta Electrónica",
    paciente: "Thiago Agustín Mansilla",
    dni: "51.902.441",
    hc: "HC-9930",
    servicio: "Farmacia y Recetas Electrónicas",
    staffAssigned: "Farm. Carlos Villalba (Jefe de Farmacia)",
    diagnostico: "Diabetes Mellitus Tipo 1 Pediátrica",
    rp1: "Insulina Glargina 100 UI/ml lapicera prellenada (12 UI SC nocturna) + Tiras reactivas glucemia (100 unidades/mes)",
    medico: "Dra. Romina Fernández (Mat. 4012)",
    fecha: "2026-07-28 10:05",
    estado: "Pendiente",
    respuestaMedica: "",
    medicoRespondedor: "",
    isRecurring: true,
    moduloActual: 1,
    totalModulos: 6,
    proximoRetiro: "2026-07-28"
  },
  {
    id: "IMG-2026-112",
    type: "Solicitud de Imágenes",
    paciente: "Santino Gabriel Cabrera",
    dni: "50.812.309",
    hc: "HC-7741",
    edad: "4 años",
    servicio: "Diagnóstico por Imágenes",
    staffAssigned: "Dr. Andrés Cavallo (Jefe de Imágenes)",
    diagnostico: "Neumonía Aguda Adquirida en la Comunidad / Descartar Derrame Pleural",
    motivo: "Ecografía Pleural + Radiografía RX Tórax Frente y Perfil. Paciente febril de 39.2°C con hypoventilación en base derecha.",
    medico: "Dr. Esteban Martínez (Mat. 3990)",
    fecha: "2026-07-28 10:20",
    estado: "Pendiente",
    respuestaMedica: "",
    medicoRespondedor: "",
    isRecurring: false
  },
  {
    id: "NUT-2026-030",
    type: "Prescripción Nutricional",
    paciente: "Delfina María Benítez",
    dni: "54.102.990",
    hc: "HC-15099",
    edad: "2 meses (Prematura 32 sem)",
    sexo: "F",
    servicio: "Neonatología y UCNI",
    staffAssigned: "Maglione Pablo (Coordinador) / Lic. Mariana Varela",
    pa: "2.450 kg",
    talla: "44 cm",
    diagnostico: "Prematurez Extrema / Retraso del Crecimiento Intrauterino (RCIU)",
    rp1: "Fórmula para Prematuros con Hierro y Proteínas Concentradas - 15% dilución / 90 cc c/3hs por SNG",
    rp2: "Módulo Calórico de Triglicéridos de Cadena Media (TCM) - 1.5 ml por toma",
    medico: "Dra. Silvina Benítez (Mat. 3120)",
    fecha: "2026-07-28 10:25",
    estado: "Pendiente",
    respuestaMedica: "",
    medicoRespondedor: "",
    isRecurring: true,
    moduloActual: 1,
    totalModulos: 6,
    proximoRetiro: "2026-07-28"
  },
  {
    id: "NUT-2026-031",
    type: "Prescripción Nutricional",
    paciente: "Joaquín Benjamín Silva",
    dni: "52.190.431",
    hc: "HC-5120",
    edad: "8 meses",
    sexo: "M",
    servicio: "Gastroenterología Infantil",
    staffAssigned: "Maglione Pablo (Coordinador) / Lic. Paula Gómez",
    pa: "6.850 kg",
    talla: "66 cm",
    diagnostico: "Alergia a la proteína de leche de vaca (APLV) / Lactante menor",
    rp1: "Fórmula de Inicio Extensamente Hidrolizada (Sin Lactosa) - 13.5% / 150 cc - 8 tomas cada 3hs (VO)",
    rp2: "Módulo de Polímeros de Glucosa (Maltodextrina 3%) - 3 g / 100 cc",
    medico: "Dra. Mariana López (Mat. 3920)",
    fecha: "2026-07-26 18:40",
    estado: "En Proceso",
    respuestaMedica: "Formulación Rp1 y Rp2 aprobada y preparada en Lactario.",
    medicoRespondedor: "Maglione Pablo (Mat. 1052)",
    isRecurring: true,
    moduloActual: 2,
    totalModulos: 6,
    proximoRetiro: "2026-08-15"
  },
  {
    id: "FARM-2026-102",
    type: "Receta Electrónica",
    paciente: "Camilo Benavídez",
    dni: "51.092.381",
    hc: "HC-8812",
    servicio: "Farmacia y Recetas Electrónicas",
    staffAssigned: "Farm. Carlos Villalba (Jefe de Farmacia)",
    diagnostico: "Tratamiento de Mantenimiento Asma Pediátrico",
    rp1: "Fluticasona 125mcg aerosol de inhalación + Cámara Espaciadora Pediátrica — 2 disparos c/12hs",
    medico: "Dr. Orlando Alassia (Mat. 3410)",
    fecha: "2026-07-27 08:10",
    estado: "En Proceso",
    respuestaMedica: "Procesando orden de medicamentos.",
    medicoRespondedor: "Farm. Carlos Villalba (Mat. 1820)",
    isRecurring: true,
    moduloActual: 1,
    totalModulos: 6,
    proximoRetiro: "2026-07-27"
  },
  {
    id: "IMG-2026-088",
    type: "Solicitud de Imágenes",
    paciente: "Valentina Morales",
    dni: "49.301.992",
    hc: "HC-10492",
    servicio: "Diagnóstico por Imágenes",
    staffAssigned: "Dr. Andrés Cavallo (Jefe de Imágenes)",
    diagnostico: "Traumatismo cerrado de tórax con hipoventilación izquierda",
    motivo: "Radiografía RX Tórax Frente y Perfil. Descartar neumotórax o fractura costal.",
    medico: "Dr. Gonzalo Torres (Mat. 2840)",
    fecha: "2026-07-27 07:45",
    estado: "Confirmado / Resuelto",
    respuestaMedica: "RX Tórax realizada: Sin trazo de fractura costal. Silueta cardíaca conservada.",
    medicoRespondedor: "Dr. Andrés Cavallo (Mat. 3105)",
    isRecurring: false
  },
  {
    id: "GEN-2026-042",
    type: "Interconsulta General",
    paciente: "Sofía Valentina Rossi",
    dni: "50.119.823",
    hc: "HC-40192",
    edad: "9 años",
    servicio: "Clínica Pediátrica",
    destino: "Gastroenterología Infantil",
    staffAssigned: "Dra. Mariana López (Jefa de Gastroenterología)",
    diagnostico: "Dolor abdominal agudo en FIDA",
    motivo: "Cuadro de 48hs de dolor abdominal en fosa ilíaca derecha. Se solicita valoración gastroenterológica.",
    medico: "Dra. Andrea Morales (Mat. 2840)",
    fecha: "2026-07-27 07:15",
    estado: "Confirmado / Resuelto",
    respuestaMedica: "Evaluación completada. Plan nutricional ajustado.",
    medicoRespondedor: "Dra. Mariana López (Mat. 3920)",
    isRecurring: false
  }
];

const INITIAL_NOTIFS = [
  {
    id: 1,
    title: "🔴 Alarma por Ausentismo en Retiro",
    text: "Paciente Lucas Rivas (#FARM-2026-090) superó los 7 días de atraso en retiro de Módulo 4/6.",
    time: "Hace 15 minutos",
    unread: true
  }
];

// Active State Storage
let services = INITIAL_SERVICES;
localStorage.setItem('alassia_services', JSON.stringify(services));
let records = INITIAL_DATA;
localStorage.setItem('alassia_records', JSON.stringify(records));
let auditLogs = JSON.parse(localStorage.getItem('alassia_audit_logs')) || INITIAL_LOGS;
let notifications = JSON.parse(localStorage.getItem('alassia_notifs')) || INITIAL_NOTIFS;
// Load any custom users created via Admin Panel
let customUsers = JSON.parse(localStorage.getItem('alassia_custom_users')) || [];
if (customUsers.length > 0) {
  customUsers.forEach(cu => {
    if (!DEMO_USERS.some(u => u.dni === cu.dni)) {
      DEMO_USERS.unshift(cu);
    }
  });
}

let activeUser = JSON.parse(localStorage.getItem('alassia_user')) || DEMO_USERS[1];
let isAuthenticated = JSON.parse(localStorage.getItem('alassia_auth')) || false;

const INITIAL_FORM_PERMISSIONS = {
  cardio: { id: "cardio", name: "Interconsulta Cardiología", tab: "tab-cardio", enabled: true, tag: "cardio", icon: "ri-heart-pulse-line" },
  general: { id: "general", name: "Interconsulta General", tab: "tab-general", enabled: true, tag: "general", icon: "ri-hospital-line" },
  farmacia: { id: "farmacia", name: "Receta Electrónica Farmacia", tab: "tab-farmacia", enabled: true, tag: "farmacia", icon: "ri-capsule-line" },
  imagenes: { id: "imagenes", name: "Solicitud de Imágenes (RX/TAC)", tab: "tab-imagenes", enabled: true, tag: "imagenes", icon: "ri-body-scan-line" },
  nutri: { id: "nutri", name: "Prescripción Leches / Nutrición", tab: "tab-nutri", enabled: true, tag: "nutri", icon: "ri-drop-line" }
};

let formPermissions = JSON.parse(localStorage.getItem('alassia_form_permissions')) || INITIAL_FORM_PERMISSIONS;

document.addEventListener('DOMContentLoaded', () => {
  checkAuthSession();
  initTabs();
  initTheme();
  initGlobalDataSync();
  initKeyboardShortcuts();
  initDraftAutoSave();
  initLivePreviewBindings();
  initRecurringFormToggles();
  renderActiveUser();
  renderServicesGrid();
  renderAdminServicesGrid();
  renderAdminFormPermissions();
  updateFormAvailabilityState();
  populateStaffDropdowns();
  renderInbox();
  renderArchiveTable();
  renderReportSection();
  renderRecurringSection();
  renderNotifications();
  renderAuditLogs();
  updateStats();
  setupSearch();
});

/* Session & Authentication Guard */
function checkAuthSession() {
  const loginScreen = document.getElementById('login-page-screen');
  const appWorkspace = document.getElementById('app-workspace-container');

  if (isAuthenticated && activeUser) {
    if (loginScreen) loginScreen.style.display = 'none';
    if (appWorkspace) appWorkspace.style.display = 'flex';
  } else {
    if (loginScreen) loginScreen.style.display = 'flex';
    if (appWorkspace) appWorkspace.style.display = 'none';
  }
}

function fillDemoLogin(dni, pass) {
  document.getElementById('login-dni-input').value = dni;
  document.getElementById('login-pass-input').value = pass;
  const alertEl = document.getElementById('login-error-alert');
  if (alertEl) alertEl.style.display = 'none';
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const dniInput = document.getElementById('login-dni-input').value.trim().replace(/\./g, '');
  const passInput = document.getElementById('login-pass-input').value.trim();
  const errorAlert = document.getElementById('login-error-alert');

  const foundUser = DEMO_USERS.find(u => u.dni === dniInput && u.password === passInput);

  if (foundUser) {
    activeUser = foundUser;
    isAuthenticated = true;
    localStorage.setItem('alassia_user', JSON.stringify(activeUser));
    localStorage.setItem('alassia_auth', JSON.stringify(true));

    if (errorAlert) errorAlert.style.display = 'none';

    renderActiveUser();
    renderInbox();
    renderArchiveTable();
    checkAuthSession();

    logEvent('LOGIN', `Inicio de sesión exitoso con DNI ${dniInput} en perfil ${activeUser.service}`, activeUser);
    showToast(`¡Bienvenido/a ${activeUser.name}! (${activeUser.service})`);
  } else {
    if (errorAlert) errorAlert.style.display = 'flex';
  }
}

function logoutUser() {
  if (activeUser) {
    logEvent('LOGIN', `Cierre de sesión registrado para ${activeUser.name}`, activeUser);
  }
  isAuthenticated = false;
  localStorage.setItem('alassia_auth', JSON.stringify(false));
  checkAuthSession();
  showToast(`Sesión cerrada correctamente.`);
}

/* System Audit Logging Engine */
function logEvent(category, detail, customUser = null) {
  const user = customUser || activeUser;
  const newLog = {
    id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
    timestamp: new Date().toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'medium' }),
    category: category,
    user: user ? user.name : 'Usuario Sistema',
    role: user ? user.role : 'Profesional de Salud',
    service: user ? user.service : 'Hospital Alassia',
    detail: detail,
    ip: `192.168.10.${Math.floor(10 + Math.random() * 89)} (Terminal Red)`
  };

  auditLogs.unshift(newLog);
  localStorage.setItem('alassia_audit_logs', JSON.stringify(auditLogs));
  renderAuditLogs();
}

function renderAuditLogs(filterCategory = 'all') {
  const tbody = document.getElementById('audit-logs-table-body');
  if (!tbody) return;

  let filteredLogs = auditLogs;
  if (filterCategory !== 'all') {
    filteredLogs = auditLogs.filter(l => l.category === filterCategory);
  }

  const loginCount = auditLogs.filter(l => l.category === 'LOGIN').length;
  const prescriptionCount = auditLogs.filter(l => l.category === 'CREACION').length;
  const adminCount = auditLogs.filter(l => l.category === 'ADMIN').length;

  document.getElementById('audit-total-logs').textContent = auditLogs.length;
  document.getElementById('audit-logins-count').textContent = loginCount;
  document.getElementById('audit-prescriptions-count').textContent = prescriptionCount;
  document.getElementById('audit-admin-count').textContent = adminCount;

  if (filteredLogs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-muted);">No hay eventos de auditoría registrados para esta categoría.</td></tr>`;
    return;
  }

  tbody.innerHTML = filteredLogs.map(l => {
    let catTag = `<span class="action-tag general">${l.category}</span>`;
    if (l.category === 'LOGIN') catTag = `<span class="action-tag farmacia">🔑 LOGIN</span>`;
    if (l.category === 'CREACION') catTag = `<span class="action-tag cardio">📝 EMISIÓN</span>`;
    if (l.category === 'RESOLUCION') catTag = `<span class="action-tag nutri">🟢 DICTAMEN</span>`;
    if (l.category === 'ADMIN') catTag = `<span class="action-tag imagenes">🛡️ ADMIN</span>`;

    return `
      <tr>
        <td><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.775rem;">${l.timestamp}</span></td>
        <td>${catTag}</td>
        <td><strong>${l.user}</strong></td>
        <td><span style="font-size: 0.775rem; color: var(--text-muted);">${l.role}</span></td>
        <td>${l.service}</td>
        <td><span style="font-size: 0.8rem; color: var(--text-main);">${l.detail}</span></td>
        <td><span style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--slate-500);">${l.ip}</span></td>
      </tr>
    `;
  }).join('');
}

function filterLogs(category) {
  renderAuditLogs(category);
}

/* PDF Export Engine (No Physical Print Dialogs) */
function exportToPDF(selector, filename = 'documento_alassia.pdf') {
  const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  if (!el) {
    showToast('⚠️ No se encontró el documento para generar el PDF.');
    return;
  }

  showToast('📄 Generando y descargando PDF...');

  if (typeof html2pdf !== 'undefined') {
    const opt = {
      margin:       0.3,
      filename:     filename,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(el).save().then(() => {
      showToast(`✅ PDF '${filename}' descargado exitosamente.`);
      logEvent('CONSULTA', `Descarga de PDF realizada: ${filename}`);
    }).catch(err => {
      console.error('Error al generar PDF:', err);
      showToast('⚠️ Error al generar el PDF.');
    });
  } else {
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${filename}</title>
            <link rel="stylesheet" href="styles.css">
            <style>body { padding: 2rem; background: #fff; }</style>
          </head>
          <body>
            ${el.outerHTML}
          </body>
        </html>
      `);
      win.document.close();
      showToast('📄 Vista limpia abierta en nueva pestaña.');
    }
  }
}

function exportAuditLog() {
  exportToPDF('#audit-table-body', 'registro_auditoria_alassia.pdf');
}

/* Authentication & Profile Switching (RBAC) */
function renderActiveUser() {
  if (!activeUser) return;

  document.getElementById('current-user-avatar').textContent = activeUser.avatar;
  document.getElementById('current-user-name').textContent = activeUser.name;
  document.getElementById('current-user-role').textContent = activeUser.role;

  const headerBadge = document.getElementById('header-role-name');
  if (headerBadge) {
    headerBadge.textContent = activeUser.isAdmin ? 'Modo Administrador General' : `Perfil: ${activeUser.service}`;
  }

  const subtitle = document.getElementById('inbox-filter-subtitle');
  if (subtitle) {
    subtitle.textContent = activeUser.isAdmin 
      ? `Modo Admin: Mostrando todas las interconsultas del hospital.`
      : `Filtrado activo: Mostrando únicamente interconsultas del servicio ${activeUser.service}.`;
  }

  // Update physician input and paper signature previews with active doctor name
  ['c-medico', 'g-medico', 'f-medico', 'i-medico', 'n-medico'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = activeUser.name;
  });

  ['prev-c-medico', 'prev-g-medico', 'prev-f-medico', 'prev-i-medico', 'prev-n-medico'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = activeUser.name;
  });

  // Strict Role-Based Sidebar & Dashboard Action Filtering (Ultra Simplicity)
  applyRoleContextualFiltering();

  // If non-admin user is currently viewing an admin tab, automatically redirect to Dashboard
  const activeTab = document.querySelector('.tab-content.active');
  if (!activeUser.isAdmin && activeTab && (activeTab.id === 'tab-admin' || activeTab.id === 'tab-logs')) {
    switchTab('tab-dashboard');
  }
}

function applyRoleContextualFiltering() {
  if (!activeUser) return;

  const serviceName = (activeUser.service || '').toLowerCase();
  const isAdmin = activeUser.isAdmin;

  // Define allowable form tabs per role
  const roleTabMap = {
    'cardio': isAdmin || serviceName.includes('cardio') || serviceName.includes('pediatría') || serviceName.includes('internación') || serviceName.includes('todos'),
    'general': true, // Todos los médicos pueden realizar interconsulta general
    'farmacia': isAdmin || serviceName.includes('farmacia') || serviceName.includes('crónicos') || serviceName.includes('pediatría') || serviceName.includes('todos'),
    'imagenes': isAdmin || serviceName.includes('imágenes') || serviceName.includes('internación') || serviceName.includes('pediatría') || serviceName.includes('todos'),
    'nutri': isAdmin || serviceName.includes('nutri') || serviceName.includes('gastro') || serviceName.includes('neo') || serviceName.includes('crónicos') || serviceName.includes('internación') || serviceName.includes('todos'),
    'admin': isAdmin,
    'logs': isAdmin,
    'reportes': isAdmin || serviceName.includes('farmacia') || serviceName.includes('nutri') || serviceName.includes('imágenes')
  };

  // 1. Ocultar del menú lateral (Sidebar) los ítems que no corresponden al rol
  Object.keys(roleTabMap).forEach(key => {
    const tabId = `tab-${key}`;
    const btn = document.querySelector(`[data-tab="${tabId}"]`);
    if (btn && btn.closest('li')) {
      const isAllowed = roleTabMap[key];
      btn.closest('li').style.display = isAllowed ? 'block' : 'none';
    }
  });

  // 2. Ocultar del Dashboard las tarjetas de emisión que no corresponden al rol
  const actionCards = document.querySelectorAll('#tab-dashboard .action-card');
  actionCards.forEach(card => {
    const tagEl = card.querySelector('.action-tag');
    if (!tagEl) return;
    const tagClass = tagEl.className.toLowerCase();

    let show = false;
    if (isAdmin) {
      show = true;
    } else if (tagClass.includes('cardio')) {
      show = roleTabMap['cardio'];
    } else if (tagClass.includes('general')) {
      show = true;
    } else if (tagClass.includes('farmacia')) {
      show = roleTabMap['farmacia'];
    } else if (tagClass.includes('imagenes')) {
      show = roleTabMap['imagenes'];
    } else if (tagClass.includes('nutri')) {
      show = roleTabMap['nutri'];
    }

    card.style.display = show ? 'flex' : 'none';
  });
}

/* Dynamic User Creation Handler (Admin Panel) */
function handleCreateUserSubmit(e) {
  e.preventDefault();
  const dni = document.getElementById('new-user-dni').value.trim().replace(/\./g, '');
  const pass = document.getElementById('new-user-pass').value.trim();
  const name = document.getElementById('new-user-name').value.trim();
  const mat = document.getElementById('new-user-mat').value.trim() || 'S/N';
  const role = document.getElementById('new-user-role').value.trim();
  const service = document.getElementById('new-user-service').value;
  const email = document.getElementById('new-user-email').value.trim();
  const isAdmin = document.getElementById('new-user-is-admin').value === 'true';

  // Check if DNI already exists
  if (DEMO_USERS.some(u => u.dni === dni)) {
    showToast(`⚠️ El DNI ${dni} ya se encuentra registrado en el sistema.`, 'error');
    return;
  }

  // Compute initials avatar
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'MD';

  const newUser = {
    id: `user-${Date.now()}`,
    dni: dni,
    password: pass,
    name: name,
    role: `${role} • Mat. ${mat}`,
    service: service,
    avatar: initials,
    isAdmin: isAdmin,
    email: email
  };

  DEMO_USERS.unshift(newUser);
  let customUsers = JSON.parse(localStorage.getItem('alassia_custom_users')) || [];
  customUsers.unshift(newUser);
  localStorage.setItem('alassia_custom_users', JSON.stringify(customUsers));

  document.getElementById('create-user-form').reset();

  logEvent('ADMIN', `Alta de nuevo usuario: ${name} (DNI ${dni}) para servicio ${service} [Admin: ${isAdmin ? 'SÍ' : 'NO'}]`);
  showToast(`¡Usuario ${name} (DNI ${dni}) creado exitosamente!`);

  // Re-render accounts list if open
  openLoginModal();
}

function openLoginModal() {
  const container = document.getElementById('user-accounts-list');
  const demoSection = container ? container.parentElement : null;

  if (APP_CONFIG.ENV === 'production' && !APP_CONFIG.SHOW_DEMO_USERS_MODAL) {
    if (demoSection) demoSection.style.display = 'none';
  } else {
    if (demoSection) demoSection.style.display = 'block';
    container.innerHTML = DEMO_USERS.map(u => `
      <div class="user-card-option ${u.id === activeUser.id ? 'selected' : ''}" onclick="selectUser('${u.id}')">
        <div class="user-avatar" style="width: 44px; height: 44px; font-size: 0.9rem;">${u.avatar}</div>
        <div>
          <h4 style="font-size: 0.9rem; margin-bottom: 2px;">${u.name}</h4>
          <p style="font-size: 0.75rem; color: var(--text-muted);">${u.role}</p>
          <span style="font-size: 0.7rem; color: var(--primary-600); font-weight: 600;">${u.service}</span>
        </div>
      </div>
    `).join('');
  }

  document.getElementById('login-modal').classList.add('active');
}

function selectUser(userId) {
  const found = DEMO_USERS.find(u => u.id === userId);
  if (found) {
    activeUser = found;
    localStorage.setItem('alassia_user', JSON.stringify(activeUser));
    renderActiveUser();
    renderInbox();
    renderArchiveTable();
    closeLoginModal();
    
    logEvent('LOGIN', `Cambio de perfil activo a ${activeUser.service}`, activeUser);
    showToast(`Perfil cambiado a ${activeUser.name} (${activeUser.service})`);
  }
}

function closeLoginModal() {
  document.getElementById('login-modal').classList.remove('active');
}

/* Admin Panel: Order & Prescription Form Enable/Disable Toggles */
function renderAdminFormPermissions() {
  const container = document.getElementById('admin-forms-toggle-container');
  if (!container) return;

  if (!formPermissions || Object.keys(formPermissions).length === 0) {
    formPermissions = INITIAL_FORM_PERMISSIONS;
    localStorage.setItem('alassia_form_permissions', JSON.stringify(formPermissions));
  }

  container.innerHTML = Object.values(formPermissions).map(f => `
    <div class="report-summary-card" style="display: flex; flex-direction: column; justify-content: space-between; border-top: 3px solid var(--primary-500);">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
          <span class="action-tag ${f.tag}"><i class="${f.icon}"></i> ${f.id.toUpperCase()}</span>
          <button class="service-toggle-btn ${f.enabled ? 'enabled' : 'disabled'}" onclick="toggleFormPermission('${f.id}')">
            ${f.enabled ? '🟢 HABILITADO' : '🔴 SUSPENDIDO'}
          </button>
        </div>
        <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.25rem;">${f.name}</h4>
        <p style="font-size: 0.725rem; color: var(--text-muted);">
          ${f.enabled ? 'Emisión libre activa para médicos.' : '🔴 Suspendido temporalmente por Admin.'}
        </p>
      </div>
    </div>
  `).join('');
}

function toggleFormPermission(formKey) {
  const formObj = formPermissions[formKey];
  if (formObj) {
    formObj.enabled = !formObj.enabled;
    localStorage.setItem('alassia_form_permissions', JSON.stringify(formPermissions));
    renderAdminFormPermissions();
    updateFormAvailabilityState();
    
    logEvent('ADMIN', `Habilitación de pedidos de "${formObj.name}": ${formObj.enabled ? 'HABILITADO' : 'SUSPENDIDO'}`);
    showToast(`Pedidos de ${formObj.name} ahora están ${formObj.enabled ? 'HABILITADOS 🟢' : 'SUSPENDIDOS 🔴'}`);
  }
}

function updateFormAvailabilityState() {
  if (!formPermissions) return;
  
  Object.values(formPermissions).forEach(f => {
    // 1. Sidebar Nav Button Item (Hide completely if disabled)
    const navBtn = document.querySelector(`.nav-item button[data-tab="${f.tab}"]`);
    if (navBtn && navBtn.parentElement) {
      if (!f.enabled) {
        navBtn.parentElement.style.display = 'none';
      } else {
        navBtn.parentElement.style.display = 'block';
      }
    }

    // 2. Dashboard Quick Action Cards (Hide card completely if disabled)
    const dashBtns = document.querySelectorAll(`#tab-dashboard button[onclick*="${f.tab}"]`);
    dashBtns.forEach(dashBtn => {
      const card = dashBtn.closest('.action-card');
      if (card) {
        if (!f.enabled) {
          card.style.display = 'none';
        } else {
          card.style.display = 'flex';
        }
      }
    });

    // 3. Form Section Container Locking & Red Alert Banner
    const formSec = document.getElementById(f.tab);
    if (formSec) {
      let banner = formSec.querySelector('.suspended-form-banner');
      const submitBtn = formSec.querySelector('button[type="submit"]');
      const formInputs = formSec.querySelectorAll('input, select, textarea');

      if (!f.enabled) {
        if (!banner) {
          banner = document.createElement('div');
          banner.className = 'suspended-form-banner';
          banner.style.cssText = 'background: #fef2f2; border: 2px solid #ef4444; color: #991b1b; padding: 0.85rem 1.1rem; border-radius: var(--radius-md); margin-bottom: 1.25rem; font-weight: 700; display: flex; align-items: center; gap: 0.75rem; font-size: 0.9rem; box-shadow: var(--shadow-sm);';
          banner.innerHTML = `<i class="ri-error-warning-fill" style="font-size: 1.4rem; color: #dc2626;"></i> <div><strong>ATENCIÓN: EMISIÓN SUSPENDIDA POR ADMINISTRACIÓN</strong><br><span style="font-weight: 400; font-size: 0.8rem;">La Dirección Médica del Hospital Alassia ha pausado temporalmente las solicitudes de ${f.name}. No es posible emitir nuevos pedidos hasta su rehabilitación.</span></div>`;
          const firstChild = formSec.firstElementChild;
          if (firstChild) formSec.insertBefore(banner, firstChild);
        } else {
          banner.style.display = 'flex';
        }

        // Disable all inputs in form
        formInputs.forEach(el => {
          el.disabled = true;
          el.style.backgroundColor = 'var(--slate-100)';
          el.style.cursor = 'not-allowed';
        });

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.style.opacity = '0.4';
          submitBtn.style.cursor = 'not-allowed';
          submitBtn.style.backgroundColor = 'var(--slate-400)';
          submitBtn.innerHTML = `<i class="ri-forbid-line"></i> Formulario Suspendido por Admin`;
        }
      } else {
        if (banner) banner.style.display = 'none';

        // Re-enable all inputs
        formInputs.forEach(el => {
          el.disabled = false;
          el.style.backgroundColor = '';
          el.style.cursor = '';
        });

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
          submitBtn.style.cursor = 'pointer';
          submitBtn.style.backgroundColor = '';
          submitBtn.innerHTML = `<i class="ri-send-plane-fill"></i> Registrar y Notificar Personal`;
        }
      }
    }
  });

  // Hide "Formularios Digitales" sidebar label if all forms are disabled
  const navSectionLabels = document.querySelectorAll('.nav-section-label');
  navSectionLabels.forEach(label => {
    if (label.textContent.includes('Formularios Digitales')) {
      const anyEnabled = Object.values(formPermissions).some(f => f.enabled);
      label.style.display = anyEnabled ? 'block' : 'none';
    }
  });
}

/* Admin Panel: Service Enable/Disable Toggles & Milk Prescriptions Authorization */
function renderAdminServicesGrid() {
  const container = document.getElementById('admin-services-container');
  if (!container) return;

  if (!services || services.length === 0) {
    services = INITIAL_SERVICES;
    localStorage.setItem('alassia_services', JSON.stringify(services));
  }

  container.innerHTML = services.map(s => `
    <div class="service-card ${!s.enabled ? 'disabled-service' : ''}">
      <div>
        <div class="service-card-header">
          <h3>${s.name}</h3>
          <button class="service-toggle-btn ${s.enabled ? 'enabled' : 'disabled'}" onclick="toggleServiceState('${s.id}')">
            ${s.enabled ? '🟢 HABILITADO' : '🔴 DESHABILITADO'}
          </button>
        </div>

        <p style="font-size: 0.8rem; color: var(--primary-600); font-weight: 600; margin-bottom: 0.5rem;">
          <i class="ri-user-star-line"></i> Jefe de Servicio: <strong>${s.headOfService}</strong>
        </p>

        <!-- Milk Authorization Toggle -->
        <div style="background: var(--slate-50); border: 1px solid var(--border-color); padding: 0.6rem 0.85rem; border-radius: var(--radius-md); margin-bottom: 1rem; display: flex; align-items: center; justify-content: space-between;">
          <div style="font-size: 0.775rem;">
            <strong>Recetas de Leches/Fórmulas:</strong>
          </div>
          <button class="service-toggle-btn ${s.autorizadoLeches ? 'enabled' : 'disabled'}" style="font-size: 0.7rem;" onclick="toggleMilkAuth('${s.id}')">
            ${s.autorizadoLeches ? '🥛 AUTORIZADO' : '🚫 RESTRINGIDO'}
          </button>
        </div>

        <h4 style="font-size: 0.8rem; text-transform: uppercase; color: var(--slate-600); margin-bottom: 0.75rem;">
          Personal Asignado (${s.staff.length})
        </h4>

        <ul class="staff-list">
          ${s.staff.map(m => `
            <li class="staff-member-item">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div class="staff-avatar-mini">${m.avatar || m.name.substring(0, 2).toUpperCase()}</div>
                <div class="staff-info-mini">
                  <h5>${m.name}</h5>
                  <p>${m.role}</p>
                </div>
              </div>
              <button style="border: none; background: transparent; color: var(--rose-500); cursor: pointer;" onclick="removeStaffFromService('${s.id}', '${m.name}')" title="Quitar del servicio">
                <i class="ri-delete-bin-line"></i>
              </button>
            </li>
          `).join('')}
        </ul>
      </div>

      <button class="btn-secondary" style="width: 100%; font-size: 0.8rem; justify-content: center;" onclick="quickAddStaffTo('${s.id}')">
        <i class="ri-user-add-line"></i> Asignar Profesional a ${s.code}
      </button>
    </div>
  `).join('');
}

function toggleServiceState(serviceId) {
  const service = services.find(s => s.id === serviceId);
  if (service) {
    service.enabled = !service.enabled;
    localStorage.setItem('alassia_services', JSON.stringify(services));
    renderAdminServicesGrid();
    renderServicesGrid();
    populateStaffDropdowns();
    updateStats();
    
    logEvent('ADMIN', `Servicio ${service.name} ahora está ${service.enabled ? 'HABILITADO' : 'DESHABILITADO'}`);
    showToast(`El servicio ${service.name} ahora está ${service.enabled ? 'HABILITADO' : 'DESHABILITADO'}`);
  }
}

function toggleMilkAuth(serviceId) {
  const service = services.find(s => s.id === serviceId);
  if (service) {
    service.autorizadoLeches = !service.autorizadoLeches;
    localStorage.setItem('alassia_services', JSON.stringify(services));
    renderAdminServicesGrid();
    populateStaffDropdowns();
    updateStats();

    logEvent('ADMIN', `Permiso para recetas de leches en ${service.name}: ${service.autorizadoLeches ? 'AUTORIZADO' : 'RESTRINGIDO'}`);
    showToast(`Permiso para recetas de leches en ${service.name}: ${service.autorizadoLeches ? 'AUTORIZADO' : 'RESTRINGIDO'}`);
  }
}

function removeStaffFromService(serviceId, staffName) {
  const service = services.find(s => s.id === serviceId);
  if (service) {
    service.staff = service.staff.filter(m => m.name !== staffName);
    localStorage.setItem('alassia_services', JSON.stringify(services));
    renderAdminServicesGrid();
    renderServicesGrid();
    populateStaffDropdowns();

    logEvent('ADMIN', `Se quitó al profesional ${staffName} del servicio ${service.name}`);
    showToast(`Se quitó a ${staffName} del servicio ${service.name}`);
  }
}

/* Populate Form Dropdowns (Only Enabled & Authorized Services!) */
function populateStaffDropdowns() {
  const enabledServices = services.filter(s => s.enabled);
  const authorizedMilkServices = services.filter(s => s.enabled && s.autorizadoLeches);

  // Nutrición Milk Prescriptions Authorized Services Dropdown
  const nutriServiceSelect = document.getElementById('n-servicio-select');
  if (nutriServiceSelect) {
    nutriServiceSelect.innerHTML = authorizedMilkServices.map(s => `<option value="${s.name}">${s.name} (${s.code}) — Autorizado</option>`).join('');
    if (authorizedMilkServices.length > 0) {
      updateNutriService(authorizedMilkServices[0].name);
    }
  }

  // General Destination Dropdown
  const destSelect = document.getElementById('g-destino');
  if (destSelect) {
    destSelect.innerHTML = enabledServices.map(s => `<option value="${s.name}">${s.name} (${s.code})</option>`).join('');
  }

  // Cardio
  const cardioServ = services.find(s => s.id === 'serv-cardio');
  const cardioSelect = document.getElementById('c-staff-target');
  if (cardioServ && cardioSelect) {
    cardioSelect.innerHTML = cardioServ.staff.map(m => `<option value="${m.name} (${m.role})">${m.name} — ${m.role}</option>`).join('') + `<option value="Todo el Equipo de Cardiología">Todo el Equipo de Cardiología</option>`;
  }

  // Farmacia
  const farmaciaServ = services.find(s => s.id === 'serv-farmacia');
  const farmaciaSelect = document.getElementById('f-staff-target');
  if (farmaciaServ && farmaciaSelect) {
    farmaciaSelect.innerHTML = farmaciaServ.staff.map(m => `<option value="${m.name} (${m.role})">${m.name} — ${m.role}</option>`).join('') + `<option value="Equipo Completo de Farmacia Hospitalaria">Equipo Completo de Farmacia</option>`;
  }

  // Imágenes
  const imagenesServ = services.find(s => s.id === 'serv-imagenes');
  const imagenesSelect = document.getElementById('i-staff-target');
  if (imagenesServ && imagenesSelect) {
    imagenesSelect.innerHTML = imagenesServ.staff.map(m => `<option value="${m.name} (${m.role})">${m.name} — ${m.role}</option>`).join('') + `<option value="Equipo Guardia de Diagnóstico por Imágenes">Equipo Guardia de Imágenes</option>`;
  }

  // Nutrición
  const nutriServ = services.find(s => s.id === 'serv-nutri');
  const nutriSelect = document.getElementById('n-staff-target');
  if (nutriServ && nutriSelect) {
    nutriSelect.innerHTML = nutriServ.staff.map(m => `<option value="${m.name} (${m.role})">${m.name} — ${m.role}</option>`).join('') + `<option value="Equipo Completo de Nutrición y Lactario">Equipo Completo de Lactario</option>`;
  }

  updateGeneralStaffList();

  const serviceModalSelect = document.getElementById('staff-service-select');
  if (serviceModalSelect) {
    serviceModalSelect.innerHTML = enabledServices.map(s => `<option value="${s.id}">${s.name} (${s.code})</option>`).join('');
  }
}

function updateGeneralStaffList() {
  const destSelect = document.getElementById('g-destino');
  const staffSelect = document.getElementById('g-staff-target');
  const emailInput = document.getElementById('g-email');
  if (!destSelect || !staffSelect) return;

  const destName = destSelect.value;
  const matchedService = services.find(s => s.name.toLowerCase().includes(destName.toLowerCase()) || destName.toLowerCase().includes(s.name.toLowerCase())) || services[0];

  if (emailInput && matchedService) emailInput.value = matchedService.email;

  const prevDest = document.getElementById('prev-g-destino');
  if (prevDest) prevDest.textContent = destName;

  staffSelect.innerHTML = matchedService.staff.map(m => `<option value="${m.name} (${m.role})">${m.name} — ${m.role}</option>`).join('') + `<option value="Personal de Guardia de ${matchedService.name}">Personal de Guardia del Servicio</option>`;
}

/* Modal Add Staff handlers */
function openAddStaffModal() {
  document.getElementById('add-staff-modal').classList.add('active');
}

function closeAddStaffModal() {
  document.getElementById('add-staff-modal').classList.remove('active');
}

function quickAddStaffTo(serviceId) {
  document.getElementById('staff-service-select').value = serviceId;
  openAddStaffModal();
}

function handleAddStaffSubmit(e) {
  e.preventDefault();
  const servId = document.getElementById('staff-service-select').value;
  const name = document.getElementById('staff-name-input').value;
  const role = document.getElementById('staff-role-input').value;
  const mat = document.getElementById('staff-mat-input').value;

  const targetService = services.find(s => s.id === servId);
  if (targetService) {
    targetService.staff.push({
      name: name,
      role: role,
      mat: mat,
      avatar: name.substring(0, 2).toUpperCase()
    });

    localStorage.setItem('alassia_services', JSON.stringify(services));
    renderAdminServicesGrid();
    renderServicesGrid();
    populateStaffDropdowns();
    closeAddStaffModal();
    
    logEvent('ADMIN', `Asignación de nuevo profesional ${name} (${role}) a ${targetService.name}`);
    showToast(`¡${name} fue asignado/a exitosamente a ${targetService.name}!`);

    document.getElementById('staff-name-input').value = '';
    document.getElementById('staff-role-input').value = '';
    document.getElementById('staff-mat-input').value = '';
  }
}

/* Render Active Pending Inbox */
function renderInbox(filterType = 'all') {
  const tbody = document.getElementById('inbox-table-body');
  if (!tbody) return;

  let pendingRecords = records.filter(r => r.estado === 'Pendiente' || r.estado === 'En Proceso');

  if (activeUser && !activeUser.isAdmin) {
    pendingRecords = pendingRecords.filter(r => {
      const targetServ = (r.servicio || r.destino || '').toLowerCase();
      const userServ = activeUser.service.toLowerCase();
      return targetServ.includes(userServ) || userServ.includes(targetServ);
    });
  }

  if (filterType !== 'all') {
    pendingRecords = pendingRecords.filter(r => r.type.includes(filterType));
  }

  if (pendingRecords.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
          <i class="ri-checkbox-circle-line" style="font-size: 2rem; color: var(--emerald-500); display: block; margin-bottom: 0.5rem;"></i>
          ¡No hay solicitudes pendientes para este servicio! Todo fue resuelto o archivado.
        </td>
      </tr>
    `;
    document.getElementById('inbox-badge').textContent = 0;
    return;
  }

  tbody.innerHTML = pendingRecords.map(r => `
    <tr>
      <td><span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: var(--primary-600);">${r.id}</span></td>
      <td>
        <strong>${r.type}</strong>
        ${r.isRecurring ? `<br><span style="font-size: 0.7rem; color: #b45309; font-weight: 700;"><i class="ri-repeat-line"></i> Módulo ${r.moduloActual}/${r.totalModulos}</span>` : ''}
      </td>
      <td>${r.paciente}</td>
      <td>${r.servicio || r.destino || 'General'}</td>
      <td><strong style="color: var(--primary-700);">${r.staffAssigned || 'Equipo del Servicio'}</strong></td>
      <td>${r.fecha}</td>
      <td>
        <select class="status-select-inline" onchange="changeStatusInline('${r.id}', this.value)">
          <option value="Pendiente" ${r.estado === 'Pendiente' ? 'selected' : ''}>🟠 Pendiente</option>
          <option value="En Proceso" ${r.estado === 'En Proceso' ? 'selected' : ''}>🔵 En Proceso</option>
          <option value="Confirmado / Resuelto">🟢 Confirmado (Archivar)</option>
        </select>
      </td>
      <td>
        <div style="display: flex; gap: 0.4rem;">
          <button class="btn-secondary" style="padding: 0.35rem 0.65rem; font-size: 0.775rem;" onclick="viewRecordDetail('${r.id}')" title="Ver Hoja Digital">
            <i class="ri-eye-line"></i> Sheet
          </button>
          <button class="btn-success" style="padding: 0.35rem 0.65rem; font-size: 0.775rem;" onclick="openResolveModal('${r.id}')" title="Responder e Dictaminar">
            <i class="ri-edit-box-line"></i> Dictaminar
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  document.getElementById('inbox-badge').textContent = pendingRecords.length;
}

/* Render Archive of Confirmed & Resolved Consultations */
function renderArchiveTable() {
  const tbody = document.getElementById('archive-table-body');
  if (!tbody) return;

  let resolvedRecords = records.filter(r => r.estado.includes('Confirmado') || r.estado === 'Completada' || r.estado === 'Tratamiento Completado');

  if (activeUser && !activeUser.isAdmin) {
    resolvedRecords = resolvedRecords.filter(r => {
      const targetServ = (r.servicio || r.destino || '').toLowerCase();
      const userServ = activeUser.service.toLowerCase();
      return targetServ.includes(userServ) || userServ.includes(targetServ);
    });
  }

  tbody.innerHTML = resolvedRecords.map(r => `
    <tr>
      <td><span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: var(--emerald-600);">${r.id}</span></td>
      <td><strong>${r.type}</strong></td>
      <td>${r.paciente}</td>
      <td>${r.servicio || r.destino || 'General'}</td>
      <td><span style="font-size: 0.8rem; color: var(--text-main); font-style: italic;">"${r.respuestaMedica || 'Informe registrado'}"</span></td>
      <td><strong>${r.medicoRespondedor || r.medico}</strong></td>
      <td>${r.fecha}</td>
      <td>
        <button class="btn-secondary" style="padding: 0.35rem 0.65rem; font-size: 0.775rem;" onclick="viewRecordDetail('${r.id}')">
          <i class="ri-file-text-line"></i> Ver Sheet
        </button>
      </td>
    </tr>
  `).join('');
}

/* Render Official Monthly Reports & Metrics Section */
function renderReportSection() {
  const tbody = document.getElementById('report-table-body');
  if (!tbody) return;

  const totalDispenses = records.filter(r => r.type === 'Receta Electrónica' || r.type === 'Prescripción Nutricional').length;
  const nutriCount = records.filter(r => r.type === 'Prescripción Nutricional').length;
  const farmCount = records.filter(r => r.type === 'Receta Electrónica').length;
  const overdueCount = records.filter(r => r.isRecurring && r.proximoRetiro < new Date().toISOString().split('T')[0]).length;

  document.getElementById('rep-total-dispensa').textContent = totalDispenses;
  document.getElementById('rep-nutri-count').textContent = nutriCount;
  document.getElementById('rep-farm-count').textContent = farmCount;
  document.getElementById('rep-overdue-count').textContent = overdueCount;

  tbody.innerHTML = records.map(r => `
    <tr>
      <td><span style="font-family: 'JetBrains Mono', monospace; font-weight: 700;">${r.id}</span></td>
      <td>${r.paciente} (HC: ${r.hc})</td>
      <td><strong>${r.servicio || r.type}</strong> — ${r.rp1 || r.motivo || r.diagnostico}</td>
      <td>${r.isRecurring ? `Módulo ${r.moduloActual}/${r.totalModulos}` : 'Entrega Única'}</td>
      <td>${r.fecha}</td>
      <td>${r.medicoRespondedor || r.medico}</td>
      <td>
        <span class="status-pill ${r.estado.includes('Confirmado') || r.estado === 'Completada' ? 'completed' : 'pending'}">
          ${r.estado}
        </span>
      </td>
    </tr>
  `).join('');
}

/* Render Services Grid (Public view) */
function renderServicesGrid() {
  const container = document.getElementById('services-cards-container');
  if (!container) return;

  const enabledServices = services.filter(s => s.enabled);

  container.innerHTML = enabledServices.map(s => `
    <div class="service-card">
      <div>
        <div class="service-card-header">
          <h3>${s.name}</h3>
          <span class="code-tag">${s.code}</span>
        </div>

        <p style="font-size: 0.8rem; color: var(--primary-600); font-weight: 600; margin-bottom: 0.4rem;">
          <i class="ri-user-star-line"></i> Jefe de Servicio: <strong>${s.headOfService}</strong>
        </p>

        <p style="font-size: 0.75rem; color: ${s.autorizadoLeches ? 'var(--emerald-600)' : 'var(--text-muted)'}; font-weight: 600; margin-bottom: 0.75rem;">
          <i class="ri-shield-check-line"></i> ${s.autorizadoLeches ? 'Autorizado para Recetas de Leches' : 'Emisión de Leches No Habilitada'}
        </p>

        <h4 style="font-size: 0.8rem; text-transform: uppercase; color: var(--slate-600); margin-bottom: 0.75rem;">
          Personal a Cargo (${s.staff.length})
        </h4>

        <ul class="staff-list">
          ${s.staff.map(m => `
            <li class="staff-member-item">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div class="staff-avatar-mini">${m.avatar || m.name.substring(0, 2).toUpperCase()}</div>
                <div class="staff-info-mini">
                  <h5>${m.name}</h5>
                  <p>${m.role}</p>
                </div>
              </div>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

/* Tab Navigation */
function initTabs() {
  const navButtons = document.querySelectorAll('.nav-item button');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });
}

function switchTab(tabId) {
  document.querySelectorAll('.nav-item button').forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
  const targetContent = document.getElementById(tabId);
  if (targetContent) targetContent.classList.add('active');

  const titleMap = {
    'tab-dashboard': 'Panel General de Interconsultas',
    'tab-inbox': 'Bandeja de Entrada (Solicitudes Pendientes)',
    'tab-archive': 'Archivo e Historial de Interconsultas Resueltas',
    'tab-recurrencia': 'Control de Retiros Mensuales & Alarmas (Tratamientos Crónicos)',
    'tab-reportes': 'Reportes de Entregas Mensuales & Métricas Hospitalarias',
    'tab-logs': 'Registro de Auditoría y Trazabilidad (Audit Trail)',
    'tab-admin': 'Panel de Administración de Servicios y Permisos',
    'tab-services': 'Gestión de Servicios Hospitalarios y Personal a Cargo',
    'tab-cardio': 'Solicitud de Interconsulta • Servicio de Cardiología',
    'tab-general': 'Solicitud de Interconsulta Médica General',
    'tab-farmacia': 'Receta Electrónica de Farmacia Hospitalaria',
    'tab-imagenes': 'Solicitud de Diagnóstico por Imágenes',
    'tab-nutri': 'Recetario de Prescripción de Fórmulas Lácteas y Nutrición'
  };
  document.getElementById('active-tab-title').textContent = titleMap[tabId] || 'Portal Alassia';

  // Auto-restore form draft if available
  const activeTabEl = document.getElementById(tabId);
  if (activeTabEl) {
    const form = activeTabEl.querySelector('form');
    if (form && form.id) {
      restoreFormDraft(form.id);
    }
  }

  // Re-render Admin Panel grids dynamically when switching to tab-admin
  if (tabId === 'tab-admin') {
    renderAdminFormPermissions();
    renderAdminServicesGrid();
  }

  // Always update form availability state across sidebar, dashboard cards, and form containers
  updateFormAvailabilityState();
}

/* Web Audio API Hospital Notification Sound Chime */
function playAudioAlert() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 note
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5 note

    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
  } catch (e) {
    console.log("Audio alert system active.");
  }
}

/* Keyboard Shortcuts Engine */
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Ctrl + Shift + L: Logout
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      logoutUser();
      return;
    }

    // Ctrl + B: Focus DNI input of active tab
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      const activeTab = document.querySelector('.tab-content.active');
      if (activeTab) {
        const dniInput = activeTab.querySelector('input[id$="-dni"], input[id$="-hc"]');
        if (dniInput) {
          dniInput.focus();
          dniInput.select();
          showToast('⚡ Acceso Rápido (Ctrl+B): Búsqueda por DNI enfocada.');
        }
      }
      return;
    }

    // Ctrl + Enter: Submit active form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      const activeTab = document.querySelector('.tab-content.active');
      if (activeTab) {
        const form = activeTab.querySelector('form');
        if (form && !e.target.closest('.modal-backdrop')) {
          e.preventDefault();
          form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
      }
    }
  });
}

/* Auto-Save Drafts System (sessionStorage) */
function initDraftAutoSave() {
  document.addEventListener('input', (e) => {
    const form = e.target.closest('form');
    if (form && form.id && form.id !== 'login-form-el') {
      const formData = {};
      const inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        if (input.id && input.type !== 'password' && input.type !== 'hidden') {
          formData[input.id] = input.type === 'checkbox' ? input.checked : input.value;
        }
      });
      sessionStorage.setItem(`alassia_draft_${form.id}`, JSON.stringify(formData));
    }
  });
}

function restoreFormDraft(formId) {
  const saved = sessionStorage.getItem(`alassia_draft_${formId}`);
  if (!saved) return;

  try {
    const data = JSON.parse(saved);
    const form = document.getElementById(formId);
    if (!form) return;

    let restored = false;
    Object.keys(data).forEach(id => {
      const el = document.getElementById(id);
      if (el && data[id] !== '' && data[id] !== false) {
        if (el.type === 'checkbox') {
          el.checked = data[id];
        } else {
          el.value = data[id];
        }
        el.dispatchEvent(new Event('input'));
        restored = true;
      }
    });

    if (restored) {
      showToast('ℹ️ Borrador en progreso restaurado automáticamente.');
    }
  } catch (err) {
    console.error("Draft restoration error", err);
  }
}

/* Generic Reactive data-sync Event Listener */
function initGlobalDataSync() {
  document.addEventListener('input', (e) => {
    const syncTargetId = e.target.dataset.sync;
    if (syncTargetId) {
      const targetEl = document.getElementById(syncTargetId);
      if (targetEl) {
        const fallback = e.target.dataset.fallback || '—';
        targetEl.textContent = e.target.value.trim() !== '' ? e.target.value : fallback;
      }
    }
  });
}

/* Dark / Light Theme Handler */
function initTheme() {
  const themeBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('alassia_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('alassia_theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle i');
  if (theme === 'dark') {
    icon.className = 'ri-sun-line';
  } else {
    icon.className = 'ri-moon-line';
  }
}

/* Live Paper Sheet Sync Bindings */
function initLivePreviewBindings() {
  bindInputToText('c-nombre', 'prev-c-nombre', 'Mateo Benítez');
  bindInputToText('c-dni', 'prev-c-dni', '48.912.304 / HC-9821');
  bindInputToText('c-edad', 'prev-c-edad', '3 años 4 meses');
  bindInputToText('c-diag', 'prev-c-diag', 'Síndrome febril prolongado');
  bindInputToText('c-motivo', 'prev-c-motivo', 'Paciente con soplo holosistólico 3/6 en foco mitral.');
  bindInputToText('c-medico', 'prev-c-medico', 'Dra. Lucía Gómez');

  bindInputToText('g-nombre', 'prev-g-nombre', 'Sofía Valentina Rossi');
  bindInputToText('g-hc', 'prev-g-hc', 'HC-40192');
  bindInputToText('g-servicio', 'prev-g-servicio', 'Clínica Pediátrica');
  bindInputToText('g-sala', 'prev-g-sala', 'Sala 4 - Cama 12 B');
  bindInputToText('g-destino', 'prev-g-destino', 'Gastroenterología Infantil');
  bindInputToText('g-motivo', 'prev-g-motivo', 'Paciente cursando 48hs de dolor abdominal en fosa ilíaca derecha.');
  bindInputToText('g-medico', 'prev-g-medico', 'Dra. Andrea Morales');

  bindInputToText('f-nombre', 'prev-f-nombre', 'Camilo Benavídez');
  bindInputToText('f-dni', 'prev-f-dni', '51.092.381 / HC-8812');
  bindInputToText('f-servicio', 'prev-f-servicio', 'Pediatría I');
  bindInputToText('f-diag', 'prev-f-diag', 'Neumonía aguda de la comunidad');
  bindInputToText('f-rp', 'prev-f-rp', 'Amoxicilina + Ácido Clavulánico 500mg/125mg suspensión oral');
  bindInputToText('f-dosis', 'prev-f-dosis', '5 ml cada 8 horas por vía oral (VO)');
  bindInputToText('f-duracion', 'prev-f-duracion', '7 días completación');
  bindInputToText('f-medico', 'prev-f-medico', 'Dr. Orlando Alassia');

  bindInputToText('i-nombre', 'prev-i-nombre', 'Valentina Morales');
  bindInputToText('i-dni', 'prev-i-dni', '49.301.992 / HC-10492');
  bindInputToText('i-servicio', 'prev-i-servicio', 'Internación General');
  bindInputToText('i-modalidad', 'prev-i-modalidad', 'Radiografía RX');
  bindInputToText('i-region', 'prev-i-region', 'Tórax Frente y Perfil');
  bindInputToText('i-motivo', 'prev-i-motivo', 'Traumatismo cerrado de tórax con hipoventilación izquierda.');
  bindInputToText('i-medico', 'prev-i-medico', 'Dr. Esteban Martínez');

  bindInputToText('n-nombre', 'prev-n-nombre', 'Joaquín Benjamín Silva');
  bindInputToText('n-dni', 'prev-n-dni', '52.190.431');
  bindInputToText('n-edad', 'prev-n-edad', '8 meses (M)');
  bindInputToText('n-servicio-select', 'prev-n-servicio', 'Gastroenterología Infantil');
  bindInputToText('n-pa', 'prev-n-pa', '6.850 kg');
  bindInputToText('n-diag', 'prev-n-diag', 'APLV / Lactante menor');
  bindInputToText('n-rp1-formula', 'prev-n-rp1-formula', 'Fórmula de Inicio Extensamente Hidrolizada');
  bindInputToText('n-rp1-vol', 'prev-n-rp1-vol', 'Dilución 13.5% / 150 cc');
  bindInputToText('n-rp1-via', 'prev-n-rp1-via', '8 tomas cada 3hs (VO)');
  bindInputToText('n-medico', 'prev-n-medico', 'Dra. Mariana López');
}

function updateNutriService(val) {
  const hiddenInput = document.getElementById('n-servicio');
  if (hiddenInput) hiddenInput.value = val;

  const preview = document.getElementById('prev-n-servicio');
  if (preview) preview.textContent = val;
}

function bindInputToText(inputId, previewId, fallbackText) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  if (!input || !preview) return;

  const update = () => {
    preview.textContent = input.value.trim() !== '' ? input.value : fallbackText;
  };

  input.addEventListener('input', update);
  input.addEventListener('change', update);
}

function initRecurringFormToggles() {
  const fRec = document.getElementById('f-is-recurring');
  const fGroup = document.getElementById('f-recurring-months-group');
  if (fRec && fGroup) {
    fRec.addEventListener('change', () => {
      fGroup.style.display = fRec.checked ? 'block' : 'none';
    });
  }

  const nRec = document.getElementById('n-is-recurring');
  const nGroup = document.getElementById('n-recurring-months-group');
  if (nRec && nGroup) {
    nRec.addEventListener('change', () => {
      nGroup.style.display = nRec.checked ? 'block' : 'none';
    });
  }
}

/* Form Submissions */
function handleFormSubmit(event, type) {
  event.preventDefault();

  const typePermMap = {
    'Cardiología': 'cardio',
    'Interconsulta General': 'general',
    'Receta Electrónica': 'farmacia',
    'Receta de Farmacia': 'farmacia',
    'Diagnóstico por Imágenes': 'imagenes',
    'Prescripción Nutricional / Leches': 'nutri',
    'Prescripción Nutricional': 'nutri'
  };

  const permKey = typePermMap[type];
  if (permKey && formPermissions && formPermissions[permKey] && !formPermissions[permKey].enabled) {
    showToast(`🔴 ERROR: Los pedidos de ${type} están suspendidos por Administración.`);
    alert(`[ 🚫 SOLICITUD SUSPENDIDA ] La emisión de pedidos de "${type}" se encuentra suspendida por la Dirección Médica. No es posible enviar este formulario.`);
    return;
  }

  playAudioAlert();
  
  let newRecord = {
    id: `${type.substring(0, 4).toUpperCase()}-2026-${Math.floor(100 + Math.random() * 900)}`,
    type: type,
    fecha: new Date().toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' }),
    estado: 'Pendiente',
    respuestaMedica: '',
    medicoRespondedor: '',
    isRecurring: false
  };

  let targetEmail = "";

  if (type === 'Cardiología') {
    newRecord.paciente = document.getElementById('c-nombre').value;
    newRecord.dni = document.getElementById('c-dni').value || 'Sin DNI';
    newRecord.hc = document.getElementById('c-dni').value || 'HC-9821';
    newRecord.edad = document.getElementById('c-edad').value;
    newRecord.servicio = 'Cardiología Infantil';
    newRecord.staffAssigned = document.getElementById('c-staff-target').value;
    newRecord.diagnostico = document.getElementById('c-diag').value;
    newRecord.motivo = document.getElementById('c-motivo').value;
    newRecord.medico = document.getElementById('c-medico').value || activeUser.name;
    targetEmail = document.getElementById('c-email').value || 'cardiologia.alassia@santafe.gob.ar';
  } else if (type === 'Interconsulta General') {
    newRecord.paciente = document.getElementById('g-nombre').value;
    newRecord.dni = 's/d';
    newRecord.hc = document.getElementById('g-hc').value || 'HC-SN';
    newRecord.servicio = document.getElementById('g-servicio').value;
    newRecord.destino = document.getElementById('g-destino').value;
    newRecord.staffAssigned = document.getElementById('g-staff-target').value;
    newRecord.motivo = document.getElementById('g-motivo').value;
    newRecord.medico = document.getElementById('g-medico').value || activeUser.name;
    targetEmail = document.getElementById('g-email').value || 'gastroenterologia.alassia@santafe.gob.ar';
  } else if (type === 'Receta Electrónica') {
    newRecord.paciente = document.getElementById('f-nombre').value;
    newRecord.dni = document.getElementById('f-dni').value || 'Sin DNI';
    newRecord.hc = document.getElementById('f-dni').value || 'HC-REC';
    newRecord.servicio = 'Farmacia y Recetas Electrónicas';
    newRecord.staffAssigned = document.getElementById('f-staff-target').value;
    newRecord.diagnostico = document.getElementById('f-diag').value;
    newRecord.rp1 = `${document.getElementById('f-rp').value} — ${document.getElementById('f-dosis').value}`;
    newRecord.medico = document.getElementById('f-medico').value || activeUser.name;
    targetEmail = document.getElementById('f-email').value || 'farmacia.alassia@santafe.gob.ar';

    const isRec = document.getElementById('f-is-recurring').checked;
    if (isRec) {
      newRecord.isRecurring = true;
      newRecord.moduloActual = 1;
      newRecord.totalModulos = parseInt(document.getElementById('f-total-modulos').value || '6');
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + 30);
      newRecord.proximoRetiro = nextDate.toISOString().split('T')[0];
    }
  } else if (type === 'Solicitud de Imágenes') {
    newRecord.paciente = document.getElementById('i-nombre').value;
    newRecord.dni = document.getElementById('i-dni').value || 'Sin DNI';
    newRecord.hc = document.getElementById('i-dni').value || 'HC-IMG';
    newRecord.servicio = 'Diagnóstico por Imágenes';
    newRecord.staffAssigned = document.getElementById('i-staff-target').value;
    newRecord.diagnostico = document.getElementById('i-modalidad').value;
    newRecord.motivo = `Estudio: ${document.getElementById('i-modalidad').value} en ${document.getElementById('i-region').value}. Indicación: ${document.getElementById('i-motivo').value}`;
    newRecord.medico = document.getElementById('i-medico').value || activeUser.name;
    targetEmail = document.getElementById('i-email').value || 'imagenes.alassia@santafe.gob.ar';
  } else if (type === 'Prescripción Nutricional') {
    newRecord.paciente = document.getElementById('n-nombre').value;
    newRecord.dni = document.getElementById('n-dni').value || 's/d';
    newRecord.hc = 'HC-NUT';
    newRecord.servicio = document.getElementById('n-servicio-select').value || 'Gastroenterología Infantil';
    newRecord.staffAssigned = document.getElementById('n-staff-target').value;
    newRecord.diagnostico = document.getElementById('n-diag').value;
    newRecord.rp1 = `${document.getElementById('n-rp1-formula').value} - ${document.getElementById('n-rp1-vol').value}`;
    newRecord.medico = document.getElementById('n-medico').value || activeUser.name;
    targetEmail = document.getElementById('n-email').value || 'lactario.alassia@santafe.gob.ar';

    const isRec = document.getElementById('n-is-recurring').checked;
    if (isRec) {
      newRecord.isRecurring = true;
      newRecord.moduloActual = 1;
      newRecord.totalModulos = parseInt(document.getElementById('n-total-modulos').value || '6');
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + 30);
      newRecord.proximoRetiro = nextDate.toISOString().split('T')[0];
    }
  }

  // Save Record
  records.unshift(newRecord);
  localStorage.setItem('alassia_records', JSON.stringify(records));

  // Log Audit Event
  logEvent('CREACION', `Emisión de ${newRecord.type} #${newRecord.id} para paciente ${newRecord.paciente} (HC: ${newRecord.hc})`);

  // Clean form inputs for next submission
  if (event.target && event.target.reset) {
    event.target.reset();
  }
  renderActiveUser(); // restore doctor name in form

  // Trigger Notification
  addNotification({
    title: `Nueva Solicitud: ${newRecord.type}`,
    text: `Asignado a: ${newRecord.staffAssigned}. Paciente: ${newRecord.paciente} (${newRecord.id}).`,
    time: "Ahora"
  });

  // Trigger Email Preview Modal
  showEmailPreviewModal(newRecord, targetEmail);

  // Update UI
  renderInbox();
  renderArchiveTable();
  renderReportSection();
  renderRecurringSection();
  updateStats();
  showToast(`Solicitud ${newRecord.id} creada e informada a ${newRecord.staffAssigned}`);
}

/* Email Dispatch Preview Modal */
function showEmailPreviewModal(record, targetEmail) {
  const modalBody = document.getElementById('email-modal-body');
  modalBody.innerHTML = `
    <div class="email-meta-line"><strong>Para:</strong> <span>${targetEmail}</span></div>
    <div class="email-meta-line"><strong>Personal a Cargo:</strong> <span style="color: #0284c7; font-weight: 700;">${record.staffAssigned || 'Equipo Médico de Servicio'}</span></div>
    <div class="email-meta-line"><strong>De:</strong> <span>sistema-interconsultas@alassia.santafe.gob.ar (${record.medico})</span></div>
    <div class="email-meta-line"><strong>Asunto:</strong> <span>[SOLICITUD OFICIAL #${record.id}] ${record.type} para ${record.paciente}</span></div>
    
    <div class="email-body-preview">
      <p>Estimado/a <strong>${record.staffAssigned}</strong> y equipo del Servicio,</p>
      <p>Se ha registrado un nuevo pedido digital en el sistema del <strong>Hospital de Niños Dr. Orlando Alassia</strong> bajo su responsabilidad:</p>
      
      <div style="background: white; border: 1px solid #cbd5e1; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
        <p><strong>ID Solicitud:</strong> ${record.id}</p>
        <p><strong>Tipo:</strong> ${record.type}</p>
        <p><strong>Paciente:</strong> ${record.paciente} (HC: ${record.hc})</p>
        <p><strong>Servicio Solicitante:</strong> ${record.servicio || 'Pediatría General'}</p>
        <p><strong>Personal Notificado:</strong> ${record.staffAssigned}</p>
        <p><strong>Detalle / Prescripción:</strong> ${record.motivo || record.diagnostico || record.rp1}</p>
        <p><strong>Emitido por:</strong> ${record.medico}</p>
      </div>

      <p>Podés acceder directamente al sistema web para procesar el pedido haciendo clic en el siguiente enlace:</p>
      <p><a href="http://localhost:3000" style="color: #0284c7; font-weight: 700;">Acceder al Sistema Digital #${record.id} →</a></p>
    </div>
  `;

  document.getElementById('email-modal').classList.add('active');
}

function closeEmailModal() {
  document.getElementById('email-modal').classList.remove('active');
  switchTab('tab-inbox');
}

/* Status Resolution Handler */
function openResolveModal(id) {
  const record = records.find(r => r.id === id);
  if (!record) return;

  document.getElementById('resolve-record-id').value = record.id;
  document.getElementById('resolve-modal-title').textContent = `Responder Interconsulta / Cargar Dictamen`;
  document.getElementById('resolve-modal-subtitle').textContent = `Paciente: ${record.paciente} (${record.id}) • Servicio: ${record.servicio || record.type}`;
  document.getElementById('resolve-status-select').value = record.estado.includes('Confirmado') ? 'Confirmado / Resuelto' : record.estado;
  document.getElementById('resolve-response-text').value = record.respuestaMedica || '';
  document.getElementById('resolve-doctor-name').value = record.medicoRespondedor || activeUser.name;

  document.getElementById('resolve-modal').classList.add('active');
}

function closeResolveModal() {
  document.getElementById('resolve-modal').classList.remove('active');
}

function handleResolveSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('resolve-record-id').value;
  const newStatus = document.getElementById('resolve-status-select').value;
  const responseText = document.getElementById('resolve-response-text').value;
  const doctorName = document.getElementById('resolve-doctor-name').value;

  const record = records.find(r => r.id === id);
  if (record) {
    record.estado = newStatus;
    record.respuestaMedica = responseText;
    record.medicoRespondedor = doctorName;

    localStorage.setItem('alassia_records', JSON.stringify(records));

    logEvent('RESOLUCION', `Solicitud #${record.id} dictaminada y confirmada por ${doctorName}. Estado: ${newStatus}. Archivada.`);

    addNotification({
      title: `Interconsulta Resuelta: ${record.id}`,
      text: `${record.paciente} resuelto por ${doctorName}. Archivada de la bandeja.`,
      time: "Ahora"
    });

    renderInbox();
    renderArchiveTable();
    renderReportSection();
    updateStats();
    closeResolveModal();
    showToast(`¡Solicitud ${record.id} confirmada y archivada exitosamente!`);
  }
}

function changeStatusInline(id, newStatus) {
  const record = records.find(r => r.id === id);
  if (record) {
    if (newStatus === 'Confirmado / Resuelto') {
      openResolveModal(id);
      return;
    }

    record.estado = newStatus;
    localStorage.setItem('alassia_records', JSON.stringify(records));

    logEvent('RESOLUCION', `Estado de solicitud #${record.id} cambiado a "${newStatus}"`);

    renderInbox();
    renderArchiveTable();
    updateStats();
    showToast(`Estado de ${record.id} cambiado a "${newStatus}"`);
  }
}

/* Render Recurring Section & Alarms */
function renderRecurringSection() {
  const container = document.getElementById('recurring-cards-container');
  if (!container) return;

  let recurringRecords = records.filter(r => r.isRecurring);

  // Strict RBAC Filtering per role/service: Nutrición sees leches, Farmacia sees recetas, etc.
  if (activeUser && !activeUser.isAdmin) {
    const userServ = (activeUser.service || '').toLowerCase();
    recurringRecords = recurringRecords.filter(r => {
      const recServ = (r.servicio || r.destino || '').toLowerCase();
      const recType = (r.tipo || r.type || '').toLowerCase();

      if (userServ.includes('nutri') || userServ.includes('lactario')) {
        return recServ.includes('nutri') || recType.includes('leche') || recType.includes('nutri');
      }
      if (userServ.includes('farmacia')) {
        return recServ.includes('farmacia') || recType.includes('receta') || recType.includes('farmacia');
      }
      if (userServ.includes('cardio')) {
        return recServ.includes('cardio') || recType.includes('cardio');
      }
      if (userServ.includes('imágenes')) {
        return recServ.includes('imágenes') || recType.includes('imágenes');
      }

      return recServ.includes(userServ) || userServ.includes(recServ);
    });
  }

  const todayStr = new Date().toISOString().split('T')[0];

  if (recurringRecords.length === 0) {
    container.innerHTML = `<div style="grid-column: span 3; padding: 2.5rem; text-align: center; color: var(--text-muted); background: var(--card-bg); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
      <i class="ri-shield-check-line" style="font-size: 2.2rem; color: var(--emerald-500); display: block; margin-bottom: 0.5rem;"></i>
      No hay controles de retiros ni tratamientos crónicos asignados al servicio <strong>${activeUser ? activeUser.service : ''}</strong>.
    </div>`;
    return;
  }

  container.innerHTML = recurringRecords.map(r => {
    const isOverdue = r.proximoRetiro < todayStr;
    const isToday = r.proximoRetiro === todayStr;
    const percent = Math.round((r.moduloActual / r.totalModulos) * 100);

    let cardClass = "alert-ok";
    let statusTag = `<span class="action-tag nutri">Retiro al día</span>`;
    let alarmMsg = `<p style="font-size: 0.8rem; color: var(--emerald-600);"><i class="ri-calendar-check-line"></i> Próxima entrega programada: <strong>${r.proximoRetiro}</strong></p>`;

    if (isOverdue) {
      cardClass = "alert-overdue";
      statusTag = `<span class="action-tag cardio">🔴 ALARMA AUSENTISMO</span>`;
      alarmMsg = `<p style="font-size: 0.8rem; color: var(--rose-600); font-weight: 700;"><i class="ri-error-warning-line"></i> ¡Atrasado! Debió retirar el ${r.proximoRetiro}</p>`;
    } else if (isToday) {
      cardClass = "alert-due";
      statusTag = `<span class="action-tag farmacia">🟢 RETIRO HABILITADO HOY</span>`;
      alarmMsg = `<p style="font-size: 0.8rem; color: #b45309; font-weight: 700;"><i class="ri-checkbox-circle-line"></i> Disponible para retirar Módulo ${r.moduloActual}/${r.totalModulos} hoy</p>`;
    }

    return `
      <div class="recurring-card ${cardClass}">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
            ${statusTag}
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--primary-600); font-weight: 700;">${r.id}</span>
          </div>

          <h3 style="font-size: 1.1rem; margin-bottom: 2px;">${r.paciente}</h3>
          <p style="font-size: 0.775rem; color: var(--text-muted); margin-bottom: 0.75rem;">HC: ${r.hc} • DNI: ${r.dni} • ${r.servicio}</p>

          <div style="background: var(--slate-50); border: 1px solid var(--border-color); padding: 0.75rem; border-radius: var(--radius-md); margin-bottom: 0.75rem;">
            <p style="font-size: 0.825rem; font-weight: 600; color: var(--text-main); margin-bottom: 2px;">Tratamiento / Insumo:</p>
            <p style="font-size: 0.8rem; color: var(--slate-600);">${r.rp1 || r.motivo || r.diagnostico}</p>
          </div>

          <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 600; color: var(--text-main);">
            <span>Módulo de Retiro: ${r.moduloActual} de ${r.totalModulos}</span>
            <span>${percent}% Completado</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: ${percent}%;"></div>
          </div>

          ${alarmMsg}
        </div>

        <div style="margin-top: 1.25rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button class="btn-success" style="flex: 1; justify-content: center; font-size: 0.8rem; padding: 0.55rem;" onclick="dispenseNextModule('${r.id}')">
            <i class="ri-check-double-line"></i> Registrar Entrega (Módulo ${r.moduloActual}/${r.totalModulos})
          </button>

          ${isOverdue ? `
            <button class="btn-secondary" style="color: var(--rose-600); border-color: var(--rose-500); font-size: 0.775rem; padding: 0.55rem;" onclick="triggerAbsenteeismAlert('${r.id}')" title="Notificar a Servicio Social">
              <i class="ri-alarm-warning-line"></i> Alerta Trabajo Social
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

/* Dispense Next Module Action */
function dispenseNextModule(id) {
  const record = records.find(r => r.id === id);
  if (!record) return;

  if (record.moduloActual >= record.totalModulos) {
    showToast(`El tratamiento de ${record.paciente} ya completó todos sus módulos (${record.totalModulos}/${record.totalModulos}).`);
    return;
  }

  record.moduloActual += 1;
  
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 30);
  record.proximoRetiro = nextDate.toISOString().split('T')[0];

  if (record.moduloActual === record.totalModulos) {
    record.estado = "Tratamiento Completado";
  }

  localStorage.setItem('alassia_records', JSON.stringify(records));

  logEvent('DISPENSA', `Dispensa registrada: Módulo ${record.moduloActual}/${record.totalModulos} para paciente ${record.paciente} (${record.id})`);

  addNotification({
    title: `Entrega Registrada: Módulo ${record.moduloActual}/${record.totalModulos}`,
    text: `Paciente ${record.paciente} (${record.id}). Próxima entrega programada para ${record.proximoRetiro}.`,
    time: "Ahora"
  });

  renderRecurringSection();
  renderInbox();
  renderReportSection();
  showToast(`¡Entrega de Módulo ${record.moduloActual}/${record.totalModulos} registrada con éxito para ${record.paciente}!`);
}

function triggerAbsenteeismAlert(id) {
  const record = records.find(r => r.id === id);
  if (!record) return;

  logEvent('ALARMA', `Alerta de inasistencia/ausentismo despachada a Trabajo Social para paciente ${record.paciente} (${record.id})`);

  addNotification({
    title: `🚨 ALERTA TRABAJO SOCIAL DESPACHADA`,
    text: `Solicitado contacto con la familia de ${record.paciente} por inasistencia al retiro de su tratamiento (${record.id}).`,
    time: "Ahora"
  });

  showToast(`Alerta de inasistencia despachada a Trabajo Social y Pediatría para ${record.paciente}`);
}

function checkAllAlarms() {
  renderRecurringSection();
  showToast(`Alarmas de retiro mensual escaneadas y actualizadas al ${new Date().toLocaleDateString('es-AR')}`);
}

/* Notifications Dropdown & Engine */
function addNotification(notifObj) {
  notifications.unshift({
    id: Date.now(),
    title: notifObj.title,
    text: notifObj.text,
    time: notifObj.time,
    unread: true
  });
  localStorage.setItem('alassia_notifs', JSON.stringify(notifications));
  renderNotifications();
}

function renderNotifications() {
  const notifList = document.getElementById('notif-list');
  const dot = document.getElementById('notif-dot');
  if (!notifList) return;

  const unreadCount = notifications.filter(n => n.unread).length;
  if (dot) dot.style.display = unreadCount > 0 ? 'block' : 'none';

  if (notifications.length === 0) {
    notifList.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">No hay notificaciones pendientes.</div>`;
    return;
  }

  notifList.innerHTML = notifications.map(n => `
    <div class="notif-item ${n.unread ? 'unread' : ''}">
      <div class="notif-icon">
        <i class="ri-notification-badge-line"></i>
      </div>
      <div class="notif-text">
        <p><strong>${n.title}</strong></p>
        <p style="color: var(--text-muted);">${n.text}</p>
        <span>${n.time}</span>
      </div>
    </div>
  `).join('');
}

function toggleNotifDropdown() {
  const dd = document.getElementById('notif-dropdown');
  dd.classList.toggle('active');
}

function clearNotifs() {
  notifications.forEach(n => n.unread = false);
  localStorage.setItem('alassia_notifs', JSON.stringify(notifications));
  renderNotifications();
}

/* Toast Notifications */
function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="ri-checkbox-circle-fill" style="color: var(--emerald-500); font-size: 1.2rem;"></i> <span>${message}</span>`;
  
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

function updateStats() {
  const pendingCount = records.filter(r => r.estado === 'Pendiente' || r.estado === 'En Proceso').length;
  const resolvedCount = records.filter(r => r.estado.includes('Confirmado') || r.estado === 'Completada' || r.estado === 'Tratamiento Completado').length;
  const authorizedMilkCount = services.filter(s => s.enabled && s.autorizadoLeches).length;

  document.getElementById('stat-pending-inbox').textContent = pendingCount;
  document.getElementById('stat-resolved-total').textContent = resolvedCount;
  document.getElementById('stat-authorized-leches').textContent = authorizedMilkCount;
  
  const recBadge = document.getElementById('recurring-badge');
  const recStat = document.getElementById('stat-recurring');
  const activeRecCount = records.filter(r => r.isRecurring).length;
  if (recBadge) recBadge.textContent = activeRecCount;
  if (recStat) recStat.textContent = activeRecCount;
}

/* Detail Modal Renderer */
function viewRecordDetail(id) {
  const record = records.find(r => r.id === id);
  if (!record) return;

  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = `
    <div class="paper-sheet" style="box-shadow: none; border: none; padding: 0;">
      <div class="paper-header">
        <div class="paper-logo">
          <i class="ri-hospital-line" style="font-size: 2.2rem; color: #0284c7;"></i>
          <div class="paper-logo-text">
            <h3>Hospital de Niños Dr. Orlando Alassia</h3>
            <p>Provincia de Santa Fe • Registro Oficial #${record.id}</p>
          </div>
        </div>
        <div class="paper-doc-title">
          <h4>${record.type.toUpperCase()}</h4>
          <span>ESTADO: ${record.estado}</span>
        </div>
      </div>

      <div class="paper-section">
        <div class="paper-section-title">Información del Paciente</div>
        <div class="paper-field-grid">
          <div class="paper-field"><strong>Paciente:</strong> <span>${record.paciente}</span></div>
          <div class="paper-field"><strong>DNI / HC:</strong> <span>${record.dni} / ${record.hc}</span></div>
          <div class="paper-field"><strong>Fecha Emisión:</strong> <span>${record.fecha}</span></div>
          <div class="paper-field"><strong>Servicio Solicitante:</strong> <span>${record.servicio || 'General'}</span></div>
          <div class="paper-field"><strong>Personal Notificado:</strong> <span style="color: #0284c7; font-weight: 700;">${record.staffAssigned || 'Equipo del Servicio'}</span></div>
          ${record.isRecurring ? `<div class="paper-field"><strong>Esquema Recurrente:</strong> <span style="color: #b45309; font-weight: 700;">Módulo ${record.moduloActual} de ${record.totalModulos} (Próx. Retiro: ${record.proximoRetiro})</span></div>` : ''}
        </div>
      </div>

      <div class="paper-section">
        <div class="paper-section-title">Motivo / Diagnóstico Prescripto</div>
        <div class="paper-box-content">
          ${record.motivo || record.diagnostico || record.rp1 || 'Sin especificaciones detalladas'}
        </div>
      </div>

      <div class="paper-section">
        <div class="paper-section-title">Informe de Respuesta / Dictamen del Especialista</div>
        <div class="paper-box-content" style="${record.respuestaMedica ? 'border-color: #10b981; background-color: #ecfdf5; color: #065f46;' : 'color: #94a3b8;'}">
          ${record.respuestaMedica || '[Aguardando informe médico o dictamen del servicio consultado]'}
        </div>
      </div>

      <div class="paper-signatures" style="margin-top: 2rem;">
        <div class="signature-box">
          <div class="signature-line"></div>
          <p>Solicitante<br><span>${record.medico}</span></p>
        </div>
        <div class="signature-box">
          <div class="signature-line"></div>
          <p>Firma y Sello Especialista Consultante<br><span>${record.medicoRespondedor || record.staffAssigned || 'Servicio Alassia'}</span></p>
        </div>
      </div>
    </div>
  `;

  document.getElementById('detail-modal').classList.add('active');
}

function closeModal() {
  document.getElementById('detail-modal').classList.remove('active');
}

/* Global Search Filter */
function setupSearch() {
  const searchInput = document.getElementById('global-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#inbox-table-body tr, #archive-table-body tr, #audit-logs-table-body tr');

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(term) ? '' : 'none';
    });
  });
}

function filterInbox(type) {
  renderInbox(type);
}

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
  },
  {
    id: "serv-social",
    name: "Servicio Social Hospitalario",
    code: "SOC",
    email: "servicio.social@santafe.gob.ar",
    headOfService: "Lic. Viviana Roldán",
    enabled: true,
    autorizadoLeches: false,
    staff: [
      { name: "Lic. Viviana Roldán", role: "Jefa de Servicio Social Hospitalario", mat: "1420", avatar: "VR" },
      { name: "Lic. Claudio Giménez", role: "Trabajador Social Pediátrico", mat: "1890", avatar: "CG" }
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
  },
  {
    id: "user-social",
    dni: "28410999",
    password: "social123",
    name: "Lic. Viviana Roldán",
    role: "Jefa de Servicio Social Hospitalario (Mat. 1420)",
    avatar: "VR",
    email: "viviana.roldan@santafe.gob.ar",
    service: "Servicio Social Hospitalario",
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
    const localMatch = DEMO_PATIENTS.find(p => p.dni === cleanDni || (p.hc || '').toLowerCase().includes((cleanDni || '').toLowerCase()));

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
    destino: "Nutrición y Lactario",
    staffAssigned: "Equipo Completo de Nutrición y Lactario",
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
    destino: "Nutrición y Lactario",
    staffAssigned: "Equipo Completo de Nutrición y Lactario",
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
let records = JSON.parse(localStorage.getItem('alassia_records')) || INITIAL_DATA;

// Auto-patch records to ensure destination service is set for RBAC filtering
records.forEach(r => {
  if (!r.destino) {
    if (r.type === 'Prescripción Nutricional') r.destino = 'Nutrición y Lactario';
    else if (r.type === 'Receta Electrónica') r.destino = 'Farmacia y Recetas Electrónicas';
    else if (r.type === 'Solicitud de Imágenes') r.destino = 'Diagnóstico por Imágenes';
    else if (r.type === 'Cardiología') r.destino = 'Cardiología Infantil';
    else r.destino = r.servicio || 'General';
  }
});
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

let activeUser = JSON.parse(localStorage.getItem('alassia_user')) || DEMO_USERS[0];
let isAuthenticated = JSON.parse(localStorage.getItem('alassia_auth'));
if (isAuthenticated === null || isAuthenticated === undefined) isAuthenticated = true;

const INITIAL_FORM_PERMISSIONS = {
  cardio: { id: "cardio", name: "Interconsulta Cardiología", tab: "tab-cardio", enabled: true, tag: "cardio", icon: "ri-heart-pulse-line" },
  general: { id: "general", name: "Interconsulta General", tab: "tab-general", enabled: true, tag: "general", icon: "ri-hospital-line" },
  farmacia: { id: "farmacia", name: "Receta Electrónica Farmacia", tab: "tab-farmacia", enabled: true, tag: "farmacia", icon: "ri-capsule-line" },
  imagenes: { id: "imagenes", name: "Solicitud de Imágenes (RX/TAC)", tab: "tab-imagenes", enabled: true, tag: "imagenes", icon: "ri-body-scan-line" },
  nutri: { id: "nutri", name: "Prescripción Leches / Nutrición", tab: "tab-nutri", enabled: true, tag: "nutri", icon: "ri-drop-line" }
};

let formPermissions = JSON.parse(localStorage.getItem('alassia_form_permissions')) || INITIAL_FORM_PERMISSIONS;

document.addEventListener('DOMContentLoaded', () => {
  applyEnvironmentMode();
  syncUsersWithServiceStaff();
  loadBackendDataFromDb();
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
  updateUserServiceDropdowns();
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

/* Global Environment & Demo UI Switch */
function applyEnvironmentMode() {
  const demoBox = document.getElementById('demo-credentials-box') || document.querySelector('.demo-credentials-box');
  if (!demoBox) return;

  const isProduction = APP_CONFIG.ENV === 'production' && !APP_CONFIG.SHOW_DEMO_USERS_MODAL;
  if (isProduction) {
    demoBox.style.display = 'none';
  } else {
    demoBox.style.display = 'block';
  }
}

/* Session & Authentication Guard */
function checkAuthSession() {
  applyEnvironmentMode();
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

function togglePasswordVisibility() {
  const passInput = document.getElementById('login-pass-input');
  const eyeIcon = document.getElementById('pass-eye-icon');
  if (!passInput) return;

  if (passInput.type === 'password') {
    passInput.type = 'text';
    if (eyeIcon) eyeIcon.className = 'ri-eye-off-line';
  } else {
    passInput.type = 'password';
    if (eyeIcon) eyeIcon.className = 'ri-eye-line';
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
    ip: `10.12.4.221 (Terminal Red Hospitalaria)`
  };

  auditLogs.unshift(newLog);
  localStorage.setItem('alassia_audit_logs', JSON.stringify(auditLogs));
  renderAuditLogs();

  // Sincronizar log de auditoría en tiempo real con la base MySQL en IP 10.12.4.2
  fetch('api.php?action=log_event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      categoria: category,
      usuario_dni: user ? user.dni : 'S/N',
      usuario_nombre: user ? user.name : 'Usuario Sistema',
      detalle: detail
    })
  }).catch(err => console.log('Sincronización MySQL 10.12.4.2:', err));
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

  // Check if active user's service has Reportes habilitados by Admin
  const serviceName = (activeUser.service || '').toLowerCase();
  const activeServiceObj = (services || []).find(s => {
    const sName = (s.name || '').toLowerCase();
    return sName.includes(serviceName) || serviceName.includes(sName);
  });
  const serviceReportEnabled = activeServiceObj ? (activeServiceObj.reportesHabilitados !== false) : true;

  // If non-admin user is currently viewing an admin tab or disabled report, automatically redirect to Dashboard
  const activeTab = document.querySelector('.tab-content.active');
  if (!activeUser.isAdmin && activeTab) {
    if (activeTab.id === 'tab-admin' || activeTab.id === 'tab-logs' || activeTab.id === 'tab-services') {
      switchTab('tab-dashboard');
    } else if (activeTab.id === 'tab-reportes' && !serviceReportEnabled) {
      showToast(`⚠️ Los reportes estadísticos para el servicio ${activeUser.service} han sido deshabilitados por la Administración.`);
      switchTab('tab-dashboard');
    }
  }
}

function applyRoleContextualFiltering() {
  if (!activeUser) return;

  const serviceName = (activeUser.service || '').toLowerCase();
  const isAdmin = activeUser.isAdmin;

  // Check if active user's service has Reportes habilitados by Admin
  const activeServiceObj = (services || []).find(s => {
    const sName = (s.name || '').toLowerCase();
    return sName.includes(serviceName) || serviceName.includes(sName);
  });
  const serviceReportEnabled = activeServiceObj ? (activeServiceObj.reportesHabilitados !== false) : true;

  // Check if user's service has any active recurring withdrawal records
  const userHasRecurring = records.some(r => {
    if (!r.isRecurring) return false;
    const recServ = (r.servicio || r.destino || '').toLowerCase();
    return recServ.includes(serviceName) || serviceName.includes(recServ);
  });

  // Define allowable form tabs per role
  const roleTabMap = {
    'cardio': isAdmin || serviceName.includes('cardio') || serviceName.includes('pediatría') || serviceName.includes('internación') || serviceName.includes('todos'),
    'general': true, // Todos los médicos pueden realizar interconsulta general
    'farmacia': isAdmin || serviceName.includes('farmacia') || serviceName.includes('crónicos') || serviceName.includes('pediatría') || serviceName.includes('todos'),
    'imagenes': isAdmin || serviceName.includes('imágenes') || serviceName.includes('internación') || serviceName.includes('pediatría') || serviceName.includes('todos'),
    'nutri': isAdmin || serviceName.includes('nutri') || serviceName.includes('gastro') || serviceName.includes('neo') || serviceName.includes('crónicos') || serviceName.includes('internación') || serviceName.includes('todos'),
    'social': isAdmin || serviceName.includes('social') || serviceName.includes('trabajo'),
    'recurrencia': isAdmin || serviceName.includes('farmacia') || serviceName.includes('nutri') || serviceName.includes('crónicos') || userHasRecurring,
    'services': isAdmin, // Servicios & Personal EXCLUSIVO ADMIN
    'admin': isAdmin,
    'logs': isAdmin,
    'reportes': isAdmin || serviceReportEnabled
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

  // 3. Mostrar estadísticas del Dashboard para todos los perfiles de usuario
  const quickStatsGrid = document.querySelector('#tab-dashboard .quick-stats-grid');
  const welcomeBanner = document.querySelector('#tab-dashboard .welcome-banner');
  if (quickStatsGrid) {
    quickStatsGrid.style.display = 'grid';
  }
  if (welcomeBanner) {
    const h2 = welcomeBanner.querySelector('h2');
    const p = welcomeBanner.querySelector('p');
    if (!isAdmin) {
      if (h2) h2.textContent = `Servicio: ${activeUser.service}`;
      if (p) p.textContent = `Bienvenido/a ${activeUser.name}. Panel simplificado para emisión directa de solicitudes e interconsultas de tu área.`;
    } else {
      if (h2) h2.textContent = `Sistema Digital de Mensajería e Interconsultas`;
      if (p) p.textContent = `Plataforma clínica del Hospital de Niños "Dr. Orlando Alassia". Modo Administrador General.`;
    }
  }

  // 4. Renderizar tabla CRUD de usuarios si el perfil activo es Admin
  if (isAdmin) {
    renderUserCrudTable();
  }
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

  // Sync automatically into service staff roster
  syncUsersWithServiceStaff();

  // Sincronización con MySQL (10.12.4.2)
  fetch('api.php?action=save_user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser)
  }).catch(err => console.log('MySQL User Sync:', err));

  document.getElementById('create-user-form').reset();

  logEvent('ADMIN', `Alta de nuevo usuario: ${name} (DNI ${dni}) asignado al servicio ${service} [Admin: ${isAdmin ? 'SÍ' : 'NO'}]`);
  showToast(`¡Usuario ${name} creado y asignado al servicio '${service}' exitosamente!`);

  renderUserCrudTable();
  renderServicesGrid();
  renderAdminServicesGrid();
  populateStaffDropdowns();
}

/* Automatic Synchronization of Registered Users with Service Staff Rosters */
function syncUsersWithServiceStaff() {
  DEMO_USERS.forEach(u => {
    if (!u.service || u.isAdmin) return;

    const uServ = (u.service || '').toLowerCase();
    const targetService = services.find(s => {
      const sName = (s.name || '').toLowerCase();
      const sCode = (s.code || '').toLowerCase();
      return sName === uServ || sCode === uServ || uServ.includes(sName) || (sName.length > 0 && sName.includes(uServ));
    });

    if (targetService) {
      if (!targetService.staff) targetService.staff = [];
      const cleanName = (u.name || '').trim();
      const exists = targetService.staff.some(m => 
        (m.name || '').toLowerCase() === cleanName.toLowerCase() || 
        (m.dni && u.dni && m.dni === u.dni)
      );

      if (!exists) {
        const uRole = u.role || 'Médico de Servicio';
        targetService.staff.push({
          name: u.name || 'Profesional',
          role: uRole,
          mat: uRole.includes('Mat.') ? uRole.split('Mat.')[1].trim() : 'S/N',
          dni: u.dni,
          avatar: u.avatar || (u.name || 'MD').substring(0, 2).toUpperCase()
        });
      }
    }
  });

  localStorage.setItem('alassia_services', JSON.stringify(services));
}

function renderUserCrudTable() {
  const tbody = document.getElementById('admin-users-crud-body');
  if (!tbody) return;

  tbody.innerHTML = DEMO_USERS.map(u => `
    <tr>
      <td><span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: var(--primary-600);">${u.dni}</span></td>
      <td><strong>${u.name}</strong></td>
      <td>${u.service}</td>
      <td>${u.role}</td>
      <td>
        ${u.isAdmin 
          ? `<span class="action-tag cardio" style="font-size: 0.7rem;"><i class="ri-shield-keyhole-line"></i> Administrador General</span>`
          : `<span class="action-tag general" style="font-size: 0.7rem;"><i class="ri-stethoscope-line"></i> Médico de Servicio</span>`}
      </td>
      <td>
        <div style="display: flex; gap: 0.35rem; align-items: center;">
          <button class="btn-secondary" style="padding: 0.25rem 0.55rem; font-size: 0.75rem; color: var(--primary-600); border-color: var(--primary-300);" onclick="openEditUserModal('${u.dni}')" title="Editar usuario">
            <i class="ri-edit-line"></i> Editar
          </button>
          ${activeUser && u.dni === activeUser.dni 
            ? `<span style="font-size: 0.75rem; color: var(--text-muted); font-style: italic;">Sesión Actual</span>`
            : `<button class="btn-secondary" style="padding: 0.25rem 0.55rem; font-size: 0.75rem; color: var(--rose-600); border-color: var(--rose-300);" onclick="deleteUserByDNI('${u.dni}')" title="Eliminar usuario"><i class="ri-delete-bin-line"></i></button>`}
        </div>
      </td>
    </tr>
  `).join('');
}

/* User Edit Handlers */
function openEditUserModal(dni) {
  const user = DEMO_USERS.find(u => u.dni === dni);
  if (!user) return;

  const modal = document.getElementById('edit-user-modal');
  if (!modal) return;

  document.getElementById('edit-user-original-dni').value = user.dni;
  document.getElementById('edit-user-dni').value = user.dni;
  document.getElementById('edit-user-name').value = user.name;
  document.getElementById('edit-user-pass').value = '';
  document.getElementById('edit-user-email').value = user.email || '';
  document.getElementById('edit-user-is-admin').value = user.isAdmin ? 'true' : 'false';

  let cleanRole = user.role;
  let cleanMat = '';
  if (user.role.includes('• Mat.')) {
    const parts = user.role.split('• Mat.');
    cleanRole = parts[0].trim();
    cleanMat = parts[1].trim();
  } else if (user.role.includes('Mat.')) {
    const parts = user.role.split('Mat.');
    cleanRole = parts[0].trim();
    cleanMat = parts[1].trim();
  }
  document.getElementById('edit-user-role').value = cleanRole;
  document.getElementById('edit-user-mat').value = cleanMat;

  const servSelect = document.getElementById('edit-user-service');
  if (servSelect) {
    servSelect.innerHTML = services.map(s => `
      <option value="${s.name}" ${s.name === user.service ? 'selected' : ''}>${s.name} (${s.code})</option>
    `).join('');
  }

  modal.classList.add('active');
}

function closeEditUserModal() {
  const modal = document.getElementById('edit-user-modal');
  if (modal) modal.classList.remove('active');
}

function handleEditUserSubmit(e) {
  e.preventDefault();
  const dni = document.getElementById('edit-user-original-dni').value;
  const user = DEMO_USERS.find(u => u.dni === dni);
  if (!user) return;

  const newName = document.getElementById('edit-user-name').value.trim();
  const newPass = document.getElementById('edit-user-pass').value.trim();
  const newMat = document.getElementById('edit-user-mat').value.trim() || 'S/N';
  const newRole = document.getElementById('edit-user-role').value.trim();
  const newService = document.getElementById('edit-user-service').value;
  const newEmail = document.getElementById('edit-user-email').value.trim();
  const newIsAdmin = document.getElementById('edit-user-is-admin').value === 'true';

  user.name = newName;
  if (newPass !== '') user.password = newPass;
  user.role = `${newRole} • Mat. ${newMat}`;
  user.service = newService;
  user.email = newEmail;
  user.isAdmin = newIsAdmin;
  user.avatar = newName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'MD';

  let customUsers = JSON.parse(localStorage.getItem('alassia_custom_users')) || [];
  const idx = customUsers.findIndex(u => u.dni === dni);
  if (idx !== -1) {
    customUsers[idx] = user;
  } else {
    customUsers.unshift(user);
  }
  localStorage.setItem('alassia_custom_users', JSON.stringify(customUsers));

  syncUsersWithServiceStaff();

  fetch('api.php?action=save_user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }).catch(err => console.log('MySQL User Edit Sync:', err));

  closeEditUserModal();
  renderUserCrudTable();
  renderAdminServicesGrid();
  renderServicesGrid();
  populateStaffDropdowns();

  logEvent('ADMIN', `Edición de usuario DNI ${dni}: actualizados datos de ${newName} (${newService})`);
  showToast(`¡Usuario ${newName} (DNI ${dni}) actualizado exitosamente!`);
}

function deleteUserByDNI(dni) {
  if (!confirm(`¿Estás seguro de eliminar al usuario con DNI ${dni}?`)) return;

  const idx = DEMO_USERS.findIndex(u => u.dni === dni);
  if (idx !== -1) {
    const deleted = DEMO_USERS.splice(idx, 1)[0];
    let customUsers = JSON.parse(localStorage.getItem('alassia_custom_users')) || [];
    customUsers = customUsers.filter(u => u.dni !== dni);
    localStorage.setItem('alassia_custom_users', JSON.stringify(customUsers));

    logEvent('ADMIN', `Baja de usuario DNI ${dni} (${deleted.name})`);
    showToast(`Usuario DNI ${dni} eliminado del sistema.`);
    renderUserCrudTable();
  }
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

/* 1-Click Quick Switch to Admin Mode */
function forceSwitchToAdminMode() {
  let adminUser = DEMO_USERS.find(u => u.isAdmin || u.dni === '11111111');
  if (!adminUser) {
    adminUser = {
      id: 'user-admin',
      dni: '11111111',
      password: 'admin123',
      name: 'Dirección Médica (Admin)',
      role: 'Administrador General del Hospital',
      service: 'Dirección Médica',
      avatar: 'ADM',
      isAdmin: true,
      email: 'direccion.alassia@santafe.gob.ar'
    };
    DEMO_USERS.unshift(adminUser);
  }

  activeUser = adminUser;
  isAuthenticated = true;
  localStorage.setItem('alassia_user', JSON.stringify(activeUser));
  localStorage.setItem('alassia_auth', JSON.stringify(true));

  renderActiveUser();
  renderInbox();
  renderArchiveTable();
  renderRecurringSection();
  renderReportSection();

  switchTab('tab-admin');
  logEvent('LOGIN', 'Conmutación manual a Modo Administrador General (11111111)', activeUser);
  showToast('👑 ¡Perfil cambiado a Modo Administrador General!');
}

/* Console & UI Diagnostic Helper */
window.checkAdminStatus = function() {
  console.log('--- DIAGNÓSTICO DE PERFIL Y ACCESOS ALASSIA ---');
  console.log('activeUser:', activeUser);
  console.log('isAdmin:', activeUser ? activeUser.isAdmin : false);
  console.log('localStorage user:', localStorage.getItem('alassia_user'));
  return activeUser;
};

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
        <div style="background: var(--slate-50); border: 1px solid var(--border-color); padding: 0.5rem 0.75rem; border-radius: var(--radius-md); margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: space-between;">
          <div style="font-size: 0.75rem;">
            <strong>Recetas de Leches/Fórmulas:</strong>
          </div>
          <button class="service-toggle-btn ${s.autorizadoLeches ? 'enabled' : 'disabled'}" style="font-size: 0.7rem;" onclick="toggleMilkAuth('${s.id}')">
            ${s.autorizadoLeches ? '🥛 AUTORIZADO' : '🚫 RESTRINGIDO'}
          </button>
        </div>

        <!-- Sector Reports Authorization Toggle -->
        <div style="background: var(--slate-50); border: 1px solid var(--border-color); padding: 0.5rem 0.75rem; border-radius: var(--radius-md); margin-bottom: 1rem; display: flex; align-items: center; justify-content: space-between;">
          <div style="font-size: 0.75rem;">
            <strong>Reportes & Métricas del Sector:</strong>
          </div>
          <button class="service-toggle-btn ${s.reportesHabilitados !== false ? 'enabled' : 'disabled'}" style="font-size: 0.7rem;" onclick="toggleReportAuth('${s.id}')">
            ${s.reportesHabilitados !== false ? '📊 HABILITADO' : '🚫 DESHABILITADO'}
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

      <div style="display: flex; gap: 0.5rem; margin-top: 0.85rem;">
        <button class="btn-secondary" style="flex: 1; font-size: 0.775rem; justify-content: center;" onclick="quickAddStaffTo('${s.id}')">
          <i class="ri-user-add-line"></i> Asignar Profesional
        </button>
        <button class="btn-secondary" style="color: var(--primary-600); border-color: var(--primary-300); font-size: 0.775rem; padding: 0.4rem 0.65rem;" onclick="openEditServiceModal('${s.id}')" title="Editar servicio">
          <i class="ri-edit-line"></i> Editar
        </button>
        <button class="btn-secondary" style="color: var(--rose-600); border-color: var(--rose-300); font-size: 0.775rem; padding: 0.4rem 0.65rem;" onclick="deleteService('${s.id}')" title="Eliminar servicio">
          <i class="ri-delete-bin-line"></i>
        </button>
      </div>
    </div>
  `).join('');
}

/* Service Edit Handlers */
function openEditServiceModal(serviceId) {
  const service = services.find(s => s.id === serviceId);
  if (!service) return;

  const modal = document.getElementById('edit-service-modal');
  if (!modal) return;

  document.getElementById('edit-service-id').value = service.id;
  document.getElementById('edit-service-code').value = service.code;
  document.getElementById('edit-service-name').value = service.name;
  document.getElementById('edit-service-head').value = service.headOfService;
  document.getElementById('edit-service-email').value = service.email;
  document.getElementById('edit-service-milk-auth').value = service.autorizadoLeches ? 'true' : 'false';
  document.getElementById('edit-service-report-auth').value = service.reportesHabilitados !== false ? 'true' : 'false';
  document.getElementById('edit-service-enabled').value = service.enabled ? 'true' : 'false';

  modal.classList.add('active');
}

function closeEditServiceModal() {
  const modal = document.getElementById('edit-service-modal');
  if (modal) modal.classList.remove('active');
}

function handleEditServiceSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('edit-service-id').value;
  const service = services.find(s => s.id === id);
  if (!service) return;

  service.name = document.getElementById('edit-service-name').value.trim();
  service.headOfService = document.getElementById('edit-service-head').value.trim();
  service.email = document.getElementById('edit-service-email').value.trim();
  service.autorizadoLeches = document.getElementById('edit-service-milk-auth').value === 'true';
  service.reportesHabilitados = document.getElementById('edit-service-report-auth').value === 'true';
  service.enabled = document.getElementById('edit-service-enabled').value === 'true';

  localStorage.setItem('alassia_services', JSON.stringify(services));

  // POST to api.php for MySQL 10.12.4.2 sync
  fetch('api.php?action=save_service', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(service)
  }).catch(err => console.log('MySQL Service Edit Sync:', err));

  closeEditServiceModal();
  renderAdminServicesGrid();
  renderServicesGrid();
  populateStaffDropdowns();
  updateUserServiceDropdowns();

  logEvent('ADMIN', `Edición de servicio ${service.name} (${service.code}): actualizados datos y permisos.`);
  showToast(`¡Servicio ${service.name} (${service.code}) actualizado exitosamente!`);
}

function handleCreateServiceSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('new-service-name').value.trim();
  const code = document.getElementById('new-service-code').value.trim().toUpperCase();
  const headOfService = document.getElementById('new-service-head').value.trim();
  const email = document.getElementById('new-service-email').value.trim();
  const autorizadoLeches = document.getElementById('new-service-milk-auth').value === 'true';
  const reportesHabilitados = document.getElementById('new-service-report-auth').value === 'true';

  if (!name || !code) {
    showToast('⚠️ Por favor completa el nombre y la sigla del servicio.');
    return;
  }

  const existing = services.find(s => s.code === code || s.name.toLowerCase() === name.toLowerCase());
  if (existing) {
    showToast(`⚠️ Ya existe un servicio registrado con el código '${code}' o el nombre '${name}'.`);
    return;
  }

  const newId = `serv-${code.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  const newServiceObj = {
    id: newId,
    name: name,
    code: code,
    email: email,
    headOfService: headOfService,
    enabled: true,
    autorizadoLeches: autorizadoLeches,
    reportesHabilitados: reportesHabilitados,
    staff: []
  };

  services.push(newServiceObj);
  localStorage.setItem('alassia_services', JSON.stringify(services));

  logEvent('ADMIN', `Nuevo servicio hospitalario dado de alta: ${name} (${code})`);

  // Sincronización en tiempo real con MySQL 10.12.4.2
  fetch('api.php?action=save_service', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newServiceObj)
  }).catch(err => console.log('Sincronización MySQL Service:', err));

  document.getElementById('create-service-form').reset();
  renderAdminServicesGrid();
  renderServicesGrid();
  populateStaffDropdowns();
  updateUserServiceDropdowns();

  showToast(`¡Servicio ${name} (${code}) creado y guardado en la Base de Datos!`);
}

function deleteService(serviceId) {
  const serv = services.find(s => s.id === serviceId);
  if (!serv) return;

  if (confirm(`¿Estás seguro de que deseas eliminar el servicio '${serv.name}' (${serv.code})?`)) {
    services = services.filter(s => s.id !== serviceId);
    localStorage.setItem('alassia_services', JSON.stringify(services));

    // Desactivar servicio en MySQL 10.12.4.2
    fetch('api.php?action=delete_service', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: serv.code })
    }).catch(err => console.log('MySQL Service Delete Sync:', err));

    logEvent('ADMIN', `Servicio eliminado del sistema: ${serv.name} (${serv.code})`);
    renderAdminServicesGrid();
    renderServicesGrid();
    populateStaffDropdowns();
    updateUserServiceDropdowns();

    showToast(`Servicio '${serv.name}' eliminado del portal y desactivado en Base de Datos.`);
  }
}

function updateUserServiceDropdowns() {
  const userServSelect = document.getElementById('new-user-service');
  if (!userServSelect) return;

  userServSelect.innerHTML = services.map(s => `
    <option value="${s.name}">${s.name} (${s.code})</option>
  `).join('');
}

function toggleServiceState(serviceId) {
  const service = services.find(s => s.id === serviceId);
  if (service) {
    service.enabled = !service.enabled;
    localStorage.setItem('alassia_services', JSON.stringify(services));

    fetch('api.php?action=save_service', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service)
    }).catch(err => console.log('MySQL Service Toggle Sync:', err));

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

    fetch('api.php?action=save_service', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service)
    }).catch(err => console.log('MySQL Milk Auth Sync:', err));

    renderAdminServicesGrid();
    populateStaffDropdowns();
    updateStats();

    logEvent('ADMIN', `Permiso para recetas de leches en ${service.name}: ${service.autorizadoLeches ? 'AUTORIZADO' : 'RESTRINGIDO'}`);
    showToast(`Permiso para recetas de leches en ${service.name}: ${service.autorizadoLeches ? 'AUTORIZADO' : 'RESTRINGIDO'}`);
  }
}

function toggleReportAuth(serviceId) {
  const service = services.find(s => s.id === serviceId);
  if (service) {
    service.reportesHabilitados = service.reportesHabilitados === false ? true : false;
    localStorage.setItem('alassia_services', JSON.stringify(services));

    fetch('api.php?action=save_service', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service)
    }).catch(err => console.log('MySQL Report Auth Sync:', err));

    renderAdminServicesGrid();
    renderAdminReportPermissionsMatrix();
    applyRoleContextualFiltering();

    logEvent('ADMIN', `Reportes & Métricas para ${service.name}: ${service.reportesHabilitados ? 'HABILITADOS' : 'DESHABILITADOS'}`);
    showToast(`Reportes & Métricas para ${service.name}: ${service.reportesHabilitados ? 'HABILITADOS' : 'DESHABILITADOS'}`);
  }
}

function setAllReportsState(enabled) {
  if (!services || services.length === 0) return;

  services.forEach(s => {
    s.reportesHabilitados = enabled;
  });

  localStorage.setItem('alassia_services', JSON.stringify(services));
  renderAdminReportPermissionsMatrix();
  renderAdminServicesGrid();
  applyRoleContextualFiltering();

  const stateStr = enabled ? 'HABILITADOS A TODOS LOS SERVICIOS' : 'DESHABILITADOS PARA TODOS LOS SERVICIOS (SOLO DIRECCIÓN)';
  logEvent('ADMIN', `Reportes & Métricas: ${stateStr}`);
  showToast(`📊 Reportes & Métricas: ${stateStr}`);
}

function renderAdminReportPermissionsMatrix() {
  const container = document.getElementById('admin-reports-toggle-container');
  if (!container) return;

  if (!services || services.length === 0) {
    services = INITIAL_SERVICES;
    localStorage.setItem('alassia_services', JSON.stringify(services));
  }

  container.innerHTML = services.map(s => {
    const isEnabled = s.reportesHabilitados !== false;
    return `
      <div style="background: var(--slate-50); border: 1px solid ${isEnabled ? 'var(--primary-300)' : 'var(--border-color)'}; border-left: 4px solid ${isEnabled ? 'var(--primary-600)' : 'var(--slate-400)'}; padding: 0.85rem; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
        <div>
          <strong style="font-size: 0.85rem; color: var(--slate-900); display: block; margin-bottom: 2px;">${s.name}</strong>
          <span style="font-size: 0.75rem; color: var(--text-muted);"><i class="ri-user-star-line"></i> Jefe: ${s.headOfService}</span>
        </div>
        <button type="button" class="service-toggle-btn ${isEnabled ? 'enabled' : 'disabled'}" style="font-size: 0.725rem; white-space: nowrap;" onclick="toggleReportAuth('${s.id}')">
          ${isEnabled ? '📊 HABILITADO' : '🚫 RESTRINGIDO'}
        </button>
      </div>
    `;
  }).join('');
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

function openCreateServiceModal() {
  const modal = document.getElementById('create-service-modal');
  if (modal) modal.classList.add('active');
}

function closeCreateServiceModal() {
  const modal = document.getElementById('create-service-modal');
  if (modal) modal.classList.remove('active');
}

function handleModalCreateServiceSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('modal-service-name').value.trim();
  const code = document.getElementById('modal-service-code').value.trim().toUpperCase();
  const headOfService = document.getElementById('modal-service-head').value.trim();
  const email = document.getElementById('modal-service-email').value.trim();
  const autorizadoLeches = document.getElementById('modal-service-milk-auth').value === 'true';
  const reportesHabilitados = document.getElementById('modal-service-report-auth').value === 'true';

  if (!name || !code) {
    showToast('⚠️ Por favor completa el nombre y la sigla del servicio.');
    return;
  }

  const existing = services.find(s => s.code === code || s.name.toLowerCase() === name.toLowerCase());
  if (existing) {
    showToast(`⚠️ Ya existe un servicio registrado con el código '${code}' o el nombre '${name}'.`);
    return;
  }

  const newId = `serv-${code.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  const newServiceObj = {
    id: newId,
    name: name,
    code: code,
    email: email,
    headOfService: headOfService,
    enabled: true,
    autorizadoLeches: autorizadoLeches,
    reportesHabilitados: reportesHabilitados,
    staff: []
  };

  services.push(newServiceObj);
  localStorage.setItem('alassia_services', JSON.stringify(services));

  logEvent('ADMIN', `Nuevo servicio hospitalario dado de alta desde modal: ${name} (${code})`);

  // Sincronización en tiempo real con MySQL (10.12.4.2)
  fetch('api.php?action=save_service', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newServiceObj)
  }).catch(err => console.log('Sincronización MySQL Service:', err));

  document.getElementById('modal-create-service-form').reset();
  closeCreateServiceModal();
  renderAdminServicesGrid();
  renderServicesGrid();
  populateStaffDropdowns();
  updateUserServiceDropdowns();

  showToast(`¡Servicio ${name} (${code}) creado y habilitado exitosamente!`);
}

function openAddStaffModal() {
  populateStaffModalUserDropdown();
  document.getElementById('add-staff-modal').classList.add('active');
}

function closeAddStaffModal() {
  document.getElementById('add-staff-modal').classList.remove('active');
}

function populateStaffModalUserDropdown() {
  const userSelect = document.getElementById('staff-user-select');
  if (!userSelect) return;

  const validUsers = DEMO_USERS.filter(u => !u.isAdmin);
  if (validUsers.length === 0) {
    userSelect.innerHTML = `<option value="">⚠️ No hay profesionales registrados aún. Creá uno desde el Panel de Administración.</option>`;
    return;
  }

  userSelect.innerHTML = validUsers.map(u => `
    <option value="${u.dni}">👤 ${u.name} — ${u.role} (Servicio Actual: ${u.service || 'Sin servicio'})</option>
  `).join('');
}

function quickAddStaffTo(serviceId) {
  const servSelect = document.getElementById('staff-service-select');
  if (servSelect) servSelect.value = serviceId;
  openAddStaffModal();
}

function handleAddStaffSubmit(e) {
  e.preventDefault();
  const servId = document.getElementById('staff-service-select').value;
  const userDni = document.getElementById('staff-user-select').value;

  if (!userDni) {
    showToast('⚠️ Seleccioná un profesional de la lista o creá uno nuevo desde Administración.');
    return;
  }

  const selectedUser = DEMO_USERS.find(u => u.dni === userDni);
  const targetService = services.find(s => s.id === servId || s.name === servId);

  if (targetService && selectedUser) {
    // Update user's assigned service
    selectedUser.service = targetService.name;

    let customUsers = JSON.parse(localStorage.getItem('alassia_custom_users')) || [];
    const customUser = customUsers.find(u => u.dni === userDni);
    if (customUser) customUser.service = targetService.name;
    localStorage.setItem('alassia_custom_users', JSON.stringify(customUsers));

    // Re-sync service staff rosters
    syncUsersWithServiceStaff();

    // Sincronización en tiempo real con MySQL 10.12.4.2
    fetch('api.php?action=save_user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedUser)
    }).catch(err => console.log('MySQL User Sync:', err));

    fetch('api.php?action=save_service', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(targetService)
    }).catch(err => console.log('MySQL Service Sync:', err));

    renderAdminServicesGrid();
    renderServicesGrid();
    populateStaffDropdowns();
    renderUserCrudTable();
    closeAddStaffModal();

    logEvent('ADMIN', `Asignación de profesional ${selectedUser.name} (DNI ${selectedUser.dni}) al servicio ${targetService.name}`);
    showToast(`¡${selectedUser.name} fue asignado/a exitosamente a ${targetService.name}!`);
  }
}

/* Helper: Sanitize & Auto-Repair Spanish Characters (Tildes, Eñes, Accents) */
function sanitizeString(str) {
  if (!str || typeof str !== 'string') return str || '';
  return str
    .replace(/\uFFFD/g, '')
    .replace(/Gastroenterolog[^\s]*\s*Infantil/gi, 'Gastroenterología Infantil')
    .replace(/Neonatolog[^\s]*\s*y UCNI/gi, 'Neonatología y UCNI')
    .replace(/Nutrici[^\s]*\s*y Lactario/gi, 'Nutrición y Lactario')
    .replace(/Cardiolog[^\s]*\s*Infantil/gi, 'Cardiología Infantil')
    .replace(/Tratamientos Cr[^\s]*nicos/gi, 'Tratamientos Crónicos')
    .replace(/Cl[^\s]*nica Ped[^\s]*trica/gi, 'Clínica Pediátrica')
    .replace(/Diagn[^\s]*stico por Im[^\s]*genes/gi, 'Diagnóstico por Imágenes')
    .replace(/Mensajer[^\s]*/gi, 'Mensajería')
    .replace(/M[^\s]*tricas/gi, 'Métricas')
    .replace(/L[^\s]*pez/g, 'López')
    .replace(/Ben[^\s]*tez/g, 'Benítez')
    .replace(/G[^\s]*mez/g, 'Gómez')
    .replace(/Rold[^\s]*n/g, 'Roldán')
    .replace(/Gim[^\s]*nez/g, 'Giménez')
    .replace(/Hern[^\s]*n/g, 'Hernán')
    .replace(/Luc[^\s]*a/g, 'Lucía')
    .replace(/Sof[^\s]*a/g, 'Sofía')
    .replace(/Ped[^\s]*trica/g, 'Pediátrica')
    .replace(/Cl[^\s]*nica/g, 'Clínica')
    .trim();
}

/* Automatic MySQL Database Re-hydration & Self-Healing Engine (10.12.4.2) */
function loadBackendDataFromDb() {
  fetch('api.php?action=get_all_data')
    .then(res => res.json())
    .then(data => {
      if (!data || !data.success) return;

      // 1. Sincronizar y Sanitizar Servicios de MySQL 10.12.4.2
      if (data.servicios && Array.isArray(data.servicios)) {
        data.servicios.forEach(s => {
          const cleanName = sanitizeString(s.nombre);
          const cleanHead = sanitizeString(s.jefe_servicio || 'Jefatura de Servicio');
          const servCode = (s.codigo || '').toUpperCase();
          const existing = services.find(x => x.code === servCode || x.name.toLowerCase() === cleanName.toLowerCase());

          if (!existing) {
            services.push({
              id: `serv-${servCode.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
              name: cleanName,
              code: servCode,
              email: s.email_oficial,
              headOfService: cleanHead,
              enabled: s.activo == 1,
              autorizadoLeches: s.requiere_autorizacion_leches == 1,
              reportesHabilitados: s.reportes_habilitados == 1,
              staff: []
            });
          } else {
            existing.name = cleanName;
            existing.email = s.email_oficial || existing.email;
            existing.headOfService = cleanHead;
            existing.autorizadoLeches = s.requiere_autorizacion_leches == 1;
            existing.reportesHabilitados = s.reportes_habilitados == 1;
          }

          // Auto-reparación en MySQL 10.12.4.2 si la base contenía caracteres corruptos
          if (cleanName !== s.nombre || cleanHead !== s.jefe_servicio) {
            fetch('api.php?action=save_service', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                code: servCode,
                name: cleanName,
                headOfService: cleanHead,
                email: s.email_oficial,
                autorizadoLeches: s.requiere_autorizacion_leches == 1,
                reportesHabilitados: s.reportes_habilitados == 1,
                enabled: s.activo == 1
              })
            }).catch(e => {});
          }
        });
        localStorage.setItem('alassia_services', JSON.stringify(services));
      }

      // 2. Sincronizar y Sanitizar Profesionales de MySQL 10.12.4.2
      if (data.profesionales && Array.isArray(data.profesionales)) {
        data.profesionales.forEach(p => {
          const cleanDni = (p.dni || '').trim();
          if (!cleanDni) return;

          const cleanName = sanitizeString(p.nombre_completo);
          const cleanRole = sanitizeString(p.especialidad_rol);

          const existingUser = DEMO_USERS.find(u => u.dni === cleanDni);
          if (!existingUser) {
            DEMO_USERS.unshift({
              id: `user-${p.id || Date.now()}`,
              dni: cleanDni,
              password: 'alassia123',
              name: cleanName,
              role: cleanRole,
              service: 'Clínica Pediátrica',
              avatar: cleanName.substring(0, 2).toUpperCase(),
              isAdmin: p.es_admin == 1,
              email: p.email
            });
          } else {
            existingUser.name = cleanName;
            existingUser.role = cleanRole;
          }

          // Auto-reparación en MySQL 10.12.4.2
          if (cleanName !== p.nombre_completo || cleanRole !== p.especialidad_rol) {
            fetch('api.php?action=save_user', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                dni: cleanDni,
                name: cleanName,
                role: cleanRole,
                service: existingUser ? existingUser.service : 'Clínica Pediátrica',
                email: p.email,
                isAdmin: p.es_admin == 1
              })
            }).catch(e => {});
          }
        });
      }

      // Sanitizar arreglos locales
      services.forEach(s => {
        s.name = sanitizeString(s.name);
        s.headOfService = sanitizeString(s.headOfService);
        s.staff.forEach(st => {
          st.name = sanitizeString(st.name);
          st.role = sanitizeString(st.role);
        });
      });
      localStorage.setItem('alassia_services', JSON.stringify(services));

      DEMO_USERS.forEach(u => {
        u.name = sanitizeString(u.name);
        u.role = sanitizeString(u.role);
        u.service = sanitizeString(u.service);
      });

      // Re-sincronizar y actualizar vistas
      syncUsersWithServiceStaff();
      renderServicesGrid();
      renderAdminServicesGrid();
      updateUserServiceDropdowns();
      populateStaffDropdowns();
    })
    .catch(err => console.log('Base MySQL 10.12.4.2 Offline o no disponible:', err));
}
/* Clear / Purge All Test Prescription Records & Interconsultations */
function clearAllTestRecords() {
  if (!confirm('⚠️ ¿ATENCIÓN: Estás seguro de que deseas ELIMINAR Y VACIAR TODAS las recetas, solicitudes e interconsultas de prueba del sistema?\n\nEsta acción purgará la base de datos MySQL (10.12.4.2) y el almacenamiento del navegador.')) {
    return;
  }

  if (!confirm('🚨 ÚLTIMA CONFIRMACIÓN:\nSe eliminarán todas las recetas registradas hasta el momento. ¿Proceder con el vaciado completo?')) {
    return;
  }

  fetch('api.php?action=clear_test_records', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(data => {
    records = [];
    localStorage.removeItem('alassia_records');

    renderInbox();
    renderArchiveTable();
    renderRecurringSection();
    renderReportSection();
    updateStats();

    logEvent('ADMIN', 'Purga y vaciado completo de recetas y solicitudes de prueba realizado por el Administrador');
    showToast('¡Se vaciaron exitosamente todas las recetas y registros de prueba de la base de datos!');
  })
  .catch(err => {
    records = [];
    localStorage.removeItem('alassia_records');
    renderInbox();
    renderArchiveTable();
    renderRecurringSection();
    renderReportSection();
    updateStats();
    showToast('¡Se vaciaron las recetas del navegador local!');
  });
}

/* Clear / Purge All Test Users Except Main Admin (11111111) */
function clearAllTestUsers() {
  if (!confirm('⚠️ ¿ATENCIÓN: Estás seguro de que deseas ELIMINAR Y VACIAR TODOS los usuarios y profesionales de prueba?\n\nSe conservará únicamente la cuenta del Administrador General (DNI: 11111111).')) {
    return;
  }

  if (!confirm('🚨 ÚLTIMA CONFIRMACIÓN:\nSe borrarán los usuarios de prueba en MySQL (10.12.4.2) y en la memoria del sistema. ¿Proceder?')) {
    return;
  }

  fetch('api.php?action=clear_test_users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(data => {
    DEMO_USERS = DEMO_USERS.filter(u => u.isAdmin || u.dni === '11111111');
    localStorage.removeItem('alassia_custom_users');

    services.forEach(s => {
      s.staff = [];
    });
    localStorage.setItem('alassia_services', JSON.stringify(services));

    renderUserCrudTable();
    renderAdminServicesGrid();
    renderServicesGrid();
    populateStaffDropdowns();
    populateStaffModalUserDropdown();

    logEvent('ADMIN', 'Vaciado masivo de usuarios de prueba realizado por el Administrador General (Conservada cuenta 11111111)');
    showToast('¡Se eliminaron todos los usuarios de prueba! Se mantuvo únicamente la cuenta Administrador General (11111111).');
  })
  .catch(err => {
    DEMO_USERS = DEMO_USERS.filter(u => u.isAdmin || u.dni === '11111111');
    localStorage.removeItem('alassia_custom_users');
    renderUserCrudTable();
    renderAdminServicesGrid();
    renderServicesGrid();
    populateStaffDropdowns();
    populateStaffModalUserDropdown();
    showToast('¡Se limpiaron los usuarios de prueba locales!');
  });
}

/* Helper: Delivery Authorization Check */
function canUserDeliverRecord(r, user) {
  if (!user) return false;
  if (user.isAdmin) return true; // Admin has full delivery override permission

  const userServ = (user.service || '').toLowerCase();
  const destServ = (r.destino || '').toLowerCase();
  const recType = (r.type || r.tipo || '').toLowerCase();

  // 1. Direct match: user service is the destination service
  if (destServ.length > 0 && (destServ.includes(userServ) || userServ.includes(destServ))) {
    return true;
  }

  // 2. Specialty mapping for destination service
  if (userServ.includes('cardio') && recType.includes('cardio')) return true;
  if ((userServ.includes('nutri') || userServ.includes('lactario')) && (recType.includes('nutri') || recType.includes('leche') || recType.includes('prescripción'))) return true;
  if (userServ.includes('farmacia') && (recType.includes('farmacia') || recType.includes('receta'))) return true;
  if (userServ.includes('imágenes') && recType.includes('imágenes')) return true;
  if (userServ.includes('social') && recType.includes('social')) return true;

  return false;
}

let currentInboxScope = 'all';

function setInboxScope(scope) {
  currentInboxScope = scope;
  
  const btnAll = document.getElementById('scope-btn-all');
  const btnRec = document.getElementById('scope-btn-received');
  const btnSent = document.getElementById('scope-btn-sent');

  if (btnAll) btnAll.className = scope === 'all' ? 'btn-secondary active' : 'btn-secondary';
  if (btnRec) btnRec.className = scope === 'received' ? 'btn-secondary active' : 'btn-secondary';
  if (btnSent) btnSent.className = scope === 'sent' ? 'btn-secondary active' : 'btn-secondary';

  renderInbox();
}

/* Helper: Robust Service Matching for Inbox, Archive, Reports and Badges */
function isRecordForService(r, userServiceName) {
  if (!userServiceName) return true;
  const userServ = userServiceName.toLowerCase();

  const destServ = (r.destino || '').toLowerCase();
  const origServ = (r.servicio || '').toLowerCase();
  const recType = (r.type || r.tipo || '').toLowerCase();

  // Direct match: target destination OR origin matches user service
  const isDest = destServ.length > 0 && (destServ.includes(userServ) || userServ.includes(destServ));
  const isOrig = origServ.length > 0 && (origServ.includes(userServ) || userServ.includes(origServ));

  if (isDest || isOrig) return true;

  // Specialty keyword fallback mapping
  if (userServ.includes('cardio')) return recType.includes('cardio');
  if (userServ.includes('nutri') || userServ.includes('lactario')) return recType.includes('nutri') || recType.includes('leche') || recType.includes('prescripción');
  if (userServ.includes('farmacia')) return recType.includes('farmacia') || recType.includes('receta');
  if (userServ.includes('imágenes')) return recType.includes('imágenes');
  if (userServ.includes('social')) return recType.includes('social');

  return false;
}

/* Render Active Pending Inbox */
function renderInbox(filterType = 'all') {
  const tbody = document.getElementById('inbox-table-body');
  if (!tbody) return;

  let pendingRecords = records.filter(r => r.estado === 'Pendiente' || r.estado === 'En Proceso');

  if (activeUser && !activeUser.isAdmin) {
    pendingRecords = pendingRecords.filter(r => isRecordForService(r, activeUser.service));

    if (currentInboxScope === 'received') {
      pendingRecords = pendingRecords.filter(r => canUserDeliverRecord(r, activeUser));
    } else if (currentInboxScope === 'sent') {
      pendingRecords = pendingRecords.filter(r => !canUserDeliverRecord(r, activeUser));
    }
  }

  if (filterType !== 'all') {
    const fLower = filterType.toLowerCase();
    pendingRecords = pendingRecords.filter(r => r.type.toLowerCase().includes(fLower));
  }

  // Live Search Input Filter (DNI, Patient Name, ID, Service)
  const searchInput = document.getElementById('search-inbox-input');
  if (searchInput && searchInput.value.trim() !== '') {
    const term = searchInput.value.toLowerCase().trim();
    pendingRecords = pendingRecords.filter(r => 
      (r.dni || '').toLowerCase().includes(term) ||
      (r.paciente || '').toLowerCase().includes(term) ||
      (r.id || '').toLowerCase().includes(term) ||
      (r.servicio || '').toLowerCase().includes(term) ||
      (r.destino || '').toLowerCase().includes(term) ||
      (r.type || '').toLowerCase().includes(term)
    );
  }

  if (pendingRecords.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
          <i class="ri-search-line" style="font-size: 2rem; color: var(--slate-400); display: block; margin-bottom: 0.5rem;"></i>
          No se encontraron solicitudes que coincidan con la búsqueda o filtro seleccionado.
        </td>
      </tr>
    `;
    const badge = document.getElementById('inbox-badge');
    if (badge) badge.textContent = 0;
    return;
  }

  tbody.innerHTML = pendingRecords.map(r => {
    const canDeliver = canUserDeliverRecord(r, activeUser);
    const origName = r.servicio || 'Servicio Emisor';
    const destName = r.destino || r.servicio || 'Servicio Receptor';

    const originDestHtml = canDeliver ? `
      <div>
        <span class="action-tag nutri" style="font-size: 0.675rem; padding: 2px 6px;"><i class="ri-inbox-archive-line"></i> RECIBIDO DE:</span>
        <div style="font-weight: 600; font-size: 0.8rem; color: var(--text-main); margin-top: 2px;">${origName}</div>
      </div>
    ` : `
      <div>
        <span class="action-tag general" style="font-size: 0.675rem; padding: 2px 6px; background: var(--slate-100); color: var(--slate-700);"><i class="ri-send-plane-line"></i> ENVIADO A:</span>
        <div style="font-weight: 600; font-size: 0.8rem; color: var(--primary-700); margin-top: 2px;">${destName}</div>
      </div>
    `;

    const statusHtml = canDeliver ? `
      <select class="status-select-inline" onchange="changeStatusInline('${r.id}', this.value)">
        <option value="Pendiente" ${r.estado === 'Pendiente' ? 'selected' : ''}>🟠 Pendiente</option>
        <option value="En Proceso" ${r.estado === 'En Proceso' ? 'selected' : ''}>🔵 En Proceso</option>
        <option value="Confirmado / Resuelto">🟢 Confirmado (Archivar)</option>
      </select>
    ` : `
      <span class="action-tag cardio" style="font-size: 0.775rem; padding: 0.35rem 0.65rem;">
        <i class="ri-time-line"></i> ${r.estado} (En Seguimiento)
      </span>
    `;

    const actionsHtml = canDeliver ? `
      <div style="display: flex; gap: 0.4rem;">
        <button class="btn-secondary" style="padding: 0.35rem 0.65rem; font-size: 0.775rem;" onclick="viewRecordDetail('${r.id}')" title="Ver Hoja Digital">
          <i class="ri-eye-line"></i> Sheet
        </button>
        <button class="btn-success" style="padding: 0.35rem 0.65rem; font-size: 0.775rem;" onclick="openResolveModal('${r.id}')" title="Registrar Entrega / Responder">
          <i class="ri-check-double-line"></i> Entregar
        </button>
      </div>
    ` : `
      <div style="display: flex; gap: 0.4rem;">
        <button class="btn-secondary" style="padding: 0.35rem 0.65rem; font-size: 0.775rem;" onclick="viewRecordDetail('${r.id}')" title="Ver Hoja Digital / Seguimiento">
          <i class="ri-eye-line"></i> Sheet
        </button>
        <button class="btn-secondary" disabled style="padding: 0.35rem 0.65rem; font-size: 0.725rem; opacity: 0.65; cursor: not-allowed; border-color: var(--slate-300); color: var(--slate-500);" title="Solo el personal de ${destName} puede realizar la entrega">
          <i class="ri-lock-2-line"></i> Entrega por ${destName.split(' ')[0]}
        </button>
      </div>
    `;

    return `
      <tr>
        <td><span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: var(--primary-600);">${r.id}</span></td>
        <td>
          <strong>${r.type}</strong>
          ${r.isRecurring ? `<br><span style="font-size: 0.7rem; color: #b45309; font-weight: 700;"><i class="ri-repeat-line"></i> Módulo ${r.moduloActual}/${r.totalModulos}</span>` : ''}
        </td>
        <td>${r.paciente}</td>
        <td>${originDestHtml}</td>
        <td><strong style="color: var(--primary-700);"><i class="ri-team-line"></i> ${r.staffAssigned || 'Equipo del Servicio'}</strong></td>
        <td>${r.fecha}</td>
        <td>${statusHtml}</td>
        <td>${actionsHtml}</td>
      </tr>
    `;
  }).join('');

  const badge = document.getElementById('inbox-badge');
  if (badge) badge.textContent = pendingRecords.length;
}

/* Render Archive of Confirmed & Resolved Consultations */
function renderArchiveTable() {
  const tbody = document.getElementById('archive-table-body');
  if (!tbody) return;

  let resolvedRecords = records.filter(r => r.estado.includes('Confirmado') || r.estado === 'Completada' || r.estado === 'Tratamiento Completado');

  if (activeUser && !activeUser.isAdmin) {
    resolvedRecords = resolvedRecords.filter(r => isRecordForService(r, activeUser.service));
  }

  // Live Search Input Filter for Archive (DNI, Patient Name, ID, Response)
  const searchInput = document.getElementById('search-archive-input');
  if (searchInput && searchInput.value.trim() !== '') {
    const term = searchInput.value.toLowerCase().trim();
    resolvedRecords = resolvedRecords.filter(r => 
      (r.dni || '').toLowerCase().includes(term) ||
      (r.paciente || '').toLowerCase().includes(term) ||
      (r.id || '').toLowerCase().includes(term) ||
      (r.servicio || '').toLowerCase().includes(term) ||
      (r.destino || '').toLowerCase().includes(term) ||
      (r.respuestaMedica || '').toLowerCase().includes(term) ||
      (r.medicoRespondedor || '').toLowerCase().includes(term)
    );
  }

  if (resolvedRecords.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
          <i class="ri-search-line" style="font-size: 2rem; color: var(--slate-400); display: block; margin-bottom: 0.5rem;"></i>
          No hay registros resueltos ni archivados que coincidan con el término de búsqueda.
        </td>
      </tr>
    `;
    return;
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

  let reportRecords = records;

  if (activeUser && !activeUser.isAdmin) {
    reportRecords = records.filter(r => isRecordForService(r, activeUser.service));
  }

  const totalDispenses = reportRecords.filter(r => r.type === 'Receta Electrónica' || r.type === 'Prescripción Nutricional' || r.type === 'Solicitud de Imágenes' || r.type === 'Interconsulta Cardiología').length;
  const nutriCount = reportRecords.filter(r => r.type === 'Prescripción Nutricional').length;
  const farmCount = reportRecords.filter(r => r.type === 'Receta Electrónica').length;
  const overdueCount = reportRecords.filter(r => r.isRecurring && r.proximoRetiro < new Date().toISOString().split('T')[0]).length;

  document.getElementById('rep-total-dispensa').textContent = totalDispenses;
  document.getElementById('rep-nutri-count').textContent = nutriCount;
  document.getElementById('rep-farm-count').textContent = farmCount;
  document.getElementById('rep-overdue-count').textContent = overdueCount;

  if (reportRecords.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
          <i class="ri-bar-chart-2-line" style="font-size: 2rem; color: var(--slate-400); display: block; margin-bottom: 0.5rem;"></i>
          No hay atenciones ni métricas registradas este mes para el servicio <strong>${activeUser ? activeUser.service : ''}</strong>.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = reportRecords.map(r => `
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

/* Render Services Grid (Public view & Dashboard Management) */
function renderServicesGrid() {
  const container = document.getElementById('services-cards-container');
  if (!container) return;

  const enabledServices = services.filter(s => s.enabled !== false);
  const isAdmin = activeUser ? activeUser.isAdmin : false;

  if (!enabledServices || enabledServices.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
        <i class="ri-hospital-line" style="font-size: 3rem; color: var(--text-muted); opacity: 0.5;"></i>
        <h3 style="margin-top: 1rem; color: var(--text-secondary);">No hay servicios hospitalarios cargados</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">Crea un nuevo servicio utilizando el botón '➕ Crear Nuevo Servicio' o habilítalos desde el Panel de Administración.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = enabledServices.map(s => {
    const staffList = s.staff || [];
    return `
    <div class="service-card">
      <div>
        <div class="service-card-header">
          <h3>${s.name || 'Servicio'}</h3>
          <span class="code-tag">${s.code || 'S/N'}</span>
        </div>

        <p style="font-size: 0.8rem; color: var(--primary-600); font-weight: 600; margin-bottom: 0.4rem;">
          <i class="ri-user-star-line"></i> Jefe de Servicio: <strong>${s.headOfService || 'Sin Asignar'}</strong>
        </p>

        <p style="font-size: 0.75rem; color: ${s.autorizadoLeches ? 'var(--emerald-600)' : 'var(--text-muted)'}; font-weight: 600; margin-bottom: 0.75rem;">
          <i class="ri-shield-check-line"></i> ${s.autorizadoLeches ? 'Autorizado para Recetas de Leches' : 'Emisión de Leches No Habilitada'}
        </p>

        <h4 style="font-size: 0.8rem; text-transform: uppercase; color: var(--slate-600); margin-bottom: 0.75rem;">
          Personal a Cargo (${staffList.length})
        </h4>

        <ul class="staff-list">
          ${staffList.map(m => `
            <li class="staff-member-item">
              <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <div class="staff-avatar-mini">${m.avatar || (m.name || 'MD').substring(0, 2).toUpperCase()}</div>
                  <div class="staff-info-mini">
                    <h5>${m.name || 'Agente'}</h5>
                    <p>${m.role || 'Médico'}</p>
                  </div>
                </div>
                ${isAdmin ? `
                  <button style="border: none; background: transparent; color: var(--rose-500); cursor: pointer;" onclick="removeStaffFromService('${s.id}', '${m.name || ''}')" title="Quitar agente">
                    <i class="ri-delete-bin-line"></i>
                  </button>
                ` : ''}
              </div>
            </li>
          `).join('')}
        </ul>
      </div>

      ${isAdmin ? `
        <div style="display: flex; gap: 0.5rem; margin-top: 0.85rem; padding-top: 0.75rem; border-top: 1px dashed var(--border-color);">
          <button class="btn-secondary" style="flex: 1; font-size: 0.775rem; justify-content: center;" onclick="quickAddStaffTo('${s.id}')">
            <i class="ri-user-add-line"></i> Asignar Agente
          </button>
          <button class="btn-secondary" style="color: var(--primary-600); border-color: var(--primary-300); font-size: 0.775rem; padding: 0.4rem 0.65rem;" onclick="openEditServiceModal('${s.id}')" title="Editar servicio">
            <i class="ri-edit-line"></i> Editar
          </button>
          <button class="btn-secondary" style="color: var(--rose-600); border-color: var(--rose-300); font-size: 0.775rem; padding: 0.4rem 0.65rem;" onclick="deleteService('${s.id}')" title="Eliminar servicio">
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      ` : ''}
    </div>
  `;
  }).join('');
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

  // Re-render Admin Panel grids dynamically when switching tabs
  if (tabId === 'tab-admin') {
    renderUserCrudTable();
    renderAdminFormPermissions();
    renderAdminServicesGrid();
    renderAdminReportPermissionsMatrix();
  } else if (tabId === 'tab-services') {
    renderServicesGrid();
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
    newRecord.destino = 'Cardiología Infantil';
    newRecord.staffAssigned = 'Equipo Completo de Cardiología Infantil';
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
    newRecord.staffAssigned = `Equipo Completo de ${newRecord.destino}`;
    newRecord.motivo = document.getElementById('g-motivo').value;
    newRecord.medico = document.getElementById('g-medico').value || activeUser.name;
    targetEmail = document.getElementById('g-email').value || 'gastroenterologia.alassia@santafe.gob.ar';
  } else if (type === 'Receta Electrónica') {
    newRecord.paciente = document.getElementById('f-nombre').value;
    newRecord.dni = document.getElementById('f-dni').value || 'Sin DNI';
    newRecord.hc = document.getElementById('f-dni').value || 'HC-REC';
    newRecord.servicio = 'Farmacia y Recetas Electrónicas';
    newRecord.destino = 'Farmacia y Recetas Electrónicas';
    newRecord.staffAssigned = 'Equipo Completo de Farmacia Hospitalaria';
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
    newRecord.destino = 'Diagnóstico por Imágenes';
    newRecord.staffAssigned = 'Equipo Guardia de Diagnóstico por Imágenes';
    newRecord.diagnostico = document.getElementById('i-modalidad').value;
    newRecord.motivo = `Estudio: ${document.getElementById('i-modalidad').value} en ${document.getElementById('i-region').value}. Indicación: ${document.getElementById('i-motivo').value}`;
    newRecord.medico = document.getElementById('i-medico').value || activeUser.name;
    targetEmail = document.getElementById('i-email').value || 'imagenes.alassia@santafe.gob.ar';
  } else if (type === 'Prescripción Nutricional') {
    newRecord.paciente = document.getElementById('n-nombre').value;
    newRecord.dni = document.getElementById('n-dni').value || 's/d';
    newRecord.hc = 'HC-NUT';
    newRecord.servicio = document.getElementById('n-servicio-select').value || 'Nutrición y Lactario';
    newRecord.destino = 'Nutrición y Lactario';
    newRecord.staffAssigned = 'Equipo Completo de Nutrición y Lactario';
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

  // Add Team-Wide Notification for Target Service
  addNotification({
    targetService: newRecord.destino || newRecord.servicio,
    title: `📥 NUEVO PEDIDO REQUISITADO: ${newRecord.type}`,
    text: `Paciente: ${newRecord.paciente} (${newRecord.hc || newRecord.id}) emitido por ${newRecord.medico}.`,
    time: "Ahora"
  });

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

/* Real Email Dispatch via PHP Backend (enviar_mail.php) */
async function sendRealEmailNotification(record, targetEmail) {
  try {
    const payload = {
      to: targetEmail,
      to_name: record.staffAssigned || 'Equipo del Servicio Receptor',
      subject: `[SOLICITUD OFICIAL #${record.id}] ${record.type} para ${record.paciente}`,
      record_id: record.id,
      paciente: record.paciente,
      medico: record.medico,
      tipo: record.type,
      motivo: record.motivo || record.diagnostico || record.rp1 || 'Sin especificaciones',
      servicio_origen: record.servicio || (activeUser ? activeUser.service : 'Clínica Pediátrica'),
      servicio_destino: record.destino || 'Servicio Especialista'
    };

    const response = await fetch('enviar_mail.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (result.success) {
      logEvent('EMAIL', `Correo despachado a ${targetEmail} (${result.smtp_status}) - Ref: ${record.id}`);
      return result;
    } else {
      console.warn('Falló el despacho de correo PHP:', result.message);
      return null;
    }
  } catch (err) {
    console.error('Error al invocar enviar_mail.php:', err);
    return null;
  }
}

/* Email Dispatch Preview & Real Delivery Modal */
function showEmailPreviewModal(record, targetEmail) {
  const modalBody = document.getElementById('email-modal-body');
  if (!modalBody) return;
  
  modalBody.innerHTML = `
    <div class="email-meta-line"><strong>Para:</strong> <span>${targetEmail}</span></div>
    <div class="email-meta-line"><strong>Personal a Cargo:</strong> <span style="color: #0284c7; font-weight: 700;">${record.staffAssigned || 'Equipo Médico de Servicio'}</span></div>
    <div class="email-meta-line"><strong>De:</strong> <span>sistema-interconsultas@alassia.santafe.gob.ar (${record.medico})</span></div>
    <div class="email-meta-line"><strong>Asunto:</strong> <span>[SOLICITUD OFICIAL #${record.id}] ${record.type} para ${record.paciente}</span></div>
    
    <div id="email-server-status-badge" style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 0.6rem 0.85rem; border-radius: 6px; margin: 0.85rem 0; font-size: 0.8rem; color: #0369a1; display: flex; align-items: center; justify-content: space-between;">
      <span><i class="ri-loader-4-line spin"></i> Despachando notificación a <strong>enviar_mail.php</strong>...</span>
    </div>

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
      <p><a href="http://localhost:8000" style="color: #0284c7; font-weight: 700;">Acceder al Sistema Digital #${record.id} →</a></p>
    </div>
  `;

  document.getElementById('email-modal').classList.add('active');

  // Trigger real email dispatch via PHP backend
  sendRealEmailNotification(record, targetEmail).then(res => {
    const badge = document.getElementById('email-server-status-badge');
    if (badge) {
      if (res && res.success) {
        const isSmtp = res.smtp_status === 'sent';
        badge.style.background = isSmtp ? '#f0fdf4' : '#fefce8';
        badge.style.borderColor = isSmtp ? '#bbf7d0' : '#fef08a';
        badge.style.color = isSmtp ? '#15803d' : '#a16207';
        badge.innerHTML = `
          <span><i class="${isSmtp ? 'ri-checkbox-circle-fill' : 'ri-mail-check-line'}"></i> ${res.message}</span>
          <button type="button" class="btn-secondary" style="font-size: 0.7rem; padding: 0.25rem 0.5rem;" onclick="triggerManualReSend('${record.id}', '${targetEmail}')">
            <i class="ri-refresh-line"></i> Re-enviar
          </button>
        `;
      } else {
        badge.style.background = '#fef2f2';
        badge.style.borderColor = '#fecaca';
        badge.style.color = '#991b1b';
        badge.innerHTML = `
          <span><i class="ri-error-warning-line"></i> Servidor de correo finalizado localmente. Notificación guardada en sistema.</span>
        `;
      }
    }
  });
}

function triggerManualReSend(recordId, targetEmail) {
  const record = records.find(r => r.id === recordId);
  if (!record) return;
  showToast(`✉️ Re-enviando correo para ${record.id}...`);
  sendRealEmailNotification(record, targetEmail).then(res => {
    if (res && res.success) {
      showToast(`✅ Correo de ${record.id} despachado exitosamente`);
    }
  });
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
  document.getElementById('resolve-modal-title').textContent = `Registrar Entrega / Responder Solicitud`;
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

  // Live Search Input Filter for Recurring Cards (DNI, Patient Name, ID, Formula/RP)
  const searchInput = document.getElementById('search-recurring-input');
  if (searchInput && searchInput.value.trim() !== '') {
    const term = searchInput.value.toLowerCase().trim();
    recurringRecords = recurringRecords.filter(r => 
      (r.dni || '').toLowerCase().includes(term) ||
      (r.paciente || '').toLowerCase().includes(term) ||
      (r.id || '').toLowerCase().includes(term) ||
      (r.rp1 || '').toLowerCase().includes(term) ||
      (r.hc || '').toLowerCase().includes(term) ||
      (r.servicio || '').toLowerCase().includes(term)
    );
  }

  const todayStr = new Date().toISOString().split('T')[0];

  if (recurringRecords.length === 0) {
    container.innerHTML = `<div style="grid-column: span 3; padding: 2.5rem; text-align: center; color: var(--text-muted); background: var(--card-bg); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
      <i class="ri-search-line" style="font-size: 2.2rem; color: var(--slate-400); display: block; margin-bottom: 0.5rem;"></i>
      No hay controles de retiros ni tratamientos que coincidan con la búsqueda.
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

          ${r.moduloActual > 1 ? `
            <button class="btn-secondary" style="color: var(--amber-600); border-color: var(--amber-400); font-size: 0.775rem; padding: 0.55rem;" onclick="revertLastDispense('${r.id}')" title="Deshacer última entrega de módulo en caso de error">
              <i class="ri-history-line"></i> Deshacer Entrega
            </button>
          ` : ''}

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

/* Dispense Modal & Multi-Module Delivery Engine */
function dispenseNextModule(id) {
  const record = records.find(r => r.id === id);
  if (!record) return;

  if (record.moduloActual >= record.totalModulos) {
    showToast(`El tratamiento de ${record.paciente} ya completó todos sus módulos (${record.totalModulos}/${record.totalModulos}).`);
    return;
  }

  const modal = document.getElementById('dispense-modal');
  if (!modal) return;

  document.getElementById('dispense-modal-record-id').value = id;
  document.getElementById('dispense-modal-patient-info').textContent = `Paciente: ${record.paciente} • HC: ${record.hc || 'S/N'} • DNI: ${record.dni || 'S/N'}`;
  document.getElementById('dispense-modal-treatment').textContent = record.rp1 || record.motivo || record.diagnostico || 'Fórmula Prescrita';
  document.getElementById('dispense-modal-progress').textContent = `Progreso Actual: Módulo ${record.moduloActual} de ${record.totalModulos} (${Math.round((record.moduloActual / record.totalModulos) * 100)}% entregado)`;

  setDispenseQty(1);
  modal.classList.add('active');
}

function closeDispenseModal() {
  const modal = document.getElementById('dispense-modal');
  if (modal) modal.classList.remove('active');
}

function setDispenseQty(qty) {
  const qtyInput = document.getElementById('dispense-modal-qty');
  if (qtyInput) qtyInput.value = qty;
  updateDispenseBtnStyles(qty);
}

function updateDispenseBtnStyles(qty) {
  const btn1 = document.getElementById('btn-disp-1');
  const btn2 = document.getElementById('btn-disp-2');
  if (!btn1 || !btn2) return;

  const numericQty = parseInt(qty) || 1;
  if (numericQty === 1) {
    btn1.style.borderColor = 'var(--primary-500)';
    btn1.style.backgroundColor = 'var(--primary-50)';
    btn2.style.borderColor = 'var(--border-color)';
    btn2.style.backgroundColor = 'transparent';
  } else if (numericQty === 2) {
    btn2.style.borderColor = 'var(--primary-500)';
    btn2.style.backgroundColor = 'var(--primary-50)';
    btn1.style.borderColor = 'var(--border-color)';
    btn1.style.backgroundColor = 'transparent';
  } else {
    btn1.style.borderColor = 'var(--border-color)';
    btn1.style.backgroundColor = 'transparent';
    btn2.style.borderColor = 'var(--border-color)';
    btn2.style.backgroundColor = 'transparent';
  }
}

function confirmDispenseSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('dispense-modal-record-id').value;
  const record = records.find(r => r.id === id);
  if (!record) return;

  const qty = parseInt(document.getElementById('dispense-modal-qty').value) || 1;
  const remaining = record.totalModulos - record.moduloActual + 1;
  const actualQty = Math.min(qty, remaining);

  const prevModule = record.moduloActual;
  record.moduloActual += actualQty;

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + (30 * actualQty));
  record.proximoRetiro = nextDate.toISOString().split('T')[0];

  if (record.moduloActual > record.totalModulos) {
    record.moduloActual = record.totalModulos;
    record.estado = "Tratamiento Completado";
  } else if (record.moduloActual === record.totalModulos) {
    record.estado = "Tratamiento Completado";
  }

  localStorage.setItem('alassia_records', JSON.stringify(records));

  const logDesc = actualQty > 1
    ? `Entrega MÚLTIPLE (${actualQty} módulos/latas entregadas en mano): Módulos del ${prevModule} al ${Math.min(prevModule + actualQty - 1, record.totalModulos)} de ${record.totalModulos} para paciente ${record.paciente} (${record.id})`
    : `Dispensa registrada: Módulo ${prevModule}/${record.totalModulos} para paciente ${record.paciente} (${record.id})`;

  logEvent('DISPENSA', logDesc);

  // Sincronización en tiempo real con MySQL (10.12.4.2)
  fetch('api.php?action=save_record', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record)
  }).catch(err => console.log('MySQL Sync Dispense:', err));

  addNotification({
    targetService: record.destino || record.servicio,
    title: actualQty > 1 ? `Entrega Doble/Múltiple Registrada (${actualQty} latas)` : `Entrega Registrada: Módulo ${prevModule}/${record.totalModulos}`,
    text: `Paciente ${record.paciente} (${record.id}). Próxima entrega programada para ${record.proximoRetiro}.`,
    time: "Ahora"
  });

  closeDispenseModal();
  renderRecurringSection();
  renderInbox();
  renderReportSection();
  showToast(`¡Entrega de ${actualQty} módulo(s) registrada con éxito para ${record.paciente}!`);
}

/* Revert Last Dispensed Module Action */
function revertLastDispense(id) {
  const record = records.find(r => r.id === id);
  if (!record) return;

  if (record.moduloActual <= 1) {
    showToast(`⚠️ No hay entregas previas para revertir en el tratamiento de ${record.paciente}. Está en el Módulo inicial (1/${record.totalModulos}).`);
    return;
  }

  if (!confirm(`¿Estás seguro de que deseas DESHACER la última entrega del Módulo ${record.moduloActual} para ${record.paciente}?`)) {
    return;
  }

  const prevModule = record.moduloActual;
  record.moduloActual -= 1;

  // Revert next delivery date to today
  const todayStr = new Date().toISOString().split('T')[0];
  record.proximoRetiro = todayStr;

  if (record.estado === "Tratamiento Completado") {
    record.estado = "En Proceso";
  }

  localStorage.setItem('alassia_records', JSON.stringify(records));

  logEvent('DISPENSA', `REVERSIÓN DE ENTREGA: Módulo ${prevModule} deshecho para paciente ${record.paciente} (${record.id}). Retorno a Módulo ${record.moduloActual}/${record.totalModulos}.`);

  addNotification({
    targetService: record.destino || record.servicio,
    title: `↩️ ENTREGA DESHECHA / REVERTIDA`,
    text: `Se revirtió la entrega del Módulo ${prevModule} para ${record.paciente} (${record.id}). Vuelve a estar disponible para retirar Módulo ${record.moduloActual}.`,
    time: "Ahora"
  });

  renderRecurringSection();
  renderInbox();
  renderArchiveTable();
  renderReportSection();
  updateStats();

  showToast(`↩️ ¡Entrega del Módulo ${prevModule} deshecha con éxito! ${record.paciente} volvió al Módulo ${record.moduloActual}/${record.totalModulos}.`);
}

function triggerAbsenteeismAlert(id) {
  const record = records.find(r => r.id === id);
  if (!record) return;

  const alertId = `SOC-${Math.floor(1000 + Math.random() * 9000)}`;
  const todayStr = new Date().toISOString().split('T')[0];

  const socialRecord = {
    id: alertId,
    type: "Intervención Servicio Social",
    paciente: record.paciente,
    dni: record.dni,
    hc: record.hc,
    servicio: "Servicio Social Hospitalario",
    destino: "Servicio Social Hospitalario",
    motivo: `Ausentismo en retiro de insumo / fórmula láctea (Tratamiento ID: ${record.id}). Debía retirar el ${record.proximoRetiro}.`,
    staffAssigned: "Lic. Viviana Roldán (Servicio Social)",
    fecha: todayStr,
    estado: "Pendiente",
    medico: activeUser ? activeUser.name : "Sistema Alassia",
    respuestaMedica: "",
    medicoRespondedor: "",
    targetService: "Servicio Social Hospitalario"
  };

  records.unshift(socialRecord);
  localStorage.setItem('alassia_records', JSON.stringify(records));

  logEvent('ALARMA', `Alerta de inasistencia/ausentismo despachada EXCLUSIVAMENTE a Servicio Social para paciente ${record.paciente} (${record.id})`);

  addNotification({
    targetService: "Servicio Social Hospitalario",
    title: `🚨 ALERTA AUSENTISMO • TRABAJO SOCIAL`,
    text: `Solicitada intervención social para ${record.paciente} (DNI ${record.dni}) por ausentismo en tratamiento (${record.id}).`,
    time: "Ahora"
  });

  renderInbox();
  showToast(`📢 Alerta despachada exclusivamente al perfil de Servicio Social Hospitalario (${record.paciente}).`);
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
    targetService: notifObj.targetService || null,
    unread: true
  });
  localStorage.setItem('alassia_notifs', JSON.stringify(notifications));
  renderNotifications();
}

function renderNotifications() {
  const notifList = document.getElementById('notif-list');
  const dot = document.getElementById('notif-dot');
  if (!notifList) return;

  let visibleNotifs = notifications;

  if (activeUser && !activeUser.isAdmin) {
    const userServ = (activeUser.service || '').toLowerCase();
    visibleNotifs = notifications.filter(n => {
      if (!n.targetService) return true;
      const targetServ = n.targetService.toLowerCase();
      return targetServ.includes(userServ) || userServ.includes(targetServ);
    });
  }

  const unreadCount = visibleNotifs.filter(n => n.unread).length;
  if (dot) dot.style.display = unreadCount > 0 ? 'block' : 'none';

  if (visibleNotifs.length === 0) {
    notifList.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">No hay notificaciones pendientes para tu servicio.</div>`;
    return;
  }

  notifList.innerHTML = visibleNotifs.map(n => `
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
  let pendingRecords = records.filter(r => r.estado === 'Pendiente' || r.estado === 'En Proceso');
  let resolvedRecords = records.filter(r => r.estado.includes('Confirmado') || r.estado === 'Completada' || r.estado === 'Tratamiento Completado');
  let activeRecRecords = records.filter(r => r.isRecurring);

  if (activeUser && !activeUser.isAdmin) {
    pendingRecords = pendingRecords.filter(r => isRecordForService(r, activeUser.service));
    resolvedRecords = resolvedRecords.filter(r => isRecordForService(r, activeUser.service));
    activeRecRecords = activeRecRecords.filter(r => isRecordForService(r, activeUser.service));
  }

  const inboxBadge = document.getElementById('inbox-badge');
  if (inboxBadge) inboxBadge.textContent = pendingRecords.length;

  const statPending = document.getElementById('stat-pending-inbox');
  if (statPending) statPending.textContent = pendingRecords.length;

  const statResolved = document.getElementById('stat-resolved-total');
  if (statResolved) statResolved.textContent = resolvedRecords.length;

  const authorizedMilkCount = services.filter(s => s.enabled && s.autorizadoLeches).length;
  const statMilk = document.getElementById('stat-authorized-leches');
  if (statMilk) statMilk.textContent = authorizedMilkCount;

  const recBadge = document.getElementById('recurring-badge');
  const recStat = document.getElementById('stat-recurring');
  if (recBadge) recBadge.textContent = activeRecRecords.length;
  if (recStat) recStat.textContent = activeRecRecords.length;
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

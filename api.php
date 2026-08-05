<?php
/**
 * 📡 api.php — Servicio API Central de Sincronización MySQL
 * Hospital de Niños "Dr. Orlando Alassia" • Santa Fe Capital
 * 
 * IP Servidor Base de Datos: 10.12.4.2 (Base: alassia_mensajeria)
 * Conexión resiliente PDO con fallback a localhost para entorno dev.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ----------------------------------------------------------------------
// ⚙️ PARÁMETROS DE CONEXIÓN MYSQL (10.12.4.2)
// ----------------------------------------------------------------------
define('DB_HOST_PRIMARY', '10.12.4.2');
define('DB_HOST_FALLBACK', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'alassia_mensajeria');

function getDbConnection() {
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_TIMEOUT => 3,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_spanish_ci"
    ];

    // Intento 1: Servidor oficial 10.12.4.2
    try {
        $dsn = "mysql:host=" . DB_HOST_PRIMARY . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        $pdo->exec("SET NAMES utf8mb4 COLLATE utf8mb4_spanish_ci");
        return $pdo;
    } catch (PDOException $e) {
        // Intento 2: Fallback local / localhost
        try {
            $dsn = "mysql:host=" . DB_HOST_FALLBACK . ";dbname=" . DB_NAME . ";charset=utf8mb4";
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
            $pdo->exec("SET NAMES utf8mb4 COLLATE utf8mb4_spanish_ci");
            return $pdo;
        } catch (PDOException $e2) {
            return null;
        }
    }
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?: $_POST;
$action = $_GET['action'] ?? $data['action'] ?? '';

$pdo = getDbConnection();

// Manejo si la base no estuviera disponible en local o fallo de red
if (!$pdo) {
    echo json_encode([
        'success' => false,
        'mode' => 'fallback',
        'message' => '⚠️ No se pudo establecer conexión con el servidor MySQL (10.12.4.2). Operando en modo local.'
    ]);
    exit;
}

// ROUTING DE ACCIONES DE LA API
switch ($action) {

    // 1. REGISTRO DE AUDITORÍA EN TIEMPO REAL (Audit Trail -> auditoria_log)
    case 'log_event':
        $categoria = htmlspecialchars($data['categoria'] ?? 'GENERAL');
        $usuarioDni = htmlspecialchars($data['usuario_dni'] ?? 'S/N');
        $usuarioNombre = htmlspecialchars($data['usuario_nombre'] ?? 'Sistema / Anónimo');
        $detalle = htmlspecialchars($data['detalle'] ?? 'Acción registrada');
        $ipOrigen = $_SERVER['REMOTE_ADDR'] ?? '10.12.4.221';

        try {
            $stmt = $pdo->prepare("
                INSERT INTO auditoria_log (categoria, usuario_dni, usuario_nombre, detalle_accion, ip_origen)
                VALUES (:cat, :dni, :nom, :det, :ip)
            ");
            $stmt->execute([
                ':cat' => $categoria,
                ':dni' => $usuarioDni,
                ':nom' => $usuarioNombre,
                ':det' => $detalle,
                ':ip' => $ipOrigen
            ]);

            echo json_encode(['success' => true, 'log_id' => $pdo->lastInsertId()]);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 2. GUARDAR O ACTUALIZAR SERVICIO (servicio)
    case 'save_service':
        $code = strtoupper(trim($data['code'] ?? ''));
        $name = trim($data['name'] ?? '');
        $head = trim($data['headOfService'] ?? '');
        $email = trim($data['email'] ?? '');
        $autorizadoLeches = !empty($data['autorizadoLeches']) ? 1 : 0;
        $reportesHabilitados = ($data['reportesHabilitados'] ?? true) !== false ? 1 : 0;
        $activo = isset($data['enabled']) ? ($data['enabled'] ? 1 : 0) : 1;

        if (empty($code) || empty($name)) {
            echo json_encode(['success' => false, 'message' => 'Código y nombre obligatorios']);
            exit;
        }

        try {
            $stmt = $pdo->prepare("
                INSERT INTO servicio (codigo, nombre, email_oficial, jefe_servicio, requiere_autorizacion_leches, reportes_habilitados, activo)
                VALUES (:codigo, :nombre, :email, :jefe, :leches, :reportes, :activo)
                ON DUPLICATE KEY UPDATE 
                    nombre = VALUES(nombre),
                    email_oficial = VALUES(email_oficial),
                    jefe_servicio = VALUES(jefe_servicio),
                    requiere_autorizacion_leches = VALUES(requiere_autorizacion_leches),
                    reportes_habilitados = VALUES(reportes_habilitados),
                    activo = VALUES(activo)
            ");
            $stmt->execute([
                ':codigo' => $code,
                ':nombre' => $name,
                ':email' => $email,
                ':jefe' => $head,
                ':leches' => $autorizadoLeches,
                ':reportes' => $reportesHabilitados,
                ':activo' => $activo
            ]);

            echo json_encode(['success' => true, 'message' => "Servicio {$code} sincronizado en MySQL (10.12.4.2)"]);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    case 'delete_service':
        $code = strtoupper(trim($data['code'] ?? ''));
        if (!empty($code)) {
            try {
                $stmt = $pdo->prepare("UPDATE servicio SET activo = 0 WHERE codigo = :code");
                $stmt->execute([':code' => $code]);
                echo json_encode(['success' => true]);
            } catch (Exception $e) {
                echo json_encode(['success' => false, 'error' => $e->getMessage()]);
            }
        }
        break;

    // 3. GUARDAR O ACTUALIZAR PROFESIONAL/USUARIO (profesional)
    case 'save_user':
        $dni = preg_replace('/[^0-9]/', '', $data['dni'] ?? '');
        $name = trim($data['name'] ?? '');
        $role = trim($data['role'] ?? '');
        $mat = trim($data['mat'] ?? 'S/N');
        $email = trim($data['email'] ?? '');
        $isAdmin = !empty($data['isAdmin']) ? 1 : 0;
        $passHash = password_hash($data['password'] ?? 'alassia123', PASSWORD_DEFAULT);

        if (empty($dni) || empty($name)) {
            echo json_encode(['success' => false, 'message' => 'DNI y Nombre obligatorios']);
            exit;
        }

        try {
            $stmt = $pdo->prepare("
                INSERT INTO profesional (dni, password_hash, nombre_completo, matricula, especialidad_rol, es_admin, email, activo)
                VALUES (:dni, :pass, :nombre, :mat, :rol, :admin, :email, 1)
                ON DUPLICATE KEY UPDATE 
                    nombre_completo = VALUES(nombre_completo),
                    especialidad_rol = VALUES(especialidad_rol),
                    matricula = VALUES(matricula),
                    email = VALUES(email),
                    es_admin = VALUES(es_admin)
            ");
            $stmt->execute([
                ':dni' => $dni,
                ':pass' => $passHash,
                ':nombre' => $name,
                ':mat' => $mat,
                ':rol' => $role,
                ':admin' => $isAdmin,
                ':email' => $email
            ]);

            echo json_encode(['success' => true, 'message' => "Usuario DNI {$dni} guardado en MySQL (10.12.4.2)"]);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 4. GUARDAR SOLICITUD, RECETA O RETIRO (solicitud)
    case 'save_record':
        $codigo = trim($data['id'] ?? '');
        $tipo = trim($data['type'] ?? 'Solicitud General');
        $pacienteDni = preg_replace('/[^0-9]/', '', $data['pacienteDni'] ?? $data['dni'] ?? '');
        $pacienteNombre = trim($data['paciente'] ?? '');
        $pacienteHc = trim($data['hc'] ?? '');
        $servicioOrigen = trim($data['servicio'] ?? 'Clínica Pediátrica');
        $servicioDestino = trim($data['destino'] ?? 'General');
        $motivo = trim($data['motivo'] ?? $data['diagnostico'] ?? $data['rp1'] ?? '');
        $estado = trim($data['estado'] ?? 'Pendiente');
        $isRecurring = !empty($data['isRecurring']) ? 1 : 0;
        $moduloActual = intval($data['moduloActual'] ?? 1);
        $totalModulos = intval($data['totalModulos'] ?? 1);

        try {
            $stmt = $pdo->prepare("
                INSERT INTO solicitud (codigo_unico, tipo_formulario, paciente_dni, paciente_nombre, paciente_hc, motivo_consulta, es_recurrente, modulo_actual, total_modulos, estado)
                VALUES (:codigo, :tipo, :dni, :nombre, :hc, :motivo, :recurrente, :mod_act, :mod_tot, :estado)
                ON DUPLICATE KEY UPDATE
                    estado = VALUES(estado),
                    modulo_actual = VALUES(modulo_actual),
                    motivo_consulta = VALUES(motivo_consulta)
            ");
            $stmt->execute([
                ':codigo' => $codigo,
                ':tipo' => $tipo,
                ':dni' => $pacienteDni,
                ':nombre' => $pacienteNombre,
                ':hc' => $pacienteHc,
                ':motivo' => $motivo,
                ':recurrente' => $isRecurring,
                ':mod_act' => $moduloActual,
                ':mod_tot' => $totalModulos,
                ':estado' => $estado
            ]);

            echo json_encode(['success' => true, 'message' => "Solicitud {$codigo} sincronizada en MySQL (10.12.4.2)"]);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 5. CARGAR DATOS COMPLETOS DE LA BASE AL INICIAR
    case 'get_all_data':
        try {
            $servicios = $pdo->query("SELECT * FROM servicio ORDER BY nombre ASC")->fetchAll();
            $profesionales = $pdo->query("SELECT id, dni, nombre_completo, especialidad_rol, matricula, email, es_admin FROM profesional WHERE activo=1")->fetchAll();
            $solicitudes = $pdo->query("SELECT * FROM solicitud ORDER BY fecha_solicitud DESC LIMIT 100")->fetchAll();
            $logs = $pdo->query("SELECT * FROM auditoria_log ORDER BY fecha_registro DESC LIMIT 200")->fetchAll();

            echo json_encode([
                'success' => true,
                'servicios' => $servicios,
                'profesionales' => $profesionales,
                'solicitudes' => $solicitudes,
                'logs' => $logs
            ]);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 6. PURGAR / VACIAR SOLICITUDES Y RECETAS DE PRUEBA
    case 'clear_test_records':
        try {
            $pdo->exec("SET FOREIGN_KEY_CHECKS = 0");
            $pdo->exec("TRUNCATE TABLE solicitud");
            $pdo->exec("TRUNCATE TABLE ausentismo_alerta");
            $pdo->exec("SET FOREIGN_KEY_CHECKS = 1");

            $stmtLog = $pdo->prepare("INSERT INTO auditoria_log (categoria, mensaje_evento, usuario_dni, IP_origen) VALUES ('ADMIN', 'Purga total de recetas y solicitudes de prueba de la base de datos', '11111111', :ip)");
            $stmtLog->execute([':ip' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1']);

            echo json_encode(['success' => true, 'message' => 'Se purgaron todas las recetas de prueba de MySQL (10.12.4.2)'], JSON_UNESCAPED_UNICODE);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }
        break;

    // 7. VACIAR / ELIMINAR USUARIOS DE PRUEBA
    case 'clear_test_users':
        try {
            $stmt = $pdo->prepare("DELETE FROM profesional WHERE es_admin = 0 AND dni != '11111111'");
            $stmt->execute();
            $deletedCount = $stmt->rowCount();

            $stmtLog = $pdo->prepare("INSERT INTO auditoria_log (categoria, mensaje_evento, usuario_dni, IP_origen) VALUES ('ADMIN', 'Baja y vaciado masivo de usuarios de prueba', '11111111', :ip)");
            $stmtLog->execute([':ip' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1']);

            echo json_encode(['success' => true, 'deleted_count' => $deletedCount, 'message' => 'Se eliminaron todos los usuarios de prueba de MySQL (10.12.4.2) manteniendo la cuenta del Administrador General'], JSON_UNESCAPED_UNICODE);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }
        break;

    default:
        echo json_encode(['success' => true, 'message' => 'API Endpoint MySQL Hospital Alassia 10.12.4.2 activo']);
        break;
}

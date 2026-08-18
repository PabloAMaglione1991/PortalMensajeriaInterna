<?php
/* ==========================================================================
   API Endpoint de Búsqueda de Pacientes por DNI - Hospital Alassia
   Conexión a Base MySQL "diagnose" (Servidor Intranet: 10.12.4.1)
   ========================================================================== */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

// Credenciales oficiales de la base de datos "diagnose" (Proyecto Reminder)
$host = '10.12.4.1';
$dbname = 'diagnose';
$user = 'gestion_';
$password = 'GESTION_77';

// Limpiar parámetro DNI
$rawInput = isset($_GET['dni']) ? trim($_GET['dni']) : '';
$rawInput = str_replace(['debug=1', '&debug=1'], '', $rawInput);
$dniLimpio = preg_replace('/[^0-9]/', '', $rawInput);
$dniLike = "%" . $dniLimpio . "%";

if (empty($dniLimpio)) {
    echo json_encode([
        'success' => false,
        'message' => 'DNI no especificado o inválido.'
    ]);
    exit;
}

$debugMode = isset($_GET['debug']) && $_GET['debug'] == '1';
$debugLogs = [];

function buscarEnBaseDeDatos($host, $dbname, $user, $password, $dni, $dniLimpio, $dniLike, &$debugLogs) {
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password, [
            PDO::ATTR_TIMEOUT => 3,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);

        // Usar SELECT p.* para evitar errores por nombres de columnas específicas (ej: p.fnac)
        $sql = "SELECT p.* FROM paciente p 
                WHERE REPLACE(REPLACE(REPLACE(TRIM(p.nro_doc), '.', ''), '-', ''), ' ', '') = :dniLimpio
                   OR p.nro_doc = :dni
                   OR p.nro_doc LIKE :dniLike
                   OR p.nr0_hc = :dni
                   OR p.nr0_hc LIKE :dniLike
                LIMIT 1";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':dniLimpio' => $dniLimpio,
            ':dni' => $dni,
            ':dniLike' => $dniLike
        ]);

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            $debugLogs[] = "[$host / $dbname] Conexión ÉXITO. Paciente encontrado.";
            
            // Mapeo dinámico de campos resiliente a variaciones de esquema
            $nombre = $row['ape_y_nom'] ?? $row['nombre_completo'] ?? $row['nombre'] ?? $row['apellido_y_nombre'] ?? '';
            if (isset($row['st_nombre']) && !empty($row['st_nombre'])) {
                $nombre .= ' ' . $row['st_nombre'];
            }

            $dniRes = $row['nro_doc'] ?? $row['dni'] ?? $row['documento'] ?? $dniLimpio;
            $hcRes = $row['nr0_hc'] ?? $row['nro_hc'] ?? $row['hc'] ?? $row['historia_clinica'] ?? '';
            $fnacRes = $row['fnac'] ?? $row['fecha_nac'] ?? $row['fecha_nacimiento'] ?? $row['fec_nac'] ?? $row['fechanac'] ?? '';
            $telRes = $row['telefono'] ?? $row['tel'] ?? '';
            $emailRes = $row['email'] ?? '';
            $sexoRes = $row['sexo'] ?? $row['sex'] ?? 'M';

            return [
                'nombre' => trim($nombre),
                'dni' => $dniRes,
                'hc' => $hcRes,
                'fecha_nacimiento' => $fnacRes,
                'telefono' => $telRes,
                'email' => $emailRes,
                'sexo' => $sexoRes
            ];
        } else {
            $debugLogs[] = "[$host / $dbname] Conexión ÉXITO. Filas coincidentes: 0";
            return null;
        }
    } catch (PDOException $e) {
        $debugLogs[] = "[$host / $dbname] Error PDO: " . $e->getMessage();
        return null;
    }
}

// 1. Intentar búsqueda en Base Central "diagnose" (10.12.4.1)
$paciente = buscarEnBaseDeDatos('10.12.4.1', 'diagnose', 'gestion_', 'GESTION_77', $rawInput, $dniLimpio, $dniLike, $debugLogs);

// 2. Si no se encuentra en 10.12.4.1, intentar búsqueda en Base del Portal "alassia_mensajeria" (10.12.4.2)
if (!$paciente) {
    $paciente = buscarEnBaseDeDatos('10.12.4.2', 'alassia_mensajeria', 'sql', 'sql77', $rawInput, $dniLimpio, $dniLike, $debugLogs);
}

$response = [];
if ($paciente) {
    $response = [
        'success' => true,
        'paciente' => $paciente
    ];
} else {
    $response = [
        'success' => false,
        'message' => "Paciente con DNI/HC '$dniLimpio' no encontrado ni en base diagnose (10.12.4.1) ni en alassia_mensajeria (10.12.4.2)."
    ];
}

if ($debugMode || !$paciente) {
    $response['debug'] = $debugLogs;
}

echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
exit;
?>

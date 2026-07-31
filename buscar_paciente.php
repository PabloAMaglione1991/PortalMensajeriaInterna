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

$dni = isset($_GET['dni']) ? trim($_GET['dni']) : '';

if (empty($dni)) {
    echo json_encode([
        'success' => false,
        'message' => 'DNI no especificado.'
    ]);
    exit;
}

// Limpiar DNI de puntos, guiones o espacios
$dniLimpio = preg_replace('/[^0-9]/', '', $dni);
$dniLike = "%" . $dniLimpio . "%";

function buscarEnBaseDeDatos($host, $dbname, $user, $password, $dni, $dniLimpio, $dniLike) {
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password, [
            PDO::ATTR_TIMEOUT => 3,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);

        $sql = "SELECT 
                    CONCAT(p.ape_y_nom, ' ', IFNULL(p.st_nombre, '')) AS nombre_completo,
                    p.nro_doc AS dni,
                    p.nr0_hc AS hc,
                    p.telefono,
                    p.email,
                    p.fnac AS fecha_nacimiento,
                    p.sexo
                FROM paciente p 
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

        return $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        return null;
    }
}

// 1. Intentar búsqueda en Base Central "diagnose" (10.12.4.1)
$paciente = buscarEnBaseDeDatos('10.12.4.1', 'diagnose', 'gestion_', 'GESTION_77', $dni, $dniLimpio, $dniLike);

// 2. Si no se encuentra en 10.12.4.1, intentar búsqueda en Base del Portal "alassia_mensajeria" (10.12.4.2)
if (!$paciente) {
    $paciente = buscarEnBaseDeDatos('10.12.4.2', 'alassia_mensajeria', 'gestion_', 'GESTION_77', $dni, $dniLimpio, $dniLike);
}

if ($paciente) {
    echo json_encode([
        'success' => true,
        'paciente' => [
            'nombre' => trim($paciente['nombre_completo']),
            'dni' => $paciente['dni'],
            'hc' => $paciente['hc'],
            'telefono' => $paciente['telefono'],
            'email' => $paciente['email'],
            'fecha_nacimiento' => $paciente['fecha_nacimiento'],
            'sexo' => $paciente['sexo']
        ]
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => "Paciente con DNI/HC '$dni' no encontrado ni en base diagnose (10.12.4.1) ni en alassia_mensajeria (10.12.4.2)."
    ]);
}
?>

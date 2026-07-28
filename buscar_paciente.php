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

// Limpiar DNI de puntos o espacios
$dniLimpio = preg_replace('/[^0-9]/', '', $dni);

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT 
                CONCAT(p.ape_y_nom, ' ', IFNULL(p.st_nombre, '')) AS nombre_completo,
                p.nro_doc AS dni,
                p.nr0_hc AS hc,
                p.telefono,
                p.email,
                p.fnac AS fecha_nacimiento,
                p.sexo
            FROM paciente p 
            WHERE p.nro_doc = :dni OR p.nro_doc = :dniLimpio
            LIMIT 1";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':dni' => $dni,
        ':dniLimpio' => $dniLimpio
    ]);

    $paciente = $stmt->fetch(PDO::FETCH_ASSOC);

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
            'message' => "Paciente con DNI $dni no encontrado en la base de datos diagnose."
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'No se pudo conectar a la base 10.12.4.1 (diagnose): ' . $e->getMessage()
    ]);
}
?>

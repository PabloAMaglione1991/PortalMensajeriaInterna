<?php
/* ==========================================================================
   Script Diagnóstico de Conexión y Estado de Base de Datos - Hospital Alassia
   ========================================================================== */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$diagnostico = [
    'timestamp' => date('Y-m-d H:i:s'),
    'php_version' => PHP_VERSION,
    'servidores' => []
];

// 1. Diagnóstico Servidor Central "diagnose" (10.12.4.1)
$s1 = [
    'host' => '10.12.4.1',
    'dbname' => 'diagnose',
    'estado' => 'Desconectado',
    'error' => null,
    'tablas_existentes' => [],
    'columnas_paciente' => [],
    'total_pacientes' => 0,
    'muestra_pacientes' => []
];

try {
    $pdo1 = new PDO("mysql:host=10.12.4.1;dbname=diagnose;charset=utf8", 'gestion_', 'GESTION_77', [
        PDO::ATTR_TIMEOUT => 3,
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    $s1['estado'] = 'CONECTADO ✅';

    $tables = $pdo1->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    $s1['tablas_existentes'] = $tables;

    $pacienteTable = null;
    foreach ($tables as $t) {
        if (strtolower($t) === 'paciente' || strtolower($t) === 'pacientes') {
            $pacienteTable = $t;
            break;
        }
    }

    if ($pacienteTable) {
        $cols = $pdo1->query("DESCRIBE `$pacienteTable`")->fetchAll(PDO::FETCH_ASSOC);
        $s1['columnas_paciente'] = array_column($cols, 'Field');

        $count = $pdo1->query("SELECT COUNT(*) FROM `$pacienteTable`")->fetchColumn();
        $s1['total_pacientes'] = (int)$count;

        $sample = $pdo1->query("SELECT * FROM `$pacienteTable` LIMIT 3")->fetchAll(PDO::FETCH_ASSOC);
        $s1['muestra_pacientes'] = $sample;
    }
} catch (PDOException $e) {
    $s1['estado'] = 'ERROR DE CONEXIÓN ❌';
    $s1['error'] = $e->getMessage();
}

$diagnostico['servidores']['central_diagnose_10.12.4.1'] = $s1;

// 2. Diagnóstico Servidor Portal "alassia_mensajeria" (10.12.4.2)
$s2 = [
    'host' => '10.12.4.2',
    'dbname' => 'alassia_mensajeria',
    'estado' => 'Desconectado',
    'error' => null,
    'tablas_existentes' => [],
    'conteos' => []
];

try {
    $pdo2 = new PDO("mysql:host=10.12.4.2;dbname=alassia_mensajeria;charset=utf8mb4", 'sql', 'sql77', [
        PDO::ATTR_TIMEOUT => 3,
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    $s2['estado'] = 'CONECTADO ✅';

    $tables2 = $pdo2->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    $s2['tablas_existentes'] = $tables2;

    $tablasVerificar = ['servicio', 'profesional', 'solicitud', 'auditoria_log', 'ausentismo_alerta', 'paciente'];
    foreach ($tablasVerificar as $tbl) {
        if (in_array($tbl, $tables2)) {
            $cnt = $pdo2->query("SELECT COUNT(*) FROM `$tbl`")->fetchColumn();
            $s2['conteos'][$tbl] = (int)$cnt;
        }
    }
} catch (PDOException $e) {
    $s2['estado'] = 'ERROR DE CONEXIÓN ❌';
    $s2['error'] = $e->getMessage();
}

$diagnostico['servidores']['portal_mensajeria_10.12.4.2'] = $s2;

echo json_encode($diagnostico, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>

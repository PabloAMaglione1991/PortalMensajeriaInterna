<?php
/**
 * 📧 enviar_mail.php — Servicio Backend de Despacho de Correos SMTP
 * Hospital de Niños "Dr. Orlando Alassia" • Santa Fe Capital
 * 
 * Permite enviar notificaciones por correo electrónico a casillas institucionales
 * o casillas de profesionales con soporte para SMTP real y fallback seguro.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ----------------------------------------------------------------------
// ⚙️ CONFIGURACIÓN DEL SERVIDOR SMTP HOSPITALARIO
// ----------------------------------------------------------------------
// Cambiar a true cuando dispongas de los accesos SMTP del Ministerio o Gmail
define('SMTP_ENABLED', false); 
define('SMTP_HOST', 'smtp.santafe.gob.ar'); // Ej: smtp.gmail.com o smtp.santafe.gob.ar
define('SMTP_PORT', 587);                  // 587 (TLS) o 465 (SSL)
define('SMTP_USER', 'notificaciones.alassia@santafe.gob.ar');
define('SMTP_PASS', 'ClaveSegura2026');
define('SMTP_SECURE', 'tls'); // 'tls' o 'ssl'
define('DEFAULT_FROM_EMAIL', 'notificaciones.alassia@santafe.gob.ar');
define('DEFAULT_FROM_NAME', 'Hospital de Niños Dr. Orlando Alassia');

// Carpeta de almacenamiento para auditoría y respaldo local
define('MAILS_DIR', __DIR__ . '/mails_salida');

if (!file_exists(MAILS_DIR)) {
    mkdir(MAILS_DIR, 0777, true);
}

// Leer cuerpo JSON de la petición POST
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    echo json_encode([
        'success' => false,
        'message' => '⚠️ Formato de petición inválido. Se requiere un cuerpo JSON.'
    ]);
    exit;
}

$to = filter_var($data['to'] ?? '', FILTER_VALIDATE_EMAIL) ?: ($data['to'] ?? '');
$toName = htmlspecialchars($data['to_name'] ?? 'Servicio Hospitalario');
$subject = $data['subject'] ?? '[NOTIFICACIÓN HOSPITAL ALASSIA] Solicitud Clínica';
$recordId = preg_replace('/[^A-Za-z0-9\-]/', '', $data['record_id'] ?? 'SOL-' . time());
$paciente = htmlspecialchars($data['paciente'] ?? 'Paciente');
$medico = htmlspecialchars($data['medico'] ?? 'Médico Emisor');
$tipo = htmlspecialchars($data['tipo'] ?? 'Solicitud General');
$motivo = htmlspecialchars($data['motivo'] ?? $data['diagnostico'] ?? $data['rp1'] ?? 'Sin detalle');
$servicioOrigen = htmlspecialchars($data['servicio_origen'] ?? 'Servicio Emisor');
$servicioDestino = htmlspecialchars($data['servicio_destino'] ?? 'Servicio Receptor');

if (empty($to)) {
    echo json_encode([
        'success' => false,
        'message' => '⚠️ Falta la dirección de correo electrónico del destinatario (to).'
    ]);
    exit;
}

// Generar Plantilla HTML Profesional de Correo Oficial Hospital Alassia
$htmlMessage = '
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>' . htmlspecialchars($subject) . '</title>
    <style>
        body { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 20px; color: #1e293b; }
        .email-card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #cbd5e1; border-top: 4px solid #0284c7; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .email-header { background: #0f172a; color: #ffffff; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0284c7; }
        .email-header h1 { font-size: 14px; margin: 0; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #ffffff; }
        .email-header span { font-size: 11px; color: #38bdf8; font-family: monospace; }
        .email-body { padding: 24px 20px; }
        .badge-id { display: inline-block; background: #e0f2fe; color: #0369a1; font-weight: 800; font-size: 12px; padding: 4px 8px; border-radius: 4px; font-family: monospace; margin-bottom: 12px; }
        .data-box { background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #0284c7; padding: 14px; border-radius: 6px; margin: 16px 0; }
        .data-row { margin-bottom: 8px; font-size: 13px; line-height: 1.4; }
        .data-row strong { color: #334155; }
        .btn-action { display: inline-block; background: #0284c7; color: #ffffff !important; text-decoration: none; padding: 10px 18px; font-weight: bold; border-radius: 6px; font-size: 13px; margin-top: 12px; }
        .email-footer { background: #f8fafc; padding: 14px 20px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
</head>
<body>
    <div class="email-card">
        <div class="email-header">
            <h1>HOSPITAL DE NIÑOS "DR. ORLANDO ALASSIA"</h1>
            <span>SANTA FE CAPITAL</span>
        </div>
        <div class="email-body">
            <span class="badge-id">NOTIFICACIÓN OFICIAL #' . htmlspecialchars($recordId) . '</span>
            <h2 style="font-size: 18px; color: #0f172a; margin: 0 0 12px 0;">' . htmlspecialchars($tipo) . '</h2>
            
            <p style="font-size: 14px; margin-bottom: 16px;">Estimado/a profesional del equipo de <strong>' . htmlspecialchars($servicioDestino) . '</strong>,</p>
            <p style="font-size: 13px; color: #475569; margin-bottom: 16px;">Se ha registrado un nuevo pedido clínico asistencial asignado a su sector en la Red Intranet del Hospital Alassia:</p>
            
            <div class="data-box">
                <div class="data-row"><strong>ID Solicitud:</strong> ' . htmlspecialchars($recordId) . '</div>
                <div class="data-row"><strong>Paciente:</strong> ' . htmlspecialchars($paciente) . '</div>
                <div class="data-row"><strong>Servicio Emisor:</strong> ' . htmlspecialchars($servicioOrigen) . '</div>
                <div class="data-row"><strong>Médico Emisor:</strong> ' . htmlspecialchars($medico) . '</div>
                <div class="data-row"><strong>Destinatario / Asignado:</strong> ' . htmlspecialchars($toName) . ' (' . htmlspecialchars($to) . ')</div>
                <div class="data-row" style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed #cbd5e1;"><strong>Detalle / Prescripción:</strong><br><span style="color: #0f172a; font-style: italic;">' . nl2br(htmlspecialchars($motivo)) . '</span></div>
            </div>

            <p style="font-size: 13px; color: #475569;">Podés ingresar al portal hospitalario para gestionar la entrega o responder la solicitud:</p>
            <a href="http://localhost:8000" class="btn-action">Ingresar al Portal Hospitalario →</a>
        </div>
        <div class="email-footer">
            Sistema de Gestión de Mensajería, Recetas e Interconsultas • Hospital de Niños Dr. Orlando Alassia<br>
            Mendoza 4151, Santa Fe Capital • Ministerio de Salud de la Provincia de Santa Fe
        </div>
    </div>
</body>
</html>
';

$mailSent = false;
$sendError = null;

// INTENTO DE ENVÍO POR SMTP REAL / FUNCIÓN MAIL DE PHP
if (SMTP_ENABLED) {
    $headers = [];
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=utf-8';
    $headers[] = 'From: ' . DEFAULT_FROM_NAME . ' <' . DEFAULT_FROM_EMAIL . '>';
    $headers[] = 'Reply-To: ' . DEFAULT_FROM_EMAIL;
    $headers[] = 'X-Mailer: PHP/' . phpversion();

    // Intentar enviar mediante mail() estándar
    $mailSent = @mail($to, $subject, $htmlMessage, implode("\r\n", $headers));
    if (!$mailSent) {
        $sendError = 'Falló la entrega SMTP estándar del servidor.';
    }
}

// RESPALDO / REGISTRO LOCAL EN CARPETA DE SALIDA (Para auditoría y pruebas)
$filename = 'mail_' . $recordId . '_' . date('Ymd_His') . '.html';
$filepath = MAILS_DIR . '/' . $filename;
file_put_contents($filepath, $htmlMessage);

$relativePath = 'mails_salida/' . $filename;

// Respuesta JSON al Cliente
echo json_encode([
    'success' => true,
    'smtp_status' => $mailSent ? 'sent' : (SMTP_ENABLED ? 'failed' : 'simulated'),
    'message' => $mailSent 
        ? "✅ Correo enviado exitosamente vía SMTP a {$to}" 
        : "✅ Notificación registrada correctamente. Archivo guardado en {$relativePath} (SMTP deshabilitado o en modo pruebas).",
    'record_id' => $recordId,
    'recipient' => $to,
    'recipient_name' => $toName,
    'file_path' => $relativePath,
    'timestamp' => date('Y-m-d H:i:s')
]);

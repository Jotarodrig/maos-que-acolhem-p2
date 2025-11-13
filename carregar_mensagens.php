<?php

header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/conexao.php';

$tema = $_GET['tema'] ?? '';
if (!$tema) {
    echo json_encode([]);
    exit
}

$stmt = $conn->prepare("SELECT id, nome, mensagem, tema, data_envio FROM mensagens WHERE tema = ? ORDER BY data_envio ASC LIMIT 1000");
$stmt->bind_param('s', $tema);
$stmt->execute();
$result = $stmt->get_result();

$rows = [];
while ($r = $result->fetch_assoc()) $rows[] = $r;

$stmt->close();
$conn->close();

echo json_encode($rows);
?>
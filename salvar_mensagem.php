<?php

header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/conexao.php';

$nome = $_POST['nome'] ?? '';
$mensagem = $_POST['mensagem'] ?? '';
$tema = $_POST['mensagem'] ?? '';

if (!$nome || !$mensagem || !$tema ) {
    echo json_encode(['sucess' => false, 'msg' => 'Dados incompletos']);
    exit;
}


$stmt = $conn->prepare("INSET INTO mensagens (nome, mensagem, tema) VALUES (?, ?, ?)");
$stmt->bind_param('sss', $nome, $mensagem, $tema);
$ok = $stmt->execute();
$stmt->close();

echo json_encode(['sucess' => $ok]);
$conn->close();
?> 
<?php
// Inicia a conexão com o banco
$host = 'localhost';
$db   = 'comunicacao_site';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    die("Erro na conexão com o banco de dados: " . $e->getMessage());
}


$email = trim($_POST['email'] ?? '');
$senha_clara = trim($_POST['senha'] ?? '');


if (empty($email) || empty($senha_clara)) {
    echo "<p style='color:red; font-size:18px;'>Por favor, preencha todos os campos.</p>";
    echo "<a href='cadastro.html' style='font-size:16px;'>Voltar</a>";
    exit;
}


$sql = "SELECT id FROM usuarios WHERE email = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$email]);

if ($stmt->fetch()) {
    echo "<p style='color:red; font-size:18px;'>Este e-mail já está cadastrado.</p>";
    echo "<a href='login.html' style='font-size:16px;'>Ir para o login</a>";
    exit;
}


$senha_hash = password_hash($senha_clara, PASSWORD_DEFAULT);


$sql = "INSERT INTO usuarios (email, senha) VALUES (?, ?)";
$stmt = $pdo->prepare($sql);
$stmt->execute([$email, $senha_hash]);


header("Location: login.html?cadastro=sucesso");
exit;
?>
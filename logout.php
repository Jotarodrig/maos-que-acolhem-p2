<?php
session_start();

$_SESSION = [];
session_destroy();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Você saiu da sua conta</title>
</head>
<body class="logout-body">
    
    <div class="logout-container">
        <h1>Você saiu da sua conta</h1>
        <p>Esperamos vê-lo novamente em breve!</p>
        <a href="login.html" class="btn-voltar-login">Voltar ao login</a>
    </div>
    
</body>
</html>
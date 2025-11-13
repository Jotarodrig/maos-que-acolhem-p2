<?php
session_start();


if (!isset($_SESSION['usuario_id'])) {
    header("Location: login.html");
    exit;
}


$usuario_email = htmlspecialchars($_SESSION['usuario_email']);
?>


<?php include 'painel.html'; ?>
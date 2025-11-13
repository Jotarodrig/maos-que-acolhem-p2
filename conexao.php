<?php
$servidor = "localhost";
$usuario = "root";
$senha = "";
$banco = "comunicacao_site";

$conn = new mysqli($servidor, $usuario, $senha, $banco);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
} else {
    echo "Conexão com o banco realizada com sucesso!";
}
?>
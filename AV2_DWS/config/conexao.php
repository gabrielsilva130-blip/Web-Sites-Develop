<?php

$servidor = "localhost";
$usuario = "root";
$senha = "";
$banco = "Crow123";

$conexao = new mysqli(
    $servidor,
    $usuario,
    $senha,
    $banco
); 

if($conexao->connect_error){
    die("Erro de conexão: " . $conexao->connect_error); //Feijão com arroz, literalmente só coloca as informações e se conecta com o banco de dados
}

?>
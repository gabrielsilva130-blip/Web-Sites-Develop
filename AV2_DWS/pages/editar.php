<?php
require_once("../config/conexao.php"); //acessa o SQL
$json = file_get_contents("php://input"); //Pega o JSON do HTTP via POST
$dados = json_decode($json, true); //Transforma o JSON em código legível
$emailORG = $dados["emailOrg"]; //Pega os dados do JSON do fetch do JS... Confuso, mas é só um JSON usável pelo PHP
$email = $dados["email"]; //Pega os dados do JSON do fetch do JS... Confuso, mas é só um JSON usável pelo PHP
$senha = $dados["senha"]; //Pega os dados do JSON do fetch do JS... Confuso, mas é só um JSON usável pelo PHP
$nome = $dados["nome"]; //Pega os dados do JSON do fetch do JS... Confuso, mas é só um JSON usável pelo PHP
$estilo = $dados["estilo"]; //Pega os dados do JSON do fetch do JS... Confuso, mas é só um JSON usável pelo PHP
$musica = $dados["musica"]; //Pega os dados do JSON do fetch do JS... Confuso, mas é só um JSON usável pelo PHP
$cantor = $dados["cantor"]; //Pega os dados do JSON do fetch do JS... Confuso, mas é só um JSON usável pelo PHP
if($email != ""){
    mysqli_query($conexao, "UPDATE usuarios SET email = '$email' WHERE email =  '$emailORG' "); //Muda o Email caso o valor não esteja vazio ou o usuário decidiu colocar algo
} 
$emailORG = $email; //Não quero mudar tudo em baixo
if($senha != ""){
    mysqli_query($conexao, "UPDATE usuarios SET senha = '$senha' WHERE email = '$emailORG' ");
}
if($nome != ""){
    mysqli_query($conexao, "UPDATE usuarios SET nome = '$nome' WHERE email = '$emailORG' ");
}
if($estilo != ""){
    mysqli_query($conexao, "UPDATE usuarios SET estilo = '$estilo' WHERE email = '$emailORG' ");
}
if($musica != ""){
    mysqli_query($conexao, "UPDATE usuarios SET musica  = '$musica' WHERE email = '$emailORG' ");
}
if($cantor != ""){
    mysqli_query($conexao, "UPDATE usuarios SET cantor = '$cantor' WHERE email = '$emailORG' ");
} //Repete esse processo umas 6 vezes até colocar tudo corretamente caso o usuário colocou algo, claro... Se não colou é ignorado, por isso fiz sqli.query para ir mais rápido
echo json_encode([
    "ok" => 1
])
?>
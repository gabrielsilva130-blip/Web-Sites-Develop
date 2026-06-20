<?php

require_once("../config/conexao.php"); //acessa o SQL
$json = file_get_contents("php://input"); //Pega o JSON do HTTP via POST
$dados = json_decode($json, true); //Transforma o JSON em código legível
$email = $dados["email"];
$senha = $dados["senha"];
$nome = $dados["nome"];
$estilo = $dados["estilo"];
$musica = $dados["musica"];
$cantor = $dados["cantor"];
$sql = "INSERT INTO usuarios(email, senha,nome,estilo,musica,cantor) VALUES(?,?,?,?,?,?)"; //Código SQL, os '?' são placeholders
$stmt = $conexao->prepare($sql);  //Prepara o código sem executar ele e passa para stmt
$stmt->bind_param("ssssss", $email,$senha,$nome,$estilo,$musica,$cantor); //transforma os placeholders nessa sequencia em string (s)
 //Finalmente executa o código
if(!$stmt->execute()){ //Manda o JSON de volta para o JS para verificar se algo deu errado
    echo json_encode([ //Manda mensagem que deu errado na execução
    "ok" => 0,
    "mensagem" => "Erro ao preparar o SQL"
    ]);
    } else{ //Deu certo e eu fico feliz
        echo json_encode([
    "ok" => 1,
    "mensagem" => "SQL deu certo : D"
    ]);
    }
    exit;
?>
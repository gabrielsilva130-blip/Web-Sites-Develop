<?php
require_once("../config/conexao.php"); 
$json = file_get_contents("php://input"); //Pega o JSON do HTTP via POST
$dados = json_decode($json, true); //Transforma o JSON em código legível
$email = $dados["email"];
$senha = $dados["senha"];
$sql = "SELECT * FROM usuarios  WHERE email = ?";
$stmt = $conexao->prepare($sql); //Prepara o código para evitar SQL inject
$stmt->bind_param("s", $email); //Colocar email no código em troca do SQL, esse "s" é de string
$stmt->execute(); //Executa e retorna false ou true, por isso o ->execute estava dentro de um if no último código
$resul = $stmt->get_result(); //Pega o resultado do SELECT
if($resul->num_rows > 0){ //Verificar se tem mais de 0 resultados
    $usuario = $resul-> fetch_assoc(); //Transofrma em um array associativo
    if($usuario["senha"] == $senha){ //Verifica se a senha que o JS passou no JSON e a senha do array associativo do banco de dados é igual... Deu certo nas vezes que eu testei
        echo json_encode([ //Manda pro JS que deu cetro
            "ok" => 1,
            "mensagem" => "Senha e usuários corretos"
        ]);}
        else{ //Deu ruim : ( 
            echo json_encode([
                "ok" => 0,
                "mensagem"=> "Senha incorreta"
            ]);
        }
    }
 else{ //Email simplesmente não existe, já que existe menos ou igual a 0 resultados
    echo json_encode([ 
        "ok"=> 0,
        "mensagem" => "Email não existente"
    ]);
}

?>
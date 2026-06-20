
<?php //... Que que eu faço com isso? Vou deletar tudo, coisas da vida...
require_once("../config/conexao.php");  
$json = file_get_contents("php://input"); //Pega o JSON do HTTP via POST
$dados = json_decode($json, true); //Transforma o JSON em código legível
$email = $dados["emailOrg"]; //Pega o Email original Não alterado
mysqli_query($conexao,"DELETE FROM usuarios WHERE email = '$email'"); //Faz a requisição sem proteção msm pq nós é hardcore >: D
echo json_encode([ "ok" => 1 ]); //Manda ok como costume mundial de que todas as apis deveriam ter
?>

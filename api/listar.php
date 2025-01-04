<?php
include("conexao.php");



if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['erro' => 'Método HTTP não permitido. Verifique a requisição.'], JSON_UNESCAPED_UNICODE);
    exit();
}



$sql = "SELECT * FROM cursos";
$executar = mysqli_query($conexao, $sql);

$cursos = [];
$indice = 0;

while($linha = mysqli_fetch_assoc($executar)){
	$cursos[$indice]['id'] = $linha['id'];
	$cursos[$indice]['name'] = $linha['name'];
	$cursos[$indice]['price'] = $linha['price'];
	
$indice++;
}

header('Content-Type: application/json');

echo json_encode(['cursos'=>$cursos]);

mysqli_close($conexao);
?>
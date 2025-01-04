<?php
include("conexao.php");


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['erro' => 'Método HTTP não permitido. Verifique a requisição.'], JSON_UNESCAPED_UNICODE);
    exit();
}

$obterDados = file_get_contents("php://input");
$extrair = json_decode($obterDados);


$nomeCurso = $extrair->name;
$valorCurso = $extrair->price;


if (!is_numeric($valorCurso)) {
    http_response_code(400);
    echo json_encode(['erro' => 'O preço deve ser um número válido.'], JSON_UNESCAPED_UNICODE);
    exit();
}


$valorCurso = (float)$valorCurso;

$sql = "INSERT INTO cursos (name, price) VALUES ('$nomeCurso', $valorCurso)";

if (mysqli_query($conexao, $sql)){
	$curso = [
		'name'=> $nomeCurso,
		'price'=> number_format($valorCurso, 2, '.', ''),
	];

	http_response_code(201);
	echo json_encode(['curso' => $curso], JSON_UNESCAPED_UNICODE);
} else {
	http_response_code(400); 
	echo json_encode(['erro'=> 'Falha: Erro ao cadastrar curso'], JSON_UNESCAPED_UNICODE);
}

mysqli_close($conexao);
?>
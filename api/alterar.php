<?php
include("conexao.php");

if ($_SERVER['REQUEST_METHOD'] !== 'PATCH') {
	http_response_code(405); 
    echo json_encode(['erro' => 'Método não permitido'], JSON_UNESCAPED_UNICODE);
    exit;
}

$obterDados = file_get_contents("php://input");
$extrair = json_decode($obterDados);

$idCurso = $extrair->cursos->id;
$nomeCurso = $extrair->cursos->name;
$valorCurso = $extrair->cursos-> price;

if (!is_numeric($valorCurso)) {
	http_response_code(400);
	echo json_encode(['erro' => 'Preço inválido'], JSON_UNESCAPED_UNICODE);
    exit;
} else {

}

$valorCurso = (float)$valorCurso;
$valorCurso = number_format($valorCurso, 2, '.', '');


$sql = "UPDATE cursos SET name='$nomeCurso', price='$valorCurso' WHERE id=$idCurso";

if (mysqli_query($conexao, $sql)){
	http_response_code(200);

	$curso = [
		'id'=> $idCurso,
		'name'=> $nomeCurso,
		'price'=> $valorCurso
	];

	echo json_encode(['curso'=>$curso], JSON_UNESCAPED_UNICODE);
} else {
	http_response_code(500);
	echo json_encode(['erro'=> 'Erro ao alterar curso'], JSON_UNESCAPED_UNICODE);
}

mysqli_close($conexao);
?>
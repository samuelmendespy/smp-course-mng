<?php
include("conexao.php");

mysqli_set_charset($conexao, 'utf8');

if ($_SERVER['REQUEST_METHOD'] != 'DELETE'){
    echo json_encode(["status" => "error", "message" => "Método não permitido. Verifique a requisição."], JSON_UNESCAPED_UNICODE);
    exit;
}
else {}
$extrair = json_decode(file_get_contents("php://input"));

if (isset($extrair->id)) {
    $id = $extrair->id;
    if (!is_numeric($id)){
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "ID do curso inválido. O ID deve ser um número inteiro."], JSON_UNESCAPED_UNICODE);
        exit;
    }
    else {

        $sql = "DELETE FROM cursos WHERE id = $id";
        
        if (mysqli_query($conexao, $sql)) {
            http_response_code(200);
            echo json_encode(["status" => "success", "message" => "Curso excluído com sucesso!"], JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Erro ao excluir o curso: "], JSON_UNESCAPED_UNICODE);
        }
    }
    
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "ID do curso não fornecido."], JSON_UNESCAPED_UNICODE);
}

mysqli_close($conexao);
?>
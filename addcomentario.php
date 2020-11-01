<?php
session_start();
include_once'conexao.php';

try {
    $conn = new PDO("mysql:host=$servername;dbname=$mydb", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
	
	$stmt = $conn->prepare("INSERT INTO comentarios (usuario_id,publicacao_id,comentario,data_hora) 
    VALUES (:id,:publi,:texto, now())");
    $stmt->bindParam(':id',$_SESSION['id']);
    $stmt->bindParam(':publi',$_POST['idpost'] );
    $stmt->bindParam(':texto', $_POST['text']);
    
    $stmt->execute();
	
	$resultado['deucerto'] = true;
    }
catch(PDOException $e)
    {
		$resultado['deucerto'] = false;
    }
$conn = null;
sleep(3);
echo json_encode($resultado);
?>
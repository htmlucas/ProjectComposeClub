
<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "composeclub";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
	
	$stmt = $conn->prepare("INSERT INTO publicacao (usuario_id,data_hora,titulo,categoria,texto,participacao,produzido,escrito,soundcloud,youtube) 
    VALUES (:id,now(),:titulo,:categoria,:texto,:participacao,:produzido,:escrito,:sound,:youtube)");
    $stmt->bindParam(':id',$_SESSION['id']);
    $stmt->bindParam(':titulo',$_POST['titulo']);
    $stmt->bindParam(':categoria',$_POST['categoria']);
    $stmt->bindParam(':texto',$_POST['txtComent']);
    $stmt->bindParam(':participacao',$_POST['part']);
    $stmt->bindParam(':produzido',$_POST['produzido']);
    $stmt->bindParam(':escrito',$_POST['escrito']);
    $stmt->bindParam(':sound',$_POST['sound']);
    $stmt->bindParam(':youtube', $_POST['youtube']);
    $stmt->execute();
	
	$resultado['deucerto'] = $conn->lastInsertId();
    }
catch(PDOException $e)
    {
		$resultado['deucerto'] = false;
    }
$conn = null;
sleep(3);
echo json_encode($resultado);
?>
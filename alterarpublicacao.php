<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "composeclub";

$idi = $_POST['aidi'];

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sessaoid = $_SESSION['id'];
	
	$stmt = $conn->prepare("SELECT * from publicacao where  publicacao.id = $idi;");
   $stmt->execute();
    $publi = $stmt->fetch();
}catch(PDOException $e)
    {
		echo $e;
    }
    

$titulo = $_POST['titulo'];
$categoria = $_POST['categoria'];
$texto = $_POST['texto'];
$participacao = $_POST['participacao'];
$produzido = $_POST['produzido'];
$escrito = $_POST['escrito'];
$soundcloud = $_POST['urlsound'];
$youtube = $_POST['urlyt'];


if(empty($titulo)){
    $titulo = $publi['titulo'];
}
if(empty($categoria)){
    $categoria = $publi['categoria'];
}
if(empty($texto)){
    $texto = $publi['texto'];
}
if(empty($participacao)){
    $participacao = $publi['participacao'];
}
if(empty($produzido)){
    $produzido = $publi['produzido'];
}
if(empty($escrito)){
    $escrito = $publi['escrito'];
}
if(empty($soundcloud)){
    $soundcloud = $publi['soundcloud'];
}
if(empty($youtube)){
    $youtube = $publi['youtube'];
}





try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "UPDATE publicacao SET data_hora=now(),titulo=:titulo,categoria=:categoria,texto=:texto ,participacao=:participacao,produzido=:produzido,escrito=:escrito,soundcloud=:sound,youtube=:youtube WHERE id=$idi;";
   
    // Prepare statement
    $stmt = $conn->prepare($sql);
     $stmt->bindParam(':titulo', $titulo);
    $stmt->bindParam(':categoria', $categoria);
    $stmt->bindParam(':texto', $texto);
     $stmt->bindParam(':participacao', $participacao);
     $stmt->bindParam(':produzido', $produzido);
    $stmt->bindParam(':escrito', $escrito);
    $stmt->bindParam(':sound', $soundcloud);
    $stmt->bindParam(':youtube', $youtube);

    // execute the query
    
    $stmt->execute();
   

    // echo a message to say the UPDATE succeeded
    header('location:teste.php');
    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;
?>

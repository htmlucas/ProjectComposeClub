<?php
$servername = "db.bot.sh";
$username = "composeclub_dbu";
$password = "Qehh4tUHeTHWNP88Se";
$dbname = "composeclub_dados";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	$stmt = $conn->prepare("SELECT nomedeusuario from usuario WHERE nomedeusuario = :nick ");
    $stmt->bindParam(':nick', $_POST['texto']);
    $stmt->execute();
   $quantidade = $stmt->rowCount();
    if($quantidade >= 1){
         $resultado['deucerto'] = true;
    }else{
        $resultado['deucerto'] = false;	
    }
       
}
    
catch(PDOException $e)
    { 
     echo $e;   
    
    }   
echo json_encode($resultado);
?>
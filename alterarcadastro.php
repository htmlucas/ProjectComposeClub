<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "composeclub";

$idi = $_SESSION['id'];

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sessaoid = $_SESSION['id'];
	
	$stmt = $conn->prepare("SELECT * from usuario where  usuario.id = $idi;");
   $stmt->execute();
    $publi = $stmt->fetch();
}catch(PDOException $e)
    {
		echo $e;
    }
    

$nome = $_POST['nome'];
$nomedeusuario = $_POST['nomedeusuario'];
$telefone = $_POST['telefone'];
$email = $_POST['email'];
$newsenha = $_POST['newsenha'];

if($newsenha == $publi['senha']){
}else{
    echo 'Senha incorreta';
}

$target_dir = "img_usuario/";
$target_file = $target_dir . basename($_FILES["fotoperfil"]["name"]);
$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}
// Check if file already exists
// Check file size
if ($_FILES["fotoperfil"]["size"] > 2000000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fotoperfil"]["tmp_name"], $target_file)) {
        $fotoperfil = 'img_usuario/'.basename( $_FILES["fotoperfil"]["name"]);
        $_SESSION['fotoperfil'] = $fotoperfil;
        echo "The file ". basename( $_FILES["fotoperfil"]["name"]). " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}




$target_dir = "img_usuario/";
$target_file = $target_dir . basename($_FILES["fotocapa"]["name"]);
$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fotocapa"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}
// Check if file already exists
// Check file size
if ($_FILES["fotocapa"]["size"] > 2000000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fotocapa"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["fotocapa"]["name"]). " has been uploaded.";
        $fotocapa ='img_usuario/'.basename( $_FILES["fotocapa"]["name"]);
        $_SESSION['fotocapa'] = $fotocapa;
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}





if(empty($fotocapa)){
    $fotocapa = $publi['fotocapa'];
    $_SESSION['fotocapa'] = $fotocapa;
}
if(empty($fotoperfil)){
    $fotoperfil = $publi['fotoperfil'];
    $_SESSION['fotoperfil'] = $fotoperfil;
}
if(empty($nome)){
    $nome = $publi['nome_completo'];
}
if(empty($nomedeusuario)){
    $nomedeusuario = $publi['nomedeusuario'];
}
if(empty($telefone)){
    $telefone = $publi['telefone'];
}
if(empty($email)){
    $email = $publi['email'];
}






try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "UPDATE usuario SET nome_completo=:nome,nomedeusuario=:nick,telefone=:telefone,email=:email,fotoperfil=:fotoperfil,fotocapa=:fotocapa WHERE id=$idi ;";
   
    // Prepare statement
    $stmt = $conn->prepare($sql);
     $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':nick', $nomedeusuario);
    $stmt->bindParam(':telefone', $telefone);
     $stmt->bindParam(':email', $email);
    $stmt->bindParam(':fotoperfil', $fotoperfil);
    $stmt->bindParam(':fotocapa', $fotocapa);

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

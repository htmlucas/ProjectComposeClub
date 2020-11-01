<?php

    require_once 'conexao.php';

    $senha = $_POST['senha'];
    $hash1 = md5($senha);
    $hash2 = md5($_POST['senha2']);
    $telefone = trim($_POST['telefone']);
    $fotoperfil = 'img/no-user.png';
    $fotocapa = 'img/musica.jpg';
try {
    $conn = new PDO("mysql:host=$servername;dbname=$mydb", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
     $stmt = $conn->prepare("INSERT INTO usuario (nome_completo,nomedeusuario,telefone,email,senha,fotoperfil,fotocapa) VALUES (:nome,:nick,:telefone,:email,:senha,:fotoperfil,:fotocapa)");
    $stmt->bindParam(':nome',$_POST['nome']);
    $stmt->bindParam(':nick',$_POST['nick']);
    $stmt->bindParam(':telefone',$telefone);
    $stmt->bindParam(':email',$_POST['email']);                
    $stmt->bindParam(':senha', $hash1);
    $stmt->bindParam(':fotoperfil',$fotoperfil);
    $stmt->bindParam(':fotocapa',$fotocapa);
                     
     if($hash1 == $hash2){
        $stmt->execute();
         header("Location:index.php");
    }else{
        echo 'As senhas deverão ser identicas';
        echo '<br />';
        echo '<a href="javascript:window.history.go(-1)">Voltar</a>';
     }
        
    
    
    }
catch(PDOException $e)
    {
        echo "OPS..ERRO NO SERVIDOR ".$e->getMessage();
    }

?>
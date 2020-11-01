<?php
session_start();
require 'conexao.php';
 try {
    $conn = new PDO("mysql:host=$servername;dbname=$mydb", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
     
    }
catch(PDOException $e)
    {
    echo "Opss... Erro no servidor: " . $e->getMessage();
    }

// prepare sql and bind parameters
    $stmt = $conn->prepare("DELETE FROM publicacao WHERE id=:id");
    $stmt->bindParam(':id', $_GET['id']);
    
    $stmt->execute();
    header('location:teste.php');
?>

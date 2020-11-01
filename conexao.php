<?php
$servername = "localhost";
$username = "root";
$password = "";
$mydb = "composeclub";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$mydb", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
catch(PDOException $e)
    {
    echo "Conexão Falhou" . $e->getMessage();
    }
?>
<?php

session_start();  

include_once 'conexao.php';
// Set session variables


if(isset($_POST['nome'])){
    
  $usuario =$_POST ['nome']; 
    $senha= md5 ($_POST ['senha']);

     $conn = new PDO("mysql:host=$servername;dbname=$mydb", $username, $password);
    
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $selectusuario = $conn->query("SELECT id,nome_completo ,nomedeusuario,telefone,email,senha,fotoperfil,fotocapa FROM usuario WHERE nomedeusuario='$usuario' and senha='$senha' ");
    
    if (!$result = $selectusuario->fetchAll()){
            echo "Usuario ou senha inválidos";
            echo '<br/>';
            echo '<a href="index.php?">Tentar Novamente</a>';
            echo '<br/>';
            echo '<a href="formulario.php?">Criar um Cadastro</a>';
            exit;
        }
        $login = $result[0];
		if($_POST['nome'] == $login[nomedeusuario] && md5($_POST['senha']) == $login[senha]){
            $fotoperfil = 'img/no-user.png';
            $fotocapa = 'img/musica.jpg';
            $_SESSION['id'] = $login[id];
			$_SESSION['nome'] = $login[nome_completo];
            $_SESSION['nick'] = $login[nomedeusuario];
            $_SESSION['telefone'] = $login[telefone];
            $_SESSION['email'] = $login[email];
            $_SESSION['senha'] = $login[senha];
            $_SESSION['fotoperfil'] =$login[fotoperfil];
            $_SESSION['fotocapa'] = $login[fotocapa];
			header('Location:teste.php');
		} else{
            

		}
	} 
?>


<?php
session_start();

$servername = "db.bot.sh";
$username = "composeclub_dbu";
$password = "Qehh4tUHeTHWNP88Se";
$dbname = "composeclub_dados";





// verifica se foi enviado um arquivo 
if(isset($_FILES['Arquivo']['name']) && $_FILES["Arquivo"]["error"] == 0)
{

	echo "Você enviou o arquivo: <strong>" . $_FILES['Arquivo']['name'] . "</strong><br />";
	echo "Este arquivo é do tipo: <strong>" . $_FILES['Arquivo']['type'] . "</strong><br />";
	echo "Temporáriamente foi salvo em: <strong>" . $_FILES['arquivo']['tmp_name'] . "</strong><br />";
	echo "Seu tamanho é: <strong>" . $_FILES['Arquivo']['size'] . "</strong> Bytes<br /><br />";

	$arquivo_tmp = $_FILES['arquivo']['tmp_name'];
	$nome = $_FILES['Arquivo']['name'];
	

	// Pega a extensao
	$extensao = strrchr($nome, '.');

	// Converte a extensao para mimusculo
	$extensao = strtolower($extensao);

	// Somente imagens, .jpg;.jpeg;.gif;.png
	// Aqui eu enfilero as extesões permitidas e separo por ';'
	// Isso server apenas para eu poder pesquisar dentro desta String
	if(strstr('.jpg;.jpeg;.gif;.png', $extensao))
	{
		// Cria um nome único para esta imagem
		// Evita que duplique as imagens no servidor.
		$novoNome = md5(microtime()) . '.' . $extensao;
		
		// Concatena a pasta com o nome
		$destino = 'img_publi/' . $novoNome;  
		
		// tenta mover o arquivo para o destino
		if( @move_uploaded_file( $arquivo_tmp, $destino  ))
		{
			echo "Arquivo salvo com sucesso em : <strong>" . $destino . "</strong><br />";
			echo "<img src=\"" . $destino . "\" />";
            
          try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // prepare sql and bind parameters
            $stmt = $conn->prepare("INSERT INTO publicacao (usuario_id,foto,descricao,data_hora,titulo,texto) 
            VALUES (:id,:foto, :descricao,now(), :titulo, :texto)");
            $stmt->bindParam(':id', $_SESSION['id']);
			$stmt->bindParam(':foto', $_POST['slim[]']);
            $stmt->bindParam(':descricao', $_POST['descricao']);
            $stmt->bindParam(':titulo', $_POST['titulo']);
            $stmt->bindParam(':texto', $_POST['texto']); 
            $stmt->execute();

            echo "Cadastro Realizado com sucesso!";
            }
        catch(PDOException $e)
            {
            echo "Ops... Erro no servidor: ".$e->getMessage();
            }


            
		}
		else
			echo "Erro ao salvar o arquivo. Aparentemente você não tem permissão de escrita.<br />";
	}
	else
		echo "Você poderá enviar apenas arquivos \".jpg;.jpeg;*.gif;*.png\"<br />";
}
else
{
	echo "Você não enviou nenhum arquivo!";
}

?>
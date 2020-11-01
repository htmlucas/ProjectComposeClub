<script>
    function alerta(){
        notifier.show('Alerta', $caracter, 'success', 'img/alerta-logotip.png', 200);
    };
    
    function alerta(titulo, conteudo, tempo=200) {
        notifier.show(titulo, conteudo, 'success', 'img/alerta-logotip.png', tempo);
    }
</script>


pais{
    sistema:capitalista!important;
}
<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "composeclub";

require_once('slim/slim.php');

$erros = [];

$titulo = $_POST['titulo'];
$desc = $_POST['descricao'];
$texto = $_POST['texto'];

if (strlen($desc) < 5){
    $erros['descricao'] = "Campo descrição deve conter no mínimo 5 caracteres";
}
if (strlen($titulo) < 5){
    $erros['$titulo'] = "Campo título deve conter no mínimo 5 caracteres";
}
if (strlen($texto) < 5){
    $erros['$texto'] = "Campo texto deve conter no mínimo 5 caracteres";
}

// do outro lado
$html_erros = "<ul>";
foreach ($erros as $erro) {
    $html_erros .= "<li>$erro</li>";
}
$html_erros .= "</ul>";

$erro = 0;
if(isset($_FILES['foto'])) {
    $foto = time() . rand(0000, 9999) . "_" . $_FILES['foto']['name'];
    $sourcePath = $_FILES['foto']['tmp_name'];
    $check = getimagesize($_FILES["foto"]["tmp_name"]);
    if($check !== false) {
        if ($_FILES["foto"]["size"] > 500000) {
            $erro = "Arquivo de imagem é muito grande";
        }else{
            
        }
    } else {
        $erro = "Arquivo não é imagem.";
    }
}else {
     $erros['foto'] = "Você deve enviar pelo menos uma foto";
    $foto = 'upload/nouser.png';
}
if($erro == 0) {    
    move_uploaded_file($sourcePath,'upload/'.$foto);
    $resultado['cadastrado'] = true;


try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
	$stmt = $conn->prepare("INSERT INTO publicacao (usuario_id,foto,descricao,data_hora,titulo,texto) 
    VALUES (:id,:foto,:desc,now(),:titulo,:texto)");
    $stmt->bindParam(':id',$_SESSION['id']);
    $stmt->bindParam(':foto',$foto);
    $stmt->bindParam(':desc', $_POST['descricao']);
    $stmt->bindParam(':titulo', $_POST['titulo']);
    $stmt->bindParam(':texto', $_POST['texto']);
    $stmt->execute();
    echo json_encode($resultado);
    }
catch(PDOException $e)
    {
		$resultado['cadastrado'] = false;
        echo json_encode($resultado);
    }
    }else{
    $resultado['cadastrado'] = $erro;
        echo json_encode($resultado);
}
?>
<?php
session_start(); 
include_once 'conexao.php';
$idi = $_GET['id'];
$idiu = $_SESSION['id'];

try {
    $conn = new PDO("mysql:host=$servername;dbname=$mydb", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	$stmt = $conn->prepare("SELECT publicacao.id as idpost,publicacao.titulo,publicacao.texto,publicacao.participacao,publicacao.produzido,publicacao.escrito,publicacao.soundcloud,publicacao.youtube,publicacao.categoria,publicacao.data_hora,usuario.id,usuario.nomedeusuario,usuario.nome_completo,usuario.fotoperfil,usuario.fotocapa,usuario.telefone,usuario.email,usuario.senha from publicacao,usuario where publicacao.usuario_id = usuario.id and publicacao.id = $idi ;");
   $stmt->execute();
    $publi = $stmt->fetch();
   

}catch(PDOException $e)
    {
		echo $e;
    }

	
	$stmt = $conn->prepare("SELECT * from comentarios,usuario where usuario.id = comentarios.usuario_id and publicacao_id = $idi order by data_hora DESC;");
   $stmt->execute();
    $publii = $stmt->fetchAll();
   


$conn = null;


?>          
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <title>Compose Club</title>
<link rel="shortcut icon" href="img/log1.png" type="image/x-icon" />
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" type="text/css" href="css/publicacao1.css"?/>
  <link rel="stylesheet" href="notifier-master/dist/css/notifier.min.css">
    <link href="http://fonts.googleapis.com/css?family=Arimo:400" rel="stylesheet">
    
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="notifier-master/dist/js/notifier.min.js"></script>
</head>

 <style>

     .texto{
         background-color:white;
         padding:10px 16px;
         margin-bottom:10px;
     }
     .informacao{
         background-color:dimgray;
     }
     .edit{
         padding:5px 15px;
         border: 2px solid black;
         color: black;
         margin-bottom:20px;
         margin-right:5px;
         background-color: white;
     }
     .composicao{
         margin-bottom: 20px;
     }
     .comentario{
         background-color:#c7c7c7;
         padding:10px 15px;
         margin:20px 0px;
     }
     #wrapper{
        width: 100%;
        margin-top: 50px;
    }
     .coment{
     }
     .coment textarea{
         margin:10px 00px 10px 5px;
         width: 65%;
     }
     .coment input{
         padding:0px 15px;
         margin-top:10px;
         margin-right: 10px;
     }
     .mostrarcoment{
         margin-top:15px;
         margin-bottom: 15px;
         padding:10px 15px;
          border-top:1px solid black;
         border-bottom:1px solid black;
     }
     .mostrarcoment .comentario{
     }
     .texto-right{
         background-color:white;
         padding:10px 16px;
         margin-bottom:10px;
     }
     .texto-right h1{
         font-size:25px;
         text-align: center;
     }
     .texto-right .categoria{
         margin:20px 0px;
         background-color: #efefef;
         padding:10px 0px;
         
     }
     .texto-right .categoria p{
         padding:0px 10px;
     }
    </style>
<body>
<div id="wrapper">
<?php include_once'template/nav.php';?>

<div class="row">
    <div class="col-md-12">
<div class="fb-profile-block">
    <div class="fb-profile-block-thumb">
        <img id="mina" src="<?php echo $publi['fotocapa'];?>" alt="" title="">
    </div>
    <div class="profile-img">
        <a href="amigo.php?id=<?php echo $publi['id'];?>"><img src="<?php echo $publi['fotoperfil'];?>" alt="" title=""></a>
            <div class="profile-name"><h2><?php echo $publi['titulo'];?></h2></div>
            <div class="profile-name"><h4><?php echo $publi['nomedeusuario'];?></h4></div>
            <div class="profile-name"><h5><?php if(strlen($publi['participacao']) != 0 ){echo ' PARTICIPAÇÃO';}?></h5></div>
            <div class="profile-name"><h6><?php if(strlen($publi['participacao']) != 0 ){echo $publi['participacao'];}?></h6></div>
        
    </div>
</div>
        </div>
</div>
    <?php  $aidipost = $publi['idpost']; ?>
     
      <div class="container">
          <div class="row">
              <div class="col-md-6 col-sm-6">
                    <div class="texto">
                      <?php 
                        if($_SESSION['id'] == $publi['id']){
                            echo " <a href='alterarcomposicao.php?id=$aidipost'><button  class='edit'>Editar Composição</button></a><a href='apagarcomposicao.php?id=$aidipost'><button class='edit'>Excluir Composição</button></a>    ";

                        }
                        ?>
                          
                           
                           <div class="composicao">
                            <p><?php echo $publi['texto'];?></p>
                            </div>
                            <div class="comentario">
                                <div class="coment">
                                    <img class="pull-left" src="<?php echo $_SESSION['fotoperfil'];?>" style="height:24px;width:24px;border-radius:100px ;margin:10px 5px 10px 10px;" alt="">
                                    <textarea  name="" id="textarea" cols="30" placeholder="Adicionar um comentário" rows="1"></textarea>
                                    <input class="pull-right" onclick="addcomentario(<?php echo $publi['idpost'];?>)" type="submit" value="Enviar">
                                </div>
                                <div class="mostrarcomente">
                                    <?php foreach ($publii as $row){?>
                                        <div class="mostrarcoment"><img class="pull-left"src="<?php echo $row['fotoperfil'];?>" style="height:24px;width:24px;border-radius:100px ;margin:0px 15px 20px 10px;" alt=""><p><?php echo $row['nomedeusuario'];?></p><p class="text-right"><?php echo $row['data_hora'];?></p><div class="comentario"><p><?php echo $row['comentario'];?></p></div></div>
                                    <?php }?> 
                                </div>
                                
                                </div>
                            </div>
                    </div>
              
              
              
              <div class="col-md-6 col-sm-6">
                <div class="texto-right">
                   <h1><?php if(empty($publi['titulo'])){echo 'Adicione um titulo a sua composição.';}else{ echo 'Informações de "'. $publi['titulo'];}?>"</h1>
                   
                   <div class="categoria form-group row">
                      <label for="inputEmail3" class="col-sm-2 col-form-label">Categoria:</label>
                      <div class="col-sm-10">
                       <p></span> <span class="label label-warning"><?php if(empty($publi['categoria'])){echo ' Clique em Editar Composição para adicionar uma categoria.';}else{echo strtoupper($publi['categoria']);} ?></span></p>
                       </div>
                   </div>
                   <div class="categoria form-group row">
                      <label for="inputEmail3" class="col-sm-2 col-form-label">Participacao: </label>
                      <div class="col-sm-10">
                       <p><?php if(empty($publi['participacao'])){echo ' Clique em Editar Composição para adicionar uma participação. ';}else{echo strtoupper($publi['participacao']);}?></p>
                       </div>
                   </div>
                   <div class="categoria form-group row">
                      <label for="inputEmail3" class="col-sm-2 col-form-label">Escrito: </label>
                      <div class="col-sm-10">
                       <p><?php if(empty($publi['escrito'])){echo ' Clique em Editar Composição para adicionar quem escreveu. ';}else{echo strtoupper($publi['escrito']);}?></p>
                       </div>
                   </div>
                   <div class="categoria form-group row">
                      <label for="inputEmail3" class="col-sm-2 col-form-label">SoundCloud: </label>
                      <div class="col-sm-10">
                       <a href="<?php echo $publi['soundcloud'];?>"><p><?php if(empty($publi['soundcloud'])){echo ' Clique em Editar Composição para adicionar uma url da sua composição do soundcloud . ';}else{echo ($publi['soundcloud']);}?></p></a>
                       </div>
                   </div>
                   <div class="categoria form-group row">
                      <label for="inputEmail3" class="col-sm-2 col-form-label">Youtube: </label>
                      <div class="col-sm-10">
                       <a href="<?php echo $publi['youtube'];?>"><p><?php if(empty($publi['youtube'])){echo ' Clique em Editar Composição para adicionar uma url da sua composição do youtube . ';}else{echo ($publi['youtube']);}?></p></a>
                       </div>
                   </div>
                   
                </div>
              </div>
    </div>
</div>
          </div>
<script>    
    
             
				    function addcomentario(idpost){
				    var txtComent = $("#textarea").val();
					$.ajax({
					  beforeSend: function() { //Antes de enviar o AJAX
						$(".coment").prepend('<img id="loading" style="width: 40px;" class="pull-left" src="img/loading.gif">');
					  },
					  url: 'addcomentario.php',  //URL solicitada
					  type : 'POST', //Tipo de envio (POST ou GET)
					  data: {"text": txtComent,"idpost": idpost}, // Valores que vou enviar para o PHP
					  dataType: 'json', // Tipo de retorno do PHP
					  success: function(result) { //Resultado retornado do PHP 'result'
						if(result.deucerto){
                            var currentDate = new Date()
                            var day = currentDate.getDate()
                            var month = currentDate.getMonth() + 1
                            var year = currentDate.getFullYear()
                            var data = day + '/' + month + '/'+year;
							$("#loading").remove();
							$(".mostrarcomente").prepend('<div class="mostrarcoment"><img class="pull-left"src="<?php echo $_SESSION['fotoperfil'];?>" style="height:24px;width:24px;border-radius:100px ;margin:0px 15px 20px 10px;" alt=""><p><?php echo $_SESSION['nick'];?></p><p class="text-right">'+data+'</p><div class="comentario"><p>'+$("#textarea").val()+'</p></div></div>');        
						} else {
							alert("Erro ao adicionar comentário!");
                            $("#loading").remove();
						}
					  }
					});
				};
                 
		</script>
              
     

   <script src="notifier-master/dist/js/notifier.min.js"></script>
</div>    
</body>
</html>
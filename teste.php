<?php
session_start(); 
include_once 'conexao.php';
if(!isset($_SESSION['nome'])){
    header("Location:index.php");
       
 }      
try {
    $conn = new PDO("mysql:host=$servername;dbname=$mydb", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     
    $sessaoid = $_SESSION['id'];
    
	$stmt = $conn->prepare("SELECT publicacao.id as idpost,publicacao.titulo,publicacao.texto,publicacao.participacao,publicacao.produzido,publicacao.escrito,publicacao.soundcloud,publicacao.youtube,publicacao.categoria,publicacao.data_hora,usuario.id,usuario.nomedeusuario,usuario.nome_completo,usuario.fotoperfil,usuario.fotocapa,usuario.email,usuario.telefone,usuario.senha from publicacao,usuario where usuario.id = $sessaoid  group by publicacao.data_hora;");
   $stmt->execute();
    $publii = $stmt->fetch();
    
   

}catch(PDOException $e)
    {
		echo $e;
        
    }
$conn = null;

try {
    $conn = new PDO("mysql:host=$servername;dbname=$mydb", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     
    $sessaoid = $_SESSION['id'];
    
	$stmt = $conn->prepare("SELECT publicacao.id as idpost,publicacao.titulo,publicacao.texto,publicacao.participacao,publicacao.produzido,publicacao.escrito,publicacao.soundcloud,publicacao.youtube,publicacao.categoria,publicacao.data_hora,usuario.id,usuario.nomedeusuario,usuario.nome_completo,usuario.fotoperfil,usuario.fotocapa,usuario.email,usuario.telefone from publicacao,usuario where publicacao.usuario_id = usuario.id and $sessaoid = publicacao.usuario_id group by publicacao.data_hora;");
   $stmt->execute();
    $publi = $stmt->fetchAll();
    
   

}catch(PDOException $e)
    {
		echo $e;
        
    }

?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
<link rel="shortcut icon" href="img/log1.png" type="image/x-icon" />
  <title>Compose Club</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
    
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" type="text/css" href="css/teste.css"?/>
  <link rel="stylesheet" href="notifier-master/dist/css/notifier.min.css">
   <link href="http://fonts.googleapis.com/css?family=Arimo:400" rel="stylesheet">
    
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="notifier-master/dist/js/notifier.min.js"></script>
   <script src="cleave.js-master/dist/cleave.min.js"></script>
        <script src="cleave.js-master/dist/addons/cleave-phone.br.js"></script>
</head>

<style>
    
    .thumbnail{
        color:#9a9a9a;
        background: none;
        border: 0;
    }
    a{
     text-decoration: none;
        color:#9a9a9a;
    }
    
.navbar-inverse{
    height: 70px;
    position: fixed;
    z-index: 10;
    width: 100%;
    background-color: rgb(52, 58, 64);
    border: 0;
    border-radius: 0;
    margin-top: -50px;
    
}
        .navbar-inverse img{
    width: 70px;
    height: 70px;
    float: left;
    
}
/*fim navbar*/
.button1:hover {
    background-color: #ffffff;
    color: #ff3b00;
}
.button1 { 
    position:relative;
    overflow:hidden;
    width:17rem;
    color:#fff;
    border:2px solid #ff3b00;
    background-color:#ff3b00;
    cursor:pointer;
    line-height:2;
    margin:0;
    padding:0;
    border-radius:1.5rem;
    font-size:1.5rem;
   
    outline:none;
    transition:transform .125s;

    &:active {
        transform:scale(.9,.9);
    }
    }
.input{
    width: 360px;
    height: 40px;
    margin-top: 12px;
    box-sizing: border-box;
    font-size: 15px;
    background-color: rgb(219, 219, 219);
    background-image: url('searchicon.png'); 
    padding: 12px 12px 0px 40px;
    margin-left: 700px;
    border: 0;
    color: #000000;
}

    #wrapper{
        width: 100%;
        margin-top: 50px;
    }

    a:link{
        text-decoration: none;
    }
    br{
        margin-top: 5px;
    }
    .cor{
        color: #ff3b00;
        float: right;
    }
    .navbar-header{
        margin-top: 10px;
    }
    .sobre_dados{
        margin:20px 0px 20px 00px;
    }
    .editar{
        padding:10px 16px;
        font-size:18px;
        border:2px solid black;
        background-color: #ff3b00;
        text-transform: uppercase;
        color:white;
        margin-left: 100px;
        border-color: #ff3b00;
    }
    .editar:hover{
        background-color:transparent;
         color:#ff3b00;
        border-color: #ff3b00;
    }
    .editar i{
        margin-right:5px;
        color: white;
    }
    .sobre{
        width:400px;
        background-color:white;
        border-radius: 6px;
        padding:10px 10px;
        margin:10px 0px;
        margin-left: -30px;
        text-align:center;
        text-transform: uppercase;
        font-family: Apple Chancery, cursive;
        font-size: 15px; 
    }
    .sobre h5{
        background-color: rgb(52, 58, 64);
        padding:10px 5px;
        color:white;
    }
    .headercomposicao{
        padding:25px 16px;
        margin:10px 0px 0px 0px;
        border-bottom: 1px solid #ff3b00;
        color:#9a9a9a;
    }
    .headercomposicao i{
        color:#dd1111;
    }
    .composicao{
        background-color: white;
        padding:25px 15px;
        margin:20px 20px 20px 0px;
        
    }
    .composicao h4{
        color:#333;
        text-transform: uppercase;
        text-decoration: none;
    }
    .h4cor{
        color: rgb(52, 58, 64);
    }
</style>
<script type="text/javascript">
       $(document).ready(function() {
               notifier.show('Bem Vindo!', 'Aproveite para terminar seu cadastro, Dentro do sobre em seu perfil !', 'success', 'img/notifier.png', 2000);
                });
       
 
 </script>
<body>
<div id="wrapper">
<?php include_once'template/navperfil.php';?>

<div class="row">
    <div class="col-md-12">
        <div class="fb-profile-block">
            <div class="fb-profile-block-thumb">
                <img id="mina" src="<?php echo $publii['fotocapa'];?>" alt="" title="">
            </div>
            <div class="profile-img">
                <a href="#"><img src="<?php echo $publii['fotoperfil'];?>" alt="" title=""></a>
            </div>
        </div>
    </div>
</div>


 <div class="container">
    <div class="row">
     <div class="col-md-5 col-md-offset-1">
      <div class="sobre_usuario">
        <p class="seila">@<?php echo $publii['nomedeusuario'];?></p>          
        <div class="sobre_dados">
            <button type="button" data-toggle="modal" data-target="#exampleModal" data-whatevernome="<?php echo $publii['nome_completo']; ?>" data-whatevernomedeusuario="<?php echo $publii['nomedeusuario']; ?>"data-whatevertelefone="<?php echo $publii['telefone']; ?>" data-whateveremail="<?php echo $publii['email']; ?>" data-whateversenha="<?php echo $publii['senha']; ?>" class="editar"><i class="material-icons">&#xE254;</i>Editar</button>
        </div>
        <div class="col-md-6 sobre">
                Nome Completo : 
                   <div>
                       <h5><?php echo $publii['nome_completo'];?></h5>
                   </div>
               Email :
               <div>
                   <h5><?php echo $publii['email'];?></h5>
               </div> 
               
               Telefone : 
               <div>
                    <h5><?php echo $publii['telefone'];?></h5>
               </div>
              
        </div>
      </div>
     </div>
     
    <!-- MODAL -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
		  <div class="modal-dialog" role="document">
			<div class="modal-content">
			  <div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="exampleModalLabel">Alterar Dados</h4>
			  </div>
			  <div class="modal-body">
				<form method="POST" action="alterarcadastro.php" enctype="multipart/form-data">
                  <div class="form-group">
					<label for="fotoperfil" class="control-label">Foto de Perfil:</label>
					<input name="fotoperfil"  id="fileToUpload" type="file" class="form-control" id="fotoperfil">
                    </div>
                    <div class="form-group">
					<label for="fotocapa" class="control-label">Foto de Capa:</label>
					<input name="fotocapa"  id="fileToUpload" type="file" class="form-control" id="fotocapa">
                    </div>
				  
				  <div class="form-group">
					<label for="recipient-name" class="control-label">Nome:</label>
					<input name="nome" type="text" class="form-control" id="recipient-name">
				  </div>
				  <div class="form-group">
					<label for="message-text" class="control-label">Nome de usuario:</label>
					<input name="nomedeusuario" type="text" class="form-control" id="nomedeusuario">
				  </div>
				  <div class="form-group">
					<label for="telefone" class="control-label">Telefone:</label>
					<input name="telefone" type="text" class="form-control" id="telefone" autocomplete="off">
				  </div>
				  <div class="form-group">
					<label for="email" class="control-label">Email:</label>
					<input name="email" type="email" class="form-control" id="email">
                    </div>
				  <div class="form-group">
					<label for="newsenha" class="control-label">Digite a senha para continuar:</label>
					<input name="newsenha" type="password" class="form-control" id="newsenha">
				  </div>
				<button type="button" class="btn btn-success" data-dismiss="modal">Cancelar</button>
				<button type="submit" class="btn btn-danger">Alterar</button>
			 
				</form>
			  </div>
			  
			</div>
		  </div>
		</div>
    
    
    
    
    
		<div class="col-md-6 ">
            <div class="headercomposicao text-left">
                <h4 class="h4cor">COMPOSIÇÕES DE <?php echo strtoupper($_SESSION['nome']);?><i class="material-icons pull-right" style="color:#ff3b00;">&#xE03D;</i></h4>
                <a href="publicacaonova.php"><button type="submit" class="button1">Nova Composição +</button></a>
            </div>
            <?php foreach ($publi as $row) {?>          
            <a href="publicacao1.php?id=<?php echo $row['idpost'];?>">
             <div class="composicao">
                 <i class="material-icons thumbnail pull-left" style="color:#ff3b00;">&#xE616;</i>
               <h4><?php echo($row['nomedeusuario']);?> Compôs:</h4>
                 <h4><?php echo $row['titulo'];?> por <?php echo $row['nomedeusuario'];?> 
                       <?php if(strlen($row['participacao']) != 0){
                        echo '(Participação de : '.$row['participacao'].')';
                    }?></h4>
                </div>
            </a>
                    <?php } ?>
                </div>
            </div>
    </div>
</div>
  
  
   <script src="notifier-master/dist/js/notifier.min.js"></script>
   <script type="text/javascript">
		$('#exampleModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget) // Button that triggered the modal // Extract info from data-* attributes
		  var recipientnome = button.data('whatevernome')
		  var recipientnomedusuario = button.data('whatevernomedeusuario')
          var recipienttelefone = button.data('whatevertelefone')
          var recipientemail = button.data('whateveremail')
          var recipientsenha = button.data('whateversenha')
          
		  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
		  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
		  var modal = $(this)
		  modal.find('#recipient-name').val(recipientnome)
		  modal.find('#nomedeusuario').val(recipientnomedusuario)
          modal.find('#telefone').val(recipienttelefone)
          modal.find('#email').val(recipientemail)
          modal.find('#newsenha').val(recipientsenha)
		  
		  
		  
		});
        $('.pass').bsStrongPass();
        
                var cleave = new Cleave('#telefone', {
                phone: true,
                phoneRegionCode: 'br'
            });
	</script>   
</body>
</html>































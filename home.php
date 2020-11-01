<?php
session_start();
   if(!isset($_SESSION['nome'])){
    header("Location:index.php");
 }
 
include_once 'conexao.php';
try {
    $conn = new PDO("mysql:host=$servername;dbname=$mydb", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sessaoid = $_SESSION['id'];
	
	$stmt = $conn->prepare("SELECT
publicacao.id as idpost,publicacao.titulo,publicacao.texto,publicacao.participacao,publicacao.produzido,publicacao.escrito,publicacao.soundcloud,publicacao.youtube,publicacao.categoria,publicacao.data_hora,usuario.id,usuario.nomedeusuario,usuario.nome_completo,usuario.fotoperfil from publicacao,usuario where publicacao.usuario_id = usuario.id order by publicacao.data_hora DESC;");
   $stmt->execute();
    $publi = $stmt->fetchAll();


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
	
	$stmt = $conn->prepare("SELECT * from usuario where id = $sessaoid ;");
   $stmt->execute();
    $publii = $stmt->fetch();


}catch(PDOException $e)
    {
		echo $e;
    }

?>
<html lang="pt-br">
<title>Compose Club</title>
<link rel="shortcut icon" href="img/log1.png" type="image/x-icon" />
  <title>Compose Club</title>
<meta charset="UTF-8">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
    /*navbar*/
/* Set black background color, white text and some padding */


    #wrapper{
        width: 100%;
        margin-top: 50px;
        background: -webkit-linear-gradient(rgba(255, 59, 0, 0.37), rgba(78, 0, 255, 0.42)); /* For Safari 5.1 to 6.0 */
    }
    
    body{
        
    }
/*mini perfil*/
.twPc-div {
    background: #fff none repeat scroll 0 0;
    border: 1px solid #e1e8ed;
    height: 200px;
    width: 390px;
    margin-top:3px;
}
.twPc-bg {
    background-image: url(<?php echo $publii['fotocapa'];?>);
    background-position: 0 50%;
    background-size: 100% auto;
    border-bottom: 1px solid #e1e8ed;
    border-radius: 4px 4px 0 0;
    height: 95px;
    width: 100%;
}
.twPc-block {
    display: block !important;
}
.twPc-button {
    margin: -35px -10px 0;
    text-align: right;
    width: 100%;
}
.twPc-avatarLink {
    background-color: #fff;
    border-radius: 90px;
    display: inline-block !important;
    float: left;
    margin: -30px 5px 0 8px;
    max-width: 100%;
    padding: 1px;
    vertical-align: bottom;
}
.twPc-avatarImg {
    border: 2px solid #fff;
    border-radius: 90px;
    box-sizing: border-box;
    color: #fff;
    height: 72px;
    width: 72px;
}
.twPc-divUser {
    margin: 5px 0 0;
}
.twPc-divName {
    font-size: 18px;
    font-weight: 700;
    line-height: 21px;
}
.twPc-divName a {
    color: inherit !important;
}
    .twPc-divName p{
        font-size:15px;
    }
.twPc-divStats {
    margin-left: 11px;
    padding: 10px 0;
}
.twPc-Arrange {
    box-sizing: border-box;
    display: table;
    margin: 0;
    min-width: 100%;
    padding: 0;
    table-layout: auto;
}
ul.twPc-Arrange {
    list-style: outside none none;
    margin: 0;
    padding: 0;
}
.twPc-ArrangeSizeFit {
    display: table-cell;
    padding: 0;
    vertical-align: top;
}
.twPc-ArrangeSizeFit a:hover {
    text-decoration: none;
}
.twPc-StatValue {
    display: block;
    font-size: 18px;
    font-weight: 500;
    transition: color 0.15s ease-in-out 0s;
}
.twPc-StatLabel {
    color: #8899a6;
    font-size: 10px;
    letter-spacing: 0.02em;
    overflow: hidden;
    text-transform: uppercase;
    transition: color 0.15s ease-in-out 0s;
}

        .cor{
        color: #ff3b00;
        float: right;
        margin-left: 150px;
    }
    h4{
        color: black;
        font-family: Jazz LET, fantasy;
    }
    h2{
        float: right;
        margin-right: 350px;
    }
    a:link{
        text-decoration: none;
    }
    h4:hover{
        color: #ff3b00;
    }
     .navbar-header{
        margin-top: -40px;
    }
    .composicao{
        background-color: white;
        padding:15px 15px;
        margin:0px 10px 0px 0px;
        border-bottom: 1px solid #dedede;        
    }
    .composicao h4{
        color:#333;
        text-transform: uppercase;
        text-decoration: none;
        text-align: center;
    }
    .composicao h4:hover{
        color: #ff3b00;
    }
    .composicao img:hover{
        background-color: white;
        opacity: 0.5;
    }
    .feed{
        margin-top:25px;
    }

/*mini perfil fim*/
</style>
<body class="w3-light-grey w3-content" style="max-width:1600px">

<?php include_once'template/nav.php';?>

<div id="wrapper">

<!-- Sidebar/menu -->
<div class=" col-md-offset-0 col-md-4 ">
<nav class="w3-animate-left" style="z-index:3;width:300px;" id="mySidebar"><br>
            <div class="twPc-div">
                <a class="twPc-bg twPc-block"></a>
	        <div>
                <a title="" href="teste.php" class="twPc-avatarLink">
			        <img alt="" src="<?php echo $publii['fotoperfil'];?>" class="twPc-avatarImg">
		        </a>
                <div class="twPc-divUser">
                    <div class="twPc-divName">
                        <p><?php echo $publii['nome_completo'];?></p>
                    </div>
                    <span>
                        <a href="teste.php">@<span><?php echo $publii['nomedeusuario'];?></span></a>
                    </span>
		        </div>
	        </div>
            </div>
           
            </nav>
            </div>
<!-- code end -->
           <div class="container">
               <div class="row">
                   <div class="  col-md-6 ">
                    <div class="feed">
                   
                    <?php foreach ($publi as $row) {
                                            ?>    
                   
                   
             <div class="composicao">
                 <a href="publicacao1.php?id=<?php echo $row['idpost'];?>"><img src="<?php echo $row['fotoperfil'];?>" height="50px" width="50px" style="border-radius:90px;" alt=""></a>
               <a href="publicacao1.php?id=<?php echo $row['idpost'];?>"><h4><?php echo $row['nomedeusuario'];?> Compôs:</h4></a>
                 <a href="publicacao1.php?id=<?php echo $row['idpost'];?>"><h4><?php echo $row['titulo'];?> por <?php echo $row['nomedeusuario'];?> 
                       <?php if(strlen($row['participacao']) != 0){
                        echo '(Participação de : '.$row['participacao'].')';
                    }?></h4></a>
                </div>
            
                  <?php } ?>
                   </div>
                   
                    
                        
                        
                        
                        
                
               </div>
           </div>
            






		
    </div>
<!-- Overlay effect when opening sidebar on small screens -->
<div class="w3-overlay w3-hide-large w3-animate-opacity" onclick="w3_close()" style="cursor:pointer" title="close side menu" id="myOverlay"></div>

<!-- !PAGE CONTENT! -->
<div class="w3-main" style="margin-left:300px">
<script>
// Script to open and close sidebar
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}
 
function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}
</script>
</div>
</body>
</html>

<?php
session_start();
   if(!isset($_SESSION['nome'])){
    header("Location:index.php");
       
 }      
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <title>Compose Club</title>
  <link rel="shortcut icon" href="img/log1.png" type="image/x-icon" />
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    
    
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
     
      <link rel="stylesheet" href="notifier-master/dist/css/notifier.min.css">
      
  
 
  <script src="https://cloud.tinymce.com/stable/tinymce.min.js?apiKey=2618n8ljz1upsq0x56ays7152t5aqg5iobyt2ebhd1bjya7i"></script>
   
  
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="js/navhide.js"></script>
  <!-- <script src="js/menu.js"></script> -->
  <!-- <script src="notifier-master/dist/js/notifier.min.js"></script> -->
</head>
 <script>
      tinymce.init({
      selector: 'textarea',
      height: 250,
      widt: 400,
      margin:50,
      theme: 'modern',
      plugins: 'lists advlist image imagetools'
      });
        $(function(){
        $("#btn_cadastro").click(function(){
                    tinyMCE.triggerSave();
                    var titulo = $("#titulo").val();
                    var categoria = $("input[name=categoria]:checked").val();
					var txtComent = $("#conteudo").val();
                    var participacao = $("#part").val();
                    var produzido = $("#prod").val();
                    var escrito = $("#escri").val();
                    var soundcloud = $("#sound").val();
                    var youtube = $("#yout").val();
					$.ajax({
					  beforeSend: function() { //Antes de enviar o AJAX
						$(".loading").prepend('<img id="loading" style="width: 60px;" src="img/loading.gif">');
					  },
					  url: 'addpublicacao.php',  //URL solicitada
					  type : 'POST', //Tipo de envio (POST ou GET)
					  data: {"titulo": titulo , "categoria": categoria , "txtComent": txtComent , "part": participacao , "produzido": produzido , "escrito" : escrito , "sound" : soundcloud , "youtube": youtube}, // Valores que vou enviar para o PHP
					  dataType: 'json',// Tipo de retorno do PHP
					  success: function(result) { //Resultado retornado do PHP 'result'
						if(result.deucerto){
							window.location.href = "publicacao1.php?id="+result.deucerto;
						} else {
							alert("Erro ao adicionar composição!");
                            $("#loading").remove();
						}     
                          }
					  
					});
				});
         });
     
     function alerta(titulo, conteudo, tempo=200) {
        notifier.show(titulo, conteudo, 'success', 'img/alerta-logotip.png', tempo);
    };
     
    </script>
    
    <style>
        .navbar-inverse{
    height: 70px;
    position: fixed;
    z-index: 10;
    width: 100%;
    background-color: rgb(52, 58, 64);
    border: 0;
    border-radius: 0;
    
}
        .navbar-inverse img{
    width: 70px;
    height: 70px;
    float: left;
    
}
/*fim navbar*/
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
        
        .navbar{
            border-radius: 0; 
        }
    #content{
    float: inherit;
    margin: 20px 0;
    padding: 15px;
    width: 1200px;
}

/*fim search*/
/*Contact sectiom*/
.content-header{
  font-family: 'Oleo Script', cursive;
  color:#fcc500;
  font-size: 45px;
}

.section-content{
  text-align: center; 

}
#contact{
    
font-family: 'Teko', sans-serif;
  padding-top: 60px;
  width: 100%;
    height:100%;
    background: -webkit-linear-gradient(rgba(255, 59, 0, 0.37), rgba(78, 0, 255, 0.42)); /* fallback for old browsers */
 
    
}
.contact-section{
  padding-top: 40px;
}


.form-line{
  border-right: 1px solid #B29999;
}

.form-group{
  margin-top: 10px;
}
.form-group #enviar{
    float: right;
    margin-top:2px;
 }
label{
  line-height: 1em;
  font-weight: normal;
    margin-right: 25px;
}
.form-control{
  font-size: 1.5em;
    margin-left: 12px;
    height:10%;
    color: #080808;
    padding:20px;
}
        

textarea.form-control {
    height: 135px;
   /* margin-top: px;*/
}

     hr{
        opacity: 0.5;
        margin-bottom:40px;
        margin-top:10px;
    }
        .enviar{
            width: auto;
            font-size: 1.1em;
            background-color: transparent;
            color: #fff;
            margin-top:05px;
            margin-left:-25px;
            margin-left:10px;

    }
        .titulo{
            font-size: 23px;
            float: left;
            margin:0 0 5px 0;
        }
        .row{
            border-bottom:1px solid #E8E0DE;
            width: 100%;
            float: left;
            margin:0 0 20px 0;
        }
        .slim{
            background-image:url('/compose/img/musica.jpg');
            background-size: cover;
        }
        .categoria{
            min-width: 6.3em;
        margin-bottom: .4em;
            margin-left: 12px;
            
        }
        .categoria input{
            margin-left: 20px;
        }
    </style>
<body>
</style>
<div class="navbar navbar-inverse" id="teste">
<a href="home.php"><img src="img/log1.png" alt="nada.png" width="100px" height="100px"></a>
</div>
<section id="contact">
        <div id="content">
			<div class="contact-section">
			<div class="container">
			<div class="row">
			    <span class="titulo">Editar Composição</span>
			    <div style="float: right;text-align: right;width: 400px;margin: 0 0 10px 0;">
			       
			    </div>
			</div>
			
				
		
					<div class="col-md-6">
			  			<div class="form-group">
                        <span>TITULO:</span>
					    	<input type="text" name="titulo" class="form-control" id="titulo" placeholder=" Título">
				  		</div>
					  	<span>TAG PRIMÁRIA:</span>
					  	<br>
					  	
					  	<div class="categoria">
                     
                           <label for="pop"><INPUT TYPE="radio" id="pop" NAME="categoria" VALUE="pop" CHECKED> Pop</label>
                            <label for="reb"><INPUT TYPE="radio" id="reb" NAME="categoria" VALUE="r&b"> R&B</label>
                            <label for="rock"><INPUT TYPE="radio" id="rock" NAME="categoria" VALUE="Rock"> Rock</label>
                            <label for="samba"><INPUT TYPE="radio" id="samba" NAME="categoria" VALUE="samba"> Samba</label>
                            <label for="pagode"><INPUT TYPE="radio" id="pagode" NAME="categoria" VALUE="pagode"> Pagode</label>
                           <label for="mpb"> <INPUT TYPE="radio" id="mpb" NAME="categoria" VALUE="mpb"> MPB</label>
                           <label for="rap"> <INPUT TYPE="radio" id="rap" NAME="categoria" VALUE="rap"> Rap</label>
                           <label for="sertanejo"> <INPUT TYPE="radio" id="sertanejo" NAME="categoria" VALUE="setanejo"> Sertanejo/Universitário</label>
                            
                          </div>
			  		</div>
			  		<div class="row">
			  		    <span class="titulo">LETRA DA MÚSICA:</span>
			  		</div>
			  		<div class="col-md-12">
			  		
			  			<div class="form-group">
			  			 	<textarea name="texto"  class="form-control" id="conteudo" placeholder="Enter Your Message"></textarea>
			  			</div>
                </div>
                <div class="row">
                <span class="titulo">Informações Adicionais</span>
                </div>
                <div class="col-md-6">
                   <span>PARTICIPAÇÃO:</span>
                    <div class="form-group">
					    	<input type="text" name="participacao" class="form-control" id="part" placeholder="EX: Luan Santana,Caetano Veloso,Jota Quest">
				  		</div>
                   <span>PRODUZIDO POR: </span>
                    <div class="form-group">
					    	<input type="text" name="produzido" class="form-control" id="prod" placeholder=" EX: Luan Santana,Caetano Veloso,Jota Quest ">
				  		</div>
                   <span>ESCRITO POR: </span>
                    <div class="form-group">
					    	<input type="text" name="escrito" class="form-control" id="escri" placeholder=" EX: Luan Santana,Caetano Veloso,Jota Quest">
				  		</div>
                   <div class="row">
                <span class="titulo">Audio & Video</span>
                </div>
                   <span>URL DO SOUNDCLOUD:</span>
                    <div class="form-group">
					    	<input type="text" name="urlsound" class="form-control" id="sound" placeholder="">
				  		</div>
                   <span>URL DO YOUTUBE:</span>
                    <div class="form-group">
					    	<input type="text" name="urlyt" class="form-control" id="yout" placeholder="">
				  		</div>
                     <div class="row">
                </div>
                    <div class="loading">
                   <button id="btn_cadastro" type="button" class="btn btn-default enviar"><i class="fa fa-paper-plane" aria-hidden="true"></i>Enviar Composição</button>
                    </div>
                    
                </div>
			</div>
        </div>
		</section>
        
        <script src="notifier-master/dist/js/notifier.min.js"></script>
        
    </body>
</html>
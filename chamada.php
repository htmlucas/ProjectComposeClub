<?php session_start();

?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <title>Compose Club</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
    
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="notifier-master/dist/css/notifier.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link href="slim/slim.min.css" type="text/css" rel="stylesheet">
  <link href="slim/slim.css" type="text/css" rel="stylesheet">
 
  <script src="https://cloud.tinymce.com/stable/tinymce.min.js?apiKey=2618n8ljz1upsq0x56ays7152t5aqg5iobyt2ebhd1bjya7i"></script> 
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="js/script2.js"></script>
  <script src="js/menu.js"></script>
  <script src="notifier-master/dist/js/notifier.min.js"></script>
  <script src="js/notifier.min.js"></script>
  <script src="slim/slim.commonjs.js"></script>
  <script src="slim/slim.angular.js"></script>
  <script src="slim/slim.angular2.ts"></script>
  <script src="slim/slim.amd.js"></script>   
  <script src="slim/slim.global.js"></script>
  <script src="slim/slim.global.min.js"></script>
  <script src="slim/slim.jquery.js"></script>
  <script src="slim/slim.jquery.min.js"></script>
  <script src="slim/slim.kickstart.js"></script>
  <script src="slim/slim.kickstart.min.js"></script>
  <script src="slim/slim.module.js"></script>
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
    </script>
    <style>
    #content{
    float: inherit;
    margin: 20px 0;
    padding: 15px;
    width: 1200px;
}
/*navbar*/
/* Set black background color, white text and some padding */
.navbar-inverse{
    height: 63px;
    position: fixed;
    z-index: 10;
    width: 100%;
    background-color: #222;
    border: 0;
    border-radius: 0;
    
}
/*fim navbar*/
/*search*/
 .search{
    width: 360px;
    height: 40px;
    margin-top: 12px;
    box-sizing: border-box;
    font-size: 16px;
    background-color: rgb(219, 219, 219);
    background-image: url('searchicon.png'); 
    background-repeat: no-repeat;
    padding: 12px 12px 0px 40px;
    margin-left: 225px;
    border: 0;
    color: #000000;
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
    background: #3a6186; /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #3a6186 , #89253e); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #3a6186 , #f04c03); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    color : #fff;    
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
}
.form-control{
  font-size: 1.5em;
    width: 100%;
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
        #enviar{
            width: auto;
            font-size: 1.1em;
            background-color: transparent;
            color: #fff;
            margin-top:20px;
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
        .composelist{
            width: 100%;
            padding: 20px 0;
            border-bottom: 1px solid #EFEBEA;
            float: left;
        }
        .composefoto{
            width: 51px;
            height: 194px;
            float: left;
            margin: 0 10px 0 0;
        }
        .composethumb{
            height: 123px;
            width: 164px;
            float: left;
            margin: 0 20px 10px 0;
                }
        .composedesc{
            width: 456px;
            float: left;
        }
        .composedesc h2{
            margin: 10px 0;
    word-wrap: break-word;
        }
        .composedesc p{
                color: #666666;
            font-size: 13px;
            margin: 0 0 5px 0;
        }
    </style>
<body>
<div class="navbar navbar-inverse" id="teste">
     <form>
          <input class="search" type="text" name="search" placeholder="Buscar...">
    </form>

</div>
<section id="contact">
        <div id="content">
			<div class="contact-section">
			<div class="container">
			<div class="row">
			    <span class="titulo">Editar Composição</span>
			    <div style="float: right;text-align: right;width: 400px;margin: 0 0 10px 0;">
                <button id="enviar" type="button" class="btn btn-default"><i class="fa fa-paper-plane" aria-hidden="true"></i>Visualizar</button>
			        <button id="enviar" type="button" class="btn btn-default"><i class="fa fa-paper-plane" aria-hidden="true"></i>Enviar Composição</button>
			    </div >
			    
			</div>
			<div class="composefoto">
			    <a href=""><img src="" alt=""></a>
			</div>
			<div style="float:left; width: 650px;">
			    <div style="float: left; width: 100%;margin: 0 0 3px 0;">
			        <div style="float: left;">
			        <a href="">Lucas Martins</a>
                    <span>11/11/2017</span>  
			        
			        </div>
			    </div>
			</div>
			<div class="composethumb" style="background: url('https://aventurebox.com/uf/59fb675a1215e/adventure/5a031116a3a1a/5a03206261b28-1.jpg') no-repeat center center;">
			    <a style="display:block; width: 100%; height: 100%;" href="https://aventurebox.com/uf/59fb675a1215e/adventure/5a031116a3a1a/5a03206261b28-1.jpg"></a>
			</div>
			<div class="composedesc">
			    <h2>SEOÇA</h2>
			    <p>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
			</div>
			
				
			</div>
        </div>
		</section>
    </body>
</html>
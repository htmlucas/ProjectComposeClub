<!DOCTYPE html>
<html lang="pt-br">
    <head>
       <title>Compose Club</title>
        <link rel="shortcut icon" href="img/log1.png" type="image/x-icon" />
        <link rel="stylesheet" href="css/essemesmo.css">
        
        <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        
         <link href='//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
         
        <script src="js/bootstrap.min.js"></script>
        
        <script src="js/script3.js"></script>
        
        <script type="text/javascript" src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
        
        <script src="cleave.js-master/dist/cleave.min.js"></script>
        <script src="cleave.js-master/dist/addons/cleave-phone.br.js"></script>
      
    <!-- Custom styles for this template -->
    </head>
    <style>
    
.logotipo{
    width: 75px;
    height: 60px;
    margin-left: -100px;

}

.logotipo2{
    width: 150px;
    height: 60px;

}
        
        .navbar-nav{
            float: right;
        }
        
        .navbar{
            border-radius: 0;
        }

    </style>
<body>
   <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
         <img class="logotipo" src="img/log1.png">
         <img class="logotipo2" src="img/compose.png">
          <ul class="navbar-nav ml-auto">
            
            
          </ul>
        </div>
      </div>
    </nav>
<div class="container">
  <div class="col-md-10 col-md-offset-1  esseaqui">
    <div class="header">

      <div class="header__text-group text-center">
        <h1 class="header__heading">Cadastro</h1>
      </div> <!-- close .text-group -->
    </div> <!-- close .header -->
    
    <br />
    <br />
    
    <div class="form-register">
      <form method="post" action="isertdata.php" name="register">
        <input name="utf8" type="hidden" value="✓">
        <div class="row">
          <div class="col-xs-12">
            <div class="form-group">
              <label for="user_first_name">Nome Completo</label>
              <input autofocus="autofocus" class="form-control" required="required" type="text" name="nome" id="nome">
            </div> <!-- close .form-group -->
          </div> <!-- close .col -->
         <!-- close .row -->
        
        <div class="col-xs-12">
        <div class="form-group">
          <label for="user_username">
            Nome de Usuario <span class="text-secondary">(apenas letras, números e sublinhados)</span>
          </label>
          <input class="form-control" required="required" type="text" name="nick" id="nick" autocomplete="off">
          </div>
        </div> <!-- close .form-group -->
        
        <div class="col-xs-6">
        <div class="form-group">
          <label class="user_telefone">
            Telefone
          </label>
          <input class="form-control" required="required" type="text" name="telefone" id="telefone" autocomplete="off">
        </div> <!-- close .form-group -->
        </div>

       <div class="col-xs-12">
        <div class="form-group">
          <label for="user_email">
            Email 
          </label>
          <input class="form-control" type="email" name="email" id="email">
        </div>
        </div> <!-- close .form-group -->

    <div class="col-xs-6">
    <div class="form-group">
        <label for="user_password">
            Senha <input type="password" name="senha" id="senha" class="form-control pass" data-showpass="true" data-placement="top">
        </label>
    </div>
    </div>
     <!-- close .form-group -->
    
    <div class="col-xs-6"> 
    <div class="form-group">
        <label for="user_password">
            Confirmar Senha <input type="password" name="senha2" id="senha2" data-showpass="true" class="form-control" data-placement="top">
        </label>
    </div> <!-- close .form-group -->
    </div>
       </div>


        <div class="form-group">
          <input type="submit" value="Enviar" class="btn btn-primary">
        </div> <!-- close .form-group -->

      </form>
    </div> <!-- close .form -->

    <div class="sheet sheet--padding-small text-center">
      <p class="epsilon">Já cadastrado ? <a href="index.php">Logar</a></p>
    </div>

  </div>
</div>

</body>
        <script type="text/javascript" src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/strong-passwd.js"></script>
        <script type="text/javascript">
            $('.pass').bsStrongPass();
        
                var cleave = new Cleave('#telefone', {
                phone: true,
                phoneRegionCode: 'br'
            });
        </script>
</html>
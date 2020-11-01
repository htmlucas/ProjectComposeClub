<?php
    include'template/header.php';
?>
<!-- cadastro.html -->

<form class="form-horizontal">
<fieldset>

<!-- Form Name -->
<legend>Cadastro</legend>

<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="nome">Nome</label>  
  <div class="col-md-4">
  <input id="nome" name="nome" type="text" placeholder="nome" class="form-control input-md" required="">
  <span class="help-block">Favor digitar o seu nome completo</span>  
  </div>
</div>

<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="telefone">Telefone</label>  
  <div class="col-md-4">
  <input id="telefone" name="telefone" type="text" placeholder="fone" class="form-control input-md" required="">
  <span class="help-block">favor digitar o seu telefone</span>  
  </div>
</div>

<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="email">e-mail</label>  
  <div class="col-md-4">
  <input id="email" name="email" type="text" placeholder="email" class="form-control input-md" required="">
  <span class="help-block">Favor digitar o seu e-mail ex: voce@enviou.com</span>  
  </div>
</div>

<!-- Password input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="senha1">digite sua senha</label>
  <div class="col-md-4">
    <input id="senha1" name="senha1" type="password" placeholder="senha" class="form-control input-md" required="">
    <span class="help-block">Favor digitar a sua senha</span>
  </div>
</div>

<!-- Password input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="senha2">confirmação da senha</label>
  <div class="col-md-4">
    <input id="senha2" name="senha2" type="password" placeholder="confirmação" class="form-control input-md" required="">
    <span class="help-block">confirmar a sua senha</span>
  </div>
</div>

<!-- Button (Double) -->
<div class="form-group">
  <label class="col-md-4 control-label" for="botao1">enviar</label>
  <div class="col-md-8">
    <button id="botao1" name="botao1" class="btn btn-success">enviar</button>
  </div>
</div>

<!-- Button -->
<div class="form-group">
  <label class="col-md-4 control-label" for="limpar">Limpar</label>
  <div class="col-md-4">
    <button id="limpar" name="limpar" class="btn btn-danger">limpar</button>
  </div>
</div>

</fieldset>
</form>


<?php
    include'template/footer.php';
?>
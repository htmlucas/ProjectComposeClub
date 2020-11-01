<style>
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
</style>


<div class="navbar navbar-inverse" >
    <a href="home.php"><img src="img/log1.png" alt="nada.png" width="100px" height="100px"></a>
    

        <div class="navbar-header">
          
          <a href="#" style="margin-left:15px;" class="navbar-btn btn btn-default btn-plus dropdown-toggle" data-toggle="dropdown"><i class="glyphicon glyphicon-home" style="color:#ff3b00;margin-right:10px;"></i>Minha Conta <small><i class="glyphicon glyphicon-chevron-down"></i></small></a>
          <ul class="nav dropdown-menu">
              <li></li>
              <li><a href="logout.php"><i class="glyphicon glyphicon-remove circle" style="color:#ff3b00;"></i> Sair</a></li>
           
          </ul>
        </div>

</div>
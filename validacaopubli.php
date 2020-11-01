<?php
session_start();
$servername = "db.bot.sh";
$username = "composeclub_dbu";
$password = "Qehh4tUHeTHWNP88Se";
$dbname = "composeclub_dados";

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

if (empty($erros)) {
    echo "ok";
} else {
    header('HTTP/1.1 500 Internal Server Error', true, 500);
    echo $html_erros;
}







?>

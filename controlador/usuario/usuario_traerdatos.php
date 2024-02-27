<?php

	require '../../modelo/modelo_usuario.php';
    
    $MU = new modelo_Usuario();
    $id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8'); 
    $consulta = $MU->TraerDatos_Usuario($id);
    echo json_encode($consulta);
    
?>
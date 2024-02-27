<?php

    require '../../modelo/modelo_grupo.php';

    $MR = new Modelo_Grupo();
    $id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
    $grupoactual = htmlspecialchars(strtoupper($_POST['grupoactual']),ENT_QUOTES,'UTF-8');
    $gruponuevo = htmlspecialchars(strtoupper($_POST['gruponuevo']),ENT_QUOTES,'UTF-8');
    $estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');
    $consulta = $MR->Modificar_Grupo($id, $grupoactual, $gruponuevo, $estatus);
    echo $consulta;
    
?>
<?php

    require '../../modelo/modelo_almacen.php';

    $MR = new Modelo_Almacen();
    $id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
    $almacenactual = htmlspecialchars($_POST['almacenactual'],ENT_QUOTES,'UTF-8');
    $almacennuevo = htmlspecialchars($_POST['almacennuevo'],ENT_QUOTES,'UTF-8');
    $tipoeditar = htmlspecialchars($_POST['tipoeditar'],ENT_QUOTES,'UTF-8');
    $estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');
    $consulta = $MR->Modificar_Almacen($id, $almacenactual, $almacennuevo, $tipoeditar, $estatus);
    echo $consulta;
    
?>
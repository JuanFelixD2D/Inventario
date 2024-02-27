<?php

    require '../../modelo/modelo_almacen.php';

    $MR = new Modelo_Almacen();
    $almacen = htmlspecialchars(strtoupper($_POST['almacen']),ENT_QUOTES,'UTF-8');
    $tipo = htmlspecialchars(strtoupper($_POST['tipo']),ENT_QUOTES,'UTF-8');
    $consulta = $MR->Registrar_Almacen($almacen, $tipo);
    echo $consulta;

?>
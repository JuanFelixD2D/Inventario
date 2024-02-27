<?php

	require '../../modelo/modelo_movimiento.php';

    $MM = new Modelo_Movimiento();
    $producto = htmlspecialchars($_POST['producto'],ENT_QUOTES,'UTF-8');
    $almacen = htmlspecialchars($_POST['almacen'],ENT_QUOTES,'UTF-8');
    $consulta = $MM->Listar_Combo_Tipo_Por_Producto($producto, $almacen);
    echo json_encode($consulta)

?>
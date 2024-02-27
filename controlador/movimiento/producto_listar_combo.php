<?php

	require '../../modelo/modelo_movimiento.php';

    $MM = new Modelo_Movimiento();
    $almacen = htmlspecialchars($_POST['almacen'],ENT_QUOTES,'UTF-8');
    $consulta = $MM->Listar_Combo_Producto($almacen);
    echo json_encode($consulta);

?>
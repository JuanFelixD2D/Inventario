<?php

	require '../../modelo/modelo_producto.php';

    $MP = new Modelo_Producto();
    $consulta = $MP->Listar_Combo_Grupo();
    echo json_encode($consulta)

?>
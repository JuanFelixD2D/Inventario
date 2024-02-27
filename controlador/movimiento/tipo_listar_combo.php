<?php

	require '../../modelo/modelo_movimiento.php';

    $MM = new Modelo_Movimiento();
    $consulta = $MM->Listar_Combo_Tipo();
    echo json_encode($consulta)

?>
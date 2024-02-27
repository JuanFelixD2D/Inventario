<?php

	require '../../modelo/modelo_usuario.php';

    $MU = new modelo_Usuario();
    $consulta = $MU->Listar_Combo_Rol();
    echo json_encode($consulta)

?>
<?php

    require '../../modelo/modelo_grupo.php';

    $MR = new Modelo_Grupo();
    $grupo = htmlspecialchars(strtoupper($_POST['grupo']),ENT_QUOTES,'UTF-8');
    $consulta = $MR->Registrar_Grupo($grupo);
    echo $consulta;

?>
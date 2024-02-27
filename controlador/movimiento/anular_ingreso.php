<?php
    require '../../modelo/modelo_ingreso.php';

    $MI = new Modelo_Ingreso();
    $idingreso = htmlspecialchars($_POST['idingreso'],ENT_QUOTES,'UTF-8');
    $consulta = $MI->Anular_Ingreso($idingreso);
    echo $consulta;

?>
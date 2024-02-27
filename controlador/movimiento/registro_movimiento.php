<?php

    require '../../modelo/modelo_movimiento.php';

    $MM = new Modelo_Movimiento();
    $producto = htmlspecialchars($_POST['producto'],ENT_QUOTES,'UTF-8');
    $tipo = htmlspecialchars($_POST['tipo'],ENT_QUOTES,'UTF-8');
    $cantidad = htmlspecialchars($_POST['cantidad'],ENT_QUOTES,'UTF-8');
    $usuario = htmlspecialchars($_POST['usuario'],ENT_QUOTES,'UTF-8');

    //Convertimos los datos a arreglo explode()
    $array_producto = explode(",",$producto);
    $array_tipo     = explode(",",$tipo);
    $array_cantidad = explode(",",$cantidad);
    $array_usuario  = explode(",",$usuario);
    for ($i=0; $i < count($array_producto); $i++) { 
        $consulta = $MM->Registrar_Movimiento($array_producto[$i], $array_tipo[$i], $array_cantidad[$i], $array_usuario[$i]);
    }
    echo $consulta;

?>
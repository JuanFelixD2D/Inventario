<?php

    require '../../modelo/modelo_producto.php';

    $MP = new Modelo_Producto();
    $producto = htmlspecialchars($_POST['producto'],ENT_QUOTES,'UTF-8');
    $descripcion = htmlspecialchars($_POST['descripcion'],ENT_QUOTES,'UTF-8');
    $idgrupo = htmlspecialchars($_POST['idgrupo'],ENT_QUOTES,'UTF-8');
    $idalmacen = htmlspecialchars($_POST['idalmacen'],ENT_QUOTES,'UTF-8');
    $precio = htmlspecialchars($_POST['precio'],ENT_QUOTES,'UTF-8');
    $venta = htmlspecialchars($_POST['venta'],ENT_QUOTES,'UTF-8');
    $usuario = htmlspecialchars($_POST['usuario'],ENT_QUOTES,'UTF-8');
    $consulta = $MP->Registrar_Producto($producto, $descripcion, $idgrupo, $idalmacen, $precio, $venta, $usuario);
    echo $consulta;

?>
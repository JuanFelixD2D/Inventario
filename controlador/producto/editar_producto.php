<?php

    require '../../modelo/modelo_producto.php';

    $MP = new Modelo_Producto();
    $id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
    $producto = htmlspecialchars($_POST['producto'],ENT_QUOTES,'UTF-8');
    $descripcion = htmlspecialchars($_POST['descripcion'],ENT_QUOTES,'UTF-8');
    $idgrupo = htmlspecialchars($_POST['idgrupo'],ENT_QUOTES,'UTF-8');
    $idalmacen = htmlspecialchars($_POST['idalmacen'],ENT_QUOTES,'UTF-8');
    $precio = htmlspecialchars($_POST['precio'],ENT_QUOTES,'UTF-8');
    $venta = htmlspecialchars($_POST['venta'],ENT_QUOTES,'UTF-8');
    $estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');

    $consulta = $MP->Modificar_Producto($id, $producto, $descripcion, $idgrupo, $idalmacen, $precio, $venta, $estatus);
    echo $consulta;
    
?>
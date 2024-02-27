<?php

    require '../../modelo/modelo_producto.php';

    $MP = new Modelo_Producto();
    $almacen = htmlspecialchars($_POST['almacen'],ENT_QUOTES,'UTF-8');
    $consulta = $MP->Listar_Producto($almacen);
    if($consulta){
        echo json_encode($consulta);
    }else{
        echo '{
		    "sEcho": 1,
		    "iTotalRecords": "0",
		    "iTotalDisplayRecords": "0",
		    "aaData": []
		}';       
    }

?>
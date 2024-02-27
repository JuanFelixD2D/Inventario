<?php

    require '../../modelo/modelo_movimiento.php';
    
    $MM = new Modelo_Movimiento();//instanciamos
    $finicio = htmlspecialchars($_POST['finicio'],ENT_QUOTES,'UTF-8');
    $ffin    = htmlspecialchars($_POST['ffin'],ENT_QUOTES,'UTF-8');
    $almacen = htmlspecialchars($_POST['almacen'],ENT_QUOTES,'UTF-8');
    $tipo    = htmlspecialchars($_POST['tipo'],ENT_QUOTES,'UTF-8');
    $consulta = $MM->Listar_Movimiento($finicio, $ffin, $almacen, $tipo);
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
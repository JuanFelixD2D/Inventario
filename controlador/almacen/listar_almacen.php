<?php

    require '../../modelo/modelo_almacen.php';

    $MR = new Modelo_Almacen();
    $consulta = $MR->Listar_Almacen();
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
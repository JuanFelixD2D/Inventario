<?php

    require '../../modelo/modelo_grupo.php';

    $MR = new Modelo_Grupo();
    $consulta = $MR->Listar_Grupo();
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
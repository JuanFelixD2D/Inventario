<?php

    require '../../modelo/modelo_usuario.php';
    
    $MU = new Modelo_Usuario();
    $id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8'); 
    $contraactual = htmlspecialchars($_POST['contraactual'],ENT_QUOTES,'UTF-8'); 
    $contraactualescrita = htmlspecialchars($_POST['contraactualescrita'],ENT_QUOTES,'UTF-8');
    $contranueva = password_hash($_POST['contranueva'],PASSWORD_DEFAULT,['cost'=>12]); 
    if(password_verify($contraactualescrita,$contraactual)){
        $consulta = $MU->Editar_Contra($id,$contranueva);
        echo $consulta;
    }else{
        echo 2;
    }
    
?>
<?php
    require_once 'modelo_conexion.php';

    class Modelo_Usuario extends conexionBD{

        public function Verificar_Usuario($usuario, $pass){
            $c = conexionBD::conexionPDO();

            $sql = "EXEC SP_VERIFICAR_USUARIO ?";
            $arreglo = array();
            $consulta = $c->prepare($sql);
            $consulta->bindParam(1, $usuario);
            $consulta->execute();
            $resultado = $consulta->fetchAll();
            foreach($resultado as $respuesta){
                if(password_verify($pass,$respuesta['USU_CONTRASENA'])){
                    $arreglo[] = $respuesta;
                }
            }
            return $arreglo;
            conexionBD::cerrar_conexion();
        }

        public function Reestablecer_Contra($email, $contra){
            $c = conexionBD::conexionPDO();

            $sql = "EXEC SP_REESTABLECER_CONTRA ?,?";
            $arreglo = array();
            $consulta = $c->prepare($sql);
            $consulta->bindParam(1, $email);
            $consulta->bindParam(2, $contra);
            $consulta->execute();
            if($arreglo = $consulta->fetch()) {
                return $respuesta = intVal(trim($arreglo[0]));
            }
            conexionBD::cerrar_conexion();
        }

        public function TraerDatos_Usuario($id){
            $c = conexionBD::conexionPDO();

            $sql = "EXEC SP_TRAER_DATOS_USUARIO ?";
            $arreglo = array();
            $consulta = $c -> prepare($sql);
            $consulta->bindParam(1, $id);
            $consulta->execute();
            $resultado = $consulta->fetchAll();
            foreach ($resultado as $respuesta) {
                $arreglo[] = $respuesta;
            }   
            return $arreglo;
            conexionBD::cerrar_conexion();
        }

        public function Listar_Usuario(){
            $c = conexionBD::conexionPDO();

            $sql = "EXEC SP_LISTAR_USUARIO";
            $arreglo = array();
            $consulta = $c->prepare($sql);
            $consulta->execute();
            $resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
            foreach($resultado as $respuesta){
                $arreglo["data"][] = $respuesta;
            }
            return $arreglo;
            conexionBD::cerrar_conexion();
        }

        public function Listar_Combo_Rol(){
            $c = conexionBD::conexionPDO();

            $sql = "EXEC SP_LISTAR_COMBO_ROL";
            $arreglo = array();
            $consulta = $c->prepare($sql);
            $consulta->execute();
            $resultado = $consulta->fetchAll();
            foreach ($resultado as $respuesta) {
                $arreglo[] = $respuesta;
            }   
            return $arreglo;
            conexionBD::cerrar_conexion();
        }

        public function Registrar_Usuario($usuario, $pass, $email, $idrol, $ruta){
            $c = conexionBD::conexionPDO();

            $sql = "EXEC SP_REGISTRAR_USUARIO ?,?,?,?,?";
            $arreglo = array();
            $consulta = $c->prepare($sql);
            $consulta->bindParam(1, $usuario);
            $consulta->bindParam(2, $pass);
            $consulta->bindParam(3, $email);
            $consulta->bindParam(4, $idrol);
            $consulta->bindParam(5, $ruta);
            $consulta->execute();
            if($arreglo = $consulta->fetch()) {
                return $respuesta = intVal(trim($arreglo[0]));
            }
            conexionBD::cerrar_conexion();
        }

        public function Editar_Foto($id, $ruta){
            $c = conexionBD::conexionPDO();

            $sql = "EXEC SP_EDITAR_USUARIO_FOTO ?,?";
            $arreglo = array();
            $consulta = $c->prepare($sql);
            $consulta->bindParam(1, $id);
            $consulta->bindParam(2, $ruta);
            $consulta->execute();
            if($arreglo = $consulta->fetch()) {
                return $respuesta = intVal(trim($arreglo[0]));
            }
            conexionBD::cerrar_conexion();
        }

        public function Editar_Usuario($id, $emailnuevo, $idrol, $estatus){
            $c = conexionBD::conexionPDO();

            $sql = "EXEC SP_EDITAR_USUARIO ?,?,?,?";
            $arreglo = array();
            $consulta = $c->prepare($sql);
            $consulta->bindParam(1, $id);
            $consulta->bindParam(2, $emailnuevo);
            $consulta->bindParam(3, $idrol);
            $consulta->bindParam(4, $estatus);
            $consulta->execute();
            if($arreglo = $consulta->fetch()) {
                return $respuesta = intVal(trim($arreglo[0]));
            }
            conexionBD::cerrar_conexion();
        }

        public function Editar_Contra($id, $contranueva){
            $c = conexionBD::conexionPDO();

            $sql = "EXEC SP_EDITAR_USUARIO_CONTRA ?,?";
            $consulta = $c->prepare($sql);
            $consulta->bindParam(1, $id);
            $consulta->bindParam(2, $contranueva);
            $resultado = $consulta->execute();
            if($resultado){
                return 1;
            } else {
                return 0;
            }
            conexionBD::cerrar_conexion();
        }
    }

?>
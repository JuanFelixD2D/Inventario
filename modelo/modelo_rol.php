<?php
    require_once 'modelo_conexion.php';

    class Modelo_Rol extends conexionBD{

    	public function Listar_Rol(){
            $c = conexionBD::conexionPDO();

	        $sql = "EXEC SP_LISTAR_ROL";
	        $arreglo = array();
            $consulta = $c->prepare($sql);
            $consulta->execute();
            $resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
            foreach ($resultado as $respuesta) {
                $arreglo["data"][] = $respuesta;
            }   
            return $arreglo;
            conexionBD::cerrar_conexion();
        }

        public function Registrar_Rol($rol){
            $c = conexionBD::conexionPDO();

            $sql = "EXEC SP_REGISTRAR_ROL ?";
            $arreglo = array();
            $consulta=$c->prepare($sql);
            $consulta->bindParam(1, $rol);
            $consulta->execute();
            if($arreglo = $consulta->fetch()) {
                return $respuesta = intVal(trim($arreglo[0]));
            }
            conexionBD::cerrar_conexion();
        }

        public function Modificar_Rol($id, $rolactual, $rolnuevo, $estatus){
            $c = conexionBD::conexionPDO();

            $sql = "EXEC SP_EDITAR_ROL ?,?,?,?";
            $arreglo = array();
            $consulta=$c->prepare($sql);
            $consulta->bindParam(1, $id);
            $consulta->bindParam(2, $rolactual);
            $consulta->bindParam(3, $rolnuevo);
            $consulta->bindParam(4, $estatus);
            $consulta->execute();
            if($arreglo = $consulta->fetch()) {
                return $respuesta = intVal(trim($arreglo[0]));
            }
            conexionBD::cerrar_conexion();
        }
    }
?>
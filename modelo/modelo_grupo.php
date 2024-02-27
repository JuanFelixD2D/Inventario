<?php
    require_once 'modelo_conexion.php';

    class Modelo_Grupo extends conexionBD{

    	public function Listar_Grupo(){
            $c = conexionBD::conexionPDO();

	        $sql = "EXEC SP_LISTAR_GRUPO";
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

        public function Registrar_Grupo($grupo){
            $c = conexionBD::conexionPDO();

            $sql = "EXEC SP_REGISTRAR_GRUPO ?";
            $arreglo = array();
            $consulta=$c->prepare($sql);
            $consulta->bindParam(1, $grupo);
            $consulta->execute();
            if($arreglo = $consulta->fetch()) {
                return $respuesta = intVal(trim($arreglo[0]));
            }
            conexionBD::cerrar_conexion();
        }

        public function Modificar_Grupo($id, $grupoactual, $gruponuevo, $estatus){
            $c = conexionBD::conexionPDO();

            $sql = "EXEC SP_EDITAR_GRUPO ?,?,?,?";
            $arreglo = array();
            $consulta=$c->prepare($sql);
            $consulta->bindParam(1, $id);
            $consulta->bindParam(2, $grupoactual);
            $consulta->bindParam(3, $gruponuevo);
            $consulta->bindParam(4, $estatus);
            $consulta->execute();
            if($arreglo = $consulta->fetch()) {
                return $respuesta = intVal(trim($arreglo[0]));
            }
            conexionBD::cerrar_conexion();
        }
    }

?>
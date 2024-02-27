<?php
    require_once 'modelo_conexion.php';

    class Modelo_Almacen extends conexionBD{

    	public function Listar_Almacen(){
            $c = conexionBD::conexionPDO();

	        $sql = "EXEC SP_LISTAR_ALMACEN";
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

        public function Registrar_Almacen($almacen, $tipo){
            $c = conexionBD::conexionPDO();

            $sql = "EXEC SP_REGISTRAR_ALMACEN ?,?";
            $arreglo = array();
            $consulta=$c->prepare($sql);
            $consulta->bindParam(1, $almacen);
            $consulta->bindParam(2, $tipo);
            $consulta->execute();
            if($arreglo = $consulta->fetch()) {
                return $respuesta = intVal(trim($arreglo[0]));
            }
            conexionBD::cerrar_conexion();
        }

        public function Modificar_Almacen($id, $almacenactual, $almacennuevo, $tipoeditar, $estatus){
            $c = conexionBD::conexionPDO();

            $sql = "EXEC SP_EDITAR_ALMACEN ?,?,?,?,?";
            $arreglo = array();
            $consulta=$c->prepare($sql);
            $consulta->bindParam(1, $id);
            $consulta->bindParam(2, $almacenactual);
            $consulta->bindParam(3, $almacennuevo);
            $consulta->bindParam(4, $tipoeditar);
            $consulta->bindParam(5, $estatus);
            $consulta->execute();
            if($arreglo = $consulta->fetch()) {
                return $respuesta = intVal(trim($arreglo[0]));
            }
            conexionBD::cerrar_conexion();
        }
    }

?>
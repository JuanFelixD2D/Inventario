<?php
    require_once 'modelo_conexion.php';

    class Modelo_Producto extends conexionBD{

    	public function Listar_Producto($almacen){
            $c = conexionBD::conexionPDO();

	        $sql = "EXEC SP_LISTAR_PRODUCTO ?";
	        $arreglo = array();
            $consulta = $c->prepare($sql);
            $consulta->bindParam(1, $almacen);
            $consulta->execute();
            $resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
            foreach ($resultado as $respuesta) {
                $arreglo["data"][] = $respuesta;
            }   
            return $arreglo;
            conexionBD::cerrar_conexion();
        }

        public function Listar_Combo_Grupo(){
            $c = conexionBD::conexionPDO();

            $sql = "EXEC SP_LISTAR_COMBO_GRUPO";
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

        public function Listar_Combo_Almacen(){
            $c = conexionBD::conexionPDO();

            $sql = "EXEC SP_LISTAR_COMBO_ALMACEN";
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

        public function Registrar_Producto($producto, $descripcion, $idgrupo, $idalmacen, $precio, $venta, $usuario){
            $c = conexionBD::conexionPDO();

            $sql = "EXEC SP_REGISTRAR_PRODUCTO ?,?,?,?,?,?,?";
            $arreglo = array();
            $consulta=$c->prepare($sql);
            $consulta->bindParam(1, $producto);
            $consulta->bindParam(2, $descripcion);
            $consulta->bindParam(3, $idgrupo);
            $consulta->bindParam(4, $idalmacen);
            $consulta->bindParam(5, $precio);
            $consulta->bindParam(6, $venta);
            $consulta->bindParam(7, $usuario);
            $consulta->execute();
            if($arreglo = $consulta->fetch()) {
                return $respuesta = intVal(trim($arreglo[0]));
            }
            conexionBD::cerrar_conexion();
        }

        public function Modificar_Producto($id, $producto, $descripcion, $idgrupo, $idalmacen, $precio, $venta, $estatus){
            $c = conexionBD::conexionPDO();

            $sql = "EXEC SP_EDITAR_PRODUCTO ?,?,?,?,?,?,?,?";
            $arreglo = array();
            $consulta=$c->prepare($sql);
            $consulta->bindParam(1, $id);
            $consulta->bindParam(2, $producto);
            $consulta->bindParam(3, $descripcion);
            $consulta->bindParam(4, $idgrupo);
            $consulta->bindParam(5, $idalmacen);
            $consulta->bindParam(6, $precio);
            $consulta->bindParam(7, $venta);
            $consulta->bindParam(8, $estatus);
            $consulta->execute();
            if($arreglo = $consulta->fetch()) {
                return $respuesta = intVal(trim($arreglo[0]));
            }
            conexionBD::cerrar_conexion();
        }
    }

?>
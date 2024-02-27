<?php
    require_once 'modelo_conexion.php';

    class Modelo_Movimiento extends conexionBD{

        public function Listar_Combo_Tipo(){
            $c = conexionBD::conexionPDO();

            $sql = "EXEC SP_LISTAR_COMBO_TIPO";
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

        public function Listar_Combo_Tipo_Por_Producto($producto, $almacen){
            $c = conexionBD::conexionPDO();

            $sql = "EXEC SP_LISTAR_COMBO_TIPO_POR_PRODUCTO ?,?";
            $arreglo = array();
            $consulta = $c->prepare($sql);
            $consulta->bindParam(1, $producto);
            $consulta->bindParam(2, $almacen);
            $consulta->execute();
            $resultado = $consulta->fetchAll();
            foreach ($resultado as $respuesta) {
                $arreglo[] = $respuesta;
            }   
            return $arreglo;
            conexionBD::cerrar_conexion();
        }

    	public function Listar_Movimiento($finicio, $ffin, $almacen, $tipo){
            $c = conexionBD::conexionPDO();

	        $sql = "EXEC SP_LISTAR_MOVIMIENTO ?,?,?,?";
	        $arreglo = array();
            $consulta = $c->prepare($sql);
            $consulta->bindParam(1, $finicio);
            $consulta->bindParam(2, $ffin);
            $consulta->bindParam(3, $almacen);
            $consulta->bindParam(4, $tipo);
            $consulta->execute();
            $resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
            foreach ($resultado as $respuesta) {
                $arreglo["data"][] = $respuesta;
            }   
            return $arreglo;
            conexionBD::cerrar_conexion();
        }

        public function Listar_Combo_Producto($almacen){
            $c = conexionBD::conexionPDO();

            $sql = "EXEC SP_LISTAR_COMBO_PRODUCTO ?";
            $arreglo = array();
            $consulta = $c->prepare($sql);
            $consulta->bindParam(1, $almacen);
            $consulta->execute();
            $resultado = $consulta->fetchAll();
            foreach ($resultado as $respuesta) {
                $arreglo[] = $respuesta;
            }   
            return $arreglo;
            conexionBD::cerrar_conexion();
        }

        public function Registrar_Movimiento($producto, $tipo, $cantidad, $usuario){
            $c = conexionBD::conexionPDO();

            $sql = "EXEC SP_REGISTRAR_MOVIMIENTO ?,?,?,?";
            $arreglo = array();
            $consulta = $c->prepare($sql);
            $consulta->bindParam(1, $producto);
            $consulta->bindParam(2, $tipo);
            $consulta->bindParam(3, $cantidad);
            $consulta->bindParam(4, $usuario);
            $consulta->execute();
            if($arreglo = $consulta->fetch()) {
                return $respuesta = intVal(trim($arreglo[0]));
            }
            conexionBD::cerrar_conexion();
        }

        public function Anular_Ingreso($idingreso){
            $c = conexionBD::conexionPDO();

            $sql = "EXEC SP_ANULAR_INGRESO ?";
            $consulta = $c->prepare($sql);
            $consulta->bindParam(1, $idingreso);
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
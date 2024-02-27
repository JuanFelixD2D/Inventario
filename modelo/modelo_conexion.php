<?php

    class conexionBD
    {
        public function conexionPDO(){
            
            //$host          = '192.168.100.2\SERVERCONTABLE';
            $host          = '192.168.18.214';
            $usuario       = 'sa';
            //$contrasena    = '$axelis123';
            $contrasena    = 'Passw0rd';
            $dbName        = 'INVENTARIO';
            try{
                //$pdo = new PDO("sqlsrv:Server=$host;Database=$dbName",$usuario,$contrasena);
                $pdo = new PDO("sqlsrv:Server=$host;Database=$dbName",$usuario,$contrasena);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                //$pdo->exec("set names utf8");
                return $pdo;

            }catch(Exception $e){
                echo "la conexion ha fallado";	
            }
        }

        function cerrar_conexion(){
            $this->$pdo=null;
        }

    }
    
?>
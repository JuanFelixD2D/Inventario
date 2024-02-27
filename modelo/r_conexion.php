<?php 
	
	try {
		//$cone = new PDO("sqlsrv:Server=192.168.100.2\SERVERCONTABLE;Database=INVENTARIO", 'sa', '$axelis123');
		$cone = new PDO("sqlsrv:Server=SISTEMAS2\SQLEXPRESS;Database=INVENTARIO", 'sa', 'SamiTask2021@*');
	} catch (PDOException $e) {
    	echo 'Falló la conexión: ' . $e->getMessage();
	}

?>
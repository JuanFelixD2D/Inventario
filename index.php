<?php

  session_start();
  if(isset($_SESSION['S_IDUSUARIO'])){
    header('Location: vista/index.php');
  }

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SISTEMA DE INVENTARIO | login</title>
    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="plantilla/plugins/fontawesome-free/css/all.min.css">
    <!-- icheck bootstrap -->
    <link rel="stylesheet" href="plantilla/plugins/icheck-bootstrap/icheck-bootstrap.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="plantilla/dist/css/adminlte.min.css">
</head>
<body class="hold-transition login-page">
    <div class="login-box">
        <!-- /.login-logo -->
        <div class="card card-outline card-primary">
            <div class="card-header text-center">
                <a href="index.php" class="h1"><b>INICIAR SESI&Oacute;N</b></a>
            </div>
            <div class="card-body">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Ingresa usuario" id="txt_usuario">
                    <div class="input-group-append">
                        <div class="input-group-text"><span class="fas fa-envelope"></span></div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="password" class="form-control" placeholder="Ingrese Password" id="txt_pass">
                    <div class="input-group-append">
                        <div class="input-group-text"><span class="fas fa-lock"></span></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8">
                        <div class="icheck-primary">
                            <input type="checkbox" id="rememberMe">
                            <label for="rememberMe">Mantener conectado</label>
                        </div>
                    </div>
                    <div class="col-4">
                        <button type="submit" class="btn btn-primary btn-block" onclick="Iniciar_Sesion()">Ingresar</button>
                    </div>
                </div>
                <p class="mb-1"><a class='aLink' onclick="AbrirModalRestablecer()">Reestrablecer Contraseña?</a></p>
                <p class="mb-0"><a href="" class="text-center">Crear cuenta</a></p>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modal_restablecer_contra" role="dialog">
        <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header" style="text-align:left;">

                <h4 class="modal-title"><b>Restablecer Contrase&ntilde;a</b></h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="col-lg-12">
                    <label for=""><b>Ingrese el email registrado en el usuario para enviarle su contrase&ntilde;a restablecida</b></label>
                    <input type="text" class="form-control" id="txt_email" placeholder="Ingrese Email"><br>
                </div>

            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="Reestablecer_Contra()"><i class="fa fa-check"><b>&nbsp;Enviar</b></i></button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
        </div>
        </div>
    </div>
    <!-- jQuery -->
    <script src="plantilla/plugins/jquery/jquery.min.js"></script>
    <!-- Bootstrap 4 -->
    <script src="plantilla/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
    <!-- AdminLTE App -->
    <script src="plantilla/dist/js/adminlte.min.js"></script>
    <script src="utilitarios/sweetalert.js"></script>
    <script src="js/usuario.js?rev=<?php echo time();?>"></script>
    <script>
    	$("#txt_pass").keyup(function (event) {
      		if (event.keyCode === 13) {
        		Iniciar_Sesion();
      		}
    	});
        const rmcheck       = document.getElementById('rememberMe'),
              usuarioinput  = document.getElementById('txt_usuario'),
              passinput     = document.getElementById('txt_pass');
        if(localStorage.checkbox && localStorage.checkbox !==""){
            rmcheck.setAttribute("checked","checked");
            usuarioinput.value  = localStorage.usuario;
            passinput.value     = localStorage.pass;
        } else {
            rmcheck.removeAttribute("checked");
            usuarioinput.value  = "";
            passinput.value     = "";
        }
    </script>
</body>
</html>

function Iniciar_Sesion(){
    Mantener_conectado();
    let usu  = document.getElementById('txt_usuario').value;
    let pass = document.getElementById('txt_pass').value;
    if(usu.length==0 || pass.length==0){
        return Swal.fire('Mensaje de Advertencia','Llene los campos de la sesion','warning');
    }

    $.ajax({
        url: 'controlador/usuario/iniciar_sesion.php',
        type: 'POST',
        data:{
            u:usu,
            p:pass
        }
    }).done(function(resp){
        let data = JSON.parse(resp);
        if(data.length>0){
            if(data[0][4]=='INACTIVO'){
                return Swal.fire('Mensaje de Advertencia','Lo sentimos el usuario '+usu+' se encuentra desactivado, comuniquese con el administrador','warning');
            }

            $.ajax({
                url: 'controlador/usuario/crear_sesion.php',
                type: 'POST',
                data:{
                    id_usuario:data[0][0],
                    usuario:data[0][1],
                    rol:data[0][3]
                }
            }).done(function(r){
                let timerInterval
                Swal.fire({
                    title: 'Bienvenido al sistema',
                    html: 'Sera redireccion en <b></b> milliseconds.',
                    timer: 2000,
                    timerProgressBar: true,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading()
                        timerInterval = setInterval(() => {
                            const content = Swal.getContent()
                            if (content) {
                                const b = content.querySelector('b')
                                if (b) {
                                    b.textContent = Swal.getTimerLeft()
                                }
                            }
                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        location.reload();
                    }
                })
            })
        }else{
            Swal.fire('Mensaje de Error','Usuario o clave incorrecta','error');
        }
    })
}

function Mantener_conectado(){
    if(rmcheck.checked && usuarioinput.value !=="" && passinput.value !==""){
        localStorage.usuario = usuarioinput.value;
        localStorage.pass    = passinput.value;
        localStorage.checkbox = rmcheck.value;
    }else{
        localStorage.usuario  = "";
        localStorage.pass     = "";
        localStorage.checkbox = "";        
    }
}

function AbrirModalRestablecer(){
    $("#modal_restablecer_contra").modal({backdrop:'static',keyboard:false})
    $("#modal_restablecer_contra").modal('show');
    $("#modal_restablecer_contra").on('shown.bs.modal',function(){
        $("#txt_usuario").focus();  
    })
}

function Reestablecer_Contra(){
    var email = $("#txt_email").val();
    if(email.length==0){
        return Swal.fire("Mensaje De Advertencia","Llene los campos en blanco","warning");
    }
    var carecteres="abcdefghijklmnppqrtuvwxyzABCDEFGHIJKLMNOPQRTUVWXYZ2346789";
    var contrasena ="";
    for(var i=0;i<6;i++){
        contrasena+=carecteres.charAt(Math.floor(Math.random()*carecteres.length));
    }
    $.ajax({
        url:'controlador/usuario/usuario_reestablecer_contra.php',
        type:'POST',
        data:{
            email:email,
            contrasena:contrasena
        }
    }).done(function(resp){
        if(resp>0){
            if(resp==1){
                Swal.fire("Mensaje De Confirmaci&#243;n","Su contrase&#241;a fue restablecida con exito al correo: "+email+"","success");
            }else{
                Swal.fire("Mensaje De Advertencia","El correo ingresado no se encuentra en nuestra data","warning");  
            }
        }else{
            Swal.fire("Mensaje De Error","No se pudo restablecer su contrase&#241;a","error");
        }
    })
}

function Traer_Datos_Usuario(){
    var id = document.getElementById('txt_codigo_principal').value;
    $.ajax({
        url:'../controlador/usuario/usuario_traerdatos.php',
        type:'POST',
        data:{
            id:id
        }
    }).done(function(resp){
        var data = JSON.parse(resp);
        if(data.length>0){
            document.getElementById('text_usu').value=data[0][1];
            document.getElementById('usu_sidebar').innerHTML=data[0][1];
            document.getElementById('usu_header').innerHTML=data[0][1];
            $("#imagen_sidebar").attr("src", '../'+data[0][6]);
            $("#imagen_header").attr("src", '../'+data[0][6]);
            document.getElementById('rol_sidebar').innerHTML=data[0][7];
        }
    })
}

var t_usuario
function Listar_Usuario(){
    t_usuario = $("#tabla_usuario").DataTable({
        "ordering":false,
        "bLengthChange":true, 
        "searching": { "regex":false },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 10,
        "destroy":true,
        "async": false ,
        "processing": true,
        "ajax":{
            "url":"../controlador/usuario/usuario_listar.php",
            type:'POST',
        },
        "columns":[
            {"defaultContent":""},
            {"data":"USU_NOMBRE"},
            {"data":"ROL_NOMBRE"},
            {"data":"USU_CORREO"},
            {"data":"USU_FOTO",
                render: function(data,type,row){
                    return  '<img src="../'+data+'" class="img-circle  m-r-10" style="width:28px;">';
                }
            },
            {"data":"USU_ESTADO",
                render: function(data,type,row){
                    if(data==="ACTIVO"){
                        return "<span class='badge badge-success badge-pill m-r-5 m-b-5'>"+data+"</span>";
                    } else {
                        return "<span class='badge badge-danger badge-pill m-r-5 m-b-5'>"+data+"</span>";
                    }
                }
            },
            {"defaultContent":"<button class='editar btn btn-primary'><i class='fa fa-edit'></i></button>"}
        ],
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
            $($(nRow).find("td")[3]).css('text-align', 'left' );
            $($(nRow).find("td")[4]).css('text-align', 'center' );
        },
        "language":idioma_espanol,
        select: true
    });
    t_usuario.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_usuario').DataTable().page.info();
        t_usuario.column(0, { page: 'current' }).nodes().each( function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
}

function AbrirModal(){
    $("#modal_registro").modal({backdrop:'static',keyboard:false})
    $("#modal_registro").modal('show');
}

function Listar_Combo_Rol(){
    $.ajax({
        url:"../controlador/usuario/rol_listar_combo.php",
        type:'POST'
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena = "";
        if(data.length>0){
            for (var i=0; i < data.length; i++) {
                cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
            }
            document.getElementById('cbm_rol').innerHTML=cadena;
            document.getElementById('cbm_rol_editar').innerHTML=cadena;
        }else{
            document.getElementById('cbm_rol').innerHTML="No se encontraron datos";
            document.getElementById('cbm_rol_editar').innerHTML="No se encontraron datos";
        }
    })
}

function Registrar_Usuario(){
    var usuario = document.getElementById('txt_usu').value;
    var pass = document.getElementById('txt_password').value;
    var email = document.getElementById('txt_email').value;
    var idrol = document.getElementById('cbm_rol').value;
    var archivo = document.getElementById('imagen').value;
    var f = new Date();
    var extension = archivo.split('.').pop();
    var nombrearchivo = "IMG"+f.getDate()+""+(f.getMonth()+1)+""+f.getFullYear()+""+f.getHours()+""+f.getMinutes()+""+f.getSeconds()+"."+extension;
    var formData= new FormData();
    var foto = $("#imagen")[0].files[0];
    if(usuario.length==0){
        $('#txt_usu').trigger('focus');
        return Swal.fire("Mensaje de advertencia","El usuario es un campo obligatorio","warning");
    }

    if(pass.length==0){
        $('#txt_password').trigger('focus');
        return Swal.fire("Mensaje de advertencia","El password es un campo obligatorio","warning");
    }

    if(validar_email(email)){

    }else{
        return Swal.fire("Mensaje de advertencia","El formato de email es incorrecto","warning");
    }

    formData.append('usuario',usuario);
    formData.append('pass',pass);
    formData.append('email',email);
    formData.append('idrol',idrol);
    formData.append('foto',foto);
    formData.append('nombrearchivo',nombrearchivo);
    $.ajax({
        url:'../controlador/usuario/usuario_registro.php',
        type:'post',
        data:formData,
        contentType:false,
        processData:false,
        success: function(respuesta){
            if(respuesta !=0){
                if(respuesta==1){
                    LimpiarCampos();
                    t_usuario.ajax.reload();
                    $("#modal_registro").modal('hide');
                    Swal.fire("Mensaje de confirmacion","Datos guardados","success");
                }else{
                    Swal.fire("Mensaje de advertencia","El usuario o email ingresado ya se encuentra en la BD","warning");
                }
            }
        }
    });
    return false;
}

function LimpiarCampos(){
    document.getElementById('txt_usu').value="";
    document.getElementById('txt_password').value="";
    document.getElementById('txt_email').value="";
    document.getElementById('imagen').value="";
}

function validar_email(email) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}

$('#tabla_usuario').on('click','.editar',function(){
    var data = t_usuario.row($(this).parents('tr')).data(); //Detecta a que fila hago click y me captura los datos en la variable data.
    if(t_usuario.row(this).child.isShown()){                //Cuando esta en tamaño responsivo
        var data = t_usuario.row(this).data();
    }
    $("#modal_editar").modal({backdrop:'static',keyboard:false})
    $("#modal_editar").modal('show');
    document.getElementById('txt_usu_id').value=data.ID_USUARIO;
    document.getElementById('txt_usu_editar_actual').value=data.USU_NOMBRE;
    document.getElementById('txt_email_editar_nuevo').value=data.USU_CORREO;
    $("#cbm_rol_editar").val(data.ID_ROL).trigger("change");
    $("#cbm_estatus").val(data.USU_ESTADO).trigger("change");
})

function Editar_Foto(){
    var id = document.getElementById('txt_usu_id').value;
    var archivo = document.getElementById('imagen_editar').value;
    var f = new Date();
    var extension = archivo.split('.').pop();
    var nombrearchivo = "IMG"+f.getDate()+""+(f.getMonth()+1)+""+f.getFullYear()+""+f.getHours()+""+f.getMinutes()+""+f.getSeconds()+"."+extension;
    var formData= new FormData();
    var foto = $("#imagen_editar")[0].files[0];
    if (archivo.length==0){
        return Swal.fire("Mensaje de advertencia","Debe seleccionar un archivo","warning");
    }
    formData.append('id',id);
    formData.append('foto',foto);
    formData.append('nombrearchivo',nombrearchivo);
    $.ajax({
        url:'../controlador/usuario/usuario_editar_imagen.php',
        type:'post',
        data:formData,
        contentType:false,
        processData:false,
        success: function(respuesta){
            if(respuesta !=0){
                if(respuesta==1){
                    t_usuario.ajax.reload();
                    $("#modal_editar").modal('hide');
                    Swal.fire("Mensaje de confirmacion","Foto Actualizada","success");
                }
            }
        }
    });
    return false;
}

function Editar_Usuario(){
    var id = document.getElementById('txt_usu_id').value;
    var emailnuevo = document.getElementById('txt_email_editar_nuevo').value;
    var idrol = document.getElementById('cbm_rol_editar').value;
    var estatus = document.getElementById('cbm_estatus').value;
    if(validar_email(emailnuevo)){

    }else{
        return Swal.fire("Mensaje de advertencia","El formato de email es incorrecto","warning");
    }
    $.ajax({
        url:'../controlador/usuario/usuario_editar.php',
        type:'POST',
        data:{
            id:id,
            emailnuevo:emailnuevo,
            idrol:idrol,
            estatus:estatus
        }
    }).done(function(resp){
        if(resp>0){
            if(resp==1){
                t_usuario.ajax.reload();
                $("#modal_editar").modal('hide');
                Swal.fire("Mensaje de confirmacion","Datos actualizados","success");
            }else{
                Swal.fire("Mensaje de advertencia","El email ingresado ya se encuentra en la BD","warning");
            }
        }else{
            Swal.fire("Mensaje De Error","La actualización no se pudo completar","error");
        }
    })
}

function TraerDatos_Perfil(){
    var id = document.getElementById('txt_codigo_principal').value;
    $.ajax({
        url:'../controlador/usuario/usuario_traerdatos.php',
        type:'POST',
        data:{
            id:id
        }
    }).done(function(resp){
        var data = JSON.parse(resp);
        if(data.length>0){
            document.getElementById('txt_email_profile').innerHTML=data[0][5];
            document.getElementById('txt_imagen_profile').src='../'+data[0][6];
            document.getElementById('txt_rol_profile').innerHTML=data[0][7];
            document.getElementById('txt_conactual_profile').value=data[0][2];
        }
    })
}

function Editar_Foto_Perfil(){
    var id = document.getElementById('txt_codigo_principal').value;
    var archivo = document.getElementById('imagen_profile').value;
    if (archivo.length==0){
        return Swal.fire("Mensaje de advertencia","Debe seleccionar un archivo","warning");
    }
    var f = new Date();
    var extension = archivo.split('.').pop();
    var nombrearchivo = "IMG"+f.getDate()+""+(f.getMonth()+1)+""+f.getFullYear()+""+f.getHours()+""+f.getMinutes()+""+f.getSeconds()+"."+extension;
    var formData= new FormData();
    var foto = $("#imagen_profile")[0].files[0];
    formData.append('id',id);
    formData.append('foto',foto);
    formData.append('nombrearchivo',nombrearchivo);
    $.ajax({
        url:'../controlador/usuario/usuario_editar_imagen.php',
        type:'post',
        data:formData,
        contentType:false,
        processData:false,
        success: function(respuesta){
            if(respuesta !=0){
                if(respuesta==1){
                    TraerDatos_Perfil();
                    Swal.fire("Mensaje de confirmacion","Foto Actualizada","success");
                }
            }
        }
    });
    return false;
}

function Actualizar_Contra(){
    var id = document.getElementById('txt_codigo_principal').value;
    var contraactual = document.getElementById('txt_conactual_profile').value;
    var contraactualescrita = document.getElementById('txt_conactualescrita_profile').value;
    var contranueva = document.getElementById('txt_connueva_profile').value;
    var contrarepetir = document.getElementById('txt_conrepetir_profile').value;
    if(contranueva != contrarepetir){
        return Swal.fire("Mensaje de Advertencia","Debes ingresar la misma clave dos veces para confirmarla","warning");
    }
    $.ajax({
        url:'../controlador/usuario/usuario_editar_contra.php',
        type:'POST',
        data:{
            id:id,
            contraactual:contraactual,
            contraactualescrita:contraactualescrita,
            contranueva:contranueva
        }
    }).done(function(resp){
        if(resp>0){
            if(resp==1){
                Swal.fire("Mensaje de confirmacion","Datos actualizados","success");
                LimpiarContra();
                TraerDatos_Perfil();
            }else{
                Swal.fire("Mensaje de advertencia","La contra\u00f1a actual ingresada no coincide con la de la base de datos","warning");
            }
        }else{
            Swal.fire("Mensaje De Error","La modificacion no se pudo completar","error");
        }
    })  
}

function LimpiarContra(){
    document.getElementById('txt_conactualescrita_profile').value="";
    document.getElementById('txt_connueva_profile').value="";
    document.getElementById('txt_conrepetir_profile').value="";
}
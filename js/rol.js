var t_rol;
function Listar_Rol(){
    t_rol = $("#tabla_rol").DataTable({
        "ordering":false,   
        "pageLength":10,
        "destroy":true,
        "async": false ,
        "responsive": true,
        "autoWidth": false,
        "ajax":{
            "method":"POST",
            "url":"../controlador/rol/listar_rol.php",
        },
        "columns":[
            {"defaultContent":""},
            {"data":"ROL_NOMBRE"},
            {"data":"ROL_FREGISTRO"},
            {"data":"ROL_ESTADO",
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
            $($(nRow).find("td")[2]).css('text-align', 'center' );
            $($(nRow).find("td")[4]).css('text-align', 'left' );
        },
        "language":idioma_espanol,
        select: true
    });
    t_rol.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_rol').DataTable().page.info();
        t_rol.column(0, { page: 'current' }).nodes().each( function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
}

function AbrirModal(){
    $("#modal_registro").modal({backdrop:'static',keyboard:false})
    $("#modal_registro").modal('show');
}

function Registrar_Rol(){
    var rol = document.getElementById('txt_rol').value;
    if(rol.length==0){
        $('#txt_rol').trigger('focus');
        return Swal.fire("Mensaje de advertencia","Llenar el campo vacio","warning");
    }

    $.ajax({
        url:'../controlador/rol/registro_rol.php',
        type:'POST',
        data:{
            rol:rol
        }
    }).done(function(resp){
        if(resp>0){
            if(resp==1){
                document.getElementById('txt_rol').value="";
                t_rol.ajax.reload();
                $("#modal_registro").modal('hide');
                Swal.fire("Mensaje de confirmacion","Datos guardados","success");
            }else{
                Swal.fire("Mensaje de advertencia","El rol ingresado ya se encuentra en la BD","warning");
            }
        }else{
            Swal.fire("Mensaje De Error","El registro no se pudo completar","error");
        }
    })
}

$('#tabla_rol').on('click','.editar',function(){
    var data = t_rol.row($(this).parents('tr')).data(); //Detecta a que fila hago click y me captura los datos en la variable data.
    if(t_rol.row(this).child.isShown()){                //Cuando esta en tamaño responsivo
        var data = t_rol.row(this).data();
    }

    $("#modal_editar").modal({backdrop:'static',keyboard:false})
    $("#modal_editar").modal('show');
    document.getElementById('txtidrol').value=data.ID_ROL;
    document.getElementById('txt_rol_actual_editar').value=data.ROL_NOMBRE;
    document.getElementById('txt_rol_nuevo_editar').value=data.ROL_NOMBRE;
    $("#cbm_estatus").val(data.ROL_ESTADO).trigger("change");
})

function Editar_Rol(){
    var id = document.getElementById('txtidrol').value;
    var rolactual = document.getElementById('txt_rol_actual_editar').value;
    var rolnuevo = document.getElementById('txt_rol_nuevo_editar').value;
    var estatus = document.getElementById('cbm_estatus').value;
    if(id.length==0 || rolactual.length==0 || rolnuevo.length==0 || estatus.length==0){
        $('#txt_rol_nuevo_editar').trigger('focus');
        return Swal.fire("Mensaje de advertencia","Llenar el campo vacio","warning");
    }

    $.ajax({
        url:'../controlador/rol/editar_rol.php',
        type:'POST',
        data:{
            id:id,
            rolactual:rolactual,
            rolnuevo:rolnuevo,
            estatus:estatus
        }
    }).done(function(resp){
        if(resp>0){
            if(resp==1){
                t_rol.ajax.reload();
                $("#modal_editar").modal('hide');
                Swal.fire("Mensaje de confirmacion","Datos actualizados","success");
            }else{
                Swal.fire("Mensaje de advertencia","El rol ingresado ya se encuentra en la BD","warning");
            }
        }else{
            Swal.fire("Mensaje De Error","La actualizacion no se pudo completar","error");
        }
    })
}
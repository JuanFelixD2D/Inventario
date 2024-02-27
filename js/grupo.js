var t_grupo;
function Listar_Grupo(){
    t_grupo = $("#tabla_grupo").DataTable({
        "ordering":false,   
        "pageLength":10,
        "destroy":true,
        "async": false ,
        "responsive": true,
        "autoWidth": false,
        "ajax":{
            "method":"POST",
            "url":"../controlador/grupo/listar_grupo.php",
        },
        "columns":[
            {"defaultContent":""},
            {"data":"GRUPO"},
            {"data":"GRUPO_FREGISTRO"},
            {"data":"GRUPO_ESTADO",
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
    t_grupo.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_grupo').DataTable().page.info();
        t_grupo.column(0, { page: 'current' }).nodes().each( function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
}

function AbrirModal(){
    $("#modal_registro").modal({backdrop:'static',keyboard:false})
    $("#modal_registro").modal('show');
}

function Registrar_Grupo(){
    var grupo = document.getElementById('txt_grupo').value;
    if(grupo.length==0){
        $('#txt_grupo').trigger('focus');
        return Swal.fire("Mensaje de advertencia","Llenar el campo vacio","warning");
    }

    $.ajax({
        url:'../controlador/grupo/registro_grupo.php',
        type:'POST',
        data:{
            grupo:grupo
        }
    }).done(function(resp){
        if(resp>0){
            if(resp==1){
                document.getElementById('txt_grupo').value="";
                t_grupo.ajax.reload();
                $("#modal_registro").modal('hide');
                Swal.fire("Mensaje de confirmacion","Datos guardados","success");
            }else{
                Swal.fire("Mensaje de advertencia","El grupo ingresado ya se encuentra en la BD","warning");
            }
        }else{
            Swal.fire("Mensaje De Error","El registro no se pudo completar","error");
        }
    })
}

$('#tabla_grupo').on('click','.editar',function(){
    var data = t_grupo.row($(this).parents('tr')).data(); //Detecta a que fila hago click y me captura los datos en la variable data.
    if(t_grupo.row(this).child.isShown()){                //Cuando esta en tamaño responsivo
        var data = t_grupo.row(this).data();
    }

    $("#modal_editar").modal({backdrop:'static',keyboard:false})
    $("#modal_editar").modal('show');
    document.getElementById('txtidgrupo').value=data.ID_GRUPO;
    document.getElementById('txt_grupo_actual_editar').value=data.GRUPO;
    document.getElementById('txt_grupo_nuevo_editar').value=data.GRUPO;
    $("#cbm_estatus").val(data.GRUPO_ESTADO).trigger("change");
})

function Editar_Grupo(){
    var id = document.getElementById('txtidgrupo').value;
    var grupoactual = document.getElementById('txt_grupo_actual_editar').value;
    var gruponuevo = document.getElementById('txt_grupo_nuevo_editar').value;
    var estatus = document.getElementById('cbm_estatus').value;
    if(id.length==0 || grupoactual.length==0 || gruponuevo.length==0 || estatus.length==0){
        $('#txt_grupo_nuevo_editar').trigger('focus');
        return Swal.fire("Mensaje de advertencia","Llenar el campo vacio","warning");
    }

    $.ajax({
        url:'../controlador/grupo/editar_grupo.php',
        type:'POST',
        data:{
            id:id,
            grupoactual:grupoactual,
            gruponuevo:gruponuevo,
            estatus:estatus
        }
    }).done(function(resp){
        if(resp>0){
            if(resp==1){
                t_grupo.ajax.reload();
                $("#modal_editar").modal('hide');
                Swal.fire("Mensaje de confirmacion","Datos actualizados","success");
            }else{
                Swal.fire("Mensaje de advertencia","El grupo ingresado ya se encuentra en la BD","warning");
            }
        }else{
            Swal.fire("Mensaje De Error","La actualizacion no se pudo completar","error");
        }
    })
}
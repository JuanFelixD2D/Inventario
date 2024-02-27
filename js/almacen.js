var t_almacen;
function Listar_Almacen(){
    t_almacen = $("#tabla_almacen").DataTable({
        "ordering":false,   
        "pageLength":10,
        "destroy":true,
        "async": false ,
        "responsive": true,
        "autoWidth": false,
        "ajax":{
            "method":"POST",
            "url":"../controlador/almacen/listar_almacen.php",
        },
        "columns":[
            {"defaultContent":""},
            {"data":"ALMACEN"},
            {"data":"TIPO"},
            {"data":"ALMACEN_ESTADO",
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
            $($(nRow).find("td")[4]).css('text-align', 'left' );
        },
        "language":idioma_espanol,
        select: true
    });
    t_almacen.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_almacen').DataTable().page.info();
        t_almacen.column(0, { page: 'current' }).nodes().each( function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
}

function AbrirModal(){
    $("#modal_registro").modal({backdrop:'static',keyboard:false})
    $("#modal_registro").modal('show');
}

function Registrar_Almacen(){
    var almacen = document.getElementById('txt_almacen').value;
    var tipo = document.getElementById('cbm_tipo').value;
    if(almacen.length==0){
        $('#txt_almacen').trigger('focus');
        return Swal.fire("Mensaje de advertencia","Llenar el campo vacio por favor","warning");
    }

    if(tipo.length==0){
        $('#cbm_tipo').trigger('focus');
        return Swal.fire("Mensaje de advertencia","Seleccione el tipo de almacén por favor","warning");
    }

    $.ajax({
        url:'../controlador/almacen/registro_almacen.php',
        type:'POST',
        data:{
            almacen:almacen,
            tipo:tipo
        }
    }).done(function(resp){
        if(resp>0){
            if(resp==1){
                document.getElementById('txt_almacen').value="";
                t_almacen.ajax.reload();
                $("#modal_registro").modal('hide');
                Swal.fire("Mensaje de confirmacion","Datos guardados","success");
            }else{
                Swal.fire("Mensaje de advertencia","El almacén ingresado ya se encuentra en la BD","warning");
            }
        }else{
            Swal.fire("Mensaje De Error","El registro no se pudo completar","error");
        }
    })
}

$('#tabla_almacen').on('click','.editar',function(){
    var data = t_almacen.row($(this).parents('tr')).data(); //Detecta a que fila hago click y me captura los datos en la variable data.
    if(t_almacen.row(this).child.isShown()){                //Cuando esta en tamaño responsivo
        var data = t_almacen.row(this).data();
    }

    $("#modal_editar").modal({backdrop:'static',keyboard:false})
    $("#modal_editar").modal('show');
    document.getElementById('txtidalmacen').value=data.ID_ALMACEN;
    document.getElementById('txt_almacen_actual_editar').value=data.ALMACEN;
    document.getElementById('txt_almacen_nuevo_editar').value=data.ALMACEN;
    $("#cbm_estatus").val(data.ALMACEN_ESTADO).trigger("change");
})

function Editar_Almacen(){
    var id = document.getElementById('txtidalmacen').value;
    var almacenactual = document.getElementById('txt_almacen_actual_editar').value;
    var almacennuevo = document.getElementById('txt_almacen_nuevo_editar').value;
    var tipoeditar = document.getElementById('cbm_tipo_editar').value;
    var estatus = document.getElementById('cbm_estatus').value;
    if(id.length==0 || almacenactual.length==0 || almacennuevo.length==0 || tipoeditar.length==0 || estatus.length==0){
        $('#txt_almacen_nuevo_editar').trigger('focus');
        return Swal.fire("Mensaje de advertencia","Llenar el campo vacio","warning");
    }

    $.ajax({
        url:'../controlador/almacen/editar_almacen.php',
        type:'POST',
        data:{
            id:id,
            almacenactual:almacenactual,
            almacennuevo:almacennuevo,
            tipoeditar:tipoeditar,
            estatus:estatus
        }
    }).done(function(resp){
        if(resp>0){
            if(resp==1){
                t_almacen.ajax.reload();
                $("#modal_editar").modal('hide');
                Swal.fire("Mensaje de confirmacion","Datos actualizados","success");
            }else{
                Swal.fire("Mensaje de advertencia","El almacén ingresado ya se encuentra en la BD","warning");
            }
        }else{
            Swal.fire("Mensaje De Error","La actualizacion no se pudo completar","error");
        }
    })
}
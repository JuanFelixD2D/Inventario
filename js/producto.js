function Listar_Combo_Almacen(){
    $.ajax({
        url:"../controlador/producto/almacen_listar_combo.php",
        type:'POST'
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena = "";
        if(data.length>0){
            for (var i=0; i < data.length; i++) {
                cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
            }
            document.getElementById('cbm_talmacen').innerHTML=cadena;
            document.getElementById('cbm_almacen').innerHTML=cadena;
            document.getElementById('cbm_almacen_editar').innerHTML=cadena;
        }else{
            document.getElementById('cbm_talmacen').innerHTML="No se encontraron datos";
            document.getElementById('cbm_almacen').innerHTML="No se encontraron datos";
            document.getElementById('cbm_almacen_editar').innerHTML="No se encontraron datos";
        }
    })
}

var t_producto;
function Listar_Producto(){
    var talmacen = document.getElementById('cbm_talmacen').value;
    t_producto = $("#tabla_producto").DataTable({
        "ordering":false,   
        "pageLength":10,
        "destroy":true,
        "async": false ,
        "responsive": true,
        "autoWidth": false,
        "ajax":{
            "method":"POST",
            "url":"../controlador/producto/listar_producto.php",
            data:{
                almacen:talmacen
            }
        },
        "columns":[
            {"defaultContent":""},
            {"data":"PRODUCTO"},
            {"data":"GRUPO"},
            {"data":"ALMACEN"},
            {"data":"PRECIO",
                render: function(data, type, row){
                    if (data === '0.0000') {
                        return 0 - parseFloat(data).toFixed(2);
                    } else {
                        return parseFloat(data).toFixed(2);
                    }
                }
            },
            {"data":"VENTA"},
            {"data":"ESTADO",
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
            $($(nRow).find("td")[3]).css('text-align', 'center' );
            $($(nRow).find("td")[4]).css('text-align', 'center' );
            $($(nRow).find("td")[5]).css('text-align', 'center' );
            $($(nRow).find("td")[7]).css('text-align', 'center' );
        },
        "language":idioma_espanol,
        select: true
    });
    t_producto.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_producto').DataTable().page.info();
        t_producto.column(0, { page: 'current' }).nodes().each( function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
}

function AbrirModal(){
    $("#modal_registro").modal({backdrop:'static',keyboard:false})
    $("#modal_registro").modal('show');
}

function Listar_Combo_Grupo(){
    $.ajax({
        url:"../controlador/producto/grupo_listar_combo.php",
        type:'POST'
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena = "";
        if(data.length>0){
            for (var i=0; i < data.length; i++) {
                cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
            }
            document.getElementById('cbm_grupo').innerHTML=cadena;
            document.getElementById('cbm_grupo_editar').innerHTML=cadena;
        }else{
            document.getElementById('cbm_grupo').innerHTML="No se encontraron datos";
            document.getElementById('cbm_grupo_editar').innerHTML="No se encontraron datos";
        }
    })
}

function Registrar_Producto(){
    var producto = document.getElementById('txt_producto').value;
    var descripcion = document.getElementById('txt_descripcion').value;
    var idgrupo = document.getElementById('cbm_grupo').value;
    var idalmacen = document.getElementById('cbm_almacen').value;
    var precio = document.getElementById('txt_precio').value;
    var venta = document.getElementById('cbm_venta').value;

    var usuario = document.getElementById('text_usu').value;
    if(producto.length == 0 || descripcion.length == 0 || idgrupo.length == 0 || idalmacen.length == 0 ||
        precio.length  == 0 || venta.length       == 0 || usuario.length   == 0){
        mensajeerror(producto, descripcion, idgrupo, idalmacen, precio, venta, 'div_error');
        return Swal.fire("Mensaje de advertencia","Llenar el campo vacio","warning");
    }

    if(parseFloat(precio)<0.01){
        return Swal.fire("Mesaje de Advertencia","El precio debe ser mayor a 0","warning");
    }

    $.ajax({
        url:'../controlador/producto/registro_producto.php',
        type:'POST',
        data:{
            producto:producto,
            descripcion:descripcion,
            idgrupo:idgrupo,
            idalmacen:idalmacen,
            precio:precio,
            venta:venta,
            usuario:usuario
        }
    }).done(function(resp){
        if(isNaN(resp)){
            document.getElementById('div_error').style.display="block";
            document.getElementById('div_error').innerHTML="<strong>Revise los siguientes campos:</strong><br>"+resp;
        } else {
            if(resp>0){
                document.getElementById('div_error').style.display="none";
                document.getElementById('div_error').innerHTML="";
                if(resp==1){
                    LimpiarCampos();
                    t_producto.ajax.reload();
                    $("#modal_registro").modal('hide');
                    Swal.fire("Mensaje de confirmacion","Datos guardados","success");
                }else{
                    Swal.fire("Mensaje de advertencia","El producto ingresado ya se encuentra en la BD","warning");
                }
            }else{
                Swal.fire("Mensaje De Error","El registro no se pudo completar","error");
            }
        }
    })
}

function  mensajeerror(producto, descripcion, idgrupo, idalmacen, stock, precio, venta, id){
    var cadena="";
    if(producto.length==0){
        $('#txt_producto').trigger('focus');
        cadena+="El campo producto no debe estar vacio.<br>"
    }

    if(descripcion.length==0){
        $('#txt_descripcion').trigger('focus');
        cadena+="El campo descripción no debe estar vacio.<br>"
    }

    if(idgrupo.length==0){
        $('#cbm_grupo').trigger('focus');
        cadena+="Debe seleccionar un grupo.<br>"
    }

    if(idalmacen.length==0){
        $('#cbm_almacen').trigger('focus');
        cadena+="Debe seleccionar un almacén.<br>"
    }

    if(precio.length==0){
        $('#txt_precio').trigger('focus');
        cadena+="El campo precio no debe estar vacio.<br>"
    }
    if(venta.length==0){
        $('#cbm_venta').trigger('focus');
        cadena+="Debe seleccionar si es venta o no.<br>"
    }
    document.getElementById(id).style.display="block";
    document.getElementById(id).innerHTML="<strong>Revise los siguientes campos:</strong><br>"+cadena;
}

function LimpiarCampos(){
    document.getElementById('txt_producto').value="";
    document.getElementById('txt_descripcion').value="";
    document.getElementById('txt_precio').value="";
}

$('#tabla_producto').on('click','.editar',function(){
    var data = t_producto.row($(this).parents('tr')).data(); //Detecta a que fila hago click y me captura los datos en la variable data.
    if(t_producto.row(this).child.isShown()){                //Cuando esta en tamaño responsivo
        var data = t_producto.row(this).data();
    }

    $("#modal_editar").modal({backdrop:'static',keyboard:false})
    $("#modal_editar").modal('show');
    document.getElementById('txtidproducto').value=data.ID_PRODUCTO;
    document.getElementById('txt_producto_editar').value=data.PRODUCTO;
    document.getElementById('txt_descripcion_editar').value=data.DESCRIPCION;
    $("#cbm_grupo_editar").val(data.ID_GRUPO).trigger("change");
    $("#cbm_almacen_editar").val(data.ID_ALMACEN).trigger("change");
    $("#txt_precio_editar").val(parseFloat(data.PRECIO).toFixed(2));
    $("#cbm_venta_editar").val(data.VENTA).trigger("change");
    let status = "";
    if (data.ESTADO == "ACTIVO") { status = "Y"; } else { status = "N"; }
    $("#cbm_estatus").val(status).trigger("change");
})

function Editar_Producto(){
    var id = document.getElementById('txtidproducto').value;
    var producto = document.getElementById('txt_producto_editar').value;
    var descripcion = document.getElementById('txt_descripcion_editar').value;
    var idgrupo = document.getElementById('cbm_grupo_editar').value;
    var idalmacen = document.getElementById('cbm_almacen_editar').value;
    var precio = document.getElementById('txt_precio_editar').value;
    var venta = document.getElementById('cbm_venta_editar').value;
    var estatus = document.getElementById('cbm_estatus').value;

    if(id.length     == 0 || producto.length == 0 || descripcion.length == 0 || idgrupo.length == 0 || idalmacen.length == 0 || 
        precio.length   == 0 || venta.length       == 0 || estatus.length == 0){
        mensajeerror(producto, descripcion, idgrupo, idalmacen, stock, precio, venta, 'div_error');
        return Swal.fire("Mensaje de advertencia","Llenar el campo vacio","warning");
    }

    $.ajax({
        url:'../controlador/producto/editar_producto.php',
        type:'POST',
        data:{
            id:id,
            producto:producto,
            descripcion:descripcion,
            idgrupo:idgrupo,
            idalmacen:idalmacen,
            precio:precio,
            venta:venta,
            estatus:estatus
        }
    }).done(function(resp){
        if(isNaN(resp)){
            document.getElementById('div_error_editar').style.display="block";
            document.getElementById('div_error_editar').innerHTML="<strong>Revise los siguientes campos:</strong><br>"+resp;
        }else{
            if(resp>0){
                document.getElementById('div_error_editar').style.display="none";
                document.getElementById('div_error_editar').innerHTML="";
                if(resp==1){
                    t_producto.ajax.reload();
                    $("#modal_editar").modal('hide');
                    Swal.fire("Mensaje de confirmacion","Datos actualizados","success");
                }else{
                    Swal.fire("Mensaje de advertencia","La razón social o el RUC ingresado ya se encuentra en la BD","warning");
                }
            }else{
                Swal.fire("Mensaje De Error","La actualización no se pudo completar","error");
            }
        }
    })
}
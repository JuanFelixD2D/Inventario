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
            document.getElementById('cbm_almacen').innerHTML=cadena;
            document.getElementById('cbm_talmacen').innerHTML=cadena;
        }else{
            document.getElementById('cbm_almacen').innerHTML="No se encontraron datos";
            document.getElementById('cbm_talmacen').innerHTML="No se encontraron datos";
        }
    })
}

function Listar_Combo_Tipo(){
    $.ajax({
        url:"../controlador/movimiento/tipo_listar_combo.php",
        type:'POST'
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena = "";
        if(data.length>0){
            cadena+="<option value='0'>TODOS</option>";
            for (var i=0; i < data.length; i++) {
                cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
            }
            document.getElementById('cbm_tipo').innerHTML=cadena;
        }else{
            document.getElementById('cbm_tipo').innerHTML="No se encontraron datos";
        }
    })
}

function Listar_Combo_Tipo_Por_Producto(){
    var producto = document.getElementById('cbm_producto').value;
    var almacen = document.getElementById('cbm_talmacen').value;
    console.log(producto + '-' + almacen);
    $.ajax({
        url:"../controlador/movimiento/tipo_listar_combo_por_producto.php",
        type:'POST',
        data:{
            producto:producto,
            almacen:almacen
        }
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena = "";
        if(data.length>0){
            for (var i=0; i < data.length; i++) {
                cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
            }
            document.getElementById('cbm_ttipo').innerHTML=cadena;
        }else{
            document.getElementById('cbm_ttipo').innerHTML="No se encontraron datos";
        }
    })
}

var t_movimiento;
function Listar_Movimiento(){
    var finicio = document.getElementById('txt_finicio').value;
    var ffin = document.getElementById('txt_ffin').value;
    var almacen = document.getElementById('cbm_almacen').value;
    var tipo = document.getElementById('cbm_tipo').value;
    t_movimiento = $("#tabla_movimiento").DataTable({
		"ordering":false,   
        "pageLength":10,
        "destroy":true,
        "async": false ,
        "responsive": true,
    	"autoWidth": false,
        "ajax":{
            "method":"POST",
            "url":"../controlador/movimiento/listar_movimiento.php",
            data:{
                finicio:finicio,
                ffin:ffin,
                almacen:almacen,
                tipo:tipo
            }
        },
        "columns":[
            {"defaultContent":""},
            {"data":"PRODUCTO"},
            {"data":"TIPO"},
            {"data":"CANTIDAD",
                render: function(data, type, row){
                    if (data === '0.0000') {
                        return 0 - parseFloat(data).toFixed(4);
                    } else {
                        return parseFloat(data).toFixed(4);
                    }
                }
            },
            {"data":"FECHA_ASOCIADA"},
            {"data":"USU_CREACION"},
            {"data":"FECHA_CREACION"},
            {"data":"ESTADO",
                render: function(data,type,row){
                    if(data==="ACTIVADO"){
                        return "<span class='badge badge-success badge-pill m-r-5 m-b-5'>"+data+"</span>";
                    }else{
                        return "<span class='badge badge-danger badge-pill m-r-5 m-b-5'>"+data+"</span>";
                    }
                }
            },
            /*{"defaultContent":"<button class='anular btn btn-danger'><i class='fa fa-trash'></i></button>"}*/  
        ],
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
        	$($(nRow).find("td")[4]).css('text-align', 'left' );
        },
        "language":idioma_espanol,
        select: true
	});
	t_movimiento.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_movimiento').DataTable().page.info();
        t_movimiento.column(0, { page: 'current' }).nodes().each( function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
}

function AbrirModal(){
    $("#modal_registro").modal({backdrop:'static',keyboard:false})
    $("#modal_registro").modal('show');
    Listar_Combo_Producto();
}

function Listar_Combo_Producto(){
    var almacen = document.getElementById('cbm_talmacen').value;

    $.ajax({
        url:"../controlador/movimiento/producto_listar_combo.php",
        type:'POST',
        data:{
            almacen:almacen
        }
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena = "";
        if(data.length>0){
            for (var i=0; i < data.length; i++) {
                cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
            }
            document.getElementById('cbm_producto').innerHTML=cadena;
            $("#cbm_producto").prop('disabled', false);
            $("#cbm_ttipo").prop('disabled', false);
            $("#txt_cantidad").prop('disabled', false);
            $("#btnAgregarProducto").prop('disabled', false);
            $("#btnRegistrarMovimiento").prop('disabled', false);
            setTimeout(function(){ Listar_Combo_Tipo_Por_Producto(); }, 10);
        }else{
            $("#cbm_producto").empty();
            $("#cbm_ttipo").empty();
            $("#cbm_producto").prop('disabled', true);
            $("#cbm_ttipo").prop('disabled', true);
            $("#txt_cantidad").prop('disabled', true);
            $("#btnAgregarProducto").prop('disabled', true);
            $("#btnRegistrarMovimiento").prop('disabled', true);
            document.getElementById('cbm_producto').innerHTML="No se encontraron datos";
        }
    })
}

function Agregar_Ingreso_Producto(){

    if($("#detalle_ingreso tbody#tbody_detalle_ingreso tr").length==1){
        return Swal.fire("Mesaje de Advertencia","Solo se permite un movimiento para registrar por lo menos","warning");
    }

    let idproducto = document.getElementById('cbm_producto').value;
    let producto = $("#cbm_producto option:selected").text();
    let idtipo = document.getElementById('cbm_ttipo').value;
    let tipo = $("#cbm_ttipo option:selected").text();
    let cantidad = document.getElementById('txt_cantidad').value;

    var usuario = document.getElementById('text_usu').value;

    if(idproducto == ''){
        return Swal.fire("Mesaje de Advertencia","Seleccione un producto","warning");
    }

    if(cantidad.length == 0){
        return Swal.fire("Mesaje de Advertencia","Llene la cantidad","warning");
    }


    if(parseFloat(cantidad)<0.01 && idtipo != '5'){
        return Swal.fire("Mesaje de Advertencia","La cantidad debe ser mayor a 0","warning");
    }

    if(Verificar_Id(idproducto)){
        return Swal.fire("Mesaje de Advertencia","El producto ya fue asignado a la tabla","warning");
    }

    let datos_agregar ="<tr>";
    datos_agregar+="<td for='id'>"+idproducto+"</td>";
    datos_agregar+="<td>"+producto+"</td>";
    datos_agregar+="<td style='display:none' for='id'>"+idtipo+"</td>";
    datos_agregar+="<td>"+tipo+"</td>";
    datos_agregar+="<td style='text-align:center'>"+cantidad+"</td>";
    datos_agregar+="<td style='display:none'>"+usuario+"</td>";
    datos_agregar+="<td><button class='btn btn-danger' onclick='Remove(this)'><i class='fa fa-trash'></i></button></td>";
    datos_agregar+="</tr>";
    $("#tbody_detalle_ingreso").append(datos_agregar);
    
    if($("#detalle_ingreso").length > 0){
        document.getElementById('t_resposive').style.display="block";
    }
}

function Verificar_Id(id){
    let idverficiar = document.querySelectorAll('#detalle_ingreso td[for="id"]');
    return [].filter.call(idverficiar, td=> td.textContent === id).length===1;
}

function Remove(t){
    var td = t.parentNode;
    var tr = td.parentNode;
    var table = tr.parentNode;
    table.removeChild(tr);
    document.getElementById('t_resposive').style.display="none";
}

function Registrar_Movimiento(){
    let count=0;
    let arreglo_producto = new Array();
    let arreglo_tipo     = new Array();
    let arreglo_cantidad = new Array();
    let arreglo_usuario  = new Array();
    $("#detalle_ingreso tbody#tbody_detalle_ingreso tr").each(function () {
        arreglo_producto.push($(this).find('td').eq(0).text());
        arreglo_tipo.push($(this).find('td').eq(2).text());
        arreglo_cantidad.push($(this).find('td').eq(4).text());
        arreglo_usuario.push($(this).find('td').eq(5).text());
        count++;
    })

    if(count==0){
        return Swal.fire("Mesaje de Advertencia","El ingreso debe tener un producto por lo menos","warning");
    }

    let producto = arreglo_producto.toString();
    let tipo     = arreglo_tipo.toString();
    let cantidad = arreglo_cantidad.toString();
    let usuario  = arreglo_usuario.toString();

    $.ajax({
        url:'../controlador/movimiento/registro_movimiento.php',
        type:'POST',
        data:{
            producto:producto,
            tipo:tipo,
            cantidad:cantidad,
            usuario:usuario
        }
    }).done(function(resp){
        if(resp>0){
            if(resp==1){
                document.getElementById('txt_cantidad').value="";
                $('#tbody_detalle_ingreso').empty();
                document.getElementById('t_resposive').style.display="none";
                t_movimiento.ajax.reload();
                $("#modal_registro").modal('hide');
                Swal.fire("Mensaje de confirmacion","Datos guardados","success");
            }
        }else{
            Swal.fire("Mensaje De Error","El registro no se pudo completar","error");
        }
    })
}

function Exportar_Movimientos_PDF(){
    var finicio = document.getElementById('txt_finicio').value;
    var ffin = document.getElementById('txt_ffin').value;
    var almacen = document.getElementById('cbm_almacen').value;
    var tipo = document.getElementById('cbm_tipo').value;
    window.open("../reporte/reporte_movimientos.php?fecha_ini="+finicio+"&fecha_fin="+ffin+"&almacen="+almacen+"&tipo="+tipo+"#zoom=100","Reporte de Movimientos");
}

function Exportar_Movimientos_Excel(){
    var finicio = document.getElementById('txt_finicio').value;
    var ffin = document.getElementById('txt_ffin').value;
    var almacen = document.getElementById('cbm_almacen').value;
    var tipo = document.getElementById('cbm_tipo').value;

    $.ajax({
        url:'../utilitarios/phpspreadsheet/excel_movimientos.php',
        type:'POST',
        data:{
            finicio:finicio,
            ffin:ffin,
            almacen:almacen,
            tipo:tipo
        },
        cache: false,
        success: function(dataResult){
            window.open('../utilitarios/phpspreadsheet/excel_movimientos.php?fecha_ini='+finicio+'&fecha_fin='+ffin+'&almacen='+almacen+'&tipo='+tipo);
        }
    });
}

function Exportar_Stocks_PDF(){
    var finicio = document.getElementById('txt_finicio').value;
    var ffin = document.getElementById('txt_ffin').value;
    var almacen = document.getElementById('cbm_almacen').value;
    window.open("../reporte/reporte_stocks.php?fecha_ini="+finicio+"&fecha_fin="+ffin+"&almacen="+almacen+"#zoom=100","Reporte de Stocks");
}

function Exportar_Stocks_Excel(){
    var finicio = document.getElementById('txt_finicio').value;
    var ffin = document.getElementById('txt_ffin').value;
    var almacen = document.getElementById('cbm_almacen').value;

    $.ajax({
        url:'../utilitarios/phpspreadsheet/excel_stocks.php',
        type:'POST',
        data:{
            finicio:finicio,
            ffin:ffin,
            almacen:almacen
        },
        cache: false,
        success: function(dataResult){
            window.open('../utilitarios/phpspreadsheet/excel_stocks.php?fecha_ini='+finicio+'&fecha_fin='+ffin+'&almacen='+almacen);
        }
    });
}

// $('#tabla_ingreso').on('click','.anular',function(){
//     var data = t_ingreso.row($(this).parents('tr')).data();//Detecta a que fila hago click y me captura los datos en la variable data.
//     if(t_ingreso.row(this).child.isShown()){//Cuando esta en tamaño responsivo
//         var data = t_ingreso.row(this).data();
//     }

//     Swal.fire({
//         title: 'Desea anular el ingreso',
//         text: "Una vez anulado no se podran revertir el proceso",
//         icon: 'success',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Anular Ingreso'
//       }).then((result) => {
//         if (result.value) {
//             $.ajax({
//                 url:'../controlador/ingreso/anular_ingreso.php',
//                 type:'POST',
//                 data:{
//                     idingreso:data.ID_INGRESO
//                 }
//             }).done(function(resp){
//                 if(resp>0){
//                     Swal.fire("Mensaje de Confirmación","El Ingreso fue anulado exitosamente","success");
//                     t_ingreso.ajax.reload();
//                 }else{
//                     Swal.fire("Mensaje De Error","El registro no se pudo completar","error");
//                 }
//             })
//         }
//     })
// })
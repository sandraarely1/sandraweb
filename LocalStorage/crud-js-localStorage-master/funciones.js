var dbAutos = localStorage.getItem("dbAutos");
var operacion = "A"; // "A"=agregar; "E"=editar
dbAutos = JSON.parse(dbAutos);

if (dbAutos === null) dbAutos = [];

function Mensaje(t) {
    switch (t) {
        case 1:
            $(".mensaje-alerta").append(
                "<div class='alert alert-success' role='alert'>Auto agregado correctamente</div>"
            );
            break;
        case 2:
            $(".mensaje-alerta").append(
                "<div class='alert alert-danger' role='alert'>Auto eliminado correctamente</div>"
            );
            break;
    }
}

function AgregarAuto() {
    var datos_auto = JSON.stringify({
        Marca: $("#marca").val(),
        Modelo: $("#modelo").val(),
        Anio: $("#anio").val(),
        Color: $("#color").val(),
        Precio: $("#precio").val(),
        Nombre_comprador: $("#nombre_comprador").val()
    });

    dbAutos.push(datos_auto);
    localStorage.setItem("dbAutos", JSON.stringify(dbAutos));
    ListarAutos();
    return Mensaje(1);
}

function ListarAutos() {
    $("#dbTrabajadores-list").html(
        "<thead>" +
            "<tr>" +
                "<th>ID</th>" +
                "<th>Marca</th>" +
                "<th>Modelo</th>" +
                "<th>Año</th>" +
                "<th>Color</th>" +
                "<th>Precio</th>" +
                "<th>Comprador</th>" +
                "<th></th><th></th>" +
            "</tr>" +
        "</thead>" +
        "<tbody></tbody>"
    );

    for (var i in dbAutos) {
        var a = JSON.parse(dbAutos[i]);
        $("#dbTrabajadores-list").append(
            "<tr>" +
                "<td>" + i + "</td>" +
                "<td>" + a.Marca + "</td>" +
                "<td>" + a.Modelo + "</td>" +
                "<td>" + a.Anio + "</td>" +
                "<td>" + a.Color + "</td>" +
                "<td>Q" + a.Precio + "</td>" +
                "<td>" + a.Nombre_comprador + "</td>" +
                "<td><a id='" + i + "' class='btnEditar' href='#'><span class='glyphicon glyphicon-pencil'></span></a></td>" +
                "<td><a id='" + i + "' class='btnEliminar' href='#'><span class='glyphicon glyphicon-trash'></span></a></td>" +
            "</tr>"
        );
    }
}

function contarAutos() {
    var n = dbAutos.length;
    $("#numeroTrabajadores").append(
        "<a>Actualmente hay<br><span class='badge'>" + n + "</span></a> autos registrados"
    );
    return n;
}

function Eliminar(index) {
    dbAutos.splice(index, 1);
    localStorage.setItem("dbAutos", JSON.stringify(dbAutos));
    return Mensaje(2);
}

function Editar() {
    dbAutos[indice_seleccionado] = JSON.stringify({
        Marca: $("#marca").val(),
        Modelo: $("#modelo").val(),
        Anio: $("#anio").val(),
        Color: $("#color").val(),
        Precio: $("#precio").val(),
        Nombre_comprador: $("#nombre_comprador").val()
    });
    localStorage.setItem("dbAutos", JSON.stringify(dbAutos));
    operacion = "A";
    return true;
}

// Mostrar lista si hay datos
if (dbAutos.length !== 0) {
    ListarAutos();
} else {
    $("#dbTrabajadores-list").append("<h2>No hay autos registrados</h2>");
}

contarAutos();

// Eventos
$(document).on("click", ".btnEliminar", function() {
    alert("¿Quieres eliminar este auto?");
    indice_seleccionado = $(this).attr("id");
    Eliminar(indice_seleccionado);
    ListarAutos();
});

$(document).on("click", ".btnEditar", function() {
    alert("Editar auto");
    $(".modo").html("<span class='glyphicon glyphicon-pencil'></span> Modo edición");
    operacion = "E";
    indice_seleccionado = $(this).attr("id");
    var auto = JSON.parse(dbAutos[indice_seleccionado]);

    $("#marca").val(auto.Marca);
    $("#modelo").val(auto.Modelo);
    $("#anio").val(auto.Anio);
    $("#color").val(auto.Color);
    $("#precio").val(auto.Precio);
    $("#nombre_comprador").val(auto.Nombre_comprador);
    $("#marca").focus();
});

$("#trabajadores-form").bind("submit", function () {
    if (operacion === "A") return AgregarAuto();
    else return Editar();
});

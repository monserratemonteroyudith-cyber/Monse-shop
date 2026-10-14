const botonesCarrito = document.querySelectorAll(".agregar-carrito");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const cantidadCarrito = document.getElementById("cantidad-carrito");

let carrito = [];

botonesCarrito.forEach(function(boton) {
    boton.addEventListener("click", function() {
        const nombre = boton.dataset.nombre;
        const precio = Number(boton.dataset.precio);

        const idTalla = boton.dataset.talla;
        const idColor = boton.dataset.color;
        const idCantidad = boton.dataset.cantidad;

        const talla = idTalla
            ? document.getElementById(idTalla).value
            : "";

        const color = idColor
            ? document.getElementById(idColor).value
            : "";

        const cantidad = idCantidad
            ? Math.max(1, Number(document.getElementById(idCantidad).value) || 1)
            : 1;

        carrito.push({
            nombre: nombre,
            precio: precio,
            talla: talla,
            color: color,
            cantidad: cantidad
        });

        mostrarCarrito();
    });
});

function mostrarCarrito() {
    listaCarrito.innerHTML = "";

    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach(function(producto, indice) {
        const subtotal = producto.precio * (producto.cantidad || 1);
        total += subtotal;
        cantidadTotal += producto.cantidad || 1;

        const elemento = document.createElement("li");

        let detalles = producto.nombre;

        if (producto.talla) {
            detalles += " | Talla: " + producto.talla;
        }

        if (producto.color) {
            detalles += " | Color: " + producto.color;
        }

        detalles += " | Cantidad: " + (producto.cantidad || 1);
        detalles += " | Subtotal: RD$ " +
            subtotal.toLocaleString("es-DO");

        elemento.appendChild(document.createTextNode(detalles));

        const eliminar = document.createElement("button");
        eliminar.textContent = "Eliminar";

        eliminar.addEventListener("click", function() {
            carrito.splice(indice, 1);
            mostrarCarrito();
        });

        elemento.appendChild(eliminar);
        listaCarrito.appendChild(elemento);
    });

    totalCarrito.textContent =
        "RD$ " + total.toLocaleString("es-DO");

    cantidadCarrito.textContent = cantidadTotal;
}
const botonWhatsApp = document.getElementById("enviar-whatsapp");

botonWhatsApp.addEventListener("click", function() {
    if (carrito.length === 0) {
        alert("Primero agrega algún producto al carrito.");
        return;
    }

    let mensaje = "¡Hola! Quiero realizar este pedido:\n\n";
    let total = 0;

    carrito.forEach(function(producto) {
        const cantidad = producto.cantidad || 1;
        const subtotal = producto.precio * cantidad;

        mensaje += "- " + producto.nombre + "\n";

        if (producto.talla) {
            mensaje += "  Talla: " + producto.talla + "\n";
        }

        if (producto.color) {
            mensaje += "  Color: " + producto.color + "\n";
        }

        mensaje += "  Cantidad: " + cantidad + "\n";
        mensaje += "  Subtotal: RD$ " +
            subtotal.toLocaleString("es-DO") + "\n\n";

        total += subtotal;
    });

    mensaje += "Total: RD$ " +
        total.toLocaleString("es-DO");

    mensaje += "\n\n¿Me pueden confirmar la disponibilidad?";

    const telefono = "18097796487";
    const enlace = "https://wa.me/" + telefono +
        "?text=" + encodeURIComponent(mensaje);

    window.open(enlace, "_blank");
});

const formularioPedido = document.getElementById("formulario-pedido");

formularioPedido.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const tienda = document.getElementById("tienda-pedido").value;
    const nombre = document.getElementById("nombre-cliente").value.trim();
    const enlace = document.getElementById("enlace-producto").value.trim();
    const detalles = document.getElementById("detalles-pedido").value.trim();

    const mensaje =
    "¡Hola! Quiero solicitar un pedido especial. 💙\n\n" +
    "Nombre: " + nombre + "\n" +
    "Tienda: " + tienda + "\n" +
    "Enlace del producto: " + (enlace || "No tengo el enlace") + "\n" +
    "Detalles: " + detalles + "\n\n" +
    "Si tengo una foto del artículo, la adjuntaré en este chat. " +
    "Por favor, ayúdenme con esta solicitud.";

    const telefono = "18097796487";

    const url = "https://wa.me/" + telefono +
        "?text=" + encodeURIComponent(mensaje);

    window.open(url, "_blank");
});

const tarjetasTienda = document.querySelectorAll(".tarjeta-tienda");
const campoTienda = document.getElementById("tienda-pedido");

tarjetasTienda.forEach(function(tarjeta) {
    tarjeta.addEventListener("click", function() {
        tarjetasTienda.forEach(function(otraTarjeta) {
            otraTarjeta.classList.remove("seleccionada");
        });

        tarjeta.classList.add("seleccionada");
        campoTienda.value = tarjeta.dataset.tienda;
    });
});

const botonVaciarCarrito = document.getElementById("vaciar-carrito");

botonVaciarCarrito.addEventListener("click", function() {
    if (carrito.length === 0) {
        alert("El carrito ya está vacío. 💙");
        return;
    }

    const confirmar = confirm("¿Seguro que quieres vaciar todo el carrito?");

    if (confirmar) {
        carrito = [];
        mostrarCarrito();
        alert("Tu carrito se ha vaciado correctamente. 💙");
    }
});
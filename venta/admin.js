document.getElementById("autoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const descripcion = document.getElementById("descripcion").value;
    const imagenesInput = document.getElementById("imagen").files;

    if (imagenesInput.length > 0) {
        const imagenes = [];
        let imagesLoaded = 0;

        Array.from(imagenesInput).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagenes.push(e.target.result);
                imagesLoaded++;

                if (imagesLoaded === imagenesInput.length) {
                    guardarAuto(nombre, precio, descripcion, imagenes);
                }
            };
            reader.readAsDataURL(file);
        });
    } else {
        alert("Debes seleccionar al menos una imagen.");
    }
});

function guardarAuto(nombre, precio, descripcion, imagenes) {
    let autos = JSON.parse(localStorage.getItem("autos")) || [];
    autos.push({ nombre, precio, descripcion, imagenes }); // Ahora almacena un array de imágenes
    localStorage.setItem("autos", JSON.stringify(autos));

    alert("Auto agregado exitosamente");
    document.getElementById("autoForm").reset();
    mostrarAutos(); // Actualiza la lista después de agregar
}

// Función para mostrar autos en la página del admin
function mostrarAutos() {
    const listaAutos = document.getElementById("listaAutos");
    listaAutos.innerHTML = ""; // Limpiar antes de mostrar

    let autos = JSON.parse(localStorage.getItem("autos")) || [];

    if (autos.length === 0) {
        listaAutos.innerHTML = "<p>No hay autos agregados.</p>";
        return;
    }

    autos.forEach((auto, index) => {
        const autoElement = document.createElement("div");
        autoElement.classList.add("auto");
        autoElement.innerHTML = `
            <h3>${auto.nombre}</h3>
            <p>Precio: ${auto.precio}</p>
            <button class="btn btn-danger" onclick="eliminarAuto(${index})">Eliminar</button>
            <hr>
        `;
        listaAutos.appendChild(autoElement);
    });
}

// Función para eliminar autos
function eliminarAuto(index) {
    let autos = JSON.parse(localStorage.getItem("autos")) || [];

    if (confirm(`¿Seguro que deseas eliminar "${autos[index].nombre}"?`)) {
        autos.splice(index, 1); // Eliminar el auto del array
        localStorage.setItem("autos", JSON.stringify(autos));

        alert("Auto eliminado correctamente.");
        mostrarAutos(); // Actualizar la lista
    }
}

// Mostrar autos al cargar la página
document.addEventListener("DOMContentLoaded", mostrarAutos);

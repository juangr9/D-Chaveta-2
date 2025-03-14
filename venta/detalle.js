document.addEventListener("DOMContentLoaded", () => {
    const auto = JSON.parse(localStorage.getItem("autoSeleccionado"));
    const nombre = document.getElementById("nombre");
    const precio = document.getElementById("precio");
    const descripcion = document.getElementById("descripcion");
    const carouselImages = document.getElementById("carouselImages");

    if (auto) {
        nombre.textContent = auto.nombre;
        precio.textContent = `Precio: ${auto.precio}`;
        descripcion.textContent = auto.descripcion;

        if (auto.imagenes && auto.imagenes.length > 0) {
            carouselImages.innerHTML = auto.imagenes.map((img, index) => `
                <div class="carousel-item ${index === 0 ? "active" : ""}">
                    <img src="${img}" class="d-block w-100 img-fluid" style="max-height: 400px; object-fit: contain;" alt="Imagen ${index + 1}">
                </div>
            `).join("");
        } else {
            carouselImages.innerHTML = `<div class="carousel-item active">
                <img src="placeholder.jpg" class="d-block w-100 img-fluid" style="max-height: 400px; object-fit: contain;" alt="Sin imagen">
            </div>`;
        }
    } else {
        document.getElementById("detalle").innerHTML = "<p>No se encontró el auto</p>";
    }
});

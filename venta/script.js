document.addEventListener("DOMContentLoaded", () => {
    const catalogo = document.getElementById("catalogo");
    
    // Cargar autos almacenados en localStorage
    let autos = JSON.parse(localStorage.getItem("autos")) || [];

    function mostrarAutos() {
        catalogo.innerHTML = "";
        autos.forEach((auto, index) => {
            const imagenSrc = auto.imagenes && auto.imagenes.length > 0 ? auto.imagenes[0] : "placeholder.jpg"; 
    
            const autoElement = document.createElement("div");
            autoElement.classList.add("auto");
            autoElement.innerHTML = `
                <img src="${imagenSrc}" alt="${auto.nombre}" onerror="this.onerror=null; this.src='placeholder.jpg';">
                <h3>${auto.nombre}</h3>
                <p>Precio: ${auto.precio}</p>
                <button onclick="verAuto(${index})">Ver</button>
            `;
            catalogo.appendChild(autoElement);
        });
    }    

    window.verAuto = (index) => {
        localStorage.setItem("autoSeleccionado", JSON.stringify(autos[index]));
        window.location.href = "detalle.html";
    };

    mostrarAutos();
});

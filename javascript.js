let hoteles = [];

fetch("./hoteles.json") .then(res => res.json()) .then(data => { hoteles = data; });

function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function search() {
    const searchTerm = removeAccents(document.getElementById("searchInput").value.trim().toLowerCase());
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = '';
    
    if (searchTerm.length < 3) {
        // El campo de búsqueda está vacío, no mostramos ninguna tarjeta
        return;
    }
    

    hoteles.forEach(hotel => {
        const ciudadSinAcentos = removeAccents(hotel.ciudad.toLowerCase());
        const hotelSinAcentos = removeAccents(hotel.hotel.toLowerCase());
        
        if (ciudadSinAcentos.includes(searchTerm) || hotelSinAcentos.includes(searchTerm)){
            const card = `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="card">
                <div class="card-body">
                    <img src="${hotel.imagen}"></img>
                    <h5 class="card-title">${hotel.hotel}</h5>
                    <p class="card-text">${hotel.descuento}</p>
                    <p class="card-text">${hotel.ciudad}</p>
                    <p class="card-text">${hotel.puntaje}</p>
                    <p class="card-text">${hotel.evaluaciones}</p>
                    <p class="card-text">${hotel.fechas}</p>
                    <p class="card-text">${hotel.precio}</p>
                    <p class="card-text">${hotel.porNoche}</p>
                    <a href="${hotel.link}" target="_blank">Link</a>
                </div>
            </div>
        </div>
    `;
            cardContainer.innerHTML += card;
        }
    });
}
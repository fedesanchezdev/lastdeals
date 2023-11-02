let hoteles = [];

fetch("https://fedesanchezdev.github.io/lastdeals/hotels_json.json")
  .then((res) => res.json())
  .then((data) => {
    hoteles = data;
    showRandomHotels();
});

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function showRandomHotels() {
  shuffleArray(hoteles);

  const cardContainer = document.getElementById("cardContainerSmallHotels");
  cardContainer.innerHTML = "";

  const randomHotels = hoteles.slice(0, 6);

  randomHotels.forEach((hotel) => {
    const precioSinComas = hotel.precio.replace(/,/g, '').replace(/\$/g, '');
    const precioSeparados = precioSinComas.split("\n");
    const precio1 = parseInt(precioSeparados[0]) ?? "";
    const precio2 = parseInt(precioSeparados[1]) ?? "";
    const precio1Final = parseInt(precio1 * 1.10);
    const precio2Final = parseInt(precio2 * 1.10);
      
    const card = `
      <div class="col g-3">
        <div class="card h-100 border-1 rounded-4 position-relative" style="max-width: 200px;">
          <img src="${hotel.imagen}" class="card-img-top rounded-4 rounded-bottom-0 img-fluid imgSmallDimensiones" alt="Imagen no disponible">     
          <div class="descuento">
            <small>${hotel.descuento}</small>
          </div>
          <div class="card-body">
            <p class="card-text fs-6"><small><strong>${hotel.puntaje}</strong> ${hotel.evaluaciones}</small></p>
            <h5 class="card-title fs-6 fw-bold textoOculto mt-1 mb-1"><small>${hotel.hotel}</small></h5>
            <p class="card-text fw-semibold fs-6"><small>${hotel.ciudad}</small></p>
            <p class="card-text fs-6">
              ${precio1Final > precio2Final ? "<strong>$" + precio2Final + "</strong> <strike><small>$" + precio1Final + "</small></strike>" : "<strong> $" + precio1Final + "</strong>"} <small>${hotel.porNoche}</small><br><small><small>${hotel.fechas}</small></small>
            </p>
          </div>
          <div class="card-footer text-center rounded-bottom-4 border">
            <button class="px-3 rounded-1 border-1 " onclick="copyCardText(this)"><small><small>Copiar y Consultar</small></small></button>
          </div>
        </div>
      </div>
    `;
    cardContainer.innerHTML += card;
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function searchHoteles() {
  const searchTerm = removeAccents(
    document.getElementById("searchInputHotels").value.trim().toLowerCase()
  );
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  if (searchTerm.length < 3) {
    return;
  }

  hoteles.forEach((hotel) => {
    const ciudadSinAcentos = removeAccents(hotel.ciudad.toLowerCase());
    const hotelSinAcentos = removeAccents(hotel.hotel.toLowerCase());
    const precioSinComas = hotel.precio.replace(/,/g, '').replace(/\$/g, '');
    const precioSeparados = precioSinComas.split("\n");
    const precio1 = parseInt(precioSeparados[0]) ?? "";
    const precio2 = parseInt(precioSeparados[1]) ?? "";
    const precio1Final = parseInt(precio1 * 1.10);
    const precio2Final = parseInt(precio2 * 1.10);

    if (
      ciudadSinAcentos.includes(searchTerm) ||
      hotelSinAcentos.includes(searchTerm)
    ) {
      const card = `
        <div class="col">
          <div class="card h-100 border-1 rounded-4 position-relative">
            <img src="${hotel.imagen}" class="card-img-top rounded-4 rounded-bottom-0 img-fluid imgDimensiones alt="Imagen no disponible">
            <div class="descuento">${hotel.descuento}</div>
              <div class="card-body">
                <p class="card-text fs-6"><strong>${hotel.puntaje}</strong> ${hotel.evaluaciones}</p>
                <h5 class="card-title fs-6 fw-bold textoOculto">${hotel.hotel}</h5>
                <p class="card-text fw-semibold fs-6">${hotel.ciudad}</p>
                <p class="card-text fs-4">
                  ${precio1Final > precio2Final ? "<strong>$" + precio2Final + "</strong> <strike><small>$" + precio1Final + "</small></strike>" : "<strong> $" + precio1Final + "</strong>"} <small>${hotel.porNoche}</small><br><small><small>${hotel.fechas}</small></small>
                </p>
              </div>
              <div class="card-footer text-center rounded-bottom-4 border">
                <button class="px-3 rounded-1 border-1" onclick="copyCardText(this)"><small>Copiar y Consultar</small></button>
              </div>
            </div>
          </div>
        </div>
      `;
      cardContainer.innerHTML += card;
    }
  });
}

function copyCardText(button) {
  const card = button.closest(".card");
  const cardBody = card.querySelector(".card-body", ".card-footer");
  const cardText = cardBody.innerText;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(cardText)
      .then(() => {
        window.open("https://diytravelgroup.com/contacto.html", "_blank");
      })
      .catch(err => {
        console.error('No se pudo copiar al portapapeles: ', err);
      });
  } else {
    console.error('El API Clipboard no está soportado en este navegador.');
  }
}


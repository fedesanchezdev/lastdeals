let flights = [];

fetch("https://fedesanchezdev.github.io/lastdeals/flights_json.json")
  .then((res) => res.json())
  .then((data) => {
    flights = data;
    showRandomFlights();
});

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function showRandomFlights() {
  shuffleArray(flights);

  const cardContainer = document.getElementById("cardContainerSmallFlights");
  cardContainer.innerHTML = "";

  const randomFlights = flights.slice(0, 6);
  
  randomFlights.forEach((flight) => {
    const precioSinComas = flight.precio.replace(/,/g, '').replace(/\$/g, '');
    const precioFinal = parseInt(precioSinComas * 1.10);

    const card = `
      <div class="col g-3">
        <div class="card h-100 border-1 rounded-4" style="max-width: 400px;">
          <div class="card-body">
            <div class="d-flex align-items-left mb-0">
              <img src="${flight.logoAerolinea}" class="logoAerolinea img-fluid imgSmallDimensiones">
              <p class="card-text ms-1 fs-6"><small><small>${flight.aerolinea}</small></small></p>
            </div>
            <p class="card-text fw-semibold fs-5 my-0"><small><small>${flight.aeropuertos}</small></small></p>
            <p class="card-text fs-6 my-0"><small>${flight.clase}</small></h5>
            <div class="d-flex justify-content-between m-0 p-0">
              <p class="card-text fs-6 m-0 p-0"><small><small>${flight.fechas}</small></small></p>
              <p class="card-text fs-6 m-0 p-0"><small><small>from</small></small> <strong>$${precioFinal}</strong></p>
            </div>
            <div class="text-end m-0 p-0">
              <p class="card-text fs-6 m-0 p-0"><small><small>${flight.porPersona}</small></small></p>
            </div>
          </div>
          <div class="card-footer text-center rounded-bottom-4 border">
            <button class="px-3 rounded-1 border-1" onclick="copyCardText(this)"><small>Copiar y Consultar</small></button>
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

function searchFlights() {
  const searchTerm = removeAccents(
    document.getElementById("searchInputFlights").value.trim().toLowerCase()
  );
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  if (searchTerm.length < 3) {
    return;
  }

  flights.forEach((flight) => {
    const ciudadOrigenSinAcentos = removeAccents(flight.ciudadOrigen.toLowerCase());
    const ciudadDestinoSinAcentos = removeAccents(flight.ciudadDestino.toLowerCase());
    const precioSinComas = flight.precio.replace(/,/g, '').replace(/\$/g, '');
    const precioFinal = parseInt(precioSinComas * 1.10);

    if (
      ciudadOrigenSinAcentos.includes(searchTerm) ||
      ciudadDestinoSinAcentos.includes(searchTerm)
    ) {
      const card = `
        <div class="col">
          <div class="card h-100 border-1 rounded-4" style="max-width: 400px;">
            <div class="card-body">
              <div class="d-flex align-items-left mb-0">
                <img src="${flight.logoAerolinea}" class="logoAerolinea img-fluid imgSmallDimensiones">
                <p class="card-text ms-1 fs-6"><small><small>${flight.aerolinea}</small></small></p>
              </div>
              <p class="card-text fw-semibold fs-5 my-0"><small><small>${flight.aeropuertos}</small></small></p>
              <p class="card-text fs-6 my-0"><small>${flight.clase}</small></h5>
              <div class="d-flex justify-content-between m-0 p-0">
                <p class="card-text fs-6 m-0 p-0"><small><small>${flight.fechas}</small></small></p>
                <p class="card-text fs-6 m-0 p-0"><small><small>from</small></small> <strong>${precioFinal}</strong></p>
              </div>
              <div class="text-end m-0 p-0">
                <p class="card-text fs-6 m-0 p-0"><small><small>${flight.porPersona}</small></small></p>
              </div>
            </div>
            <div class="card-footer text-center rounded-bottom-4 border">
              <button class="px-3 rounded-1 border-1" onclick="copyCardText(this)"><small>Copiar y Consultar</small></button>
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
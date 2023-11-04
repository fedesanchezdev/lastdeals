let ciudades = [];
fetch("./iata.json")
  .then((res) => res.json())
  .then((iata) => {
    ciudades = iata;
}); 

let flights = [];
fetch("./cheapFlightsBue.json")
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
  
  const randomFlights = flights.slice(0, 21);
  
  randomFlights.forEach((flight) => {
    const codigoIATAOrigen = flight.iataOrigen;
    const codigoIATADestino = flight.iataDestino;
    
    let ciudadOrigen = "Ciudad no encontrada";
      for (let i = 0; i < ciudades.length; i++) {
        if (ciudades[i].hasOwnProperty(codigoIATAOrigen)) {
          ciudadOrigen = ciudades[i][codigoIATAOrigen];
        break;
      }
    }
  
    let ciudadDestino = "Ciudad no encontrada";
    for (let i = 0; i < ciudades.length; i++) {
      if (ciudades[i].hasOwnProperty(codigoIATADestino)) {
        ciudadDestino = ciudades[i][codigoIATADestino];
        break;
      }
    }
    const precioSinComas = flight.precio.replace(/,/g, '').replace(/\$/g, '');
    const precioFinal = parseInt(precioSinComas * 1.08);
  
    const card =
    `
      <div class="col g-3">
        <div class="card h-100 border-1 rounded-4" style="max-width: 400px;">
          <div class="card-body">
            <div class="d-flex justify-content-center mb-0">
              <img src="${flight.logo}" class="" />
            </div>
            <p class="card-text fw-semibold fs-6 mt-3 mb-0">${flight.fechas}</p>
            <p class="card-text fs-6 my-0">${flight.clase}</p>
            <div class="d-flex justify-content-between m-0 p-0">
              <p class="card-text fs-6 m-0 p-0">
                <strong>${ciudadOrigen}</strong> (${flight.iataOrigen}) - <strong>${ciudadDestino}</strong> (${flight.iataDestino})
              </p>
            </div>
            <p class="card-text fs-6 m-0 p-0">from <strong>$${precioFinal} ${flight.precio}</strong></p>
            <p class="card-text fs-6 text-end m-0 p-0">${flight.encontrado}</p>
            <a href="${flight.link}">link</a>
          </div>
          <div class="card-footer text-center rounded-bottom-4 border">
            <button class="px-3 rounded-1 border-1" onclick="copyCardText(this)">
              <small>Copiar y Consultar</small>
            </button>
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
  const searchTerm = removeAccents(document.getElementById("searchInputFlights").value.trim().toLowerCase());
  const cardContainer = document.getElementById("cardContainer");
  
  cardContainer.innerHTML = "";

  if (searchTerm.length < 3) {
    return;
  }

  flights.forEach((flight) => {
    const codigoIATAOrigen = flight.iataOrigen;
    const codigoIATADestino = flight.iataDestino;
    
    let ciudadOrigen = "Ciudad no encontrada";
      for (let i = 0; i < ciudades.length; i++) {
        if (ciudades[i].hasOwnProperty(codigoIATAOrigen)) {
          ciudadOrigen = ciudades[i][codigoIATAOrigen];
        break;
      }
    }
  
    let ciudadDestino = "Ciudad no encontrada";
    for (let i = 0; i < ciudades.length; i++) {
      if (ciudades[i].hasOwnProperty(codigoIATADestino)) {
        ciudadDestino = ciudades[i][codigoIATADestino];
        break;
      }
    }

    const ciudadOrigenSinAcentos = removeAccents(ciudadOrigen.toLowerCase());
    const ciudadDestinoSinAcentos = removeAccents(ciudadDestino.toLowerCase());
    const codigoIataDestino = flight.iataDestino.toLowerCase();
    const precioSinComas = flight.precio.replace(/,/g, '').replace(/\$/g, '');
    const precioFinal = parseInt(precioSinComas * 1.08);
      
    if (ciudadOrigenSinAcentos.includes(searchTerm) || ciudadDestinoSinAcentos.includes(searchTerm) || codigoIataDestino.includes(searchTerm)) {
      const card = 
      `
        <div class="col g-3">
          <div class="card h-100 border-1 rounded-4" style="max-width: 400px;">
            <div class="card-body">
              <div class="d-flex justify-content-center mb-0">
                <img src="${flight.logo}" class="" />
              </div>
              <p class="card-text fw-semibold fs-6 mt-3 mb-0">${flight.fechas}</p>
              <p class="card-text fs-6 my-0">${flight.clase}</p>
              <div class="d-flex justify-content-between m-0 p-0">
                <p class="card-text fs-6 m-0 p-0">
                  <strong>${ciudadOrigen}</strong> (${flight.iataOrigen}) - <strong>${ciudadDestino}</strong> (${flight.iataDestino})
                </p>
              </div>
              <p class="card-text fs-6 m-0 p-0">from <strong>$${precioFinal} ${flight.precio}</strong></p>
            </div>
            <div class="card-footer text-center rounded-bottom-4 border">
              <button class="px-3 rounded-1 border-1" onclick="copyCardText(this)">
                <small>Copiar y Consultar</small>
              </button>
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
  
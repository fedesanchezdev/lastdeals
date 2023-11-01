let packages = [];

fetch("./packages_json.json")
  .then((res) => res.json())
  .then((data) => {
    packages = data;
    showRandomPackages();
});

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function showRandomPackages() {
  shuffleArray(packages);

  const cardContainer = document.getElementById("cardContainerSmallPackages");
  cardContainer.innerHTML = "";

  const randomPackages = packages.slice(0, 6);

  randomPackages.forEach((package) => {
    // Convierte la cadena de precio a número utilizando parseFloat
    const precioSinComas = package.precio.replace(/,/g, '').replace(/\$/g, '');
    // CAMBIAR EL PROCENTUAL DE 10% ////////////////////////////////////////// MAS ABAJO TAMBIEN //////////////////////////////////////////////////
    const precioFinal = parseInt(precioSinComas * 1.10);

    const card = `
      <div class="col g-3">
        <div class="card h-100 border-1 rounded-4 position-relative" style="max-width: 200px;">
          <img src="${package.imagen}" class="card-img-top rounded-4 rounded-bottom-0 img-fluid imgSmallDimensiones" alt="Imagen no disponible">
          <div class="card-body">
            <p class="card-text fs-6 mb-0"><small>${package.noches}</small></p>
            <h5 class="card-title fs-6 fw-bold mt-1"><small>${package.hotel}</small></h5>
            <p class="card-text fs-6"><small>${package.ciudad}</small></p>
            <div class="d-flex align-items-left">
              <img src="${package.logoAerolinea}" class="logoAerolinea rounded-4 img-fluid imgSmallDimensiones">
              <p class="card-text ms-1 fs-6"><small><small>${package.aerolinea}</small></small></p>
            </div>
            <p class="card-text mt-0 fs-6"><small>${package.origenDestino}</small></p>
            <div class="text-end">
              <p class="card-text mb-0 pb-0 fs-6 mt-3"><strong>$${precioFinal}</strong></p>
              <p class="card-text mt-0 pt-0 fs-6"><small><small><small>${package.precioPersona}</small></small></small></p>
            </div>
            <p class="card-text text-center mt-3 fs-6"><small>${package.fechas}</small></p>
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

function searchPackages() {
  const searchTerm = removeAccents(
    document.getElementById("searchInputPackages").value.trim().toLowerCase()
  );
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  if (searchTerm.length < 3) {
    return;
  }

  packages.forEach((package) => {
    const ciudadSinAcentos = removeAccents(package.ciudad.toLowerCase());
    const hotelSinAcentos = removeAccents(package.hotel.toLowerCase());
    // Convierte la cadena de precio a número utilizando parseFloat
    const precioSinComas = package.precio.replace(/,/g, '').replace(/\$/g, '');
    // CAMBIAR EL PROCENTUAL DE 10% ////////////////////////////////////////// MAS ARRIBA TAMBIEN //////////////////////////////////////////////////
    const precioFinal = parseInt(precioSinComas * 1.10);

    if (
      ciudadSinAcentos.includes(searchTerm) ||
      hotelSinAcentos.includes(searchTerm)
    ) {

      const card = `
        <div class="col">
          <div class="card h-100 border-1 rounded-4">
            <img src="${package.imagen}" class="card-img-top rounded-4 rounded-bottom-0 img-fluid imgDimensiones">
            <div class="card-body">
              <p class="card-text fs-6 mb-0">${package.noches}</p>
              <h5 class="card-title fs-6 fw-bold mt-1">${package.hotel}</h5>
              <p class="card-text fs-6">${package.ciudad}</p>
              <div class="d-flex align-items-left">
                <img src="${package.logoAerolinea}" class="logoAerolinea rounded-4 img-fluid imgDimensiones"  alt="Imagen no proporcionada">
                <p class="card-text ms-1 fs-6">${package.aerolinea}</p>
              </div>
              <p class="card-text mt-0 fs-6">${package.origenDestino}</p>
              <div class="text-end">
                <p class="card-text mt-5 mb-0 pb-0 lh-1 fs-4"><strong>$${precioFinal}</strong></p>
                <p class="card-text mt-0 pt-0 lh-1 fs-6">${package.precioPersona}</p>
              </div>
              <p class="card-text text-center mt-4">${package.fechas}</p>
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
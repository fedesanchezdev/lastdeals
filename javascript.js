let hoteles = [];

fetch("./hoteles.json")
  .then((res) => res.json())
  .then((data) => {
    hoteles = data;
    // Llamada a la función para mostrar 8 hoteles aleatorios
    showRandomHotels();
});

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function showRandomHotels() {
  // Mezcla aleatoriamente el arreglo de hoteles
  shuffleArray(hoteles);

  const cardContainer = document.getElementById("cardContainerSmall");
  cardContainer.innerHTML = "";

  // Muestra los primeros 8 hoteles después de la mezcla aleatoria
  const randomHotels = hoteles.slice(0, 6);

  randomHotels.forEach((hotel) => {
    const precioSeparados = hotel.precio.split("\n");
    const precio1 = precioSeparados[0] ?? "";
    const precio2 = precioSeparados[1] ?? "";

    // Parsea los precios a números para compararlos
    const parsedPrecio1 = parseFloat(precio1.replace(/[^\d.]/g, ""));
    const parsedPrecio2 = parseFloat(precio2.replace(/[^\d.]/g, ""));

    // Determina el precio más bajo y crea una variable para aplicar el estilo
    let lowestPrice, lowestPriceText;
    if (!isNaN(parsedPrecio1) && !isNaN(parsedPrecio2)) {
      if (parsedPrecio1 < parsedPrecio2) {
        lowestPrice = parsedPrecio1;
        lowestPriceText = precio1;
      } else {
        lowestPrice = parsedPrecio2;
        lowestPriceText = precio2;
      }
    } else if (!isNaN(parsedPrecio1)) {
      lowestPrice = parsedPrecio1;
      lowestPriceText = precio1;
    } else if (!isNaN(parsedPrecio2)) {
      lowestPrice = parsedPrecio2;
      lowestPriceText = precio2;
    }

    const card = `
      <div class="col">
      <div class="card h-100 border-0 position-relative" style="max-width: 200px;">
      <div class="imgSmallContenedor">
      <img src="${hotel.imagen}" class="card-img-top rounded-4 img-fluid imgSmallDimensiones">
      </div>     
          <div class="descuento"><small>${hotel.descuento}</small></div>
          <div class="card-body">
            <p class="card-text fs-6"><small><strong>${hotel.puntaje}</strong> ${hotel.evaluaciones}</small></p>
            <h5 class="card-title fs-6 fw-bold"><small>${hotel.hotel}</small></h5>
            <p class="card-text fw-semibold fs-6"><small>${hotel.ciudad}</small></p>
            <p class="card-text fs-6"><small>
              ${lowestPriceText === precio2 ? "<strong>" + precio2 + "</strong>" : "<small><strike>" + precio2 + "</strike></small>"}
              ${lowestPriceText === precio1 ? "<strong>" + precio1 + "</strong>" : "<small><strike>" + precio1 + "</strike></small>"}
              <small>${hotel.porNoche}<br><small>${hotel.fechas}</small></small></small>
            </p>
          </div>
          <div class="card-footer text-center rounded-bottom-4 border">
            <small class="text-body-secondary"><a href="" target="_blank"></a></small>
            <small><button class="px-3" onclick="copyCardText(this)">Copiar y Reservar</button></small>
          </div>
        </div>
      </div>
    `;

    cardContainer.innerHTML += card;
  });
}

function shuffleArray(array) {
  // Función para mezclar aleatoriamente un arreglo utilizando el algoritmo de Fisher-Yates
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function search() {
  const searchTerm = removeAccents(
    document.getElementById("searchInput").value.trim().toLowerCase()
  );
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  if (searchTerm.length < 3) {
    // El campo de búsqueda está vacío, no mostramos ninguna tarjeta
    return;
  }

  hoteles.forEach((hotel) => {
    const ciudadSinAcentos = removeAccents(hotel.ciudad.toLowerCase());
    const hotelSinAcentos = removeAccents(hotel.hotel.toLowerCase());
    const precioSeparados = hotel.precio.split("\n");
    const precio1 = precioSeparados[0] ?? "";
    const precio2 = precioSeparados[1] ?? "";

    // Parsea los precios a números para compararlos
    const parsedPrecio1 = parseFloat(precio1.replace(/[^\d.]/g, "")); // Elimina caracteres no numéricos
    const parsedPrecio2 = parseFloat(precio2.replace(/[^\d.]/g, ""));

    // Determina el precio más bajo y crea una variable para aplicar el estilo
    let lowestPrice, lowestPriceText;
    if (!isNaN(parsedPrecio1) && !isNaN(parsedPrecio2)) {
      if (parsedPrecio1 < parsedPrecio2) {
        lowestPrice = parsedPrecio1;
        lowestPriceText = precio1;
      } else {
        lowestPrice = parsedPrecio2;
        lowestPriceText = precio2;
      }
    } else if (!isNaN(parsedPrecio1)) {
      lowestPrice = parsedPrecio1;
      lowestPriceText = precio1;
    } else if (!isNaN(parsedPrecio2)) {
      lowestPrice = parsedPrecio2;
      lowestPriceText = precio2;
    }

    if (
      ciudadSinAcentos.includes(searchTerm) ||
      hotelSinAcentos.includes(searchTerm)
    ) {
      const card = `
                <div class="col">
                    <div class="card h-100 border-0 position-relative">
                        <img src="${
                          hotel.imagen
                        }" class="card-img-top rounded-4 img-fluid imgDimensiones">
                        <div class="descuento">${hotel.descuento}</div>
                        <div class="card-body">
                            <p class="card-text fs-6"><strong>${hotel.puntaje}</strong> ${hotel.evaluaciones}</p>
                            <h5 class="card-title fs-6 fw-bold">${hotel.hotel}</h5>
                            <p class="card-text fw-semibold fs-6">${hotel.ciudad}</p>
                            <p class="card-text fs-4">${lowestPriceText === precio2 ? "<strong>" + precio2 + "</strong>" : "<small><small><strike>" + precio2 + "</strike></small></small>"} 
                            ${lowestPriceText === precio1 ? "<strong>" + precio1 + "</strong>" : "<small><small><strike>" + precio1 + "</strike></small></small>"} <small>${hotel.porNoche}<br><small>${hotel.fechas}</small></small></p>
                        </div>
                        <div class="card-footer text-center rounded-bottom-4 border">
                          <button class="px-4" onclick="copyCardText(this)">Copiar y Reservar</button><br>
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

  // Copia el texto al portapapeles
  if (navigator.clipboard) {
    navigator.clipboard.writeText(cardText)
      .then(() => {
        // Acción después de copiar
        window.open("https://diytravelgroup.com/contacto.html", "_blank");
      })
      .catch(err => {
        console.error('No se pudo copiar al portapapeles: ', err);
      });
  } else {
    // Manejar navegadores que no admiten el API Clipboard
    console.error('El API Clipboard no está soportado en este navegador.');
  }
}
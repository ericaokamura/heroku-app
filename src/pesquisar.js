const locationInput = document.getElementById('region-input');
const startingDateInput = document.getElementById('checkin-input');
const returningDateInput = document.getElementById('checkout-input');
const mapIFrame = document.getElementById('map');
const searchButton = document.querySelector('#search-button');

const apiKey = 'AIzaSyC7K0CfjjrLQ6kocgQ7pGT0S0DvLIdAM2I';
const geolocationApiUrl =
  'https://api.bigdatacloud.net/data/reverse-geocode-client';

function updateMap(location) {
  if (mapIFrame) {
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${location}`;
    mapIFrame.setAttribute('src', mapUrl);
  }
}

function getLocation() {
  if (!navigator.geolocation) {
    console.error('Geolocation is not supported by this browser.');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      const apiUrl = `${geolocationApiUrl}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const {
          locality: city,
          principalSubdivision: state,
          countryName: country,
        } = data;
        const location = `${city}, ${state}, ${country}`;
        locationInput.value = location;
        updateMap(location);
      } catch (error) {
        console.error(error);
      }
    },
    (error) => {
      console.error(error);
    }
  );
}

function setDefaultDates() {
  const today = new Date();
  startingDateInput.value = today.toISOString().slice(0, 10);
  const returningDate = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );
  returningDateInput.value = returningDate.toISOString().slice(0, 10);
}

function showMessage() {
  const location = locationInput.value;
  const startingDate = startingDateInput.value;
  const returningDate = returningDateInput.value;
  const message = `Obrigado por testar a aplicação, assim que houver mais informações sobre hospedagens para: ${location}, de ${startingDate} a ${returningDate}, disponibilizaremos aqui.`;
  alert(message);
  updateMap(location);
}

async function initialize() {
  getLocation();
  setDefaultDates();
  updateMap(locationInput.value);
  searchButton.addEventListener('click', showMessage);
}

initialize().then(() => {
  console.log('Initialized!');
});

// Comentários explicativos abaixo
//
// LOCATION_INPUT_ID: id do elemento de entrada de localização
// STARTING_DATE_INPUT_ID: id do elemento de entrada de data de partida
// RETURNING_DATE_INPUT_ID: id do elemento de entrada de data de retorno
// API_KEY: chave de API do Google Maps usada para incorporar o mapa na página
// MAP_ID: id do elemento iframe que contém o mapa incorporado
//
// updateMap(): função que atualiza o mapa incorporado de acordo com o valor do campo de entrada de localização na página
//
// getLocation(): função que usa o recurso de geolocalização do navegador para obter a cidade, estado e país do usuário e preenche o campo de entrada de localização na página e atualiza o mapa
//
// setDefaultDates(): função que define as datas de partida e retorno padrão para a data atual e a data atual + 1 mês
//
// showMessage(): função que é chamada quando o botão de pesquisa é clicado, ela coleta as informações de tipo de viagem, localização e datas selecionadas e exibe uma mensagem de alerta com essas informações, além de atualizar o mapa.

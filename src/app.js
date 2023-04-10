const locationInput = document.getElementById('region-input');
const startingDateInput = document.getElementById('checkin-input');
const returningDateInput = document.getElementById('checkout-input');
const mapIFrame = document.getElementById('map');
const searchButton = document.querySelector('#search-button');

const apiKey = 'AIzaSyC7K0CfjjrLQ6kocgQ7pGT0S0DvLIdAM2I';
const geolocationApiUrl =
  'https://api.bigdatacloud.net/data/reverse-geocode-client';

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
      const defaultLocation = 'New York, NY, USA';
      locationInput.value = defaultLocation;
      updateMap(defaultLocation);
    }
  );
}

function saveLocationToStorage(location) {
  localStorage.setItem('location', location);
}

function updateMap() {
  if (mapIFrame) {
    const cachedLocation = localStorage.getItem('location');
    const location = cachedLocation || locationInput.value;
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${location}`;
    mapIFrame.setAttribute('src', mapUrl);
    if (!cachedLocation) {
      saveLocationToStorage(location);
    }
  }
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
  const cachedLocation = localStorage.getItem('location');
  if (cachedLocation) {
    locationInput.value = cachedLocation;
  } else {
    getLocation();
  }
  setDefaultDates();
  updateMap();
  searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    showMessage();
  });
}

initialize().then(() => {
  console.log('Initialized!');
});

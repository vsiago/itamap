var map = L.map('map').setView([-22.861703, -43.774681], 14);

// Adicionando o provedor de demapa OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
}).addTo(map);

// Criando camadas
const schools = L.layerGroup();
const healthCenters = L.layerGroup();
const shoppings = L.layerGroup();

// Exemplo de coordenadas para escolas e unidades de saúde
var schoolCoords = [
  { name: 'Escola A', location: [-22.857037, -43.779659] },
  { name: 'Escola B', location: [-22.852924, -43.771162] },
  // Adicione mais escolas conforme necessário
];

var healthCenterCoords = [
  { name: 'Unidade de Saúde X', location: [-22.86, -43.76] },
  { name: 'Unidade de Saúde Y', location: [-22.87, -43.79] },
  { name: 'Hospital Sao Francisco', location: [-22.869592, -43.777192] },
  // Adicione mais unidades de saúde conforme necessário
];

const shoppingsCoords = [
  { name: 'Shopping Centro', location: [-22.871509, -43.776612] },
];

function addMarkers(layer, coords) {
  for (var i = 0; i < coords.length; i++) {
    L.marker(coords[i].location, 14).bindPopup(coords[i].name).addTo(layer);
  }
}

addMarkers(schools, schoolCoords);
addMarkers(healthCenters, healthCenterCoords);
addMarkers(shoppings, shoppingsCoords);

function showSchools() {
  map.removeLayer(healthCenters);
  map.removeLayer(shoppings);
  map.addLayer(schools);
  map.setView([-22.861703, -43.774681], 14);
  currentLayer.clearLayers();
}

function showHealthCenters() {
  map.removeLayer(schools);
  map.removeLayer(shoppings);
  map.addLayer(healthCenters);
  map.setView([-22.861703, -43.774681], 14);
  currentLayer.clearLayers();
}

function showShoppings() {
  map.removeLayer(schools);
  map.removeLayer(healthCenters);
  map.addLayer(shoppings);
  map.setView([-22.861703, -43.774681], 14);
  currentLayer.clearLayers();
}

const currentLayer = L.layerGroup();

// Adicionar um novo lugar
function openAddPlaces() {
  // Remover todos os marcadores da camada shoppings
  currentLayer.clearLayers();

  const places = {
    name: prompt('Nome do local', 'Pica pau'),
    location: [
      Number(prompt('latitude', '-22.863047')),
      Number(prompt('Longitude', '-43.775282')),
    ],
  };

  // Adicionar o novo marcador à camada shoppings e ao mapa
  const marker = L.marker(places.location)
    .bindPopup(places.name)
    .addTo(currentLayer)
    .addTo(schools);

  // Adicionar a camada shoppings ao mapa novamente (pode ser necessário)
  map.addLayer(currentLayer);

  console.log(places);
}

// Descobrir coordenadas-------------------------------------
var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent('You clicked the map at ' + e.latlng.toString())
    .openOn(map);
}
map.on('click', onMapClick);

// Geolocalizacao

// map.locate({ setView: true, minZoom: 16 });

// function onLocationFound(e) {
//   L.marker(e.latlng).addTo(map);
// }

// map.on('locationfound', onLocationFound);

// function onLocationError(e) {
//   alert(e.message);
// }

// map.on('locationerror', onLocationError);

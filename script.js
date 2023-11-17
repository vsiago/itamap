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

// Adicionar Malhas utilizando a API do IBGE

async function loadGeoJson(idCidade) {
  try {
    const request = await fetch("https://servicodados.ibge.gov.br/api/v3/malhas/municipios/" + idCidade + "?formato=application/vnd.geo+json");
    const response = await request.json();
    //
    L.geoJSON(response).addTo(map);

  } catch (error) {
    console.log(error);
  }
}

//loadGeoJson(3302007) Malha itaguaí 

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


    // Adicione o arquivo .kmz ao mapa
    function loadKMZFile(kmzFilePath) {
      fetch(kmzFilePath)
        .then(response => response.arrayBuffer())
        .then(kmzData => {
          return JSZip.loadAsync(kmzData);
        })
        .then(zip => {
          const kmlFile = Object.keys(zip.files).find(filename => /\.kml$/i.test(filename));
          if (kmlFile) {
            return zip.file(kmlFile).async('string');
          } else {
            throw new Error('No KML file found in the KMZ archive.');
          }
        })
        .then(kmlString => {
          const geojson = toGeoJSON.kml(new DOMParser().parseFromString(kmlString, 'text/xml'));
          const trackLayer = L.geoJSON(geojson);

          map.addLayer(trackLayer);
          map.fitBounds(trackLayer.getBounds());
        })
        .catch(error => {
          console.error('Error loading KMZ file:', error);
        });
    }

    // Chame a função com o caminho do arquivo .kmz
    loadKMZFile('/unids-pref-ita.kmz');
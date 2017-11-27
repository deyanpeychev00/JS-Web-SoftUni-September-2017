import L from 'leaflet';

export default function loadMap() {

  const BG = [42.7249925, 25.4833039];
  const zoomLevel = 7;

  const mymap = L.map('mapid').setView(BG, zoomLevel);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGV5YW5wcGV5Y2hldiIsImEiOiJjajk0OHp1OHM0MTVsMnFtYnpvMmN2OHZjIn0.56yRPY_ti-lHyhTETtaXKg', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
  }).addTo(mymap);

  fetch('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/locations', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Kinvey 0ceb0005-c7c7-43cc-bb58-ca65ed1f737a.c/Nmndb374P52RaI8cD3oGFmtz6RKY0mbmubhqa0uV0='
    }
  }).then(res =>{
    res.json().then(json => {
      json.map( location => {
        const marker = L.marker([location.lat, location.long]).addTo(mymap).bindPopup(`<b>${location.name}</b>`);
      });
    });
  });
}


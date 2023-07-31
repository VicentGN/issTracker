var map = L.map('map').setView([0, 0], 2);
var issLocation = L.marker();
var astronautsInfo = {};

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

function main() {
    getCurrentNumberOfAstronauts();
    window.setInterval(() => {
        drawISSOnMap();
    }, 5000);
}


function drawISSOnMap() {
    fetch('http://api.open-notify.org/iss-now.json')
        .then(response => response.json())
        .then(data => {
            // Handle the data here
            issLocation.setLatLng([data.iss_position.latitude, data.iss_position.longitude]);
            const list = Object.entries(astronautsInfo.people).filter(person => person[1].craft === 'ISS').map(([key, value]) => `<li>${value.name}</li>`).join('');
            const popupContent = `<h4>Current astronauts</h4><ul>${list}</ul>`;
            issLocation.bindPopup(popupContent)
            const customIcon = L.icon({
                iconUrl: '/assets/iss.png',
                iconSize: [64, 64],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
            });
            issLocation.setIcon(customIcon)
            issLocation.addTo(map);
            map.setView([data.iss_position.latitude, data.iss_position.longitude], 5);

        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('Error:', error);
        });

}

function getCurrentNumberOfAstronauts() {
    fetch('http://api.open-notify.org/astros.json')
        .then(response => response.json())
        .then(data => {
            // Handle the data here
            astronautsInfo = data;
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('Error:', error);
        });
}

// The application starts here

main();
var map = L.map('map').setView([0, 0], 2);
var issLocation = L.marker();
var astronautsInfo = {};

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

function main() {
    window.setInterval(() => {
        drawISSOnMap();
    }, 5000);
}


function drawISSOnMap() {
    fetch('https://polibackend.onrender.com/satellite/getPosition?norad=25544')
        .then(response => response.json())
        .then(data => {
            // Handle the data here
            issLocation.setLatLng([data.position.satlatitude, data.position.satlongitude]);
            const customIcon = L.icon({
                iconUrl: './assets/iss.png',
                iconSize: [64, 64],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
            });
            issLocation.setIcon(customIcon)
            issLocation.addTo(map);
            map.setView([data.position.satlatitude, data.position.satlongitude], 5);

        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('Error:', error);
        });

}

// The application starts here

main();
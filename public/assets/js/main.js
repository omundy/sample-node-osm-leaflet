// main.js

console.log("hello from main.js");


(async () => {

    let cardTitle = document.querySelector('.card-title');

    // Create map
    var map = L.map('map');
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Update view
    async function updateMap(loc) {
        fetch(`./api/location/${loc}`)
            .then(res => res.json())
            .then(location => {
                console.log("location", location);
                map.setView([location.lat, location.lon], 13);
                cardTitle.innerHTML = `This is not ${loc}`
            });
    }
    updateMap('davidson/nc')


    document.querySelectorAll(".updateMap").forEach((item) => {
        item.addEventListener("click", () => {
            console.log("click", location);
            updateMap(item.dataset.location)
        })
    })


})()


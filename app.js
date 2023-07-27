const USE_NAMES = false;
const WORKERS = 'data/werknemers.csv';
const OFFICES = 'data/kantoren.csv';
const WORKSITES = 'data/werken.csv';

const Shadow = L.Icon.extend({
	options: {
		shadowUrl: 'images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		tooltipAnchor: [16, -28],
		shadowSize: [41, 41],
	},
});
const greenMarker = new Shadow({ iconUrl: 'images/marker-icon-green.png' }),
	redMarker = new Shadow({ iconUrl: 'images/marker-icon-red.png' }),
	blueMarker = new Shadow({ iconUrl: 'images/marker-icon-blue.png' });

document.addEventListener('DOMContentLoaded', appStart);
async function appStart() {
	const map = L.map('map').setView([52.1, 5.2], 8);
	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution:
			'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	}).addTo(map);

	// await addMarkers(WORKERS, blueMarker, map);
	// await addMarkers(OFFICES, greenMarker, map); // TODO: get official test data
	// await addMarkers(WORKSITES, redMarker, map); // TODO: get official test data
}

async function addMarkers(fileLocation, marker, map) {
	let file = await fetch(fileLocation),
		readFile = await file.text(),
		lines = readFile.split(/\r?\n/);

	for (let i = 0; i < lines.length; i++) {
		setTimeout(save(getLatLon(lines[i])), 1500 * i);
	}
	// const promises = [];
	// for (const line of lines) {
	// 	promises.push(
	// 		new Promise(async (resolve, reject) => {
	// 			const location = await getMarkerLocation(line);
	// 			if (location) return resolve(location);
	// 			return reject();
	// 		})
	// 	);
	// }

	// for (const location of await Promise.all(promises)) {
	// 	L.marker(location, { icon: marker }).addTo(map);
	// }
}

// async function getMarkerLocation(address) {
// 	let items = address.split(',');
// 	let locationUrl = `http://localhost:8080/?format=json&country=netherlands&city=${
// 		items[0]
// 	}&street=${items[2] + '%20' + items[1]}`;
// 	let location;
// 	let returnData = await fetch(locationUrl);
// 	if (!returnData.ok) console.log('Something went wrong!');
// 	else location = await returnData.json();
// 	console.log(locationUrl);
// 	return [location[0].lat, location[0].lon];
// }

async function getLatLon(address) {
	let items = address.split(',');
	let url = `https://nominatim.openstreetmap.org/?format=json&country=netherlands&city=${
		items[0]
	}&street=${items[2] + ' ' + items[1]}`;
	const result = await fetch(url).then((response) => {
		if (!response.ok) console.log('Something went wrong!');
		else return response.json();
	});
	return [result[0].lat, result[0].lon];
}

function save(location) {
	// TODO: store retrieved to cache to avoid lockout
}
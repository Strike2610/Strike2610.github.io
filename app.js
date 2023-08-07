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

	await addMarkers(WORKERS, blueMarker, map);
	await addMarkers(OFFICES, greenMarker, map);
	// await addMarkers(WORKSITES, redMarker, map);
}

async function addMarkers(fileLocation, marker, map) {
	let file = await fetch(fileLocation),
		readFile = await file.text(),
		lines = readFile.split(/\r?\n/);

	for (const line of lines) {
		L.marker(line.split(', '), { icon: marker }).addTo(map);
	}
}

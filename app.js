const USE_NAMES = false;
const FILE = 'gebruikers.csv';

const map = L.map('map').setView([52.1, 5.2], 8);
const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution:
		'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const reader = new FileReader(FILE);
fetch(FILE)
	.then(file => {
		return file.text();
	})
	.then(readFile => {
		readFile.split(/\r?\n/).forEach((address) => {
			let items = address.split(',');
			let url = `https://nominatim.openstreetmap.org/?format=json&country=netherlands&city=${items[0]}&street=${items[2] + ' ' + items[1]}`;
			fetch(url)
				.then(response => {
					if (!response.ok) console.log('Something went wrong!');
					else return response.json();
				})
				.then(result => {
					L.marker([result[0].lat, result[0].lon]).addTo(map);
				});
		});
	});

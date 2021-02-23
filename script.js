const plantApp = {}
const proxy = 'http://proxy.hackeryou.com';

plantApp.apiUrl = `https://trefle.io/api/v1/distributions/ONT/plants`;
plantApp.apiKey = 'v_NcQ2f7qlXCw9rVIw66YqesnTQnztxk1NMmt64BOuA';

function randomOntario() {
	return Math.floor(Math.random() * 91 + 1)
}

// prevent default bahaviour
// filter image requirements - only display if there IS an image url (like fashion codealong we did)

plantApp.getImages = () => {
	const url = new URL(proxy);
	url.search = new URLSearchParams({
		reqUrl: plantApp.apiUrl,
		'params[token]': plantApp.apiKey,
		'params[filter[establishment]]': 'native',
		'params[page]': '10'
	});
	fetch(url).then((response) => {
		console.log(response)
		return response.json()
	}).then((jsonResponse) => {
		console.log(jsonResponse)	
	}).catch(error => {
		console.log(error);
	});
};

function getRegion(event) {
	plantApp.apiUrl = `https://trefle.io/api/v1/distributions/${event.target.value}/plants`;
	plantApp.getImages();
	console.log(plantApp.apiUrl)
}

plantApp.createEventListener = () => {
	document.querySelector('#regionSelector').addEventListener('change', (event) => {
		getRegion(event);
	})	
}

plantApp.init = () => {
	plantApp.createEventListener();
};

plantApp.init();
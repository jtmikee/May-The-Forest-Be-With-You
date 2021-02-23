const plantApp = {}
const proxy = 'http://proxy.hackeryou.com';


// let region = document.querySelector('#regionSelector').value;
plantApp.apiUrl = `https://trefle.io/api/v1/distributions/${region}/plants`;

plantApp.apiKey = 'v_NcQ2f7qlXCw9rVIw66YqesnTQnztxk1NMmt64BOuA';

function randomOntario() {
	return Math.floor(Math.random() * 91 + 1)
}

plantApp.getImages = () => {
	const url = new URL(proxy);
	url.search = new URLSearchParams({
		reqUrl: plantApp.apiUrl,
		'params[token]': plantApp.apiKey,
		'params[filter[establishment]': 'native',
		'params[page]': randomOntario()
	});
	fetch(url).then((response) => {
		console.log(response)
		return response.json()
	}).then((jsonResponse) => {
		console.log(jsonResponse)	
	});
};


plantApp.getRegion = () => {
	document.querySelector('#regionSelector').addEventListener('change', (event) => {
		const region = event.target.value;
		console.log(region)
		console.log('changed')
		console.log(event)
	})	
}


plantApp.init = () => {
	plantApp.getImages();
	plantApp.getRegion();
};

plantApp.init();




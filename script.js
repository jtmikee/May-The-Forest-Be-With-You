const plantApp = {}
const proxy = 'http://proxy.hackeryou.com';


// let region = document.querySelector('#regionSelector').value;

plantApp.apiKey = 'v_NcQ2f7qlXCw9rVIw66YqesnTQnztxk1NMmt64BOuA';
// plantApp.apiUrl = `https://trefle.io/api/v1/distributions/${region}/plants`;

function randomOntario() {
	return Math.floor(Math.random() * 91 + 1)
}

plantApp.getImages = (region) => {
	const url = new URL(proxy);
	url.search = new URLSearchParams({
		reqUrl: `https://trefle.io/api/v1/distributions/${region}/plants`,
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

// plantApp.changeRegion = (event) => {
// 	const region = event.target.value;
// 	console.log(region)
// 	plantApp.getImages(region)
// }


plantApp.getRegion = () => {
	document.querySelector('#regionSelector').addEventListener('change', (event) => {
		const region = event.target.value;
		plantApp.getImages(region)
	})	
}


plantApp.init = () => {
	plantApp.getImages();
	plantApp.getRegion();
};

plantApp.init();




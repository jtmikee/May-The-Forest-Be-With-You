const plant = {}
const proxy = 'http://proxy.hackeryou.com';
plant.apiUrl = 'https://trefle.io/api/v1/plants';
plant.apiKey = 'v_NcQ2f7qlXCw9rVIw66YqesnTQnztxk1NMmt64BOuA';
// get image from api 
plant.getImages = () => {
	const url = new URL(proxy);
	url.search = new URLSearchParams({
		reqUrl: plant.apiUrl,
		'params[token]': plant.apiKey
	});
	fetch(url).then((response) => {
		console.log(response)
		return response.json()
	}).then((jsonResponse) => {
		console.log(jsonResponse)
	});
};
plant.init = () => {
	plant.getImages();
};
plant.init();
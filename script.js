const plantApp = {}
const proxy = 'http://proxy.hackeryou.com';

plantApp.apiUrl = `https://trefle.io/api/v1/distributions/ONT/plants`;
plantApp.apiKey = 'v_NcQ2f7qlXCw9rVIw66YqesnTQnztxk1NMmt64BOuA';

function randomPage() {
	return Math.floor(Math.random() * 25 + 1)
}

plantApp.getPlants = () => {
	const url = new URL(proxy);
	url.search = new URLSearchParams({
		reqUrl: plantApp.apiUrl,
		'params[token]': plantApp.apiKey,
		'params[filter[establishment]]': 'native',
		'params[filter_not[ATTRIBUTE]]': 'null',
		'params[page]': '1'
	});
	fetch(url).then((response) => {
		return response.json()
	}).then((jsonResponse) => {
		plantApp.displayCards(jsonResponse.data)
	}).catch(error => {
		console.log(error);
	});
};

plantApp.getRegion = (event) => {
	plantApp.apiUrl = `https://trefle.io/api/v1/distributions/${event.target.value}/plants`;
	plantApp.getPlants();
}

plantApp.createEventListener = () => {
	document.querySelector('#regionSelector').addEventListener('change', (event) => {
		plantApp.getRegion(event);
	})
}

plantApp.displayCards = (plantArray) => {

	const treeCard = document.querySelector('#cardHolder');
	treeCard.innerHTML = '';

	plantArray.forEach((plant) => {

		const cardContainer = document.createElement('div');
		cardContainer.classList.add('cardContainer');

		const imageContainer = document.createElement('div');
		imageContainer.classList.add('imageContainer');

		const plantImage = document.createElement('img');

		plant.image_url = plant.image_url.replace('https://bs.floristic.org', 'http://bs.floristic.org');

		plantImage.src = plant.image_url;
		plantImage.alt = plant.common_name;

		const plantTitle = document.createElement('h2');
		plantTitle.innerText = plant.common_name;

		imageContainer.appendChild(plantImage);
		cardContainer.append(imageContainer, plantTitle);

		treeCard.appendChild(cardContainer);

	})
}

plantApp.reload = () => {
	document.querySelector('form').reset();
}

plantApp.init = () => {
	plantApp.createEventListener()
	plantApp.reload();
};

plantApp.init();
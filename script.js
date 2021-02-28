const plantApp = {}
const proxy = 'https://proxy.hackeryou.com';

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
		'params[filter_not[common_name]]': 'null',
		'params[page]': randomPage()
	});
	fetch(url).then((response) => {
		return response.json();
	}).then((jsonResponse) => {
		plantApp.displayCards(jsonResponse.data)
	}).catch(error => {
		console.log(error);
	})
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
		plantImage.classList.add('defaultImage');

		if (plant.image_url) {
			// plant.image_url = plant.image_url.replace('https://bs.floristic.org', 'http://bs.floristic.org');

			//Feb 28 (the day before due-date)
			// Hello project marking person! 
			//After completing our beautiful app last night, this morning we woke to the realisation that one of the websites our API was calling on to collect images (floristic.org) stopped working for a handfull of images. We suspect and update or something like that. Previously images from this source had been displaying an error, and we were proud to work out the above line of code (line 58) that enabled us to access the images. This took us a long time to work out and we were sad to see all that problem-solving go to waste. But we are pleased with our workaround! We did leave line 58 in there though incase whatever is happening on floristic's end gets sorted and you would like to see it in full swing. You'll need to remove lines 65-67 and line 110.
			//Thanks for your time!
			//Michael and Bea.

			if (plant.image_url.includes('floristic')) {
				return ""
				} else {
			
				plantImage.src = plant.image_url;
				plantImage.alt = plant.common_name;

				const plantTitle = document.createElement('h2');
				plantTitle.innerText = plant.common_name;

				imageContainer.appendChild(plantImage);

				const plantFamilyHolder = document.createElement('h2');
				plantFamilyHolder.innerText = ''

				const plantCommonHolder = document.createElement('h3');
				plantCommonHolder.innerText = ''

				cardContainer.prepend(plantFamilyHolder)
				cardContainer.append(imageContainer, plantTitle, plantCommonHolder);

				treeCard.appendChild(cardContainer);

				console.log(plantArray)

				plantImage.addEventListener('click', () => {

					imageContainer.classList.remove('imageContainer')
					imageContainer.classList.add('plantInfoContainer')
					plantImage.classList.add('plantInfoImage')
		
					const plantSciName = document.createElement('h2');
					plantSciName.innerText = `${plant.scientific_name}`
					plantSciName.classList.add('plantSciName');
					
					const plantFamily = document.createElement('h2');
					plantFamily.innerText = `Family: ${plant.family_common_name}`

					plantTitle.innerText = plantSciName.innerText;

					plantFamilyHolder.innerText = `Scientific Name:`

					plantCommonHolder.innerText = plant.common_name

				})
			} 
		}
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
const requests = {};

export default (vin, year) => new Promise((resolve, reject) => {
	const query = vin.toLowerCase() + '_' + year.toLowerCase();
	if (!query) return resolve();
	if (requests[query]) {
		return resolve(requests[query]);
	} else {
		if (navigator.onLine) {
			fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json&modelyear=${year}`)
				.then(response => response.json())
				.then((data) => {
					requests[query] = data.Results;
					resolve(requests[query]);
				})
				.catch(error => reject('Error, try again later.'));
		} else {
			reject('Please check your network connection.');
		}
	}
});

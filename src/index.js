import './style.styl';

const uiGetButton = document.querySelector('#get-vin');
const uiVin = document.querySelector('#vin');
const uiList = document.querySelector('#list');
const uiListItems = document.querySelector('#list-items');
const uiListFilterVariable = document.querySelector('#list-fliter-variable');
const uiListFilterValue = document.querySelector('#list-fliter-value');
const uiListSortVariable = document.querySelector('#list-sort-variable');
const uiListSortValue = document.querySelector('#list-sort-value');
const uiOffline = document.querySelector('#offline');

let filterVariable = '';
let filterValue = ''
let sortVariable = 0;
let sortValue = 0;
let currentRequest = [];
let requests = {};


uiVin.oninput = event => uiOffline.innerText = navigator.onLine ? '' : 'offline';

uiGetButton.onclick = (event) => {
	event.preventDefault();
	const val = uiVin.value.toLowerCase();

	if (requests[val]) {
		currentRequest = val;
		createList();
	} else {
		uiListItems.innerHTML = 'Loading...';
		if (navigator.onLine) {
			fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${val}?format=json&modelyear=2011`)
				.then(response => response.json())
				.then((data) => {
					currentRequest = data.SearchCriteria.split(':')[1];
					requests[currentRequest] = data.Results;
					createList();
				})
				.catch(error => console.log('data', error));
		} else {
			uiListItems.innerHTML = 'offline';
		}
	}
}

uiListFilterVariable.oninput = (event) => {
	filterVariable = event.target.value;
	createList()
};
uiListFilterValue.oninput = (event) => {
	filterValue = event.target.value;
	createList()
};

const sort = (direction) => {
	if (direction == -1) return 0;
	else if (direction === 0) return 1
	else return -1;
}

uiListSortVariable.onclick = (event) => {
	sortValue = 0;
	sortVariable = sort(sortVariable);
	createList();
};

uiListSortValue.onclick = (event) => {
	sortVariable = 0;
	sortValue = sort(sortValue);
	createList();
};

const createList = () => {
	uiListItems.innerHTML = '';
	uiOffline.innerText = navigator.onLine ? '' : 'offline'
	requests[currentRequest]
		.filter(item => {
			const { Variable, Value } = item;
			let checkVariable
			let checkValue;
			checkVariable = !filterVariable || (Variable && Variable.indexOf(filterVariable) !== -1);
			checkValue = !filterValue || (Value && Value.indexOf(filterValue) !== -1);
			return checkVariable && checkValue;
		})
		.sort((a, b) => {
			let val1;
			let val2;
			let direction;
			if (sortVariable) {
				val1 = (a.Variable || '').toLowerCase();
				val2 = (b.Variable || '').toLowerCase();
				direction = sortVariable;
			} else if (sortValue) {
				val1 = (a.Value || '').toLowerCase();
				val2 = (b.Value || '').toLowerCase();
				direction = sortValue;
			} else return 0;

			if (val1 > val2) return 1 * direction;
			else if (val1 < val2) return -1 * direction;
			else return 0;

		})
		.forEach(item => {
			const uiItem = document.createElement('tr');
			const uiItemVariable = document.createElement('td');
			const uiItemValue = document.createElement('td');

			uiItemVariable.innerText = item.Variable;
			uiItemValue.innerText = item.Value;
			uiItem.appendChild(uiItemVariable);
			uiItem.appendChild(uiItemValue)
			uiListItems.appendChild(uiItem);
		});
}

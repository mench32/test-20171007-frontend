import store from './store';
import { renderList, renderError } from './view';
import './style.styl';

const uiGetButton = document.querySelector('#get-vin');
const uiVin = document.querySelector('#vin');
const uiYear = document.querySelector('#year');
const uiListItems = document.querySelector('#list-items');
const uiListFilterVariable = document.querySelector('#list-fliter-variable');
const uiListFilterValue = document.querySelector('#list-fliter-value');
const uiListSortVariable = document.querySelector('#list-sort-variable');
const uiListSortValue = document.querySelector('#list-sort-value');
const uiIndicator = document.querySelector('#indicator');

let filterVariable = '';
let filterValue = '';
let sortVariable = 0;
let sortValue = 0;
let currentVin = '';
let currentYear = '';
let checkYear = false;
let checkVin = false;


setInterval(() => uiIndicator.innerHTML = navigator.onLine ? '<span class="online"></div>' : '<span class="offline"></div>', 1000);

const render = data => renderList(uiListItems, data, filterValue, filterVariable, sortValue, sortVariable);
const renderErr = error => renderError(uiListItems, error);

const validate = () => {
	uiVin.classList.toggle('input--error', !checkVin && uiVin.value);
	uiYear.classList.toggle('input--error', !checkYear && uiYear.value);
	uiGetButton.disabled = !checkVin || !checkYear;
};

uiVin.oninput = (event) => {
	const value = event.target.value;
	if (value.length > 3) {
		store(event.target.value, uiYear.value)
			.then((data) => {
				checkVin = data[1].ValueId !== '7' || data[1].ValueId !== '5';
				validate();
			});
	} else {
		checkVin = false;
		validate();
	}
}

uiYear.oninput = (event) => {
	const value = +event.target.value;
	let now = new Date().getFullYear();

	if (event.target.value.length === 4 && !isNaN(parseFloat(value)) && isFinite(value) && value <= now ) {
		checkYear = true;
	} else {
		checkYear = false;
	}
	validate();
}

uiGetButton.onclick = (event) => {
	event.preventDefault();
	currentVin = uiVin.value;
	currentYear = uiYear.value;
	store(currentVin, currentYear).then(render).catch(renderError);
}

uiListFilterVariable.oninput = (event) => {
	filterVariable = event.target.value;
	store(currentVin, currentYear).then(render).catch(renderError);
};
uiListFilterValue.oninput = (event) => {
	filterValue = event.target.value;
	store(currentVin, currentYear).then(render).catch(renderError);
};

const sort = direct => direct > 0 ? -1 : ++direct;

const getSortClass = (direct) => {
	switch (direct) {
		case -1: return 'down';
		case 1: return 'up';
		case 0: return '';
	}
}

uiListSortVariable.onclick = (event) => {
	sortValue = 0;
	sortVariable = sort(sortVariable);
	event.target.className = `list_sort list_sort--${getSortClass(sortVariable)}`;
	uiListSortValue.className = `list_sort`;
	store(currentVin, currentYear).then(render).catch(renderError);
};

uiListSortValue.onclick = (event) => {
	sortVariable = 0;
	sortValue = sort(sortValue);
	event.target.className = `list_sort list_sort--${getSortClass(sortValue)}`;
	uiListSortVariable.className = `list_sort`;
	store(currentVin, currentYear).then(render).catch(renderError);
};

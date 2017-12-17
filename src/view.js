export const renderError = (element, text) => uiListItems.innerText = error;

export const renderList = (element, list, filterValue, filterVariable, sortValue, sortVariable) => {
	element.innerHTML = '';
	if (list && list.length) {
		const items = list
			.filter(item => {
				const { Variable, Value } = item;
				let checkVariable
				let checkValue;
				checkVariable = !filterVariable || (Variable && Variable.toLowerCase().indexOf(filterVariable.toLowerCase()) !== -1);
				checkValue = !filterValue || (Value && Value.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1);
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
				} else return 1;

				if (val1 > val2) return 1 * direction;
				else if (val1 < val2) return -1 * direction;
				else return 1;

			});
			if (items && items.length) {
				items.forEach(item => {
					const uiItem = document.createElement('tr');
					const uiItemVariable = document.createElement('td');
					const uiItemValue = document.createElement('td');

					uiItemVariable.innerText = item.Variable;
					uiItemValue.innerText = item.Value;
					uiItem.appendChild(uiItemVariable);
					uiItem.appendChild(uiItemValue)
					element.appendChild(uiItem);
				});
			} else {
				element.innerHTML = '<tr><td colspan="2" class="list_empty">Please change filter to view</td></tr>';
			}
	} else {
		element.innerHTML = '<tr><td colspan="2" class="list_empty">empty list</td></tr>';
	}
}


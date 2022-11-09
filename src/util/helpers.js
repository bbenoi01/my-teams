export const optionMap = (arr, newArr) => {
	arr.forEach((item) => {
		newArr.push({
			label: item.Name,
			value: item.Name + ', ' + item.Key,
		});
		return newArr;
	});
};

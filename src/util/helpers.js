export const optionMap = (arr, newArr) => {
	arr.forEach((item) => {
		newArr.push({
			label: item.Name,
			value: item.Name + ', ' + item.Key,
		});
		return newArr;
	});
};

export const formatAge = (string) => {
	const age = string.split(' ')[0];
	return age;
};

export const formatHeight = (int) => {
	const feet = int / 12;
	const inches = int % 12;
	return `${parseInt(feet)}' ${inches}"`;
};

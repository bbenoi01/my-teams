export const optionMap = (arr, newArr) => {
	arr.forEach((item) => {
		newArr.push({
			label: item.Name,
			value: item.Name + ', ' + item.Key,
		});
		return newArr;
	});
};

export const nameMap = (key, arr) => {
	for (let i = 0; i < arr.length; i++) {
		if (key === arr[i].Key) {
			return arr[i].Name;
		}
	}
};

export const logoMap = (team, arr) => {
	for (let i = 0; i < arr.length; i++) {
		if (team === arr[i].key) {
			return arr[i].logoUrl;
		}
	}
};

export const recordMap = (key, arr) => {
	for (let i = 0; i < arr.length; i++) {
		if (key === arr[i].Team) {
			return `${arr[i].Wins}-${arr[i].Losses}-${arr[i].Ties}`;
		}
	}
};

export const byeMap = (key, arr) => {
	for (let i = 0; i < arr.length; i++) {
		if (key === arr[i].Key) {
			return {
				latitude: arr[i].StadiumDetails.GeoLat,
				longitude: arr[i].StadiumDetails.GeoLong,
			};
		}
	}
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

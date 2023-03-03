// MIT License
//
// Copyright (c) 2023 github.com/mulgul

type MonthLookup = {
	[x: string]: string;
};

export const formatDate = (date: string): string => {
	const monthLookup: MonthLookup = {
		'1': 'Jan',
		'2': 'Feb',
		'3': 'Mar',
		'4': 'Apr',
		'5': 'May',
		'6': 'June',
		'7': 'July',
		'8': 'Aug',
		'9': 'Sept',
		'10': 'Oct',
		'11': 'Nov',
		'12': 'Dec',
	};
	const year = date.slice(0, 4);
	const month = date.slice(4, 6);
	const day = date.slice(6);

	return monthLookup[month] + ' ' + day + ', ' + year;
};

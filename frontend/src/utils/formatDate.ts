// MIT License
//
// Copyright (c) 2023 github.com/mulgul

type MonthLookup = {
	[x: string]: string;
};

export const formatDate = (date: string): string => {
	const monthLookup: MonthLookup = {
		'01': 'Jan',
		'02': 'Feb',
		'03': 'Mar',
		'04': 'Apr',
		'05': 'May',
		'06': 'June',
		'07': 'July',
		'08': 'Aug',
		'09': 'Sept',
		'10': 'Oct',
		'11': 'Nov',
		'12': 'Dec',
	};
	const year = date.slice(0, 4);
	const month = date.slice(4, 6);
	const day = date.slice(6);

	return monthLookup[month] + ' ' + day + ', ' + year;
};

// MIT License
//
// Copyright (c) 2023 github.com/mulgul

export const request = async <T>(
	path: string,
	type: string,
	options = {}
): Promise<T> => {
	return fetch(path, options)
		.then((res) => {
			if (!res.ok) {
				throw new Error(res.statusText);
			}

			if (type === 'blob') {
				return res.blob();
			}

			return res.json();
		})
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.error(`Error: ${err}`);
		});
};

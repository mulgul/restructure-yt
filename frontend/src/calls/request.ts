// MIT License
//
// Copyright (c) 2023 github.com/mulgul

export const request = async <T>(
	path: string,
	type: 'json' | 'blob' | 'stream',
	options = {}
): Promise<T> => {
	console.log('type: ', type);
	return fetch(path, options)
		.then((res) => {
			if (!res.ok) {
				throw new Error(res.statusText);
			}

			if (type === 'blob') {
				return res.blob();
			}

			if (type === 'stream') {
				// For event-streams just return the Response,
				// since multiple keys are needed under the Response type.
				return res;
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

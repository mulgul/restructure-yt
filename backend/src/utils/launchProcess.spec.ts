// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import {
	launchExecProcessPromise,
	launchSpawnProcessPromise,
	StatusResponse,
} from './launchProcess';

describe('launchProcess', () => {
	describe('launchExecProcessPromise', () => {
		it('Should return the correct stdout with a given command', async () => {
			const result = await launchExecProcessPromise('echo "Test"');

			expect(result).toBe('Test\n');
		});

		it('Should error correctly when given a invalid command', async () => {
			try {
				await launchExecProcessPromise('asdf');
			} catch (e) {
				const check = (e as string).startsWith('/bin/sh:');
				expect(check).toBe(true);
			}
		});
	});

	describe('launchSpawnProcessPromise', () => {
		it('Should return the correct success code with a given command and args', async () => {
			const result = await launchSpawnProcessPromise('echo', ['Test']);

			expect(result).toStrictEqual({
				code: 0,
				stdout: 'stdout: Test',
			});
		});

		it('Should return the correct error code with a given command and args', async () => {
			try {
				await launchSpawnProcessPromise('pwd', ['--hello']);
			} catch (e) {
				expect((e as StatusResponse).code).toBe(1);
			}
		});
	});
});

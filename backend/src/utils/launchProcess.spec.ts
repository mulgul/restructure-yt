import {
	launchExecProcess,
	launchSpawnProcess,
	StatusResponse,
} from './launchProcess';

describe('launchProcess', () => {
	describe('launchExecProcess', () => {
		it('Should return the correct stdout with a given command', async () => {
			const result = await launchExecProcess('echo "Test"');

			expect(result).toBe('Test\n');
		});

		it('Should error correctly when given a invalid command', async () => {
			try {
				await launchExecProcess('asdf');
			} catch (e) {
				const check = (e as string).startsWith('/bin/sh:')
				expect(check).toBe(true);
			}
		});
	});

	describe('launchSpawnProcess', () => {
		it('Should return the correct success code with a given command and args', async () => {
			const result = await launchSpawnProcess('echo', ['Test']);

			expect(result).toStrictEqual({
				code: 0,
				stdout: 'stdout: Test',
			});
		});

		it('Should return the correct error code with a given command and args', async () => {
			try {
				await launchSpawnProcess('pwd', ['--hello']);
			} catch (e) {
				expect((e as StatusResponse).code).toBe(1);
			}
		});
	});
});

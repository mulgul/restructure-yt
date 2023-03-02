import { launchExecProcess, launchSpawnProcess } from './launchProcess';

describe('launchProcess', () => {
	describe('launchExecProcess', () => {
		it('Should return the correct stdout with a given command', async () => {
			const result = await launchExecProcess('echo "Test"');

			expect(result).toBe('Test\n');
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
	});
});

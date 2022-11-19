import { launchExecProcess, launchSpawnProcess } from './launchProcess';

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
				expect(e).toBe('/bin/sh: asdf: command not found\n');
			}
		});
	});
});

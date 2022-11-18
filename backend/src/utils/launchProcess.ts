import { exec, spawn } from 'child_process';
import util from 'util';

const pExec = util.promisify(exec);

export const launchExecProcess = async (cmd: string) => {
	const { stdout, stderr } = await pExec(cmd);

	if (stderr) {
		console.error(`error: ${stderr}`);
	}
	
	return stdout;
};

enum StatusCode {
	Success = 0,
	Failure = 1,
}

export const launchSpawnProcess = async (
	cmd: string,
	args: string[],
) => {
	return new Promise<StatusCode>((resolve, reject) => {
		const proc = spawn(cmd, args, { detached: true });

		proc.stdout.on('data', (data) => {
			console.log(`stdout: ${data}`);
		});

		proc.stderr.on('data', (data) => {
			console.error(`stderr: ${data}`);
			reject(StatusCode.Failure);
		});

		proc.on('close', (code) => {
			console.log(`child process exited with code ${code}`);
			resolve(StatusCode.Success);
		});
	});
};

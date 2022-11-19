import { exec, spawn } from 'child_process';
import util from 'util';

const pExec = util.promisify(exec);

export const launchExecProcess = async (cmd: string) => {
	/**
	 * Instead of handling stderr returned by exec here, we are returning the catched err from
	 * the promise.
	 */
	let stdout: string;
	try {
		const output = await pExec(cmd);
		stdout = output.stdout;
	} catch (err) {
		throw Error(`error: ${err}`);
	}

	return stdout;
};

enum StatusCode {
	Success = 0,
	Failure = 1,
}

interface StatusResponse {
	code: StatusCode;
	err?: string;
}

export const launchSpawnProcess = async (cmd: string, args: string[]) => {
	return new Promise<StatusResponse>((resolve, reject) => {
		const proc = spawn(cmd, args, { detached: true });

		proc.stdout.on('data', (data) => {
			console.log(`stdout: ${data}`);
		});

		proc.stderr.on('data', (data) => {
			console.error(`stderr: ${data}`);
			reject({ code: StatusCode.Failure, err: `stderr: ${data}` });
		});

		proc.on('close', (code) => {
			console.log(`child process exited with code ${code}`);
			resolve({ code: StatusCode.Success });
		});
	});
};

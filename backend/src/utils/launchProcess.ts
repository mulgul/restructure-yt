import { exec, spawn } from 'child_process';

export const launchExecProcess = async (cmd: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		exec(cmd, (error, stdout, stderr) => {
			if (error) {
				reject(stderr);
			}
			resolve(stdout);
		});
	});
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

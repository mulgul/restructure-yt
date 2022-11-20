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
	stderr?: string;
	stdout?: string;
}

export const launchSpawnProcess = async (cmd: string, args: string[]) => {
	return new Promise<StatusResponse>((resolve, reject) => {
		const proc = spawn(cmd, args, { detached: true });
		const stdout: string[] = [];
		const stderr: string[] = [];

		proc.stdout.on('data', (data) => {
			console.log(`stdout: ${data}`);
			stdout.push(data);
		});

		proc.stderr.on('data', (data) => {
			console.error(`stderr: ${data}`);
			stderr.push(data);
		});

		proc.on('close', (code) => {
			if (code === 1) {
				reject({
					code: StatusCode.Failure,
					stderr: `stderr: ${stderr.join()}`,
				});
			} else if (code === 0) {
				resolve({
					code: StatusCode.Success,
					stdout: `stdoput: ${stdout.join()}`,
				});
			}
		});
	});
};

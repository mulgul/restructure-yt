// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import { exec, spawn } from 'child_process';

import { Log } from '../logging/Log';
import { stripData } from './stripData';

/**
 * Run child process EXEC. This will always return a string, whether rejected or resolved.
 *
 * @param cmd Command to execute
 */
export const launchExecProcessPromise = async (
	cmd: string
): Promise<string> => {
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

export interface StatusResponse {
	code: StatusCode;
	stderr?: string;
	stdout?: string;
}

export const launchSpawnProcessPromise = async (
	cmd: string,
	args: string[]
) => {
	return new Promise<StatusResponse>((resolve, reject) => {
		const proc = spawn(cmd, args, { detached: true });
		const stdout: string[] = [];
		const stderr: string[] = [];

		proc.stdout.on('data', (data: Buffer) => {
			Log.logger.info(`stdout: ${stripData(data)}`);
			stdout.push(stripData(data));
		});

		proc.stderr.on('data', (data) => {
			Log.logger.error(`stderr: ${stripData(data)}`);
			stderr.push(stripData(data));
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
					stdout: `stdout: ${stdout.join()}`,
				});
			}
		});
	});
};

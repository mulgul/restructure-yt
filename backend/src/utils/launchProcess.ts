import { ChildProcessWithoutNullStreams, exec } from 'child_process';
import util from 'util';

export type ProcsType = { [key: string]: ChildProcessWithoutNullStreams };

const pExec = util.promisify(exec);

export const launchProcess = async (cmd: string) => {
	const { stdout, stderr } = await pExec(cmd);

	if (stderr) {
		console.error(`error: ${stderr}`);
	}
	return stdout;
};

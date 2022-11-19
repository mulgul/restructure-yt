import { ExecException } from 'child_process';

export interface IExecException extends ExecException {
	stderr?: string;
}

import crypto from 'crypto';

/**
 * !!Non-cryptographic use. Meant for hashing the name of the files for ambiguous storage, and deletion.
 *
 * @param title
 */
export const createFileName = (title: string): string => {
	const shasum = crypto.createHash('sha1');
	shasum.update(title, 'utf8');
	return shasum.digest('hex');
};

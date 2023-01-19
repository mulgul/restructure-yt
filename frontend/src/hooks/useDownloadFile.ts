import { useRef, useState } from 'react';

interface DownloadFileProps {
	readonly apiDefinition: () => Promise<Blob>;
	readonly preDownloading: () => void;
	readonly postDownloading: () => void;
	readonly onError: () => void;
	readonly getFileName: () => string;
	readonly contentType: string;
}

interface DownloadedFileInfo {
	readonly download: () => Promise<void>;
	readonly ref: React.MutableRefObject<HTMLAnchorElement | null>;
	readonly name: string | undefined;
	readonly fileUrl: string | undefined;
}

export const useDownloadFile = ({
	apiDefinition,
	preDownloading,
	postDownloading,
	onError,
	getFileName,
	contentType,
}: DownloadFileProps): DownloadedFileInfo => {
	const ref = useRef<HTMLAnchorElement | null>(null);
	const [fileUrl, setFileUrl] = useState<string>();
	const [name, setFileName] = useState<string>();

	const download = async () => {
		try {
			preDownloading();
			const data = await apiDefinition();
			const url = URL.createObjectURL(new Blob([data], { type: contentType }));
			setFileUrl(url);
			setFileName(getFileName());
			ref.current?.click();
			postDownloading();
		} catch (error) {
			onError();
		}
	};

	return { download, ref, fileUrl, name };
};

import { useRef, useState } from "react";

interface DownloadFileProps {
  readonly apiDefinition: (path: string, options?: {}) => Promise<Blob>;
  readonly preDownloading: () => void;
  readonly postDownloading: () => void;
  readonly onError: () => void;
  readonly getFileName: () => string;
  readonly path: string;
  readonly contentType: string;
  readonly options?: RequestInit;
}

interface DownloadedFileInfo {
  readonly download: () => Promise<void>;
  readonly ref: React.MutableRefObject<HTMLAnchorElement | null>;
  readonly name: string | undefined;
  readonly url: string | undefined;
}

export const useDownloadFile = ({
  apiDefinition,
  preDownloading,
  postDownloading,
  onError,
  getFileName,
  path,
  contentType,
  options,
}: DownloadFileProps): DownloadedFileInfo => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [url, setFileUrl] = useState<string>();
  const [name, setFileName] = useState<string>();

  const download = async () => {
    try {
      preDownloading();
      const data = await apiDefinition(path, options);
      const url = URL.createObjectURL(new Blob([data], { type: contentType }));
      console.log("URL: ", url);
      setFileUrl(url);
      setFileName(getFileName());
      ref.current?.click();
      postDownloading();
    } catch (error) {
      onError();
    }
  };

  return { download, ref, url, name };
};

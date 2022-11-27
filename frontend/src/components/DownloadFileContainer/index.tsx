import { request } from "../../utils/fetch";
import React, { useState } from "react";
import { useDownloadFile } from "../../hooks/useDownloadFile";
import { DownloadButton, ButtonState } from "../DownloadButton";
import { Alert, Container } from "react-bootstrap";

interface IDownloadProps {
  downloadProps: {
    path: string;
    options?: {};
    title: string;
    ext: string;
    contentType: string;
  };
}

export const DownloadFileContainer: React.FC<IDownloadProps> = ({
  downloadProps,
}) => {
  const [buttonState, setButtonState] = useState<ButtonState>(
    ButtonState.Primary
  );
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const preDownloading = () => setButtonState(ButtonState.Loading);
  const postDownloading = () => setButtonState(ButtonState.Primary);

  const onErrorDownloadFile = () => {
    setButtonState(ButtonState.Primary);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const getFileName = () => {
    switch (downloadProps.ext) {
      case "m4a":
        return `audio.mp4`;
      default:
        return `audio.${downloadProps.ext}`;
    }
  };

  const downloadFile = async (path: string, options?: {}) => {
    // throw new Error("uncomment this line to mock failure of API");
    return await request<Blob>(path, "blob", options);
  };

  const { ref, url, download, name } = useDownloadFile({
    apiDefinition: downloadFile,
    preDownloading,
    postDownloading,
    onError: onErrorDownloadFile,
    getFileName,
    path: downloadProps.path,
    contentType: downloadProps.contentType,
    options: downloadProps.options,
  });

  return (
    <Container className="mt-5">
      <Alert variant="danger" show={showAlert}>
        Something went wrong. Please try again!
      </Alert>
      <a href={url} download={name} className="hidden" ref={ref} />
      <DownloadButton
        label="Download"
        buttonState={buttonState}
        onClick={download}
      />
    </Container>
  );
};

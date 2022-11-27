import React from "react";
import "./FormatCard.css";
import { IFormat, FormatProps } from "../../types/responses";
import { DownloadFileContainer } from "../DownloadFileContainer";
import { request } from "../../utils/fetch";
import { mimeTypes } from "./mimeTypes";

const FormatCard = ({ format, title, url }: FormatProps) => {
  const formatedTitle = title.split(" ").join(",");
  const formatedPath = `/audio/download?encodedURI=${encodeURIComponent(
    url
  )}&ext=${format.ext}&title=${formatedTitle}&formatId=${format.format_id}`;
  const contentType = mimeTypes[format.ext];
  const downloadState = {
    path: formatedPath,
    options: {
      headers: {
        "Content-Type": `${contentType}`,
      },
    },
    title,
    ext: format.ext,
    contentType,
  };

  return (
    <div className="FormatCard-container">
      <div className="format-ext">
        <h3>{(format as IFormat).ext}</h3>
      </div>
      <div className="format-codec">
        <p>{(format as IFormat).acodec}</p>
      </div>
      <div className="format-audobtr">
        <p>Audio Bitrate: {Math.floor((format as IFormat).abr)} Kbps</p>
      </div>
      <div className="format-filesize">
        <p>File Size: {(format as IFormat).filesize}</p>
      </div>
      <DownloadFileContainer downloadProps={downloadState} />
    </div>
  );
};

export default FormatCard;

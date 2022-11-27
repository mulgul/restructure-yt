import "./FormatCard.css";
import { IFormat, FormatProps } from "../../types/responses";
import React from "react";
import { request } from "../../utils/fetch";
import { mimeTypes } from "./mimeTypes";

const FormatCard = ({ format, title, url }: FormatProps) => {
  const formatedTitle = title.split(" ").join(",");
  const formatedPath = `/audio/download?encodedURI=${encodeURIComponent(
    url
  )}&ext=${(format as IFormat).ext}&title=${formatedTitle}&formatId=${
    (format as IFormat).format_id
  }`;

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(mimeTypes[(format as IFormat).ext], "OPTIONS");
    console.log(formatedPath, "PATH");
    const data = await request(formatedPath, {
      "Content-Type": `${mimeTypes[(format as IFormat).ext]}`,
    });
    console.log(data);
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
      <button
        className="download-btn"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e)}
      >
        Download
      </button>
    </div>
  );
};

export default FormatCard;

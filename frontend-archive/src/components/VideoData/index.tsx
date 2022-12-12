import "./VideoData.css";
import { IParsedMetadata, MetadataProps } from "../../types/responses";

const VideoData = ({ metadata }: MetadataProps) => {
  if (Object.keys(metadata).length === 0) return <div></div>;

  return (
    <div className="VideoData-container">
      <div className="Video-thumbnail">
        <img src={(metadata as IParsedMetadata).thumbnail} alt="" />
        <div className="Video-duration">
          <p>{(metadata as IParsedMetadata).duration}</p>
        </div>
      </div>
      <div className="Video-info">
        <h2 className="Video-title">{(metadata as IParsedMetadata).title}</h2>
        <p>Channel</p>
        <div className="Video-views-likes">
          <p>{(metadata as IParsedMetadata).views} views</p>
          <p>{(metadata as IParsedMetadata).uploadDate}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoData;

import './VideoData.css'
import { MetadataProps } from '../../types/responses'


const VideoData = ({metadata}: MetadataProps) => {


    return ( 
        <div className="VideoData-container">
            <div className='Video-thumbnail'>
                <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*" alt="" />
                {/* <img src={metadata.thumbnail} alt="" /> */}
                {/* <p>{metadata.duration}</p> */}
                <p>10:21</p>
            </div>
            <div className='Video-info'>
                {/* <p className="Video-title">{metadata.title}</p> */}
                <h2 className="Video-title">Title</h2>
                <p>Channel</p>
                <div className='Video-views-likes'>
                    <p>53 views</p>
                    {/* <p>{metadata.views} views</p> */}
                    <p>10 years ago</p>
                    {/* <p>{metadata.uploadDate}</p> */}
                </div>
            </div>
        </div>
    )
}

export default VideoData;
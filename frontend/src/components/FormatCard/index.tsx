import './FormatCard.css'
import { IFormat, FormatProps } from '../../types/responses'




const FormatCard = ({format}: FormatProps) => {


    return(
        <div className='FormatCard-container'>
            <div className='format-ext'>
                <h3>{(format as IFormat).ext}</h3>
            </div>
            <div className='format-codec'>
                <p>{(format as IFormat).acodec}</p>
            </div>
            <div className='format-audobtr'>
                <p>Audio Bitrate: {Math.floor((format as IFormat).abr)} Kbps</p>
            </div>
            <div className='format-filesize'>
                <p>File Size: {(format as IFormat).filesize}</p>
            </div>
            <button className='download-btn'>Download</button>
        </div>
    )
} 

export default FormatCard;
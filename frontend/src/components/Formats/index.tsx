import './Formats.css'
import { IParsedMetadata, MetadataProps, IFormat } from '../../types/responses'
import FormatCard from '../FormatCard'

const Formats = ({metadata}: MetadataProps) => {

    if(Object.keys(metadata).length === 0) return <div></div>;

    return (
        <div className='Formats-container'>
            <h2>Formats</h2>
            <div className='FormatCards-parent'>
                { (metadata as IParsedMetadata).formats.map(format => (
                    <FormatCard format={format} key={`${format.format_id}`}/>
                ))}
                {/* <button className='btn'>opus</button>
                <button className='btn'>mp4a</button>
                <button className='btn'>others</button> */}

            </div>
        </div>
    )
}

export default Formats;
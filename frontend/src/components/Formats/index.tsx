import './Formats.css'
import { IParsedMetadata, MetadataProps } from '../../types/responses'
import FormatCard from '../FormatCard'

const Formats = ({metadata}: MetadataProps) => {

    (metadata as IParsedMetadata).formats.forEach(format => {

    })

    return (
        <div className='Formats-container'>
            <h2>Formats</h2>
            <div className='Formats-buttons'>
                { (metadata as IParsedMetadata).formats.map(format => (
                    <FormatCard format={format} />
                ))}
                {/* <button className='btn'>opus</button>
                <button className='btn'>mp4a</button>
                <button className='btn'>others</button> */}

            </div>
        </div>
    )
}

export default Formats;
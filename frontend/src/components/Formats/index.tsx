import './Formats.css'
import { MetadataProps } from '../../types/responses'

const Formats = ({metadata}: MetadataProps) => {


    return (
        <div className='Formats-container'>
            <h2>Formats</h2>
            <div className='Formats-buttons'>
                <button className='btn'>opus</button>
                <button className='btn'>mp4a</button>
                <button className='btn'>others</button>

            </div>

        </div>
    )
}

export default Formats;
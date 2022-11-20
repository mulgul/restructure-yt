import React, { useState } from 'react'
import './URLInput.css'
import { request } from '../../utils/fetch'
import { IParsedMetadata } from '../../types/responses'
import VideoData from '../VideoData'
import Formats from '../Formats'

const URLInput = () => {
    
    const [url, setUrl]: [string, Function] = useState('');
    const [metadata, setMetadata] : [IParsedMetadata | {}, Function] = useState({})

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setUrl(e.target.value)
        const URLFormInput = document.getElementById("URLForm");
        if (e.target.value.match(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/)){
            URLFormInput?.classList.remove('BadLink')
            URLFormInput?.classList.add('GoodLink')
            const data = await request<IParsedMetadata>(`/audio/metadata?encodedURI=${encodeURIComponent(e.target.value)}`, {
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
            setMetadata(data)
            console.log(data)
        } else {
            URLFormInput?.classList.remove('GoodLink')
            URLFormInput?.classList.add('BadLink')
        }
    }

    return(
        <div className='right-container'>
            <div className='URLInput-container'>
                <form onSubmit={(e : React.ChangeEvent<HTMLFormElement>) => handleSubmit(e)}>
                    <input id='URLForm' type="url" value={url} placeholder="Enter a URL to Convert" onChange={(e : React.ChangeEvent<HTMLInputElement>) => handleChange(e)}/>
                </form>
            </div>
            <div className='VideoData-parent'>
                <VideoData metadata={metadata} />
            </div>
            <div className='Formats-parent'>
                <Formats metadata={metadata} />
            </div>
        </div>
    )
}

export default URLInput;
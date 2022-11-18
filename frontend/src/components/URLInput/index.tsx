import React, { useState } from 'react'
import './URLInput.css'
import { request } from '../../utils/fetch'

const URLInput = () => {

    
    const [url, setUrl]: [string, Function] = useState('');
    
    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        // console.log(e.target.value.match(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/))
        setUrl(e.target.value)
        const URLFormInput = document.getElementById("URLForm");
        if (e.target.value.match(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/)){
            URLFormInput?.classList.remove('BadLink')
            URLFormInput?.classList.add('GoodLink')
            request(`/audio/metadata?encodeURI=${encodeURIComponent(e.target.value)}`)
        } else {
            URLFormInput?.classList.add('BadLink')
        }
    }

    return(
        <div>
            <form onSubmit={(e : React.ChangeEvent<HTMLFormElement>) => handleSubmit(e)}>
                <input id='URLForm' type="url" value={url} placeholder="Enter a URL" onChange={(e : React.ChangeEvent<HTMLInputElement>) => handleChange(e)}/>
                {/* <input value={url} onKeyDown={()=>update("hi")}/> */}
            </form>
        </div>
    )
}

export default URLInput;
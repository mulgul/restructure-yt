import React, { useState } from 'react'
import './URLInput.css'
import { request } from '../../utils/fetch'

const URLInput = () => {

    
    const [url, setUrl]: [string, Function] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }


    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        // console.log(e.target.value.match(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/))
        setUrl(e.target.value)
        const URLFormInput = document.getElementById("URLForm");
        if (e.target.value.match(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/)){
            URLFormInput?.classList.remove('BadLink')
            URLFormInput?.classList.add('GoodLink')
            const data = await request(`/audio/metadata?encodedURI=${encodeURIComponent(e.target.value)}`, {
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
            console.log(data, "data")
        } else {
            URLFormInput?.classList.remove('GoodLink')
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
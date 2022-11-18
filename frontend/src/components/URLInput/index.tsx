import React, { useState } from 'react'
import './URLInput.css'
import { request } from '../../utils/fetch'

const URLInput = () => {

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    // }
    
    const [url, setUrl]: [string, Function] = useState('');



    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Hi")
        console.log(event.target.value);
    };

    const update = (field: string) => {
        if(field){
            console.log("hi")
        }
    }
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     console.log(e.target.value)
    //     console.log(e.target.value.match(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/))
    //     setUrl(e.target.value)
    //     if (e.target.value.match(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/)){
    //         document.getElementById("URLForm").classList.remove('BadLink')
    //         document.getElementById("URLForm").classList.add('GoodLink')
    //         request(`/audio/metadata?encodeURI=${encodeURIComponent(e.target.value)}`)
    //     } else {
    //         document.getElementById("URLForm").classList.add('BadLink')
    //     }
    // }



    return(
        <div>
            <form onChange={()=> update("hi")}>
                {/* <input id='URLForm' type="url" value={url} placeholder="Enter a URL" onChange={(e : React.ChangeEvent<HTMLInputElement>) => handleChange(e)}/> */}
                <input value={url} onKeyDown={()=>update("hi")}/>
            </form>
        </div>
    )
}

export default URLInput;
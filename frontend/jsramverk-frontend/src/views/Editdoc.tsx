import { Item } from './ShowAll'
import Alert from './Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { io } from "socket.io-client"

let url = ""

if (process.env.NODE_ENV === 'integration-test') {
    url = "http://localhost:3539/update/"
} else if (process.env.NODE_ENV === 'dev') {
    url = "http://localhost:3539"
}
else {
    url = "https://jsramverk-eafmccbgceegf9bt.swedencentral-01.azurewebsites.net/update/"
}

// Updates the selected document

const EditDocview = ({ data, loading }: { data: Item; loading: boolean }) => {
    const [alertVisible, setAlertVisibility] = useState(false);
    // const [title, setTitle] = useState(data.title);
    const [content, setContent] = useState(data.content);

    const socket = useRef(io())

    useEffect(() => {
        socket.current = io(url);

        socket.current.on("content", (docInfo) => {

            setContent(docInfo["content"]);
        });

        return () => {
            socket.current.disconnect();
        }
    }, []);

    function handleContentChange(e: any) {
        const value = e.target.value;

        let docInfo = {
            _id: data._id,
            content: value
        };

        socket.current.emit("content", docInfo);
    }

    const handleClick = async () => {

        await axios.post(`${url}${data._id}`,
            document.querySelector('#docForm'), {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(function (res) {
            console.log(res);
            setAlertVisibility(true);
        })
            .catch(function (error) {
                console.log(error);
            });
    }



    return (

        loading ?
            <div>
                <p>Loading document content..</p>
            </div>
            :
            <div>
                {alertVisible && <Alert onClose={() => window.location.reload()}>Nu är dokumentet uppdaterat</Alert>}
                <form id="docForm" className="docForm">
                    <label>Titel</label>
                    <input role="titletext" name="title" type="text" defaultValue={data.title}></input>
                    <label>Innehåll</label>
                    <textarea name="content" value={content} onChange={handleContentChange}></textarea>
                    <button role="Sendupdate" type="button"><FontAwesomeIcon icon={faFloppyDisk} onClick={handleClick} /></button>
                </form>
            </div>

    )
}

export default EditDocview
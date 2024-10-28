import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import Alert from './Alert'
import { ChangeEvent, useState } from 'react'
import axios from 'axios'
import url from '../helpers/url.tsx'
import Editor from "@monaco-editor/react";
// Ordna en function som skapar ett nytt dokument till backend.

// Creates a new document from a form

const Createdoc = () => {
    const [alertVisible, setAlertVisibility] = useState(false);
    const [textVisible, setTextVisibility] = useState(true);
    const [codeVisible, setCodeVisibility] = useState(false);
    const [editorContent, setEditorContent] = useState("");
    const token = localStorage.getItem('token')
    function handleEditorChange(value: string) {
        setEditorContent(value)
    }

    const handleClick = async () => {

        let data: any

        if (codeVisible) {
            let content = editorContent
            const formData = new FormData(document.querySelector('#docForm') as HTMLFormElement);
            formData.append("content", content)
            data = Object.fromEntries(formData);

            console.log(data)

        }
        else if (textVisible) {
            const formData = new FormData(document.querySelector('#docForm') as HTMLFormElement);
            data = Object.fromEntries(formData);
            console.log(data)
        }

        const username = localStorage.getItem('username');

        const postData = {
            ...data,
            sharedWith: ["admin", username]
        };

        console.log(postData);
        await axios.post(`${url}/createdoc`,
            postData, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
        }).then(function () {
            setAlertVisibility(true);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    function chooseEditor(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.value == "code") {
            setCodeVisibility(true)
            setTextVisibility(false)
        }
        else if (e.target.value == "text") {
            setCodeVisibility(false)
            setTextVisibility(true)
        }

    }
    return (

        <div>
            {alertVisible && <Alert onClose={() => window.location.reload()}>Nu är dokumentet är nu sparat</Alert>}
            <form id="docForm" className="docForm">
                <div className="radioButton" onChange={chooseEditor}>
                    <label>
                        <input type="radio" value="text" name="type" defaultChecked />
                        Text
                    </label>
                    <label>
                        <input type="radio" value="code" name="type" />
                        Code
                    </label>
                </div>
                <label>Titel</label>
                <input role="titlearea" name="title" type="text" ></input>
                <label>Innehåll</label>
                {textVisible && <textarea role="contentarea" name="content" ></textarea>}
                {codeVisible && <Editor
                    height="400px"
                    width="600px"
                    language="javascript"
                    theme="vs-dark"
                    onChange={handleEditorChange}
                />}
                <button className='docFormBtn' role="Send" type="button"><FontAwesomeIcon icon={faFloppyDisk} onClick={handleClick} /></button>
            </form>
        </div>

    )
}

export default Createdoc
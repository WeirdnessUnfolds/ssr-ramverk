import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import Alert from './Alert'
import { ChangeEvent, useState, useRef } from 'react'
import axios from 'axios'
import url from '../helpers/url.tsx'
import Editor from "@monaco-editor/react";
// Ordna en function som skapar ett nytt dokument till backend.

// Creates a new document from a form

const Createdoc = () => {
    const [alertVisible, setAlertVisibility] = useState(false);
    const [textVisible, setTextVisibility] = useState(true);
    const [codeVisible, setCodeVisibility] = useState(false);
    const token = localStorage.getItem('token')
    const editorRef = useRef(null);

    function handleEditorDidMount(editor) {
        editorRef.current = editor;
    }

    const handleClick = async () => {

        if (codeVisible) {
            let content = editorRef.current.getValue()
            let title = document.getElementsByName("title")[0].textContent
            let data = {
                title: title,
                content: content
            }
        }
        else if (textVisible) {
            const formData = new FormData(document.querySelector('#docForm') as HTMLFormElement);
            let data = Object.fromEntries(formData);
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
                <div onChange={chooseEditor}>
                    <input type="radio" value="text" name="type" defaultChecked /> Text
                    <input type="radio" value="code" name="type" /> Code
                </div>
                <label>Titel</label>
                <input role="titlearea" name="title" type="text" ></input>
                <label>Innehåll</label>
                {textVisible && <textarea role="contentarea" name="content" ></textarea>}
                {codeVisible && <Editor
                    height="100px"
                    language="javascript"
                    theme="vs-dark"
                    onMount={handleEditorDidMount}
                />}
                <button role="Send" type="button"><FontAwesomeIcon icon={faFloppyDisk} onClick={handleClick} /></button>
            </form>
        </div>

    )
}

export default Createdoc
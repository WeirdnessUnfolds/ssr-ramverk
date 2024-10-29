import { io } from "socket.io-client"
import Editor from "@monaco-editor/react";
import axios from 'axios'
import url from '../helpers/url.tsx'
import { useEffect, useRef, useState, ChangeEvent } from 'react'


interface Props {
    inputcontent: string,
    inputtitle: string
    id: any
}

function CodeEditorView({ inputcontent, id, inputtitle }: Props) {
    const [content, setContent] = useState(inputcontent);
    const [codeResult, setCodeResult] = useState("");
    const [title, setTitle] = useState(inputtitle);
    const socket = useRef(io())

    useEffect(() => {
        socket.current = io(url);

        socket.current.on("content", (docInfo) => {
            setContent(docInfo["content"]);
        });

        socket.current.on("title", (docInfo) => {
            setTitle(docInfo["title"])
        });

        return () => {
            socket.current.disconnect();
        }
    }, []);

    function handleCodeContentChange(value: string | undefined) {
        let content = value

        const docInfo = {
            _id: id,
            title: title,
            content: content
        };

        socket.current.emit("content", docInfo);
    }

    function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
        let title = e.target.value

        const docInfo = {
            _id: id,
            title: title,
            content: content
        };

        socket.current.emit("title", docInfo);
    }

    const runCode = async () => {
        setCodeResult("Running code...")
        var data = {
            code: btoa(content)
        };

        await axios.post(`https://execjs.emilfolino.se/code`,
            JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            let decodedOutput = atob(res.data.data);
            console.log(decodedOutput)
            setCodeResult(decodedOutput)
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <div className='two-column'>
                <div className="consoleColumn">
                    <h2>Konsol</h2>
                    <div className="console">{codeResult}</div>
                    <button className='runbtn' type="button" onClick={runCode}>Kör kod</button></div>
                <div className='edit-column'>
                    <form className="docForm">
                        <label>Titel</label>
                        <input role="titletext" name="title" type="text" onChange={handleTitleChange} defaultValue={title}></input>
                        <label>Innehåll</label>
                        <Editor
                            height="700px"
                            width="600px"
                            language="javascript"
                            theme="vs-dark"
                            value={content}
                            onChange={handleCodeContentChange}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default CodeEditorView
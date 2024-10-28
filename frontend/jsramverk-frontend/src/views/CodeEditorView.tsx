import { io } from "socket.io-client"
import Editor from "@monaco-editor/react";
import url from '../helpers/url.tsx'
import { useEffect, useRef, useState } from 'react'


interface Props {
    inputcontent: string,
    title: string
    id: any
}

function CodeEditorView({ inputcontent, id, title }: Props) {
    const [content, setContent] = useState(inputcontent);
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

    function handleCodeContentChange(value: string | undefined) {
        let content = value

        const docInfo = {
            _id: id,
            title: title,
            content: content
        };

        socket.current.emit("content", docInfo);
    }

    return (
        <Editor
            height="400px"
            width="600px"
            language="javascript"
            theme="vs-dark"
            value={content}
            onChange={handleCodeContentChange}
        />
    )
}

export default CodeEditorView
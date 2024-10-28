import { useEffect, useRef, useState, ChangeEvent } from 'react'
import url from '../helpers/url.tsx'
import { io } from "socket.io-client"

interface Props {
    inputcontent: string,
    title: string
    id: any
    sendCommentInfo: (line: number, selection: string) => void
}

function TextEditorView({ inputcontent, id, title, sendCommentInfo }: Props) {
    const [content, setContent] = useState(inputcontent);
    const [selection, setSelection] = useState("");
    const [line, setCommentLine] = useState(0);
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

    function handleContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
        let content = e.target.value

        const docInfo = {
            _id: id,
            title: title,
            content: content
        };

        socket.current.emit("content", docInfo);
    }

    function getLineNumber(textarea: any) {
        let lines = textarea.value.substr(0, textarea.selectionStart).split("\n").length;
        return lines
    }

    function handleComment(e: any) {
        setSelection(e.target.value.substring(
            e.target.selectionStart,
            e.target.selectionEnd
        ));

        if (selection != "") {
            setCommentLine(getLineNumber(e.target));
            sendCommentInfo(line, selection)
        }
    }

    return (
        <textarea name="content" value={content} onChange={handleContentChange} onSelect={handleComment}>{content}</textarea>
    )
}

export default TextEditorView
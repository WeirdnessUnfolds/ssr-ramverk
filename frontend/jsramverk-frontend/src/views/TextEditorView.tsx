import { useEffect, useRef, useState, ChangeEvent } from 'react'
import url from '../helpers/url.tsx'
import { io } from "socket.io-client"
import CommentSection from './CommentSection.tsx'

interface Props {
    inputcontent: string,
    inputtitle: string,
    inputcomments: Array<any>
    id: any
    sendCommentInfo: (line: number, selection: string) => void
}

function TextEditorView({ inputcontent, id, inputtitle, inputcomments, sendCommentInfo }: Props) {
    const [content, setContent] = useState(inputcontent);
    const [title, setTitle] = useState(inputtitle);
    const [comments, setComments] = useState(inputcomments);
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

    function handleContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
        let content = e.target.value

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

    function getLineNumber(textarea: any) {
        let lines = textarea.value.substr(0, textarea.selectionStart).split("\n").length;
        return lines
    }

    function handleComment(e: any) {
        const selection = e.target.value.substring(
            e.target.selectionStart,
            e.target.selectionEnd
        );

        const line = getLineNumber(e.target)

        if (selection != "") {
            sendCommentInfo(line, selection)
        }
    }

    function deleteComment(id: number) {
        const newCommentArray = comments.filter((i) => (i.comment_id !== id))
        setComments(newCommentArray);
        console.log(newCommentArray);

        const commentInfo = {
            _id: id,
            comments: newCommentArray
        };

        socket.current.emit("comment", commentInfo);
    }

    return (
        <>
            <CommentSection deleteComment={(id) => deleteComment(id)}>{comments}</CommentSection>
            <div className='edit-column'>
                <form className="docForm">
                    <label>Titel</label>
                    <input role="titletext" name="title" type="text" onChange={handleTitleChange} defaultValue={title}></input>
                    <label>Innehåll</label>
                    <textarea name="content" value={content} onChange={handleContentChange} onSelect={handleComment}>{content}</textarea>
                </form>
            </div>
        </>
    )
}

export default TextEditorView
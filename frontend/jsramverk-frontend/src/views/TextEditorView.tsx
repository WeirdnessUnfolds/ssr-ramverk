import { useEffect, useRef, useState, ChangeEvent } from 'react'
import url from '../helpers/url.tsx'
import { io } from "socket.io-client"
import CommentSection from './CommentSection.tsx'

interface Props {
    inputcontent: string,
    inputtitle: string,
    inputcomments: Array<any>
    id: any
}

function TextEditorView({ inputcontent, id, inputtitle, inputcomments }: Props) {
    const [content, setContent] = useState(inputcontent);
    const [title, setTitle] = useState(inputtitle);
    const [comments, setComments] = useState(inputcomments);
    const [showPopup, setShowPopup] = useState(false);
    const [line, setCommentLine] = useState(0);
    const [selection, setSelection] = useState("");
    const socket = useRef(io())

    useEffect(() => {
        socket.current = io(url);

        socket.current.on("content", (docInfo) => {
            setContent(docInfo["content"]);
        });

        socket.current.on("title", (docInfo) => {
            setTitle(docInfo["title"]);
        });

        socket.current.on("comment", (comments) => {
            setComments(comments["comments"]);
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
        const title = e.target.value

        const docInfo = {
            _id: id,
            title: title,
            content: content
        };

        socket.current.emit("title", docInfo);
    }

    function getLineNumber(textarea: any) {
        const lines = textarea.value.substr(0, textarea.selectionStart).split("\n").length;
        return lines
    }

    function handleComment(e: ChangeEvent<HTMLTextAreaElement>) {
        setSelection(e.target.value.substring(
            e.target.selectionStart,
            e.target.selectionEnd
        ));

        setCommentLine(getLineNumber(e.target));

        if (selection != "") {
            setShowPopup(true);
        }
    }

    function sendComment() {
        console.log("send comment")
        console.log(localStorage.getItem('username'));
        const formData = new FormData(document.querySelector('#commentForm') as HTMLFormElement);

        const commentContent = {
            line: line,
            selection: selection,
            comment: formData.get("comment"),
            comment_id: Math.floor(Math.random() * 1000),
            user: localStorage.getItem('username'),
        };

        comments.push(commentContent);

        const commentInfo = {
            _id: id,
            comments: comments
        };

        socket.current.emit("comment", commentInfo);

        setShowPopup(false);
    }

    function deleteComment(commentId: number) {
        const newCommentArray = comments.filter((i) => (i.comment_id !== commentId))
        setComments(newCommentArray);
        console.log(newCommentArray);

        const commentInfo = {
            _id: id,
            comments: newCommentArray
        };

        socket.current.emit("comment", commentInfo);
    }

    function closePopup() {
        setShowPopup(false);
    }

    return (
        <>
            {showPopup &&
                <div className='popup'>
                    <form className="commentForm" id="commentForm">
                        <button role="closebtn" type="button" className="closebtn" onClick={closePopup}>X</button>
                        <p>Kommentera texten "{selection}" i paragraf {line} </p>
                        <input id="comment" name="comment" type="text"></input>
                        <button role="commentbtn" type="button" className="commentbtn" onClick={sendComment}>Kommentera</button>
                    </form>
                </div>}
            <div className='two-column'>
                <CommentSection deleteComment={(commentId) => deleteComment(commentId)}>{comments}</CommentSection>
                <div className='edit-column'>
                    <form className="docForm">
                        <label>Titel</label>
                        <input role="titletext" name="title" type="text" onChange={handleTitleChange} defaultValue={title}></input>
                        <label>Innehåll</label>
                        <textarea name="content" value={content} onChange={handleContentChange} onSelect={handleComment}>{content}</textarea>
                    </form>
                </div>
            </div>
        </>
    )
}

export default TextEditorView
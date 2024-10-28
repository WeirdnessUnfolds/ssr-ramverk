import { Item } from './ShowAll'
import axios from 'axios'
import url from '../helpers/url.tsx'
import CommentSection from './CommentSection.tsx'
import Share from './Share.tsx'
import { useState, useEffect, useRef, ChangeEvent } from 'react'
import { io } from "socket.io-client"
import Alert from './Alert.tsx'
// import Mailgun from 'mailgun.js';
import CodeEditorView from './CodeEditorView.tsx'
import TextEditorView from './TextEditorView.tsx'


// Updates the selected document

const EditDocview = ({ data, loading }: { data: Item; loading: boolean }) => {
    const [title, setTitle] = useState(data.title);
    const [content, setContent] = useState(data.content);
    const [comments, setComments] = useState(data.comments);
    const [showPopup, setShowPopup] = useState(false);
    const [line, setCommentLine] = useState(0);
    const [selection, setSelection] = useState("");
    const [alertVisible, setAlertVisibility] = useState(false);
    const type = data.type
    const [codeResult, setCodeResult] = useState("");

    const socket = useRef(io())

    useEffect(() => {
        socket.current = io(url);

        socket.current.on("content", (docInfo) => {
            setContent(docInfo["content"]);
        });

        socket.current.on("comment", (comments) => {
            setComments(comments["comments"]);
        });

        socket.current.on("title", (docInfo) => {
            setTitle(docInfo["title"])
        });

        return () => {
            socket.current.disconnect();
        }
    }, []);

    function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
        let title = e.target.value

        const docInfo = {
            _id: data._id,
            title: title,
            content: content
        };

        socket.current.emit("title", docInfo);
    }

    function handleComment(line: number, selection: string) {
        setSelection(selection)
        setCommentLine(line)
        setShowPopup(true)
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
            _id: data._id,
            comments: comments
        };

        socket.current.emit("comment", commentInfo);

        setShowPopup(false);
    }

    function closePopup() {
        setShowPopup(false);
    }

    function handleOnShare() {
        setAlertVisibility(true);
    }

    function deleteComment(id: number) {
        const newCommentArray = comments.filter((i) => (i.comment_id !== id))
        setComments(newCommentArray);
        console.log(newCommentArray);

        const commentInfo = {
            _id: data._id,
            comments: newCommentArray
        };

        socket.current.emit("comment", commentInfo);
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
            setCodeResult(decodedOutput)
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
            <div >
                {showPopup &&
                    <div className='popup'>
                        <form className="commentForm" id="commentForm">
                            <button role="closebtn" type="button" className="closebtn" onClick={closePopup}>X</button>
                            <p>Kommentera texten "{selection}" på rad {line} </p>
                            <input id="comment" name="comment" type="text"></input>
                            <button role="commentbtn" type="button" className="commentbtn" onClick={sendComment}>Kommentera</button>

                        </form>
                    </div>}
                <div className='two-column'>
                    {type == "text" && <CommentSection deleteComment={(id) => deleteComment(id)}>{comments}</CommentSection>}
                    {type == "code" && <div className="consoleColumn">
                        <h2>Konsol</h2>
                        <div className="console">{codeResult}</div>
                        <button className='runbtn' type="button" onClick={runCode}>Kör kod</button></div>}
                    <div className='edit-column'>
                        <form className="docForm">
                            <label>Titel</label>
                            <input role="titletext" name="title" type="text" onChange={handleTitleChange} defaultValue={title}></input>
                            <label>Innehåll</label>
                            {type == "text" && <TextEditorView sendCommentInfo={(line, selection) => handleComment(line, selection)} inputcontent={content} id={data._id} title={title}></TextEditorView>}
                            {type == "code" && <CodeEditorView inputcontent={content} id={data._id} title={title}></CodeEditorView>}
                        </form>
                        <Share id={data._id} onShare={handleOnShare} ></Share>
                        {alertVisible && <Alert onClose={() => setAlertVisibility(false)}>Ett mail har skickats med en inbjudan till att redigera dokumentet</Alert>}
                    </div>
                </div>
            </div >

    )
}

export default EditDocview
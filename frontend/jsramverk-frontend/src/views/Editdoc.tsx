import { Item } from './ShowAll'
import url from '../helpers/url.tsx'
import Share from './Share.tsx'
import { useState, useEffect, useRef } from 'react'
import { io } from "socket.io-client"
import Alert from './Alert.tsx'
// import Mailgun from 'mailgun.js';
import CodeEditorView from './CodeEditorView.tsx'
import TextEditorView from './TextEditorView.tsx'
// import ConsoleView from './ConsoleView.tsx'


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


    const socket = useRef(io())

    useEffect(() => {
        socket.current = io(url);

        socket.current.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });

        socket.current.on("content", (docInfo) => {
            console.log("new content")
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
                    {type == "text" && <TextEditorView sendCommentInfo={(line, selection) => handleComment(line, selection)} inputcontent={content} id={data._id} inputtitle={title} inputcomments={comments}></TextEditorView>}
                    {type == "code" && <CodeEditorView inputcontent={content} id={data._id} inputtitle={title}></CodeEditorView>}
                </div>
                <div className="shareBox">
                    <Share id={data._id} onShare={handleOnShare} ></Share>
                    {alertVisible && <Alert onClose={() => setAlertVisibility(false)}>Ett mail har skickats med en inbjudan till att redigera dokumentet</Alert>}
                </div>

            </div>
    )
}

export default EditDocview
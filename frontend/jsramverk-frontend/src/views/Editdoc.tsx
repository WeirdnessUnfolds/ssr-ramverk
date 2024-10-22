import { Item } from './ShowAll'

// import axios from 'axios'
import url from '../helpers/url.tsx'
import CommentSection from './CommentSection.tsx'
import { useState, useEffect, useRef, ChangeEvent } from 'react'
import { io } from "socket.io-client"
import Mailgun from 'mailgun.js';


// Updates the selected document

const EditDocview = ({ data, loading }: { data: Item; loading: boolean }) => {
    // const [title, setTitle] = useState(data.title);
    const [content, setContent] = useState(data.content);
    const [comments, setComments] = useState<Object[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [line, setCommentLine] = useState(0);
    const [selection, setSelection] = useState("");

    const socket = useRef(io())

    useEffect(() => {
        socket.current = io(url);

        socket.current.on("content", (docInfo) => {
            setContent(docInfo["content"]);
        });

        socket.current.on("comment", (comments) => {
            setComments(comments);
        });


        return () => {
            socket.current.disconnect();
        }
    }, []);


    function handleContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
        let content = e.target.value

        const docInfo = {
            _id: data._id,
            title: data.title,
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
            console.log(line)
            setShowPopup(true);
        }
    }

    function handleShare() {
        const formData = new  FormData(document.querySelector('#shareForm') as HTMLFormElement);
        const mailgun = new Mailgun(formData);
        const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'});
  
         mg.messages.create('sandbox-123.mailgun.org', {
  	     from: "Excited User <mailgun@sandboxbe3768f0308f486c8a4d1ea58190ba46.mailgun.org>",
  	     to: [formData.get("email")],
  	     subject: "Hello",
  	     text: "Testing some Mailgun awesomeness!",
  	html: "<h1>Testing some Mailgun awesomeness!</h1>"
  })
  .then(msg => console.log(msg)) // logs response data
  .catch(err => console.log(err)); // logs any error
    }

    function sendComment() {
        console.log("send comment")
        const formData = new FormData(document.querySelector('#commentForm') as HTMLFormElement);

        const commentContent = {
            line: line,
            selection: selection,
            comment: formData.get("comment"),
            comment_id: Math.floor(Math.random() * 1000),
        };
        comments.push(commentContent);
        socket.current.emit("comment", comments);
    }

    function closePopup() {
        setShowPopup(false);
    }

    function deleteComment(id: number) {
        const newCommentArray = comments.filter((i) => (i.comment_id !== id))
        setComments(newCommentArray);
        console.log(newCommentArray)
        socket.current.emit("comment", newCommentArray);
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
                    <CommentSection deleteComment={(id) => deleteComment(id)}>{comments}</CommentSection>
                    <div className='edit-column'>
                        <form className="docForm">
                            <label>Titel</label>
                            <input role="titletext" name="title" type="text" defaultValue={data.title}></input>
                            <label>Innehåll</label>
                            <textarea name="content" value={content} onChange={handleContentChange} onSelect={handleComment}>{content}</textarea>
                        </form>
                        <form className='shareForm'>
                            <textarea role="email" name="shareemail" defaultValue="Skriv in ett mail som du vill skicka en delningsinbjudan med.."></textarea>
                            <button role="sharebtn" type="button" className="sharebtn">Dela</button>
                        </form>
                    </div>
                </div>
            </div >

    )
}

export default EditDocview
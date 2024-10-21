import { Item } from './ShowAll'

// import axios from 'axios'
import url from '../helpers/url.tsx'
import CommentSection from './CommentSection.tsx'
import Popup from './Popup.tsx'
import { useState, useEffect, useRef, ChangeEvent } from 'react'
import { io } from "socket.io-client"


// Updates the selected document

const EditDocview = ({ data, loading }: { data: Item; loading: boolean }) => {
    // const [title, setTitle] = useState(data.title);
    const [content, setContent] = useState(data.content);
    const [comments, setComments] = useState<Object[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupContent, setPopupContent] = useState("");



    const socket = useRef(io())

    useEffect(() => {
        socket.current = io(url);

        socket.current.on("content", (docInfo) => {
            console.log(docInfo["content"]);
            setContent(docInfo["content"]);
        });

        socket.current.on("comment", (comment) => {
            comments.push(comment);
            setComments(comments);
        });


        return () => {
            socket.current.disconnect();
        }
    }, []);


    function handleContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
        let content = e.target.value

        console.log(content)

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
        const selection = e.target.value.substring(
            e.target.selectionStart,
            e.target.selectionEnd
        );

        if (selection != "") {
            const position = e.target.selectionEnd;

            setShowPopup(true);

            console.log(selection);
            console.log(position);

            let line = getLineNumber(e.target);
            console.log(line)
            setShowPopup(true);
            setPopupContent(line);

            const commentContent = {
                line: line,
                comment: selection
            };

            socket.current.emit("comment", commentContent);
        }

    }

    function sendComment() {
        console.log("send comment")
        const comment = document.getElementById('comment').value

        console.log(comment)
    }



    return (

        loading ?
            <div>
                <p>Loading document content..</p>
            </div>
            :
            <div>
                {showPopup && <Popup line={popupContent} onComment={sendComment}></Popup>}

                <CommentSection>{comments}</CommentSection>

                <form className="docForm">
                    <label>Titel</label>
                    <input role="titletext" name="title" type="text" defaultValue={data.title}></input>
                    <label>Innehåll</label>

                    <textarea name="content" value={content} onChange={handleContentChange} onSelect={handleComment}>{content}</textarea>
                </form>
            </div >

    )
}

export default EditDocview
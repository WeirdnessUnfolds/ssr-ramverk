import { Item } from './ShowAll'

// import axios from 'axios'

import url from '../helpers/url.tsx'
import Popup from './Popup.tsx'

import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react'
import { io } from "socket.io-client"



// Updates the selected document

const EditDocview = ({ data, loading }: { data: Item; loading: boolean }) => {


    // const [title, setTitle] = useState(data.title);
    const [content, setContent] = useState(data.content);
    const [showPopup, setShowPopup] = useState(false);
    const [popupContent, setPopupContent] = useState("");

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
        const value = e.target.value;

        const docInfo = {
            _id: data._id,
            title: data.title,
            content: value
        };

        socket.current.emit("content", docInfo);
    }
    function getLineNumber(textarea: any) {
        let lines = textarea.value.substr(0, textarea.selectionStart).split("\n").length;
        return lines
    }

    function handleComment(e: any) {
        // const selection = e.target.value.substring(
        //     e.target.selectionStart,
        //     e.target.selectionEnd
        // );
        // const position = e.target.selectionEnd;


        // console.log(selection);
        // console.log(position);

        let line = getLineNumber(e.target);
        console.log(line)
        setShowPopup(true);
        setPopupContent(line);
    }

    function sendComment(e: any) {
        console.log("send comment")
        const comment = document.getElementById('comment').value

        console.log(comment)
    }

    // const handleClick = async () => {

    //     await axios.post(`${url}/update/${data._id}`,
    //         document.querySelector('#docForm'), {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //     }).then(function () {
    //         setAlertVisibility(true);
    //     })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }



    return (

        loading ?
            <div>
                <p>Loading document content..</p>
            </div>
            :
            <div>

                {showPopup && <Popup line={popupContent} onComment={sendComment}></Popup>}
                <form id="docForm" className="docForm">
                    <label>Titel</label>
                    <input role="titletext" name="title" type="text" defaultValue={data.title}></input>
                    <label>Innehåll</label>
                    <textarea className="textarea" name="content" value={content} onChange={handleContentChange} onSelect={handleComment}></textarea>

                </form>
            </div>

    )
}

export default EditDocview
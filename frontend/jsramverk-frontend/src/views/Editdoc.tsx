import { Item } from './ShowAll'

// import axios from 'axios'

import url from '../helpers/url.tsx'
import Popup from './Popup.tsx'

import { useState, useEffect, useRef, ChangeEvent } from 'react'
import { io } from "socket.io-client"



// Updates the selected document

const EditDocview = ({ data, loading }: { data: Item; loading: boolean }) => {


    // const [title, setTitle] = useState(data.title);
    const [content, setContent] = useState(data.content);
    const [showPopup, setShowPopup] = useState(false);
    const [popupContent, setPopupContent] = useState<e | null>(null)

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

    function handleComment(e: any) {
        const selection = e.target.value.substring(
            e.target.selectionStart,
            e.target.selectionEnd
        );
        const position = e.target.selectionEnd;
        setShowPopup(true);
        setPopupContent(e);

        console.log(selection);
        console.log(position);
    }

    function sendComment() {
        console.log("send comment")
        const text = document.querySelector(".comment")?.innerHTML
        console.log(text)
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
                {showPopup && <Popup data={popupContent} onClose={sendComment}></Popup>}
                <form id="docForm" className="docForm">
                    <label>Titel</label>
                    <input role="titletext" name="title" type="text" defaultValue={data.title}></input>
                    <label>Innehåll</label>
                    <textarea name="content" value={content} onChange={handleContentChange} onSelect={handleComment}></textarea>

                </form>
            </div>

    )
}

export default EditDocview
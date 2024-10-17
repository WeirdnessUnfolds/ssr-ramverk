import { Item } from './ShowAll'

import { BaseEditor, Descendant, createEditor, Node } from 'slate'
import { ReactEditor, Slate, Editable, withReact } from 'slate-react'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}

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
    const [popupContent, setPopupContent] = useState("");
    const [editor] = useState(() => withReact(createEditor()));
    const initialValue = [
        {
            type: 'paragraph',
            children: [{ text: data.content }],
        },
    ]

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

    const serialize = value => {
        return (
            value
                // Return the string content of each paragraph in the value's children.
                .map(n => Node.string(n))
                // Join them all with line breaks denoting paragraphs.
                .join('\n')
        )
    }

    function handleContentChange(value: any) {

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


                <label>Titel</label>
                <input role="titletext" name="title" type="text" defaultValue={data.title}></input>
                <label>Innehåll</label>

                <Slate editor={editor}
                    initialValue={initialValue}
                    onChange={value => {
                        const isAstChange = editor.operations.some(
                            op => 'set_selection' !== op.type
                        )
                        if (isAstChange) {
                            handleContentChange(serialize(value))
                            console.log(serialize(value))
                        }

                    }}
                >
                    <Editable />
                </Slate>

            </div >

    )
}

export default EditDocview
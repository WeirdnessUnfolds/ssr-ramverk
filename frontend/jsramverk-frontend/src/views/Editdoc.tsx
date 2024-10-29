import { Item } from './ShowAll'
import Share from './Share.tsx'
import { useState } from 'react'
import Alert from './Alert.tsx'
// import Mailgun from 'mailgun.js';
import CodeEditorView from './CodeEditorView.tsx'
import TextEditorView from './TextEditorView.tsx'


// Updates the selected document

const EditDocview = ({ data, loading }: { data: Item; loading: boolean }) => {
    const title = data.title;
    const content = data.content;
    const comments = data.comments;
    const [alertVisible, setAlertVisibility] = useState(false);
    const type = data.type

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
                <div>
                    {type == "text" && <TextEditorView inputcontent={content} id={data._id} inputtitle={title} inputcomments={comments}></TextEditorView>}
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
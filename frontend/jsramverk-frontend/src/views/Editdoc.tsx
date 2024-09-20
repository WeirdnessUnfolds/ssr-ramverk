import { Item } from './ShowAll'
import Alert from './Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useState } from 'react'

// Ordna en action som uppdaterar

// Updates the selected document

const EditDocview = ({ data, loading }: { data: Item; loading: boolean }) => {
    const [alertVisible, setAlertVisibility] = useState(false)
    const handleClick = async () => {
        const form = document.getElementById('docForm');
        const formData = new FormData(form);
        await fetch(`http://localhost:3539/update/${data._id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(function (res){
            console.log(res);
            // Do something with res so that the alert is shown
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    return (

        loading ?
            <div>
                <p>Loading document contents..</p>
            </div>
            :
            <div>
                {alertVisible && <Alert onClose={() => setAlertVisibility(false)} />}
                <form id="docForm" className="docForm">
                    <label>Titel</label>
                    <input name="title" type="text" defaultValue={data.title}></input>
                    <label>Innehåll</label>
                    <textarea name="content" defaultValue={data.content}></textarea>
                    <button type="submit"><FontAwesomeIcon icon={faFloppyDisk} onClick={handleClick} /></button>
                </form>
            </div>

    )
}

export default EditDocview
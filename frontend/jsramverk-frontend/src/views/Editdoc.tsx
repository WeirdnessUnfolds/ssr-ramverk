import { Item } from './ShowAll'
import Alert from './Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useState } from 'react'

// Ordna en action som uppdaterar

// Updates the selected document

const EditDocview = ({ data, loading }: { data: Item; loading: boolean }) => {
    const [alertVisible, setAlertVisibility] = useState(false);
    const handleClick = async () => {
        event?.preventDefault();
        const form = document.querySelector('#docForm');
        const formData = new FormData(form);
        for (const value of formData.values()) {
            console.log(value);
        }

        await axios.post(`http://localhost:3539/update/${data._id}`, document.querySelector('#docForm'), {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(function (res) {
            console.log(res);
            setAlertVisibility(true);
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
                {alertVisible && <Alert onClose={() => window.location.reload()}>Nu är dokumentet uppdaterat</Alert>}
                <form id="docForm" className="docForm">
                    <label>Titel</label>
                    <input name="title" type="text" defaultValue={data.title}></input>
                    <label>Innehåll</label>
                    <textarea name="content" defaultValue={data.content}></textarea>
                    <button type="button"><FontAwesomeIcon icon={faFloppyDisk} onClick={handleClick} /></button>
                </form>
            </div>

    )
}

export default EditDocview
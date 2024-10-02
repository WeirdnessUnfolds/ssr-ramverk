import { Item } from './ShowAll'
import Alert from './Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useState } from 'react'

let url = "";
if (process.env.NODE_ENV === 'integration-test') {
    url = "http://localhost:3539/update/"
} else {
    url = "https://jsramverk-eafmccbgceegf9bt.swedencentral-01.azurewebsites.net/update/"
}

// Ordna en action som uppdaterar

// Updates the selected document

const EditDocview = ({ data, loading }: { data: Item; loading: boolean }) => {
    const [alertVisible, setAlertVisibility] = useState(false);
    const handleClick = async () => {

        await axios.post(`${url}${data._id}`,
            document.querySelector('#docForm'), {
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
                    <input role="titletext" name="title" type="text" defaultValue={data.title}></input>
                    <label>Innehåll</label>
                    <textarea name="content" defaultValue={data.content}></textarea>
                    <button role="Sendupdate" type="button"><FontAwesomeIcon icon={faFloppyDisk} onClick={handleClick} /></button>
                </form>
            </div>

    )
}

export default EditDocview
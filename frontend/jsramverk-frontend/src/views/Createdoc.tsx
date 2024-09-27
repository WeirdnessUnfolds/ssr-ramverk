import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import Alert from './Alert'
import { useState } from 'react'
import axios from 'axios'

// Ordna en function som skapar ett nytt dokument till backend.

// Creates a new document from a form

const Createdoc = () => {
    const [alertVisible, setAlertVisibility] = useState(false);
    const handleClick = async () => {
        await axios.post(`http://localhost:3539/createdoc`, document.querySelector('#docForm'), {
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

        <div>
            {alertVisible && <Alert onClose={() => window.location.reload()}>Nu är dokumentet är nu sparat</Alert>}
            <form id="docForm" className="docForm">
                <label>Titel</label>
                <input name="title" type="text" ></input>
                <label>Innehåll</label>
                <textarea name="content" ></textarea>
                <button role="Send" type="button"><FontAwesomeIcon icon={faFloppyDisk} onClick={handleClick} /></button>
            </form>
        </div>

    )
}

export default Createdoc
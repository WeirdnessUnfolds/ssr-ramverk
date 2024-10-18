import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import Alert from './Alert'
import { useState } from 'react'
import axios from 'axios'
import url from '../helpers/url.tsx'
// Ordna en function som skapar ett nytt dokument till backend.

// Creates a new document from a form

const Createdoc = () => {
    const [alertVisible, setAlertVisibility] = useState(false);
    const token = localStorage.getItem('token')
    const handleClick = async () => {

    const formData = new FormData(document.querySelector('#docForm') as HTMLFormElement);
    const data = Object.fromEntries(formData);
    const username = localStorage.getItem('username');

   const postData = {
    ...data,
    sharedWith: ["admin", username]
  };

  console.log(postData);
        await axios.post(`${url}/createdoc`,
            postData, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
        }).then(function () {
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
                <input role="titlearea" name="title" type="text" ></input>
                <label>Innehåll</label>
                <textarea role="contentarea" name="content" ></textarea>
                <button role="Send" type="button"><FontAwesomeIcon icon={faFloppyDisk} onClick={handleClick} /></button>
            </form>
        </div>

    )
}

export default Createdoc
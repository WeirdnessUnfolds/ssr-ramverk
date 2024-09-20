import { Item } from './ShowAll'
import Alert from './Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useState } from 'react'

// Ordna en action som uppdaterar

// Updates the selected document

const EditDocview = ({ data, loading }: { data: Item; loading: boolean }) => {
    const [alertVisible, setAlertVisibility] = useState(true)
    const handleClick = () => {
        axios.put(`http://localhost:3539/update/${data._id}`, data)
        setAlertVisibility(true)
    }
    return (

        loading ?
            <div>
                <p>Loading document contents..</p>
            </div>
            :
            <div>
                {alertVisible && <Alert onClose={() => setAlertVisibility(false)} />}
                <form className="docForm">
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
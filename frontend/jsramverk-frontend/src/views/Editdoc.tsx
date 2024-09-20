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
    const handleClick = () => {
<<<<<<< HEAD
<<<<<<< HEAD
        axios.post(`http://localhost:3539/update/${data._id}`, data);
        document.get
      }
=======
        axios.put("http://localhost:3539", data)
=======
        axios.put(`http://localhost:3539/update/${data._id}`, data)
>>>>>>> 8cc2b6b3277c4c31bfa28e9a1fd4df62704073e4
        setAlertVisibility(true)
    }
>>>>>>> 4b2e5df5e0a4f1e7a6504ce8824f6e2042a14dc9
    return (
        <>

            loading ?
            <div>
                <p>Loading document contents..</p>
            </div>
            :
<<<<<<< HEAD
            <form className="docForm">
                <label>Titel</label>
                <input name="title" type="text" defaultValue={data.title}></input>
                <label>Innehåll</label>
                <textarea name="content" defaultValue={data.content}></textarea>
                <button type="submit"><FontAwesomeIcon icon={faFloppyDisk} onClick={handleClick}/></button>
            </form>
            <div className="updatedpopup"></div>
=======
            <div>
                {alertVisible && <Alert />}
                <form className="docForm">
                    <label>Titel</label>
                    <input name="title" type="text" defaultValue={data.title}></input>
                    <label>Innehåll</label>
                    <textarea name="content" defaultValue={data.content}></textarea>
                    <button type="submit"><FontAwesomeIcon icon={faFloppyDisk} onClick={handleClick} /></button>
                </form>
            </div>
        </>
>>>>>>> 4b2e5df5e0a4f1e7a6504ce8824f6e2042a14dc9
    )
}

export default EditDocview
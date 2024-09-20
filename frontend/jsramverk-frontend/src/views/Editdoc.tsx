import { Item } from './ShowAll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

// Ordna en action som uppdaterar

// Updates the selected document

const EditDocview = ({ data, loading }: { data: Item; loading: boolean }) => {
    const handleClick = () => {
        axios.post(`http://localhost:3539/update/${data._id}`, data);
        document.get
      }
    return (
        loading ?
            <div>
                <p>Loading document contents..</p>
            </div>
            :
            <form className="docForm">
                <label>Titel</label>
                <input name="title" type="text" defaultValue={data.title}></input>
                <label>Innehåll</label>
                <textarea name="content" defaultValue={data.content}></textarea>
                <button type="submit"><FontAwesomeIcon icon={faFloppyDisk} onClick={handleClick}/></button>
            </form>
            <div className="updatedpopup"></div>
    )
}

export default EditDocview
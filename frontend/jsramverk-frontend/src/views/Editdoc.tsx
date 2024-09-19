import { Item } from './ShowAll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

// Ordna två actions som uppdaterar

const EditDocview = ({ data, loading }: { data: Item; loading: boolean }) => {
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
                <button type="submit"><FontAwesomeIcon icon={faFloppyDisk} /></button>
            </form>
    )
}

export default EditDocview
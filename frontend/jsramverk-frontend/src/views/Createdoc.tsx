import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

// Ordna en function som skapar ett nytt dokument till backend.

const Createdoc = () => {
    return (
        <>
            <form className="docForm">
                <label>Titel</label>
                <input name="title" type="text" />
                <label>Innehåll</label>
                <textarea name="content"></textarea>
                <button type="submit"><FontAwesomeIcon icon={faFloppyDisk} /></button>
            </form>
        </>

    )
}

export default Createdoc
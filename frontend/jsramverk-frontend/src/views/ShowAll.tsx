import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import axios from 'axios'
import Alert from './Alert'

// Shows all the documents currently in the database with options for updating and deleting

export interface Item {
  _id: string
  title: string
  content: string

}


const ShowAll = ({ data, loading, onSelected }: { data: Item[]; loading: boolean; onSelected: (item: Item) => void }) => {

  const [alertVisible, setAlertVisibility] = useState(false);

  const handleUpdate = (id: string) => {
    const item = data.find((item) => item._id === id);
    onSelected(item);

  }

  const handleDelete = async (id: string) => {

    await axios.post(`http://localhost:3539/delete/${id}`, {
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
        <p>Loading...</p>
      </div>
      :
      <div>
        {alertVisible && <Alert onClose={() => window.location.reload()}>Nu är dokumentet raderat</Alert>}
        <div className="doclist">
          <div className="docheader"><h2>Dokument</h2></div>
          <ul>
            {data.map((item) => <h3 key={item._id} >
              <span>{item.title}</span>
              <FontAwesomeIcon icon={faFilePen} onClick={() => handleUpdate(item._id)} />
              <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(item._id)} /></h3>)}
          </ul>
        </div>
      </div>
  )
}

export default ShowAll
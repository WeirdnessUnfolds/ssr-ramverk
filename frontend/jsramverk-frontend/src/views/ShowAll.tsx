import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePen, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import url from '../helpers/url.tsx'
// Shows all the documents currently in the database with options for updating and deleting

export interface Item {
  _id: string
  title: string
  content: string
  sharedWith: string[];

}


const ShowAll = ({ data, loading, onSelected }: { data: Item[]; loading: boolean; onSelected: (item: Item) => void }) => {

  const handleUpdate = (id: string) => {
    const item = data.find((item) => item._id === id);
    if (item) {
      onSelected(item);
    }
  }

  const handleDelete = async (id: string) => {
    await axios.delete(`${url}/delete/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
    },
    }).then(function (res) {
      window.location.reload();

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
        <div className="doclist">
          <div className="docheader"><h2>Dokument</h2></div>
          <ul role='Items'>
            {data.map((item) => <h3 key={item._id} >
              {item.title}
              <FontAwesomeIcon aria-label='Update' icon={faFilePen} onClick={() => handleUpdate(item._id)} />
              <FontAwesomeIcon aria-label='Delete' icon={faTrash} onClick={() => handleDelete(item._id)} /></h3>)}
          </ul>
        </div>
      </div>
  )
}

export default ShowAll
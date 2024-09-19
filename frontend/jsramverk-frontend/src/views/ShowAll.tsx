import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePen, faTrash } from '@fortawesome/free-solid-svg-icons'

export interface Item {
  _id: string
  title: string
  content: string

}


const ShowAll = ({ data, loading, onSelected }: { data: Item[]; loading: boolean; onSelected: (item: Item) => void }) => {
  const handleClick = (id: string) => {
    const item = data.find((item) => item._id === id);
    if (item) {
      onSelected(item);
    }
  }
  return (
    loading ?
      <div>
        <p>Loading...</p>
      </div>
      :
      <div className="doclist">
        <div className="docheader"><h2>Dokument</h2></div>
        <ul>
          {data.map((item) => <h3 key={item._id} >
            <span>{item.title}</span>
            <FontAwesomeIcon icon={faFilePen} onClick={() => handleClick(item._id)} />
            <FontAwesomeIcon icon={faTrash} /></h3>)}
        </ul>
      </div>
  )
}

export default ShowAll
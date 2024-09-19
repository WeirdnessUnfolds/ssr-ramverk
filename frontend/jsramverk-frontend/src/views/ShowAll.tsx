import Editlogo from '../assets/edit-logo.png'

export interface Item {
  _id: string
  title: string
  content: string
  
}


const ShowAll = ({data, loading, onSelected}: {data: Item[]; loading: boolean; onSelected: (item: Item) => void }) => {
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
    <div className = "doclist">
      <div className ="docheader"><h2>Dokument</h2></div>
    <ul>
      {data.map((item) => <h3 key={item._id} >
        <span>{item.title}</span>
        <img src={Editlogo} alt="edit logo" onClick={() => handleClick(item._id)}/></h3>)} 
    </ul>
  </div>
  )
}

export default ShowAll
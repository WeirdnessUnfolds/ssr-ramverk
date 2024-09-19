
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
    <p>{data.map((item) => <li key={item._id} onClick={() => handleClick(item._id)}>{item.title}</li>)}</p>
  </div>
  )
}

export default ShowAll
export interface Item {
  _id: string
  title: string
  content: string
  
}


const ShowAll = ({data, loading}: {data: Item[]; loading: boolean}) => {
  const handleClick = (id: string) => {
    console.log(`Item with id ${id} was clicked`);
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
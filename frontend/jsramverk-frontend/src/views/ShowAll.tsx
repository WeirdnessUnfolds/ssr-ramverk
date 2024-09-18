export interface Item {
  _id: string
  title: string
  content: string
}


const ShowAll = ({data, loading}: {data: Item[]; loading: boolean}) => {
  return (
    loading ?  
    <div>
      <p>Loading...</p>
    </div>
    :
    <div className = "doclist">
    <p>{data.map((item) => <li onClick={() => console.log("Clicked item " + item._id)} key={item._id}>{item.title}</li>)}</p>
  </div>
  )
}

export default ShowAll
export interface Item {
  _id: string
  title: string
  content: string
}


const ShowAll = ({data}: {data: Item[]}, loading: boolean) => {
  return (
    loading ?  
    <div>
      <p>Loading...</p>
    </div>
    :
    <div className = "doclist">
    <p>{data.map((item) => <li key={item._id}>{item.title}</li>)}</p>
  </div>
  )
}

export default ShowAll
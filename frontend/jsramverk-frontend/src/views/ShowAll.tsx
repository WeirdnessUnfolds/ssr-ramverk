

const ShowAll = ({data}, loading) => {
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


const ShowAll = ({data}) => {
  return (
    <div className = "doclist">
    <p>{data.map((item) => <li key={item._id}>{item.title}</li>)}</p>
  </div>
  )
}

export default ShowAll
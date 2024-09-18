interface Item {
  _id: string
  title: string
  content: string
}

const ShowAll = ({data}: {data: Item[]}) => {
  return (
    <div className = "doclist">
    <p>{data.map((item) => <li key={item._id}>{item.title}</li>)}</p>
  </div>
  )
}

export default ShowAll
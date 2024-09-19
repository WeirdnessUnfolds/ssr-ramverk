import { Item } from './ShowAll'

  
const ShowAll = ({data, loading}: {data: Item; loading: boolean}) => {
    return (
        loading ?  
        <div>
            <p>Loading document contents..</p>
        </div>
        :
            <div className = "docContent">
                <p>{data.content}</p>
            </div>
    )
  }
  
  export default ShowAll
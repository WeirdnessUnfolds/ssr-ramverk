import { Item } from './ShowAll'

  
const EditDocview = ({data, loading}: {data: Item; loading: boolean}) => {
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
  
export default EditDocview
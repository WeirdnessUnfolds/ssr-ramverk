import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
function App() {
  
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios.get("http://localhost:3539").then((res) => {
      setItems(res.data);
      setLoading(false);
    });
  }, []);


  return (
    <>
      <div className="navbar">
        <p>Navbar items</p>
      </div>
     {
     loading ?  
      <div>
        <p>Loading...</p>
      </div>
      :
      <div className = "doclist">
        <p>{items.map((item) => <li>{item.title}</li>)}</p>
      </div>
}
    </>
  )
}

export default App

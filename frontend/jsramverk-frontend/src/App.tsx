import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import ShowAll from './views/ShowAll'

function App() {
  
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navItems = ["See all documents", "Create doc" ];

  const [showAllDocuments, setShowAllDocuments] = useState(true)

  const [items, setItems] = useState([{}])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios.get("http://localhost:3539").then((res) => {
      setItems(res.data);
      setLoading(false);
    });
  }, []);

  function onSelectItem(item: string) {
    switch (item) {
      case ("See all documents"):
        setShowAllDocuments(true);
    }

  }


  return (
    <>
      
      <ul className="nav-list">
                {navItems.map((item, index) => (
                    <li key={item}
                        className={selectedIndex === index ? 'nav-list-item-active' : 'nav-list-item'}
                        onClick={() => {
                            setSelectedIndex(index);
                            onSelectItem(item);
                        }}>
                        {item}</li>))}
      </ul>
                       
     {
     loading ?  
      <div>
        <p>Loading...</p>
      </div>
      :
      <ShowAll data={items}> </ShowAll>
}
    </>
  )
}

export default App

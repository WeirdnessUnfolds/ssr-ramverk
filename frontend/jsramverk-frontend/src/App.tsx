import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import ShowAll, { Item } from './views/ShowAll'
import EditDocview from "./views/Editdoc"

function App() {
  
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navItems = ["See all documents", "Create doc"];

  const [showAllDocuments, setShowAllDocuments] = useState(true)
  const [items, setItems] = useState<Item[]>([{}])
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios.get("http://localhost:3539").then((res) => {
      setItems(res.data);
      setLoading(false);
    });
  }, []);

  function onSelectItem(index: number) {
    switch (index) {
      case 0:
        setShowAllDocuments(true);
        break
      case 1:
        setShowAllDocuments(false);
        break;
    }


  }


  return (
    <>
      
      <ul className="nav-list">
                {navItems.map((item, index) => (
                    <li key={index}
                        className={selectedIndex === index ? 'nav-list-item-active' : 'nav-list-item'}
                        onClick={() => {
                            setSelectedIndex(index);
                            onSelectItem(index);
                            console.log("Selected index: " + index);
                        }}>
                        {item}</li>))}
      </ul>
                       
     {
      showAllDocuments ?
      <ShowAll data={items} loading={loading} onSelected={(item) => setSelectedItem(item)}></ShowAll> :
      <p></p>
     }
     {
      selectedItem &&
      <EditDocview data={selectedItem} loading={loading}></EditDocview>
     }
     
    </>
  )
}

export default App

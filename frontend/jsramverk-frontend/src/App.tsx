import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons'
import ShowAll, { Item } from './views/ShowAll'
import EditDocview from "./views/Editdoc"
import Createdoc from './views/Createdoc'

function App() {
  // Creates and sets the navbar items, default is no choice
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navItems = [<FontAwesomeIcon icon={faHouse} />, <FontAwesomeIcon icon={faFileCirclePlus} />];
  // sets the ShowAllDocuments view
  const [showAllDocuments, setShowAllDocuments] = useState(true)
  // sets the crateDoc view
  const [showCreateDoc, setShowCreateDoc] = useState(false)
  // Sets all the documents as items from the result from the database
  const [items, setItems] = useState<Item[]>([{}])
  // Sets The selected document
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  // Sets the loading screen when the data is fetched
  const [loading, setLoading] = useState(true)
  // Fetches all the documents from the database and sets them as items
  useEffect(() => {
    axios.get("http://localhost:3539").then((res) => {
      setItems(res.data);
      setLoading(false);
    });
  }, []);


  // Creates the view depending on the selected item in the navbar
  function onSelectNavbarItem(index: number) {
    switch (index) {
      case 0:
        setShowAllDocuments(true);
        setShowCreateDoc(false);
        setSelectedItem(null);
        break
      case 1:
        setShowAllDocuments(false);
        setShowCreateDoc(true);
        setSelectedItem(null);
        break;
    }
  }

  // Sets the update view
  function onUpdateDoc(item: Item) {
    setSelectedItem(item);
    setShowCreateDoc(false);
    setShowAllDocuments(false);
    setSelectedIndex(-1);
  }


  return (
    <>

      <ul className="nav-list">
        {navItems.map((item, index) => (
          <li key={index}
            className={selectedIndex === index ? 'nav-list-item-active' : 'nav-list-item'}
            onClick={() => {
              setSelectedIndex(index);
              onSelectNavbarItem(index);
              console.log("Selected index: " + index);
            }}>
            {item}</li>))}
      </ul>

      {
        showAllDocuments ?
          <ShowAll data={items} loading={loading} onSelected={(item) => onUpdateDoc(item)}></ShowAll> :
          <p></p>
      }
      {
        showCreateDoc ?
          <Createdoc /> :
          <p></p>
      }
      {
        selectedItem ?
          <EditDocview data={selectedItem} loading={loading}></EditDocview> :
          <p></p>
      }

    </>
  )
}

export default App

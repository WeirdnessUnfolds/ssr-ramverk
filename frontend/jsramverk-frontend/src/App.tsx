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

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navItems = [<FontAwesomeIcon icon={faHouse} />, <FontAwesomeIcon icon={faFileCirclePlus} />];

  const [showAllDocuments, setShowAllDocuments] = useState(true)
  const [showCreateDoc, setShowCreateDoc] = useState(false)
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
        setShowCreateDoc(false);
        break
      case 1:
        setShowAllDocuments(false);
        setShowCreateDoc(true);
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
        showCreateDoc ?
          <Createdoc /> :
          <p></p>
      }
      {/* få till att gömma showAll när redigeringen är öppen */}
      {
        selectedItem &&
        <EditDocview data={selectedItem} loading={loading}></EditDocview>
      }

    </>
  )
}

export default App

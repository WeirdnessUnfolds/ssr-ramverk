import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faFileCirclePlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import ShowAll, { Item } from './views/ShowAll'
import EditDocview from "./views/Editdoc"
import Createdoc from './views/Createdoc'
import Login from './views/Login'
import Signup from './views/Signup'
import url from './helpers/url'

function App() {
  // Creates and sets the navbar items, default is no choice
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navItems = [<FontAwesomeIcon icon={faHouse} size="lg" />, <FontAwesomeIcon icon={faFileCirclePlus} size="lg" />, <FontAwesomeIcon icon={faRightFromBracket} size="lg" />];
  // sets the ShowAllDocuments view, depends on if the user is logged in or not.
  const [showAllDocuments, setShowAllDocuments] = useState(localStorage.getItem('loggedIn') === 'true');
  // sets the crateDoc view
  const [showCreateDoc, setShowCreateDoc] = useState(false)
  // Logged in is false from the start.
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');


  // Sets all the documents as items from the result from the database
  const [items, setItems] = useState<Item[]>([])
  // Sets The selected document
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  // Sets the loading screen when the data is fetched
  const [loading, setLoading] = useState(true)
  const [showSignup, setshowSignup] = useState(false)
  // Fetches all the documents from the database and sets them as items
  useEffect(() => {
    // For proper cancelling
    axios.get(`${url}/all`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
    }).then((res) => {
      const username = localStorage.getItem('username') ?? '';
      const filteredItems = res.data.filter((item: Item) => item.sharedWith.includes(username));
      setItems(filteredItems);
      // setItems(res.data);
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
        window.location.reload();
        break
      case 1:
        setShowAllDocuments(false);
        setShowCreateDoc(true);
        setSelectedItem(null);
        break;
      case 2:
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('token');
        setLoggedIn(false);
        setShowAllDocuments(false);
        setshowSignup(false);
        setShowCreateDoc(false);
        setSelectedItem(null);
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

      {
        (!loggedIn && showSignup) ?
          <Signup SignupSubmit={() => setshowSignup(false)} /> :
          loggedIn ?

            <ul className="nav-list">
              {navItems.map((item, index) => (
                <li key={index}
                  className={selectedIndex === index ? 'nav-list-item-active' : 'nav-list-item'}
                  onClick={() => {
                    setSelectedIndex(index);
                    onSelectNavbarItem(index);
                  }}>
                  {item}</li>))}
            </ul>



            :
            <Login onLogin={() => {
              localStorage.setItem('loggedIn', 'true')
              window.location.reload();
              setLoggedIn(true);
              setShowAllDocuments(true);
            }} onSignup={() => setshowSignup(true)} />

      }
      {
        showAllDocuments &&
        <ShowAll data={items} loading={loading} onSelected={(item) => onUpdateDoc(item)}></ShowAll>

      }
      {
        showCreateDoc &&
        <Createdoc />
      }
      {
        selectedItem &&
        <EditDocview data={selectedItem} loading={loading}></EditDocview>
      }
    </>
  )
}

export default App

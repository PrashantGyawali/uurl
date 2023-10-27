import './static/App.css'
import NavbarComponent from './components/Navbar';
import Inputfield from './components/InputField';
import UrlList from './components/UrlList';
import useLocalStorage from './hooks/localstorage';

function App() {
  const [shortenedlinks,updateShortenedLinks]=useLocalStorage("shortenedlinks",[]);
  return (
    <>
    <NavbarComponent/>
    <Inputfield/>
    <UrlList/>
    </>
  )
}

export default App

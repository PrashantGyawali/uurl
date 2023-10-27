import './static/App.css'
import NavbarComponent from './components/Navbar';
import Inputfield from './components/InputField';
import UrlList from './components/UrlList';
import useLocalStorage from './hooks/localstorage';
import SelfUrlList from './components/selfUrlList';

function App() {
  const [shortenedlinks,updateShortenedLinks]=useLocalStorage("shortenedlinks",[]);
  return (
    <>
    <NavbarComponent/>
    <Inputfield updateShortenedLinks={updateShortenedLinks} shortenedlinks={shortenedlinks}/>
    <SelfUrlList shortenedlinks={shortenedlinks}/>
    <UrlList/>
    </>
  )
}

export default App

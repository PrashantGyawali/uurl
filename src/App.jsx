import { useState } from 'react'
import './static/App.css'
import NavbarComponent from './components/Navbar';
import Inputfield from './components/InputField';
import UrlList from './components/UrlList';

function App() {
  const [test,setTest]=useState(0);
  return (
    <>
    <NavbarComponent/>
    <Inputfield/>
    {/* <UrlList/> */}
    </>
  )
}

export default App

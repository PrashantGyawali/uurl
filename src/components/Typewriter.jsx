import { useState, useEffect } from 'react';

const Typewriter = ({ timeperiod, delay, infinite }) => {
    const [currentUrl, setCurrentUrl] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  
  useEffect(() => {
    let texts=["https://www.youtube.com/watch?v=y6120QOlsfU&pp=ygUQZGFydWRlIHNhbmRzdG9ybQ%3D%3D","https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUJcmljayByb2xs","https://www.youtube.com/watch?v=MSepOYJxB64&pp=ygUJd2V0IGhhbmRz"]
    let timeout;
    if (currentTextIndex < texts[currentUrl||0].length) {
      timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + texts[currentUrl][currentTextIndex]);
        setCurrentTextIndex(prevIndex => prevIndex + 1);
      }, Math.ceil(timeperiod/texts[currentUrl].length));

    } else if (currentUrl<texts.length-1) { 
                setTimeout(()=>{
                    setCurrentUrl((currentUrl)=>currentUrl+1);
                    setCurrentTextIndex(0);
                    setCurrentText('');},delay+1000);       
    }
    else if(infinite)
    {setTimeout(()=>{
        setCurrentUrl(0);
      setCurrentTextIndex(0);
      setCurrentText('');},delay+1000);
    }

    return () => {clearTimeout(timeout)}
  }, [currentTextIndex, timeperiod, infinite,delay]);

  return <>{currentText}</>;
};

export default Typewriter;

import { useState } from "react";

export default function Scroller({texts,timeperiod})
{

    texts=texts.length>0?texts: ["Artist","a Creator","a Programmer","a Scientist","a CEO","a Boss"];

    const [currentTextIndex,setCurrentTextIndex]=useState(0);

    const handleAnimationIteration=()=>{
        currentTextIndex<texts.length-1?setCurrentTextIndex((currentTextIndex)=>currentTextIndex+1):setCurrentTextIndex(0);
    }
    const moveup={
        animation: `up  ${timeperiod}ms linear infinite`,
        overflow:"hidden",
    }


    return<>
    <div style={moveup} onAnimationIteration={handleAnimationIteration} id="scroller"> 
    {texts[currentTextIndex]}
    </div>
    <style>{`
        @keyframes up {
        0% {
        transform: translateY(120%);
        opacity:0;
        font-weight:lighter;
        }
        35%{
            transform: translateY(0%);
            opacity:1;
            font-weight:bold;
        }
        65%{
            transform: translateY(0%);
            opacity:1;
            font-weight:bold;
        }
        100% {
            opacity:0;
        transform: translateY(-120%);
        font-weight:lighter;
        }`}
    </style>
  
    </>
}
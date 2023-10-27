import { useState,useEffect } from "react";

const prefix="uurl-"
export default function useLocalStorage(key,initialvalue)
{
    //name in localstorage 
    const prefixedKey=prefix+key;

    //initialize the value
    const [value,setValue]=useState(()=>{
        let val=localStorage.getItem(prefixedKey)

        //look in localstorage and if the value is not empty use it
        if(val!=null && val!=undefined && val!="") 
        {
            console.log(val)
            return JSON.parse(val);
        }
        else{
            //else if initialvalue provided was a function, use the value that the function returns
            if(typeof initialvalue==="function")
            {
                return initialvalue();
            }
            //if not function just use that value
            else{
                return initialvalue;
            }
        }
    });
    
    useEffect(()=>{localStorage.setItem(prefixedKey,JSON.stringify(value))},[value,prefixedKey]);
    return [value,setValue];

}
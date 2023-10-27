import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../static/App.css"



export default function UrlList(){

    const [links,upateLinks]=useState([]);

    useEffect(()=>{
        getUrls();
    },[]);

    const getUrls=async()=>{
        let urls=await fetch("http://localhost:5000/",{method:"GET"});
        console.log(urls);
        urls=await urls.json();
        upateLinks(urls);
    }

    return(
        <>
        {links.map((link,index) => {
            return <div  key={index}><a href={`http://localhost:5000/${link.shorturl}`} >{link.shorturl}</a>{link.clicks}</div>
        })
        }
        </>
    )
}
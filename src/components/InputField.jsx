import 'bootstrap/dist/css/bootstrap.min.css'
import "../static/App.css"
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button"
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

import 'bootstrap/dist/css/bootstrap.min.css'

import { motion } from "framer-motion"
import Typewriter from './Typewriter';
import Scroller from './Scroller';


export default function Inputfield(props){

    const [longurl,setLongUrl]=useState("");

    const[newShortenedUrl,setNewShortenedUrl]=useState();

    const animationurls=["https://www.youtube.com/watch?v=y6120QOlsfU&pp=ygUQZGFydWRlIHNhbmRzdG9ybQ%3D%3D","https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUJcmljayByb2xs","https://www.youtube.com/watch?v=MSepOYJxB64&pp=ygUJd2V0IGhhbmRz"]
    const scrollerurls=["sand","rick","wets"];
    
    const onSubmit=async(e)=>{
        //make the shorturl result div disappear and appear again
        setNewShortenedUrl("");

        //this will prevent redirecting
        e.preventDefault();
        console.log("longurl",longurl);

        const data={"longurl":longurl};

        console.log("data:",data);

        const response= await fetch("http://localhost:5000", {
            method: "POST",
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        let shortenedurldata=await response.json()
        console.log(shortenedurldata);
        setNewShortenedUrl(shortenedurldata);
        props.updateShortenedLinks([shortenedurldata,...props.shortenedlinks,])
        // parses JSON response into native JavaScript objects
    };


   return (<>
    <div className='container ms-auto me-auto row p-1 d-flex flex-column justify-content-center' style={{height:"40vh"}}>
      <div className="container">
        <div className="container row bg-dark-blue ms-auto me-auto">

          <div className="col-12 col-sm-4 d-flex">
            <div className="text-warning fs-5 align-self-center">uurl.com.np/</div>
            <div className="text-white text-start align-self-center"><Scroller texts={scrollerurls} timeperiod={2700}/></div>
          </div>

          <div className="col-12 col-sm-8 text-white text-break text-truncate align-self-center"><Typewriter texts={animationurls} timeperiod={1100} delay={380} infinite/></div>

        </div>

      </div>

    <Form onSubmit={onSubmit} >
      <InputGroup className="col-12 col-sm-10 col-md-8 col-lg-6" data-bs-theme="dark">
        <Form.Control
          placeholder="Longurl"
          aria-label="Url to shorten"
          type="text" name="longurl" required value={longurl} onChange={(e)=>setLongUrl(e.target.value)}
        />
        <Button type="submit" variant="primary" id="shorten" >
          Shorten
        </Button>
      </InputGroup>

{    newShortenedUrl && <>
        <motion.div initial={{ opacity: 0, scaleX: 0.5, scaleY:0}}
        animate={{ opacity: 1, scaleX:1, scaleY:1}}
        transition={{ duration: 0.5 }}>
            <ListGroup data-bs-theme="dark" >
            <ListGroup.Item className='text-warning ps-3 pt-1 pb-1' style={{borderTop:"0px"}} variant="success">Your shortened URL :</ListGroup.Item>
            <ListGroup.Item  className="d-flex justify-content-between align-items-center bg-dark">
                <div className="ms-2 me-auto d-flex flex-column text-muted">
                <a className="fw-bold fs-5" href={`http://localhost:5000/${newShortenedUrl.shorturl}`}>{newShortenedUrl.shorturl}</a>
                <span className="fs-10px text-break">{newShortenedUrl.longurl}</span>
                </div>
                <Badge bg="primary" pill>
                <span className="fs-18px">Copy</span>
                </Badge>
            </ListGroup.Item>
            </ListGroup>
        </motion.div>
      </>
}
    </Form>
    </div>
    </>
  );
}
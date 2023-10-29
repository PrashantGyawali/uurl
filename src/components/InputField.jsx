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

    const scrollerurls=["sand","rick","wets"];
    
    const onSubmit=async(e)=>{
        //make the shorturl result div disappear and appear again
        setNewShortenedUrl("");

        //this will prevent redirecting
        e.preventDefault();
        // console.log("longurl",longurl);

        const data={"longurl":longurl};
        const response= await fetch("https://uurl.onrender.com", {
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


    const copyLink=()=>{
      navigator.clipboard.writeText("uurl.onrender.com/"+newShortenedUrl.longurl);
    }



   return (<>
    <div className='container ms-auto me-auto row p-1 d-flex flex-column justify-content-center' style={{height:"40vh"}}>
      <div className="container">
        <div className="container row bg-dark-blue ms-auto me-auto">

          <div className="col-12 col-sm-5 col-md-4 d-vsm-flex">
            {/* For now it will be this render domain, i would like a uurl.com.np domain but not sure if i will get it */}
            <div className="text-warning fs-6 align-self-center">uurl.onrender.com/</div>
            <div className="text-white text-start align-self-center"><Scroller texts={scrollerurls} timeperiod={2700}/></div>
          </div>

          <div className="col-12 col-sm-7 col-md-8 text-white text-break text-truncate align-self-center"><Typewriter timeperiod={1100} delay={380} infinite/></div>

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
            <ListGroup.Item  className="d-sm-flex justify-content-between align-items-center bg-dark">
                <div className="ms-2 me-auto d-flex flex-column text-muted">
                <a className="fw-bold fs-5" href={`https://uurl.onrender.com/${newShortenedUrl.shorturl}`}><span className='fs-12px'>uurl.onrender.com/</span>{newShortenedUrl.shorturl}</a>
                <span className="fs-10px text-break">{"uurl.onrender.com/"+newShortenedUrl.longurl}</span>
                </div>
                <Badge bg="primary" pill onClick={copyLink}>
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
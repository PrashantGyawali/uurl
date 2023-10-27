import 'bootstrap/dist/css/bootstrap.min.css'
import "../static/App.css"
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button"
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';



export default function Inputfield(){

    const [longurl,setLongUrl]=useState("");

    const[newShortenedUrl,setNewShortenedUrl]=useState();


    const onSubmit=async(e)=>{

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
        // parses JSON response into native JavaScript objects

    };


   return (
    <div className='container ms-auto me-auto row p-1 d-flex flex-column'>
    <Form onSubmit={onSubmit} >
      <InputGroup className="mt-5 col-12 col-sm-10 col-md-8 col-lg-6">
        <Form.Control
          placeholder="Longurl"
          aria-label="Url to shorten"
          type="text" name="longurl" required value={longurl} onChange={(e)=>setLongUrl(e.target.value)}
        />
        <Button type="submit" variant="primary" id="button-addon2">
          Shorten
        </Button>
      </InputGroup>

{    newShortenedUrl && <>
        <ListGroup data-bs-theme="dark">
            <ListGroup.Item className='text-warning bg-success p-1'>Your shortened URL :</ListGroup.Item>
            <ListGroup.Item  className="d-flex justify-content-between align-items-center bg-dark">
                <div className="ms-2 me-auto d-flex flex-column text-muted">
                <a className="fw-bold fs-5" href={`http://localhost:5000/${newShortenedUrl.shorturl}`}>{newShortenedUrl.shorturl}</a>
                <span className="fs-10px">{newShortenedUrl.longurl}</span>
                </div>
                <Badge bg="primary" pill>
                <span className="fs-18px">Copy</span>
                </Badge>
            </ListGroup.Item>
        </ListGroup>
      </>
}
    </Form>
    </div>
  );
}
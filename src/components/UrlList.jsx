import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import "../static/App.css"
import Container from "react-bootstrap/esm/Container";

export default function UrlList(){

    const [links,updateLinks]=useState([]);
    
    useEffect(()=>{getUrls();},[]);

    const getUrls=async()=>{
        let urls=await fetch("http://localhost:5000/links",{method:"GET"});
        urls=await urls.json();
        console.log(urls);
        updateLinks(urls);
    }

    return(
        <Container className="container-sm-fluid">

            <ListGroup horizontal data-bs-theme="dark">
                    <ListGroup.Item className="d-flex w-100" variant="primary">Urls</ListGroup.Item>   
                    <ListGroup.Item className="d-flex p-2 w-fit-content btn btn-primary"  variant="primary" onClick={()=>{updateLinks(links.slice().reverse())}}>Clicks</ListGroup.Item>   

            </ListGroup>

        <ListGroup as="ol" numbered data-bs-theme="dark">
        {links && links.map((link,index) => {
            return (
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center" key={index}>
                <div className="ms-2 me-auto d-flex flex-column text-muted text-break">
                <a className="fw-bold fs-5 text-break" href={`http://localhost:5000/${link.shorturl}`}>{link.shorturl}</a>
                <span className="fs-10px text-break">{link.longurl}</span>
                </div>
                <Badge bg="primary" pill>
                <span className="fs-18px">{link.clicks}</span>
                </Badge>
            </ListGroup.Item>
        );
        })
        }
        </ListGroup>
        </Container>
    )
}
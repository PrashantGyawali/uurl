import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import "../static/App.css"
import Container from "react-bootstrap/esm/Container";

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

import  getRelativeTimeString  from "../static/dateformat";

export default function UrlList(){

    const [links,updateLinks]=useState([]);
    const [sortparam,updateSortparam]=useState("createdOn");
    
    useEffect(()=>{getUrls();},[]);


    const sortlinks=(sortparam)=>{
        let temp=links.slice();
        if(sortparam=="createdOn") 
        {
            console.log(temp[0][sortparam].valueOf());
            temp.sort((a,b)=>(new Date(b[sortparam])).getTime()-(new Date(a[sortparam])).getTime());
        }
        else{
            temp.sort((a,b)=>b[sortparam]-a[sortparam]);
        }
        console.log("sorted links by:",sortparam,temp);
        updateSortparam(sortparam);
        updateLinks([...temp]);
    };

const Badgetext=(props)=>{
    return <>
    {sortparam=="clicks"?props.link[sortparam]:getRelativeTimeString(new Date(props.link[sortparam]))}
    </>
}
    const getUrls=async()=>{
        let urls=await fetch("http://localhost:5000/links",{method:"GET"});
        urls=await urls.json();
        console.log(urls);
        updateLinks(urls);
    }

    return(

       <Container className="container-sm-fluid">
        {links.length && <>
        <ListGroup horizontal data-bs-theme="dark">
                    <ListGroup.Item className="d-flex w-100" variant="primary">Urls</ListGroup.Item>   
                   
            <Dropdown as={ButtonGroup} data-bs-theme="dark">
            <ListGroup.Item className="d-flex p-2 w-fit-content btn btn-primary"  variant="primary" onClick={()=>{updateLinks(links.slice().reverse())}}>{sortparam=="clicks"?"Clicks":"Date"}</ListGroup.Item>      

            <Dropdown.Toggle split id="dropdown-split-basic"  />

            <Dropdown.Menu>
                <Dropdown.Item onClick={()=>{sortlinks("clicks");}}>Clicks</Dropdown.Item>
                <Dropdown.Item onClick={()=>{sortlinks("createdOn");}}>Date</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>

            </ListGroup>

        <ListGroup as="ol" data-bs-theme="dark">
        {links.map((link,index) => {
            return (
            <ListGroup.Item as="li" className={`d-flex justify-content-between  ${sortparam!="clicks"?" flex-column flex-sm-row align-items-end align-items-sm-center":"align-items-center"}`} key={index}>
                <div className="ms-2 me-auto d-flex flex-column text-muted text-break">
                <a className="fw-bold fs-5 text-break" href={`http://localhost:5000/${link.shorturl}`}>{link.shorturl}</a>
                <span className="fs-10px text-break">{link.longurl}</span>
                </div>
                <Badge bg={sortparam=="clicks"?"primary":"secondary"} pill className="text-break">
                <span className={sortparam=="clicks"?"fs-18px":"fs-12px text-break fw-light"}><Badgetext link={link}/></span>
                </Badge>
            </ListGroup.Item>
        );
        })
        }
        </ListGroup>
        </>
        }
        </Container>

    )
}
import 'bootstrap/dist/css/bootstrap.min.css'
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import "../static/App.css"
import Container from "react-bootstrap/esm/Container";
import { useEffect, useState } from 'react';
import { motion } from "framer-motion"

import  getRelativeTimeString  from "../static/dateformat";

export default function SelfUrlList(props){
    const{shortenedlinks}=props;

    const [modifiedShortenedLinks,setModifiedShortenedLinks]=useState([]);
    //modified with filters and sorted

    useEffect(()=>{setModifiedShortenedLinks(shortenedlinks.slice(0));},[shortenedlinks])
    
    //for animation
    let initial={y:-100,opacity:0};
    let animate={y:0,opacity:1};
    let transition={ duration: 0.5 };

    let motionobj={initial,animate,transition};

    return(<>
        {shortenedlinks.length && <Container className="container-sm-fluid mb-5">

            <ListGroup horizontal data-bs-theme="dark">
                    <ListGroup.Item className="d-flex w-100" variant="primary">Your Urls</ListGroup.Item>   
                    <ListGroup.Item className="d-flex p-2 w-fit-content btn btn-primary"  variant="primary" onClick={()=>setModifiedShortenedLinks(modifiedShortenedLinks.slice(0).reverse())}>Date</ListGroup.Item>   
            </ListGroup>

        <ListGroup as="ol" numbered data-bs-theme="dark">
        {
            modifiedShortenedLinks.map((link,index) => {
                return (<motion.div key={index} {...motionobj}>
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center" >
                        <div className="ms-2 me-auto d-flex flex-column text-muted text-break">
                        <a className="fw-bold fs-5 text-break" href={`https://uurl.onrender.com/${link.shorturl}`}>uurl.onrender.com/{link.shorturl}</a>
                        <span className="fs-10px text-break">{link.longurl}</span>
                        </div>
                        <Badge bg="secondary" pill>
                        <span className="fs-12px fw-light">{getRelativeTimeString(new Date(link.createdOn))}</span>
                        </Badge>
                    </ListGroup.Item>
                </motion.div>)
                })
       }

        </ListGroup>
        </Container>
        }
    </>
    )
}

// want to get a uurl.com.np or sth domain to host it 
import 'bootstrap/dist/css/bootstrap.min.css'
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import "../static/App.css"
import Container from "react-bootstrap/esm/Container";

export default function SelfUrlList(props){
    const{shortenedlinks}=props;
    return(
        <Container className="container-sm-fluid mb-5">

            <ListGroup horizontal data-bs-theme="dark">
                    <ListGroup.Item className="d-flex w-100" variant="primary">Your Urls</ListGroup.Item>   
                    <ListGroup.Item className="d-flex p-2 w-fit-content btn btn-primary"  variant="primary" >Clicks</ListGroup.Item>   
            </ListGroup>

        <ListGroup as="ol" numbered data-bs-theme="dark">
        {shortenedlinks && shortenedlinks.map((link,index) => {
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
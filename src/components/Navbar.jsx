import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import "../static/App.css"


export default function NavbarComponent(){
return (
<Navbar expand="sm" className="bg-body-tertiary m-0 pe-3 pt-0 d-flex" data-bs-theme="dark">
        <Container className='p-3 m-0 pt-0 pb-0' style={{width:"fit-content"}}>
            <Navbar.Brand href="/"><span className='text-warning fs-35px'>uurls:<span className='fs-40px'>/<>/</></span></span></Navbar.Brand>
        </Container>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='align-self-end'>
          <Nav className="ms-auto ps-3 me-3" >
            <Nav.Link href="https://github.com/PrashantGyawali" className="text-left btn text-light btn-dark border-underline">Github</Nav.Link>      
            <Nav.Link href="#home"  className="btn text-light btn-dark border-underline">CodeWrite</Nav.Link>
            <Nav.Link href="https://gyawaliprashant.com.np/" className="btn text-light btn-dark border-underline">myLearningEra</Nav.Link>
          </Nav>
        </Navbar.Collapse>
</Navbar>
);

}
import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useRouter } from 'next/router'


export const Header: React.FC = () => {
  const router = useRouter()
  function handleVerifyClick(){
    router.push('/verify/')
  }
  function handleHomeClicked(){
    router.push('/')
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="transparent" variant="light">
      <Container>
        <Navbar.Brand href="#home">Decentralized Proof of Humanity</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link onClick={handleHomeClicked}>Home</Nav.Link>
            <Nav.Link onClick={handleVerifyClick}>Verify</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Logo } from "@components";

export const Header: React.FC = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="transparent" variant="light">
      <Container>
        <Navbar.Brand href="#home">Decentralized Proof of Humanity</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#hcaptcha">Human Captcha</Nav.Link>
            <Nav.Link href="#dapp">DAPP</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

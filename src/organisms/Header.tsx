import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import Logo from "../atoms/Logo";

const Header = () => (
  <header className="Header">
    <Navbar bg="#121428" variant="dark">
      <Container>
        <Navbar.Brand className="Header-container" href="#">
          <Logo />
          <h1> Padam Mobility</h1>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Rechercher par arrêt de départ</Nav.Link>
          <Nav.Link href="/arrival">Rechercher par arrêt d'arrivé</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  </header>
);

export default Header;

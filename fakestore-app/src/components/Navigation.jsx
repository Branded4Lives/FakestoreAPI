import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navigation() {
  const { totalItems } = useCart();
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="shadow-sm" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-logo">
          Fake<span>Store</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto gap-1">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products">
              Products
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/add-product"
              className="btn btn-outline-light btn-sm px-3 ms-2 my-auto rounded-pill"
            >
              + Add Product
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/cart"
              className="ms-2 my-auto position-relative"
              style={{ fontSize: "1.2rem", lineHeight: 1 }}
            >
              🛒
              {totalItems > 0 && (
                <Badge
                  bg="danger"
                  pill
                  style={{
                    position: "absolute",
                    top: "-4px",
                    right: "-6px",
                    fontSize: "0.65rem",
                    minWidth: "18px",
                  }}
                >
                  {totalItems}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <Row className="gy-4">
          <Col xs={12} md={4}>
            <h5 className="footer-brand">
              Fake<span>Store</span>
            </h5>
            <p className="footer-tagline">
              A demo e-commerce app powered by FakeStoreAPI. Built with React,
              React Router, and React Bootstrap.
            </p>
          </Col>

          <Col xs={6} md={2}>
            <h6 className="footer-heading">Navigate</h6>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/add-product">Add Product</Link></li>
            </ul>
          </Col>

          <Col xs={6} md={3}>
            <h6 className="footer-heading">Categories</h6>
            <ul className="footer-links">
              <li><Link to="/products">Electronics</Link></li>
              <li><Link to="/products">Jewellery</Link></li>
              <li><Link to="/products">Men&apos;s Clothing</Link></li>
              <li><Link to="/products">Women&apos;s Clothing</Link></li>
            </ul>
          </Col>

          <Col xs={12} md={3}>
            <h6 className="footer-heading">About</h6>
            <p className="footer-note">
              This app uses{" "}
              <a
                href="https://fakestoreapi.com"
                target="_blank"
                rel="noreferrer"
              >
                FakeStoreAPI
              </a>{" "}
              — a free mock API for testing and learning. POST, PUT, and DELETE
              requests return success responses but do not persist data.
            </p>
          </Col>
        </Row>

        <hr className="footer-divider" />

        <p className="footer-copy">
          © {new Date().getFullYear()} FakeStore — Built for educational purposes.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;

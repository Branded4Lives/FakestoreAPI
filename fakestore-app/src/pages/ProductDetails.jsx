import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Modal,
  Breadcrumb,
} from "react-bootstrap";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  function handleAddToCart() {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Product not found");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load product details.");
        setLoading(false);
      });
  }, [id]);

  function handleDelete() {
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Delete failed");
        }
        return res.json();
      })
      .then(() => {
        setShowModal(false);
        navigate("/products");
      })
      .catch(() => {
        setDeleteError("Could not delete product.");
      });
  }

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading product...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <Button as={Link} to="/products" variant="secondary">
          Back to Products
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4 mt-md-5 px-3">
      <nav className="breadcrumb-bar" aria-label="breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/products" }}>
            Products
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            {product.title.length > 40
              ? product.title.slice(0, 40) + "…"
              : product.title}
          </Breadcrumb.Item>
        </Breadcrumb>
      </nav>

      <Card className="p-3 p-md-4 shadow-sm border-0">
        <Row className="g-4 align-items-start">
          <Col xs={12} md={5}>
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid"
              style={{ maxHeight: "350px", objectFit: "contain", width: "100%" }}
            />
          </Col>
          <Col xs={12} md={7}>
            <h2>{product.title}</h2>
            <p className="text-muted text-capitalize">{product.category}</p>
            <p>{product.description}</p>
            <h4 className="mb-4">${product.price}</h4>

            {deleteError && <Alert variant="danger">{deleteError}</Alert>}

            <div className="d-flex flex-wrap gap-2">
              <Button as={Link} to="/products" variant="secondary">
                Back
              </Button>

              <Button
                variant={addedToCart ? "success" : "outline-success"}
                onClick={handleAddToCart}
              >
                {addedToCart ? "✓ Added!" : "Add to Cart"}
              </Button>

              <Button as={Link} to={`/products/${id}/edit`} variant="warning">
                Edit Product
              </Button>

              <Button variant="danger" onClick={() => setShowModal(true)}>
                Delete Product
              </Button>
            </div>
          </Col>
        </Row>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to delete this product?
          <p className="text-muted mt-2 mb-0" style={{ fontSize: "0.85rem" }}>
            Note: FakeStoreAPI is a mock API — the product will not actually be removed.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>

          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProductDetails;
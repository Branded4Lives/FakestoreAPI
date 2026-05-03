import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CATEGORIES = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [addedIds, setAddedIds] = useState([]);
  const { addToCart } = useCart();

  function handleAddToCart(product) {
    addToCart(product);
    setAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id));
    }, 2000);
  }

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load products. Please try again later.");
        setLoading(false);
      });
  }, []);

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading products...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0 fw-bold">Products</h1>
        <span className="text-muted small">{filtered.length} items</span>
      </div>

      <div className="category-filter">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`category-pill${activeCategory === cat ? " active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === "all" ? "All" : cat}
          </button>
        ))}
      </div>

      <Row>
        {filtered.map((product) => (
          <Col sm={6} md={4} lg={3} className="mb-4" key={product.id}>
            <Card className="product-card shadow-sm border-0">
              <div className="product-img-wrap">
                <img src={product.image} alt={product.title} />
              </div>
              <Card.Body className="d-flex flex-column justify-content-between">
                <span
                  className="badge text-capitalize mb-2"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.6)",
                    fontWeight: 400,
                    fontSize: "0.72rem",
                    width: "fit-content",
                    letterSpacing: "0.3px",
                  }}
                >
                  {product.category}
                </span>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text style={{ fontSize: "1rem", fontWeight: 600, color: "rgba(255,255,255,0.9)", marginTop: "auto", marginBottom: "0.75rem" }}>
                  ${product.price}
                </Card.Text>
                <div className="d-flex gap-2">
                  <Button
                    as={Link}
                    to={`/products/${product.id}`}
                    variant="dark"
                    className="rounded-pill flex-grow-1"
                  >
                    View Details
                  </Button>
                  <Button
                    variant={addedIds.includes(product.id) ? "success" : "outline-success"}
                    className="rounded-pill px-3"
                    onClick={() => handleAddToCart(product)}
                    title="Add to cart"
                  >
                    {addedIds.includes(product.id) ? "✓" : "+"}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filtered.length === 0 && (
        <div className="text-center text-muted py-5">
          No products found in this category.
        </div>
      )}
    </Container>
  );
}

export default Products;
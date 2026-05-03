import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert, Card, Spinner } from "react-bootstrap";

function EditProduct() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          title: data.title,
          price: data.price,
          description: data.description,
          category: data.category,
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load product.");
        setLoading(false);
      });
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        setMessage("Product updated successfully!");
        setError("");
      })
      .catch(() => {
        setError("Could not update product.");
        setMessage("");
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

  return (
    <Container className="mt-4 mt-md-5 px-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
        <Card className="p-4 shadow-sm">
        <h1>Edit Product</h1>
        <Alert variant="info" className="mt-2">
          <strong>Note:</strong> FakeStoreAPI is a mock testing API. Your changes will appear to save successfully, but will not actually persist.
        </Alert>

        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Product Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button type="submit" variant="success">
              Update Product
            </Button>

            <Button as={Link} to={`/products/${id}`} variant="secondary">
              Back
            </Button>
          </div>
        </Form>
      </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EditProduct;
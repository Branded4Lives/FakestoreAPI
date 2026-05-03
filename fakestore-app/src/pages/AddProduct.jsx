import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap";

function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        setMessage("Product created successfully!");
        setError("");

        setFormData({
          title: "",
          price: "",
          description: "",
          category: "",
        });
      })
      .catch(() => {
        setError("Could not create product.");
        setMessage("");
      });
  }

  return (
    <Container className="mt-4 mt-md-5 px-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
        <Card className="p-4 shadow-sm">
        <h1>Add Product</h1>
        <Alert variant="info" className="mt-2">
          <strong>Note:</strong> FakeStoreAPI is a mock testing API. Your product will appear to be created successfully, but the data will not actually be saved.
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
              placeholder="Enter product title"
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
              placeholder="Enter price"
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
              placeholder="Enter description"
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
              placeholder="Enter category"
              required
            />
          </Form.Group>

          <Button type="submit" variant="success">
            Add Product
          </Button>
        </Form>
        </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AddProduct;
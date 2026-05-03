import { Container, Table, Button, Alert, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <Container className="mt-5 mb-5 text-center">
        <div style={{ fontSize: "4rem" }}>🛒</div>
        <h2 className="fw-bold mt-3">Your cart is empty</h2>
        <p className="text-muted mb-4">Browse products and add some items to get started.</p>
        <Button as={Link} to="/products" variant="dark" className="rounded-pill px-4">
          Shop Now
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold mb-0">
          Your Cart{" "}
          <Badge bg="dark" className="fs-6 ms-1">
            {totalItems}
          </Badge>
        </h1>
        <div className="d-flex gap-2">
          <Button as={Link} to="/products" variant="outline-dark" className="rounded-pill">
            ← Keep Shopping
          </Button>
          <Button variant="outline-danger" size="sm" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>

      </div>

      <div className="table-responsive">
        <Table className="align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: "60px" }}>Image</th>
              <th>Product</th>
              <th style={{ width: "130px" }}>Qty</th>
              <th style={{ width: "100px" }}>Price</th>
              <th style={{ width: "80px" }}></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "48px", height: "48px", objectFit: "contain" }}
                  />
                </td>
                <td>
                  <Link
                    to={`/products/${item.id}`}
                    className="text-decoration-none text-dark fw-semibold"
                    style={{ fontSize: "0.88rem" }}
                  >
                    {item.title}
                  </Link>
                  <div className="text-muted small text-capitalize">{item.category}</div>
                </td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      style={{ width: "30px", height: "30px", padding: 0, lineHeight: 1 }}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </Button>
                    <span className="fw-semibold" style={{ minWidth: "20px", textAlign: "center" }}>
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      style={{ width: "30px", height: "30px", padding: 0, lineHeight: 1 }}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </td>
                <td className="fw-bold">${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <div className="text-end">
          <div className="text-muted small mb-1">{totalItems} item{totalItems !== 1 ? "s" : ""}</div>
          <div className="fw-bold fs-4">Total: ${totalPrice.toFixed(2)}</div>
          <Alert variant="info" className="mt-3 mb-0" style={{ fontSize: "0.8rem", maxWidth: "320px" }}>
            This is a demo store — no real checkout is available.
          </Alert>
        </div>
      </div>
    </Container>
  );
}

export default Cart;

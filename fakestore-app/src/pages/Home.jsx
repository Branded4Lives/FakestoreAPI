import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="hero-section">
        <div className="hero-badge">&#x2022; Powered by FakeStoreAPI</div>
        <h1>
          Your Favourite <span>FakeStore</span>
        </h1>
        <p className="lead">
          Browse, create, edit, and delete products — all powered by live API
          calls. A full CRUD demo built with React.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Button
            as={Link}
            to="/products"
            variant="danger"
            size="lg"
            className="rounded-pill px-4"
          >
            Shop Now
          </Button>
          <Button
            as={Link}
            to="/add-product"
            variant="outline-light"
            size="lg"
            className="rounded-pill px-4"
          >
            + Add Product
          </Button>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-number">20</div>
            <div className="hero-stat-label">Products</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">4</div>
            <div className="hero-stat-label">Categories</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">100%</div>
            <div className="hero-stat-label">Free API</div>
          </div>
        </div>
      </div>

      <Container className="py-5">
        <h2 className="text-center fw-bold mb-2 text-white">Everything You Need</h2>
        <p className="text-center mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>
          Full CRUD operations — all wired to a real REST API.
        </p>

        <div className="row g-4 text-center">
          <div className="col-12 col-md-4">
            <div className="feature-card">
              <div
                className="feature-icon"
                style={{ background: "rgba(15,52,96,0.1)" }}
              >
                🛍️
              </div>
              <h5 className="fw-bold">Browse Products</h5>
              <p className="text-muted mb-0 small">
                View a full catalogue of products fetched live from
                FakeStoreAPI. Filter by category instantly.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="feature-card">
              <div
                className="feature-icon"
                style={{ background: "rgba(230,57,70,0.1)" }}
              >
                ✏️
              </div>
              <h5 className="fw-bold">Create &amp; Edit</h5>
              <p className="text-muted mb-0 small">
                Add new products or update existing ones. Forms are pre-filled
                and wired to the API.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="feature-card">
              <div
                className="feature-icon"
                style={{ background: "rgba(40,167,69,0.1)" }}
              >
                🗑️
              </div>
              <h5 className="fw-bold">Delete Products</h5>
              <p className="text-muted mb-0 small">
                Remove products with a confirmation step before any destructive
                action is sent to the API.
              </p>
            </div>
          </div>
        </div>
      </Container>

      <div style={{ background: "rgba(255,255,255,0.05)", borderTop: "1px solid rgba(255,255,255,0.08)" }} className="py-5 text-center text-white">
        <h3 className="fw-bold mb-2">Ready to explore?</h3>
        <p className="mb-4" style={{ opacity: 0.75 }}>
          Check out all 20 products across 4 categories.
        </p>
        <Button
          as={Link}
          to="/products"
          variant="danger"
          size="lg"
          className="rounded-pill px-5"
        >
          View All Products
        </Button>
      </div>
    </>
  );
}

export default Home;

import React from "react";
import { Link } from "react-router-dom";
function NotFound() {
  const title = {
    color: "#6a4029",
    fontSize: "32px",
  };

  const description = {
    fontSize: "16px",
  };

  const btn = {
    fontSize: "14px",
    cursor: "pointer",
  };

  return (
    <>
      <main className="position-absolute top-50 start-50 translate-middle">
        <section className="d-flex flex-column px-5 py-5 rounded-1">
          <h3 style={title}>404</h3>
          <p style={description} >Page Not Found 😥.</p>
        </section>
        <Link
          to={`/`}
          style={{
            textDecoration: "none",
            color: "#6a4029",
            fontWeight: "bold",
          }}
        >
          <span style={btn}>Back to home ⇦</span>
        </Link>
      </main>
    </>
  );
}

export default NotFound;

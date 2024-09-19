import React from "react";
import "./Footer.css";

export default function Footer() {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center text-lg-start bg-dark text-white footer-class mt-5">
      {/* Social media section */}
      {/* <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="#" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="me-4 text-reset">
            <i className="fab fa-google"></i>
          </a>
          <a href="#" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </a>
          
        </div>
      </section> */}

      {/* Footer links section */}
      <section className="p-2">
        <div className="container text-center text-md-start mt-5">
          <div className="row">
            {/* Company description */}
            <div className="col-12 col-md-4 col-lg-3 mb-4 col-xl-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Bistro Bliss
              </h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
              <span >Get connected with us on social networks:</span>
              <div className="mt-3">
          <a href="#" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="me-4 text-reset">
            <i className="fab fa-google"></i>
          </a>
          <a href="#" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </a>
          
        </div>
            </div>

            {/* Useful links */}
            <div className="col-12 col-md-3 col-lg-2 mb-4 col-xl-4 text-center">
              <h6 className="text-uppercase fw-bold mb-4">Bistro Bliss</h6>
              <p>
                <a href="/" className="text-reset">
                  Home
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  About
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Delivery
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Privacy policy
                </a>
              </p>
            </div>

            {/* Contact section */}
            <div className="col-12 col-md-5 col-lg-4 mb-md-0 mb-4 col-xl-4">
              <h6 className="text-uppercase fw-bold mb-4">GET IN TOUCH</h6>
              <p>
                <i className="fas fa-home me-3"></i> New York, NY 10012, US
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                info@example.com
              </p>
              <p>
                <i className="fas fa-phone me-3"></i> + 91 8658175406
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright section */}
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
      >
        © {currentYear} Copyright:
        <a className="text-reset fw-bold" >
        Bistro Bliss
        </a>
      </div>
    </footer>
  );
}

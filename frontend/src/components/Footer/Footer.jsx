import "./Footer.css";
import { Link } from "react-router-dom";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import logo from "../../assets/logo.png"; // Change path if needed

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* About */}

        <div className="footer-about">

          <img
            src={logo}
            alt="Borrowly"
            className="footer-logo"
          />

          <p>
            Where books find their next reader.
            Borrow, share and build a community of readers.
          </p>

        </div>

        {/* Quick Links */}

        <div className="footer-links">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/books">Browse Books</Link>
          <Link to="/add-book">Share a Book</Link>

        </div>

        {/* Contact */}

        <div className="footer-contact">

          <h3>Contact</h3>

          <p>
            <FaEnvelope />
            support@borrowly.com
          </p>

        </div>

        {/* Social */}

        <div className="footer-social">

          <h3>Follow Us</h3>

          <div className="social-icons">

            <a href="#">
              <FaGithub />
            </a>

            <a href="#">
              <FaLinkedin />
            </a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Borrowly. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;
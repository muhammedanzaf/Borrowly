import "./Footer.css";
import { Link } from "react-router-dom";
import { FaBook, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Left */}

        <div className="footer-about">

          <div className="footer-logo">
            <FaBook />
            <h2>Borrowly</h2>
          </div>

          <p>
            Where books meet their next reader.
            Borrow, share and build a community of readers.
          </p>

        </div>

        {/* Quick Links */}

        <div className="footer-links">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/books">Browse Books</Link>
          <Link to="/add-book">Share a Book</Link>
          <Link to="/about">About Us</Link>

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
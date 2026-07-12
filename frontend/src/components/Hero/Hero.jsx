import { Link } from "react-router-dom";
import "./Hero.css";
import heroImage from "../../assets/hero-books.png";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-left">

          <h1>
            Where books meet
            <br />
            their next reader.
          </h1>

          <p className="hero-description">
            Share books with fellow readers, discover hidden gems, and give
            every book another story to tell.
          </p>

          <div className="hero-buttons">
            <Link to="/books" className="primary-btn">
              View All Books
            </Link>

            <Link to="/add-book" className="secondary-btn">
              Upload Book
            </Link>
          </div>
        </div>

        <div className="hero-right">
          <img src={heroImage} alt="Books Illustration" />
        </div>
      </div>
    </section>
  );
}

export default Hero;

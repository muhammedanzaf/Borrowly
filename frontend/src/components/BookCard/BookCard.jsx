import "./BookCard.css";
import { Link } from "react-router-dom";
import api from "../../api/api";

function BookCard({ book, fetchBooks }) {

  const statusClass = book.status.toLowerCase();

  const borrowBook = async () => {

    try {

      const response = await api.post(`/borrow/request/${book._id}`);

      alert(response.data.message);

      if (fetchBooks) {
        fetchBooks();
      }

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to send borrow request."
      );

    }

  };

  return (

    <div className="book-card">

      <div className="book-image">

        <img
          src={`http://localhost:8000/${book.image}`}
          alt={book.title}
        />

      </div>

      <div className="book-content">

        <span className="book-genre">
          {book.genre}
        </span>

        <h3>{book.title}</h3>

        <p className="book-author">
          {book.author}
        </p>

        <div className={`book-status ${statusClass}`}>
          {book.status}
        </div>

        <div className="book-buttons">

          <Link
            to={`/books/${book._id}`}
            className="details-btn"
          >
            View Details
          </Link>

          <button
            className="borrow-btn"
            disabled={book.status !== "Available"}
            onClick={borrowBook}
          >
            {book.status === "Available"
              ? "Borrow Book"
              : book.status}
          </button>

        </div>

      </div>

    </div>

  );

}

export default BookCard;
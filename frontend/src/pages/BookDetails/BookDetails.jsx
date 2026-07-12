import "./BookDetails.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/api";

function BookDetails() {

  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {

    try {

      const response = await api.get(`/books/${id}`);

      setBook(response.data.book);

    } catch (error) {

      console.log(error);

    }

  };

  const borrowBook = async () => {

    try {

      setLoading(true);

      const response = await api.post(
        `/borrow/request/${book._id}`
      );

      alert(response.data.message);

      setBook({
        ...book,
        status: "Requested"
      });

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to send borrow request."
      );

    } finally {

      setLoading(false);

    }

  };

  if (!book) {

    return (

      <section className="book-not-found">

        <h2>Book Not Found</h2>

        <Link
          to="/books"
          className="back-btn"
        >
          ← Back to Books
        </Link>

      </section>

    );

  }

  return (

    <section className="book-details-page">

      <div className="details-container">

        <div className="details-image">

          <img
            src={`http://localhost:8000/${book.image.replace(/\\/g, "/")}`}
            alt={book.title}
          />

        </div>

        <div className="details-content">

          <span className={`status ${book.status.toLowerCase()}`}>
            {book.status}
          </span>

          <h1>{book.title}</h1>

          <h3>{book.author}</h3>

          <div className="details-grid">

            <div>
              <strong>Genre</strong>
              <p>{book.genre}</p>
            </div>

            <div>
              <strong>Status</strong>
              <p>{book.status}</p>
            </div>

          </div>

          <div className="description">

            <h2>Description</h2>

            <p>{book.description}</p>

          </div>

          <div className="action-buttons">

            <button
              className="borrow-btn"
              disabled={
                book.status !== "Available" ||
                loading
              }
              onClick={borrowBook}
            >

              {loading
                ? "Sending..."
                : book.status === "Available"
                ? "Borrow This Book"
                : book.status}

            </button>

            <Link
              to="/books"
              className="back-btn"
            >
              ← Back
            </Link>

          </div>

        </div>

      </div>

    </section>

  );

}

export default BookDetails;
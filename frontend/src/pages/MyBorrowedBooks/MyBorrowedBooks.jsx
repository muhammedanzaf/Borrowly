import "./MyBorrowedBooks.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

function MyBorrowedBooks() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = async () => {
    try {
      const response = await api.get("/borrow/my-borrowed-books");

      setBorrowedBooks(response.data.borrowedBooks);
    } catch (error) {
      console.log(error);
    }
  };

  const returnBook = async (requestId) => {
    const confirmReturn = window.confirm(
      "Are you sure you want to return this book?",
    );

    if (!confirmReturn) return;

    try {
      const response = await api.patch(`/borrow/return/${requestId}`);

      alert(response.data.message);

      fetchBorrowedBooks();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to return book.");
    }
  };

  const validBorrowedBooks = borrowedBooks.filter((item) => item.book);

  return (
    <section className="borrowed-page">
      <div className="page-header">
        <h1>Borrowed Books</h1>

        <p>Books you are currently borrowing from other students.</p>
      </div>

      {validBorrowedBooks.length === 0 ? (
        <div className="empty-state">
          <h2>No Borrowed Books</h2>

          <p>You haven't borrowed any books yet.</p>
        </div>
      ) : (
        <div className="borrowed-grid">
          {validBorrowedBooks.map((item) => (
            <div className="borrowed-card" key={item._id}>
              <img
                src={`https://borrowly-backend-byxj.onrender.com/${item.book.image}`}
                alt={item.book.title}
              />

              <div className="borrowed-content">
                <span className="borrow-badge">Borrowed</span>

                <h3>{item.book.title}</h3>

                <p>{item.book.author}</p>

                <div className="borrow-info">
                  <div>
                    <small>Genre</small>

                    <strong>{item.book.genre}</strong>
                  </div>

                  <div>
                    <small>Status</small>

                    <strong>{item.book.status}</strong>
                  </div>

                  <div>
                    <small>Return Before</small>

                    <strong>
                      {item.book.borrowedUntil
                        ? new Date(item.book.borrowedUntil).toLocaleDateString()
                        : "-"}
                    </strong>
                  </div>
                </div>

                <div className="borrowed-buttons">
                  <Link to={`/books/${item.book._id}`} className="details-btn">
                    View Details
                  </Link>

                  <button
                    className="return-btn"
                    onClick={() => returnBook(item._id)}
                  >
                    Return Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyBorrowedBooks;

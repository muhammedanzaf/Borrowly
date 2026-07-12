import "./RecentBooks.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";

function RecentBooks() {

  const [books, setBooks] = useState([]);

  useEffect(() => {

    fetchRecentBooks();

  }, []);

  const fetchRecentBooks = async () => {

    try {

      const response = await api.get("/books/recent");

      setBooks(response.data.books);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <section className="recent-books">

      <div className="section-header">

        <div>

          <h2>Recently Added Books</h2>

          <p>Discover books shared by our community.</p>

        </div>

        <Link
          to="/books"
          className="view-all"
        >
          View All →
        </Link>

      </div>

      <div className="books-grid">

        {books.map((book) => (

          <div
            className="book-card"
            key={book._id}
          >

            <img
              src={`http://localhost:8000/${book.image}`}
              alt={book.title}
            />

            <div className="book-info">

              <h3>{book.title}</h3>

              <p>{book.author}</p>

              <Link
                to={`/books/${book._id}`}
              >
                <button>
                  View Details
                </button>
              </Link>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}

export default RecentBooks;
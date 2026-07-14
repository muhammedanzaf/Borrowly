import "./MyBooks.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

function MyBooks() {

  const [books, setBooks] = useState([]);

  useEffect(() => {

    fetchMyBooks();

  }, []);

  const fetchMyBooks = async () => {

    try {

      const response = await api.get("/books/my-books");

      setBooks(response.data.books);

    } catch (error) {

      console.log(error);

    }

  };

  const deleteBook = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/books/${id}`);

      fetchMyBooks();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to delete book."
      );

    }

  };

  return (

    <section className="my-books">

      <div className="page-header">

        <h1>My Books</h1>

        <p>
          Manage all the books you've uploaded.
        </p>

      </div>

      <div className="my-books-grid">

        {books.map((book) => (

          <div
            className="my-book-card"
            key={book._id}
          >

            <img
              src={`https://borrowly-backend-byxj.onrender.com/${book.image}`}
              alt={book.title}
            />

            <div className="book-details">

              <span className={`status ${book.status.toLowerCase()}`}>
                {book.status}
              </span>

              <h3>{book.title}</h3>

              <p>{book.author}</p>

              <div className="actions">

                <Link
                  to={`/edit-book/${book._id}`}
                  className="edit-btn"
                >
                  <FiEdit2 />
                  Edit
                </Link>

                <button
                  className="delete-btn"
                  onClick={() => deleteBook(book._id)}
                >
                  <FiTrash2 />
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}

export default MyBooks;
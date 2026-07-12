import "./Books.css";
import { useEffect, useState } from "react";
import BookCard from "../../components/BookCard/BookCard";
import api from "../../api/api";

function Books() {

  const [books, setBooks] = useState([]);

  const [search, setSearch] = useState("");

  const [genre, setGenre] = useState("All Genres");

  const [status, setStatus] = useState("All Status");

  useEffect(() => {

    fetchBooks();

  }, [search, genre, status]);

  const fetchBooks = async () => {

    try {

      const response = await api.get("/books", {

        params: {
          search,
          genre,
          status
        }

      });

      setBooks(response.data.books);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <section className="books-page">

      <div className="books-header">

        <h1>Browse Books</h1>

        <p>
          Find your next great read from the Borrowly community.
        </p>

      </div>

      <div className="stats">

        <div className="stat-card">

          <h2>{books.length}</h2>

          <p>Books</p>

        </div>

        <div className="stat-card">

          <h2>
            {books.filter(book => book.status === "Available").length}
          </h2>

          <p>Available</p>

        </div>

        <div className="stat-card">

          <h2>
            {books.filter(book => book.status === "Borrowed").length}
          </h2>

          <p>Borrowed</p>

        </div>

      </div>

      <div className="search-section">

        <input
          type="text"
          placeholder="🔍 Search books by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >

          <option>All Genres</option>

          <option>Programming</option>

          <option>Self Help</option>

          <option>Fiction</option>

          <option>Novel</option>

          <option>Science</option>

        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >

          <option>All Status</option>

          <option>Available</option>

          <option>Requested</option>

          <option>Borrowed</option>

        </select>

      </div>

      <div className="books-grid">

        {books.map((book) => (

          <BookCard
            key={book._id}
            book={book}
            fetchBooks={fetchBooks}
          />

        ))}

      </div>

    </section>

  );

}

export default Books;
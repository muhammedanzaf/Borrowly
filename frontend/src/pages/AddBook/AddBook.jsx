import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./AddBook.css";

function AddBook() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const imageHandler = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!imageFile) {
      alert("Please select a book cover.");
      return;
    }

    try {

      const formData = new FormData();

      formData.append("title", title);
      formData.append("author", author);
      formData.append("genre", genre);
      formData.append("description", description);
      formData.append("image", imageFile);

      await api.post("/books/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Book uploaded successfully.");

      navigate("/my-books");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Failed to upload book."
      );

    }

  };

  return (
    <section className="add-book">

      <div className="add-book-container">

        <h1>Add a Book</h1>

        <p>
          Share your books with the Borrowly community.
        </p>

        <form
          className="add-book-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label>Book Title</label>

          </div>

          <div className="form-group">

            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />

            <label>Author</label>

          </div>

          <div className="form-group">

            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            >

              <option value=""></option>

              <option value="Programming">Programming</option>

              <option value="Self Help">Self Help</option>

              <option value="Fiction">Fiction</option>

              <option value="Novel">Novel</option>

              <option value="Science">Science</option>

            </select>

            <label>Genre</label>

          </div>

          <div className="form-group full-width">

            <textarea
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>

            <label>Description</label>

          </div>

          <div className="upload-area">

            <label>Book Cover</label>

            <input
              type="file"
              accept="image/*"
              onChange={imageHandler}
            />

            {imagePreview && (

              <img
                src={imagePreview}
                alt="Preview"
                className="preview-image"
              />

            )}

          </div>

          <button
            type="submit"
            className="upload-btn"
          >
            Upload Book
          </button>

        </form>

      </div>

    </section>
  );
}

export default AddBook;
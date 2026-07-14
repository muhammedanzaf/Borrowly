import "./EditBook.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

function EditBook() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchBook();

    }, []);

    const fetchBook = async () => {

        try {

            const response = await api.get(`/books/${id}`);

            const book = response.data.book;

            setTitle(book.title);
            setAuthor(book.author);
            setGenre(book.genre);
            setDescription(book.description);

            setPreview(`https://borrowly-backend-byxj.onrender.com/${book.image}`);

            setLoading(false);

        } catch (error) {

            console.log(error);

            setLoading(false);

        }

    };

    const imageHandler = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setImage(file);

        setPreview(URL.createObjectURL(file));

    };

    const updateBook = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("title", title);
            formData.append("author", author);
            formData.append("genre", genre);
            formData.append("description", description);

            if (image) {

                formData.append("image", image);

            }

            await api.patch(
                `/books/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert("Book updated successfully.");

            navigate("/my-books");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to update book."
            );

        }

    };

    if (loading) {

        return (

            <section className="edit-book-page">

                <h2>Loading...</h2>

            </section>

        );

    }

    return (

        <section className="edit-book-page">

            <div className="page-header">

                <h1>Edit Book</h1>

                <p>Update your uploaded book.</p>

            </div>

            <form
                className="edit-book-form"
                onSubmit={updateBook}
            >

                <div className="edit-form-group">

                    <label>Book Title</label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                </div>

                <div className="edit-form-group">

                    <label>Author</label>

                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />

                </div>

                <div className="edit-form-group">

                    <label>Genre</label>

                    <select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    >

                        <option value="">Select Genre</option>
                        <option>Programming</option>
                        <option>Self Help</option>
                        <option>Fiction</option>
                        <option>Novel</option>
                        <option>Science</option>

                    </select>

                </div>

                <div className="edit-form-group">

                    <label>Description</label>

                    <textarea
                        rows="6"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                </div>

                <div className="edit-form-group">

                    <label>Book Cover</label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={imageHandler}
                    />

                    {preview && (

                        <img
                            src={preview}
                            alt="Preview"
                            className="preview-image"
                        />

                    )}

                </div>

                <button
                    type="submit"
                    className="submit-btn"
                >
                    Save Changes
                </button>

            </form>

        </section>

    );

}

export default EditBook;
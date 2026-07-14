import "./Navbar.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/borrowly-logo.png";

function Navbar() {
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        setMenuOpen(false);
        navigate("/");
    };

    return (
        <nav className="navbar">

            <div className="nav-left">

                <Link to="/" className="logo">
                    <img src={logo} alt="Borrowly" />
                </Link>

                <button
                    className="menu-btn"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>

                <div className={`nav-links ${menuOpen ? "active" : ""}`}>

                    <div className="nav-center">

                        <Link to="/" onClick={() => setMenuOpen(false)}>
                            Home
                        </Link>

                        <Link to="/books" onClick={() => setMenuOpen(false)}>
                            Books
                        </Link>

                        {token && (
                            <Link
                                to="/dashboard"
                                onClick={() => setMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                        )}

                    </div>

                    <div className="nav-right">

                        {!token ? (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <button
                                className="logout-btn"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        )}

                    </div>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;
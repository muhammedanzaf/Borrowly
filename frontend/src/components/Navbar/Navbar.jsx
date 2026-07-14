import "./Navbar.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/borrowly-logo.png";

function Navbar() {
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const token = localStorage.getItem("token");

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        closeMenu();
        navigate("/");
    };

    return (
        <nav className="navbar">

            <div className="nav-left">

                <Link to="/" className="logo" onClick={closeMenu}>
                    <img src={logo} alt="Borrowly" />
                </Link>

            </div>

            <button
                className="menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? "✕" : "☰"}
            </button>

            <div className={`nav-links ${menuOpen ? "active" : ""}`}>

                <div className="nav-center">

                    <Link to="/" onClick={closeMenu}>
                        Home
                    </Link>

                    <Link to="/books" onClick={closeMenu}>
                        Books
                    </Link>

                    {token && (
                        <Link
                            to="/dashboard"
                            onClick={closeMenu}
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
                                onClick={closeMenu}
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                onClick={closeMenu}
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

        </nav>
    );
}

export default Navbar;
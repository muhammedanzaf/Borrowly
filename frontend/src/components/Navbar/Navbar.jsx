import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/borrowly-logo.png";
function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    return (

        <nav className="navbar">

            <div className="nav-left">

                <Link to="/" className="logo">

                    <img 
                        src={logo} 
                        alt="Borrowly" 
                    />

                </Link>

                <div className="nav-center">

                    <Link to="/">Home</Link>

                    <Link to="/books">Books</Link>

                </div>

            </div>

            <div className="nav-right">

                {!token ? (

                    <>

                        <Link to="/login">
                            Login
                        </Link>

                        <span className="separator">|</span>

                        <Link to="/register">
                            Register
                        </Link>

                    </>

                ) : (

                    <>

                        <Link to="/dashboard">
                            Dashboard
                        </Link>

                        <span className="separator">|</span>

                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </>

                )}

            </div>

        </nav>

    );

}

export default Navbar;
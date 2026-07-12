import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/api";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            await api.post("/auth/register", {
                name,
                email,
                password
            });

            alert("Registration Successful");

            navigate("/login");

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Registration Failed"
            );

        }

    };

    return (

        <div className="register-page">

            <div className="register-card">

                <div className="register-header">

                    <h1>Create Account</h1>

                    <p>
                        Join the Borrowly community today.
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="input-box">

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <label>Full Name</label>

                    </div>

                    <div className="input-box">

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label>Email</label>

                    </div>

                    <div className="input-box">

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <label>Password</label>

                    </div>

                    <div className="input-box">

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <label>Confirm Password</label>

                    </div>

                    <button
                        className="register-btn"
                        type="submit"
                    >
                        Create Account
                    </button>

                </form>

                <div className="auth-switch">

                    Already have an account?

                    <Link to="/login">
                        {" "}Login
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Register;
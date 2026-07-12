import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);

            alert("Login Successful");

            navigate("/dashboard");

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Login Failed"
            );

        }

    };

    return (

        <div className="login-page">

            <div className="login-card">

                <div className="login-header">

                    <h1>Welcome Back!</h1>

                    <p>
                        Continue your reading journey.
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

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

                    <button
                        className="login-btn"
                        type="submit"
                    >
                        Login
                    </button>

                </form>

                <div className="auth-switch">

                    Don't have an account?

                    <Link to="/register">
                        {" "}Register
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Login;
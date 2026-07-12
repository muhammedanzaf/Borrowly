
import "./NotFound.css";
import { Link } from "react-router-dom";

function NotFound() {

    return (

        <section className="not-found">

            <h1>404</h1>

            <h2>Page Not Found</h2>

            <p>

                The page you're looking for doesn't exist.

            </p>

            <Link
                to="/"
                className="home-btn"
            >

                Back to Home

            </Link>

        </section>

    );

}

export default NotFound;
import "./Dashboard.css";
import { Link } from "react-router-dom";

import {
  FiBookOpen,
  FiInbox,
  FiSend,
  FiBookmark,
  FiPlusCircle,
  FiArrowRight
} from "react-icons/fi";

function Dashboard() {
  return (
    <section className="dashboard">

      <div className="dashboard-header">

        <h1>Dashboard</h1>

        <p>
          Manage your Borrowly account from one place.
        </p>

      </div>

      <div className="dashboard-grid">

        <Link to="/my-books" className="dashboard-card">

          <FiBookOpen className="dashboard-icon" />

          <h2>My Books</h2>

          <p>
            View, edit or delete the books you've uploaded.
          </p>

          <span>
            Open <FiArrowRight />
          </span>

        </Link>

        <Link
          to="/incoming-requests"
          className="dashboard-card"
        >

          <FiInbox className="dashboard-icon" />

          <h2>Incoming Requests</h2>

          <p>
            Review and respond to borrow requests.
          </p>

          <span>
            Open <FiArrowRight />
          </span>

        </Link>

        <Link
          to="/my-borrow-requests"
          className="dashboard-card"
        >

          <FiSend className="dashboard-icon" />

          <h2>My Borrow Requests</h2>

          <p>
            Track the requests you've sent.
          </p>

          <span>
            Open <FiArrowRight />
          </span>

        </Link>

        <Link
          to="/my-borrowed-books"
          className="dashboard-card"
        >

          <FiBookmark className="dashboard-icon" />

          <h2>Borrowed Books</h2>

          <p>
            View books you're currently borrowing.
          </p>

          <span>
            Open <FiArrowRight />
          </span>

        </Link>

      </div>

      <Link
        to="/add-book"
        className="add-book-card"
      >

        <FiPlusCircle className="dashboard-icon" />

        <div>

          <h2>Add Book</h2>

          <p>
            Upload another book to Borrowly.
          </p>

        </div>

        <FiArrowRight className="arrow" />

      </Link>

    </section>
  );
}

export default Dashboard;
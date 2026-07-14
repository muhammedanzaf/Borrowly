import "./MyBorrowRequests.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

function MyBorrowRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await api.get("/borrow/my-requests");

      setRequests(response.data.requests);
    } catch (error) {
      console.log(error);
    }
  };

  const validRequests = requests.filter((request) => request.book);

  return (
    <section className="requests-page">
      <div className="page-header">
        <h1>My Borrow Requests</h1>

        <p>Track all the books you've requested from other users.</p>
      </div>

      {validRequests.length === 0 ? (
        <div className="empty-state">
          <h2>No Requests Found</h2>

          <p>You haven't requested any books yet.</p>
        </div>
      ) : (
        <div className="requests-grid">
          {validRequests.map((request) => (
            <div className="request-card" key={request._id}>
              <img
                src={`https://borrowly-backend-byxj.onrender.com/${request.book.image}`}
                alt={request.book.title}
              />

              <div className="request-content">
                <span
                  className={`request-status ${request.status.toLowerCase()}`}
                >
                  {request.status}
                </span>

                <h3>{request.book.title}</h3>

                <p>{request.book.author}</p>

                <div className="request-info">
                  <div>
                    <small>Owner</small>
                    <strong>{request.owner.name}</strong>
                  </div>

                  <div>
                    <small>Book Status</small>
                    <strong>{request.book.status}</strong>
                  </div>

                  <div>
                    <small>Return Before</small>
                    <strong>
                      {request.book.borrowedUntil
                        ? new Date(
                            request.book.borrowedUntil,
                          ).toLocaleDateString()
                        : "--"}
                    </strong>
                  </div>
                </div>

                <Link to={`/books/${request.book._id}`} className="details-btn">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyBorrowRequests;

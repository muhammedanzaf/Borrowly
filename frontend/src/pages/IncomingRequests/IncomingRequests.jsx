import "./IncomingRequests.css";
import { useEffect, useState } from "react";
import api from "../../api/api";

function IncomingRequests() {

  const [requests, setRequests] = useState([]);
  const [dates, setDates] = useState({});

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {

    try {

      const response = await api.get("/borrow/requests");

      setRequests(response.data.requests);

    } catch (error) {

      console.log(error);

    }

  };

  const acceptRequest = async (id) => {

    if (!dates[id]) {
      return alert("Please select a return date.");
    }

    try {

      await api.patch(`/borrow/accept/${id}`, {
        borrowedUntil: dates[id]
      });

      fetchRequests();

    } catch (error) {

      alert(error.response?.data?.message);

    }

  };

  const rejectRequest = async (id) => {

    try {

      await api.patch(`/borrow/reject/${id}`);

      fetchRequests();

    } catch (error) {

      alert(error.response?.data?.message);

    }

  };

  const validRequests = requests.filter(
    (request) => request.book
  );

  return (

    <section className="incoming-page">

      <div className="page-header">

        <h1>Incoming Requests</h1>

        <p>
          Approve or reject students requesting your books.
        </p>

      </div>

      {validRequests.length === 0 ? (

        <div className="empty-state">

          <h2>No Incoming Requests</h2>

          <p>You're all caught up.</p>

        </div>

      ) : (

        <div className="incoming-grid">

          {validRequests.map((request) => (

            <div
              className="incoming-card"
              key={request._id}
            >

              <img
                src={`http://localhost:8000/${request.book.image}`}
                alt={request.book.title}
              />

              <div className="incoming-content">

                <span className={`status ${request.status.toLowerCase()}`}>
                  {request.status}
                </span>

                <h3>{request.book.title}</h3>

                <p>{request.book.author}</p>

                <div className="request-details">

                  <div>

                    <small>Requested By</small>

                    <strong>{request.requester.name}</strong>

                  </div>

                </div>

                {request.status === "Pending" && (

                  <div className="request-actions">

                    <label>
                      Return Date
                    </label>

                    <input
                      type="date"
                      value={dates[request._id] || ""}
                      onChange={(e) =>
                        setDates({
                          ...dates,
                          [request._id]: e.target.value
                        })
                      }
                    />

                    <div className="request-buttons">

                      <button
                        className="accept-btn"
                        onClick={() => acceptRequest(request._id)}
                      >
                        Accept
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() => rejectRequest(request._id)}
                      >
                        Reject
                      </button>

                    </div>

                  </div>

                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </section>

  );

}

export default IncomingRequests;
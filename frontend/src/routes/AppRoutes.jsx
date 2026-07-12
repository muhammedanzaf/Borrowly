import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Books from "../pages/Books/Books";
import BookDetails from "../pages/BookDetails/BookDetails";
import AddBook from "../pages/AddBook/AddBook";
import EditBook from "../pages/EditBook/EditBook";
import MyBooks from "../pages/MyBooks/MyBooks";
import IncomingRequests from "../pages/IncomingRequests/IncomingRequests";
import MyBorrowRequests from "../pages/MyBorrowRequests/MyBorrowRequests";
import MyBorrowedBooks from "../pages/MyBorrowedBooks/MyBorrowedBooks";
import Dashboard from "../pages/Dashboard/Dashboard";
import NotFound from "../pages/NotFound/NotFound";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/books" element={<Books />} />

      <Route path="/books/:id" element={<BookDetails />} />

      {/* Protected Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-book"
        element={
          <ProtectedRoute>
            <AddBook />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-book/:id"
        element={
          <ProtectedRoute>
            <EditBook />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-books"
        element={
          <ProtectedRoute>
            <MyBooks />
          </ProtectedRoute>
        }
      />

      <Route
        path="/incoming-requests"
        element={
          <ProtectedRoute>
            <IncomingRequests />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-borrow-requests"
        element={
          <ProtectedRoute>
            <MyBorrowRequests />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-borrowed-books"
        element={
          <ProtectedRoute>
            <MyBorrowedBooks />
          </ProtectedRoute>
        }
      />

      {/* 404 */}

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;
import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BookTable from "../component/BookTable";
import { SERVER_URL } from "../global";

const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const usernameLocal = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  // Redirect if not logged in
  if (!usernameLocal) {
    navigate("/");
  }

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  // Fetch books
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/book`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setBooks(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  return (
    <div className="container py-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Book List</h1>
        <div className="d-flex align-items-center">
          <span className="me-3 fw-bold">Welcome, {usernameLocal}!</span>
          <Link to="/book/create" className="btn btn-success d-flex align-items-center me-3">
            <MdOutlineAddBox size={24} className="me-1" />
            Add Book
          </Link>
          <button className="btn btn-danger" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>

      {/* Book Table */}
      {books.length > 0 ? (
        <BookTable books={books} />
      ) : (
        <p className="text-center">No books found. Add a book to get started!</p>
      )}
    </div>
  );
};

export default Home;

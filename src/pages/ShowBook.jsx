import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../component/BackButton";
import { SERVER_URL } from "../global";

const ShowBook = () => {
  const [book, setBook] = useState(null); 
  const [imageError, setImageError] = useState(false);
  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/book/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, token]);

  const handleImageError = () => {
    setImageError(true); 
  };

  return (
    <div className="container py-4">
      <BackButton />
      <h1 className="text-center mb-4">Book Details</h1>
      <div className="card shadow p-4">
        {book ? (
          <>
            <div className="row">
              {book.image && !imageError ? (
                <div className="col-md-4 mb-4">
                  <img
                    src={book.image}
                    alt="Book Cover"
                    className="img-fluid rounded"
                    onError={handleImageError}
                  />
                </div>
              ) : (
                <div className="col-md-4 mb-4">
                  <div className="d-flex justify-content-center align-items-center bg-light text-secondary rounded" style={{ height: "200px" }}>
                    <p>No Image Available</p>
                  </div>
                </div>
              )}
              <div className="col-md-8">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>ID:</strong> {book._id}
                  </li>
                  <li className="list-group-item">
                    <strong>Title:</strong> {book.title}
                  </li>
                  <li className="list-group-item">
                    <strong>Author:</strong> {book.author}
                  </li>
                  <li className="list-group-item">
                    <strong>Publish Year:</strong> {book.publishYear}
                  </li>
                  <li className="list-group-item">
                    <strong>Created Time:</strong> {new Date(book.createdAt).toLocaleString()}
                  </li>
                  <li className="list-group-item">
                    <strong>Last Update Time:</strong> {new Date(book.updatedAt).toLocaleString()}
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ShowBook;

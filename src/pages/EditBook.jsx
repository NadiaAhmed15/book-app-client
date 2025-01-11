import { useState, useEffect } from "react";
import BackButton from "../component/BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_URL } from "../global";
import { useSnackbar } from "notistack";
import React from "react";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/book/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, token]);

  const handleEditBook = () => {
    const data = { title, author, publishYear };
    axios
      .put(`${SERVER_URL}/book/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        enqueueSnackbar("Book updated successfully", { variant: "success" });
        navigate("/home");
      })
      .catch((error) => {
        enqueueSnackbar("Failed to update book", { variant: "error" });
        console.error(error);
      });
  };

  return (
    <div className="container mt-5">
      {/* Back Button */}
      <div className="mb-4">
        <BackButton />
      </div>

      {/* Form Card */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="mb-4 text-center text-primary">Edit Book</h1>
          <form>
            {/* Title Input */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="form-control"
                placeholder="Enter book title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Author Input */}
            <div className="mb-3">
              <label htmlFor="author" className="form-label">
                Author
              </label>
              <input
                type="text"
                id="author"
                className="form-control"
                placeholder="Enter author name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            {/* Publish Year Input */}
            <div className="mb-3">
              <label htmlFor="publishYear" className="form-label">
                Publish Year
              </label>
              <input
                type="number"
                id="publishYear"
                className="form-control"
                placeholder="Enter publish year"
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
              />
            </div>

            {/* Save Button */}
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleEditBook}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;

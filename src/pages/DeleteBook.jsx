import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { SERVER_URL } from "../global";
import BackButton from "../component/BackButton";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");

  const handleDeleteBook = () => {
    // Confirm deletion
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book? This action cannot be undone."
    );
    if (!confirmDelete) {
      return; // Exit if the user cancels
    }

    axios
      .delete(`${SERVER_URL}/book/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        enqueueSnackbar("Book deleted successfully", { variant: "success" });
        navigate("/home"); // Redirect to the home page after deletion
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar(
          "An error occurred while deleting the book. Please try again.",
          { variant: "error" }
        ); // Provide feedback on error
      });
  };

  return (
    <div className="container mt-5">
      {/* Back Button */}
      <div className="mb-4">
        <BackButton />
      </div>

      {/* Deletion Confirmation */}
      <div className="card border-danger shadow-sm">
        <div className="card-body text-center">
          <h1 className="mb-4 text-danger">Delete Book</h1>
          <p className="lead">
            Are you sure you want to delete this book? This action is
            irreversible.
          </p>
          <button
            className="btn btn-danger btn-lg w-50 mt-4"
            onClick={handleDeleteBook}
          >
            Yes, Delete it
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;

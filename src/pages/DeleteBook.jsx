import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../componets/home/BackButton';
import React from 'react';

const DeleteBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    // Confirm deletion
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) {
      return; // Exit if the user cancels
    }

    axios
      .delete(`https://book-app-server-beige.vercel.app/books2/${id}`)
      .then(() => {
        navigate('/home'); // Redirect to the home page after deletion
      })
      .catch((error) => {
        console.error(error);
        alert('An error occurred while deleting the book. Please try again.'); // Provide feedback on error
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="my-4">Delete Book</h1>
      <div className='d-flex flex-column justify-content-center border border-danger rounded p-5'>
        <h5 className='display-5 my-5 text-center'>Are you sure you want to delete this book?</h5>
        <button className='p-4 btn btn-danger text-white' onClick={handleDeleteBook}>
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
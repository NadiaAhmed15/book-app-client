import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../componets/home/BackButton';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://book-app-server-beige.vercel.app/books2/${id}`)
      .then((response) => {
        if (response.data.book) {
          setTitle(response.data.book.title || '');
          setAuthor(response.data.book.author || '');
          setPublishYear(response.data.book.publishYear || '');
        }
      })
      .catch((error) => {
        alert('An error occurred. Please check the console.');
        console.error(error);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };

    if (!title || !author || !publishYear) {
      alert('Please fill in all fields.');
      return;
    }

    axios
      .put(`https://book-app-server-beige.vercel.app/books2/${id}`, data)
      .then(() => {
        navigate('/home'); // Redirect to the home page after successful update
      })
      .catch((error) => {
        console.error(error);
        alert('An error occurred while updating the book. Please check the console.');
      });
  };

  return (
    <div className="container mt-5">
      {/* Back Button Outside the Box */}
      <div className="mb-3">
        <BackButton />
      </div>

      {/* Card for Form */}
      <div className="card">
        <div className="card-body">
          <h1 className="mb-4 text-center">Edit Book</h1>
          <form>
            {/* Title Input */}
            <div className="mb-3 row align-items-center">
              <label htmlFor="title" className="col-sm-2 col-form-label text-end">
                Title
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  placeholder="Enter book title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            {/* Author Input */}
            <div className="mb-3 row align-items-center">
              <label htmlFor="author" className="col-sm-2 col-form-label text-end">
                Author
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  id="author"
                  className="form-control"
                  placeholder="Enter author name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
            </div>

            {/* Publish Year Input */}
            <div className="mb-3 row align-items-center">
              <label htmlFor="publishYear" className="col-sm-2 col-form-label text-end">
                Publish Year
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  id="publishYear"
                  className="form-control"
                  placeholder="Enter publish year"
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="row">
              <div className="col-sm-10 offset-sm-2">
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={handleEditBook}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;

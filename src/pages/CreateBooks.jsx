import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../componets/home/BackButton';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('publishYear', publishYear);
    if (image) {
      formData.append('image', image);
    }

    axios
      .post('https://book-app-server-beige.vercel.app//books2/', formData)
      .then(() => {
        enqueueSnackbar('Book created successfully', { variant: 'success' });
        navigate('/home'); // Redirect to the homepage or books list page
      })
      .catch((error) => {
        console.error('Error saving book:', error);
        enqueueSnackbar('Failed to save the book. Please try again.', { variant: 'error' });
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }} // Optional background color
    >
      <div
        className="border rounded shadow p-4 bg-light"
        style={{ width: "900px", minHeight: "500px" }}
      >
        <div className="mb-3">
          <BackButton />
        </div>
        <h1 className="text-center mb-4">Create Book</h1>
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
  
          {/* Image Upload */}
          <div className="mb-4">
            <label htmlFor="image" className="form-label text-gray-500">
              Image
            </label>
            <input
              type="file"
              id="image"
              className="form-control"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
  
          {/* Save Button */}
          <div className="row">
            <div className="col-sm-10 offset-sm-2">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={handleSaveBook}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default CreateBooks;

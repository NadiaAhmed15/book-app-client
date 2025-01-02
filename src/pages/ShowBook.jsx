
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../componets/home/BackButton';

const ShowBook = () => {
  const [book, setBook] = useState(null); // Initialize as null to handle loading state
  const [imageError, setImageError] = useState(false); // Track image load error
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:1111/books2/${id}`);
        setBook(response.data.book); // Access the book object from the response
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>; // Show a loading message while fetching the book
  }

  const handleImageError = () => {
    setImageError(true); // Set error state if image fails to load
  };

  console.log(`Image URL: https://book-app-server-beige.vercel.app/uploads/${book.image}`); // Log image URL

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='my-4'>Show Book</h1>
      <div className='border border-2 rounded p-4'>
        {book.image &&  (
          <div className='w-1/3 pr-4'>
            <img
              src={book.image} // Ensure correct image path
              alt={book.title}
              
            />
          </div>
        ) 
}

        <div className='my-4'>
          <span className='border p-1 rounded mx-2'>ID:</span>
          <span>{book._id}</span>
        </div>

        <div className='my-4'>
          <span className='border p-1 rounded mx-2'>Title:</span>
          <span>{book.title}</span>
        </div>

        <div className='my-4'>
          <span className='border p-1 rounded mx-2'>Author:</span>
          <span>{book.author}</span>
        </div>

        <div className='my-4'>
          <span className='border p-1 rounded mx-2'>Publish Year:</span>
          <span>{book.publishYear}</span>
        </div>

        <div className='my-4'>
          <span className='border p-1 rounded mx-2'>Created Time:</span>
          <span>{new Date(book.createdAt).toLocaleString()}</span>
        </div>

        <div className='my-4'>
          <span className='border p-1 rounded mx-2'>Last Update Time:</span>
          <span>{new Date(book.updatedAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ShowBook;





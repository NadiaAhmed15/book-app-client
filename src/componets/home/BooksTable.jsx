import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";

const BooksTable = ({ books2 }) => {
  return (
    <table className="table table-striped text-center">
      <thead>
        <tr>
          <th className="border">No</th>
          <th className="border">Title</th>
          <th className="border">Author</th>
          <th className="border">Publish Year</th>
          <th className="border">Operations</th>
        </tr>
      </thead>
      <tbody>
        {books2.map((book, index) => (
          <tr key={book._id} className="h-8">
            <td className="border">{index + 1}</td>
            <td className="border">{book.title}</td>
            <td className="border">{book.author}</td>
            <td className="border">{book.publishYear}</td>
            <td className="border">
              <div className="d-flex justify-content-center gap-2">
                <Link to={`/books2/details/${book._id}`}>
                  <BsInfoCircle className="mx-2" />
                </Link>
                <Link to={`/books2/edit/${book._id}`}>
                  <AiOutlineEdit className="mx-2" />
                </Link>
                <Link to={`/books2/delete/${book._id}`}>
                  <MdOutlineDelete className="mx-2" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
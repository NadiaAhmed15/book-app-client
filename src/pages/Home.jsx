import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { MdOutlineAddBox } from 'react-icons/md';
import axios from 'axios';
import { Link,Navigate,useNavigate } from 'react-router-dom';
import { CiBookmarkPlus } from "react-icons/ci";
import BooksTable from '../componets/home/BooksTable';





export const Home = () => {

  const [books2,setBooks] = useState([]);
 const navigate = useNavigate();
 const usernameLocal = localStorage.getItem('user');
console.log(usernameLocal);


useEffect(() => {
  if (!usernameLocal) {
    navigate('/');
  }
}, [usernameLocal, navigate]);


const handleLogOut = () => {
localStorage.removeItem('token');
localStorage.removeItem('user');
navigate('/');

};




  useEffect(() => {
    axios
    .get('https://book-app-server-beige.vercel.app/books2/')
    .then((Response)  =>  {
setBooks(Response.data.data)
})
.catch((error) => {
console.log(error);
});

  },[]);



return (
  <div
    className="d-flex justify-content-center align-items-center vh-100"
    style={{ backgroundColor: "#f8f9fa" }} // Optional background color
  >
    <div
      className="border rounded shadow p-4 bg-light"
      style={{ width: "900px", minHeight: "750px" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-xl font-bold">Book List</h1>
        <Link to="/books2/create">
          <MdOutlineAddBox className="display-5" />
        </Link>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="mx-2">Welcome, {usernameLocal}!</span>
        <button
          className="btn btn-primary"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>
      <BooksTable books2={books2} />
    </div>
  </div>
);

};

export default Home;
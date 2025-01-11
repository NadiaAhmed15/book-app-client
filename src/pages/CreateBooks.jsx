import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../global";
import BackButton from "../component/BackButton";
import { useSnackbar } from "notistack";

const CreateBooks = () => {
  const [base64Image, setBase64Image] = useState("");
  const [title, setTitle] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");

  const handleSubmit = () => {
    if (!title || !author || !publishYear) {
      enqueueSnackbar("Please fill in all fields.", { variant: "warning" });
      return;
    }

    const data = {
      title,
      author,
      publishYear,
      image: base64Image,
    };

    axios
      .post(`${SERVER_URL}/book`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        enqueueSnackbar("Book created successfully!", { variant: "success" });
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar(
          "An error occurred while creating the book. Please try again.",
          { variant: "error" }
        );
      });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mt-5">
      {/* Back Button */}
      <div className="mb-3">
        <BackButton />
      </div>

      {/* Card for Form */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="mb-4 text-center">Create Book</h1>
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
              <label
                htmlFor="publishYear"
                className="col-sm-2 col-form-label text-end"
              >
                Publish Year
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  id="publishYear"
                  className="form-control"
                  placeholder="Enter publish year"
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-3 row align-items-center">
              <label htmlFor="image" className="col-sm-2 col-form-label text-end">
                Image
              </label>
              <div className="col-sm-10">
                <input
                  type="file"
                  id="image"
                  className="form-control"
                  onChange={handleFileUpload}
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="row">
              <div className="col-sm-10 offset-sm-2">
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={handleSubmit}
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

export default CreateBooks;

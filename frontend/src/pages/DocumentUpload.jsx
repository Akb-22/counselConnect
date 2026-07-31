import { useState } from "react";
import api from "../services/api";

const DocumentUpload = () => {
  const [documents, setDocuments] = useState({
    aadhaar: null,
    scorecard: null,
    marksheet: null,
    photo: null,
    signature: null,
    categoryCertificate: null,
    domicileCertificate: null,
  });

  const handleChange = (e) => {
    setDocuments({
      ...documents,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(documents).forEach((key) => {
      if (documents[key]) {
        formData.append(key, documents[key]);
      }
    });

    try {
      const token = localStorage.getItem("token");

     await api.post(
         "/student/documents/upload",
         formData,
         {
             headers:{
                 Authorization:`Bearer ${token}`,
                 "Content-Type":"multipart/form-data"
             }
         }
     );

      alert("Documents uploaded successfully.");
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    }
  };
return (
  <div className="container mt-4">

    <div className="card shadow">

      <div className="card-header update-header text-center">
        <h3 className="text-white">
          Upload Documents
        </h3>
      </div>

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          <div className="row">

            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">
                Aadhaar Card
              </label>
              <input
                type="file"
                className="form-control"
                name="aadhaar"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">
                JEE Scorecard
              </label>
              <input
                type="file"
                className="form-control"
                name="scorecard"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">
                12th Marksheet
              </label>
              <input
                type="file"
                className="form-control"
                name="marksheet"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">
                Passport Photo
              </label>
              <input
                type="file"
                className="form-control"
                name="photo"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">
                Signature
              </label>
              <input
                type="file"
                className="form-control"
                name="signature"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">
                Category Certificate
              </label>
              <input
                type="file"
                className="form-control"
                name="categoryCertificate"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">
                Domicile Certificate
              </label>
              <input
                type="file"
                className="form-control"
                name="domicileCertificate"
                onChange={handleChange}
              />
            </div>

          </div>

          <hr />

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-success px-5"
            >
              Upload Documents
            </button>
          </div>

        </form>

      </div>

    </div>

  </div>
);}

export default DocumentUpload;
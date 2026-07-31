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
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const handleChange = (e) => {

  const file = e.target.files[0];

  if (!file) return;

  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png"
  ];

  if (!allowedTypes.includes(file.type)) {
    alert("❌ Only PDF, JPG, JPEG and PNG files are allowed.");
    e.target.value = "";
    return;
  }

  if (file.size > MAX_FILE_SIZE) {
    alert("❌ File size must not exceed 10 MB.");
    e.target.value = "";
    return;
  }

  setDocuments({
    ...documents,
    [e.target.name]: file,
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
        "/documents/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Documents uploaded successfully.");

      setDocuments({
        aadhaar: null,
        scorecard: null,
        marksheet: null,
        photo: null,
        signature: null,
        categoryCertificate: null,
        domicileCertificate: null,
      });

    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message || "Upload failed.");
      } else {
        alert("Server not reachable.");
      }
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
          <div className="alert alert-info">

              <strong>Instructions</strong>

              <ul className="mb-0 mt-2">
                  <li>Allowed formats: PDF, JPG, JPEG, PNG</li>
                  <li>Maximum file size: 10 MB</li>
                  <li>Upload clear and readable documents.</li>
              </ul>

          </div>

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
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleChange}
            /><small className="text-muted">
              PDF, JPG, PNG • Max 10 MB
              </small>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">
                JEE Scorecard
              </label>
             <input
                 type="file"
                 className="form-control"
                 name="scorecard"
                 accept=".pdf,.jpg,.jpeg,.png"
                 onChange={handleChange}
             /><small className="text-muted">
               PDF, JPG, PNG • Max 10 MB
               </small>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">
                12th Marksheet
              </label>
            <input
                type="file"
                className="form-control"
                name="marksheet"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleChange}
            /><small className="text-muted">
              PDF, JPG, PNG • Max 10 MB
              </small>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">
                Passport Photo
              </label>
             <input
                 type="file"
                 className="form-control"
                 name="photo"
                 accept=".pdf,.jpg,.jpeg,.png"
                 onChange={handleChange}
             /><small className="text-muted">
               PDF, JPG, PNG • Max 10 MB
               </small>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">
                Signature
              </label>
           <input
               type="file"
               className="form-control"
               name="sign"
               accept=".pdf,.jpg,.jpeg,.png"
               onChange={handleChange}
           /><small className="text-muted">
             PDF, JPG, PNG • Max 10 MB
             </small>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">
                Category Certificate
              </label>
              <input
                  type="file"
                  className="form-control"
                  name="category"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
              /><small className="text-muted">
                PDF, JPG, PNG • Max 10 MB
                </small>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">
                Domicile Certificate
              </label>
             <input
                 type="file"
                 className="form-control"
                 name="domicile"
                 accept=".pdf,.jpg,.jpeg,.png"
                 onChange={handleChange}
             /><small className="text-muted">
               PDF, JPG, PNG • Max 10 MB
               </small>
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
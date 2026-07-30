import { useState } from "react";
import api from "../../services/api";

function CutoffPrediction() {

  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("GENERAL");
  const [homeState, setHomeState] = useState("");

  // Future Filters
  const [collegeType, setCollegeType] = useState("All");
  const [branch, setBranch] = useState("Any");

  const [results, setResults] = useState([]);

  const handlePredict = async () => {
    try {

      const token = localStorage.getItem("token");

      const response = await api.post(
        "/cutoffs/predict",
        {
          rank: Number(rank),
          category,
          homeState,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResults(response.data);

    } catch (err) {
      console.error(err);
      alert("Prediction Failed");
    }
  };

  return (

    <div className="container py-4">

      <div className="text-center mb-4">

        <h2 className="fw-bold text-primary">
          🎯 College Cutoff Prediction
        </h2>

        <p className="text-muted">
          Predict colleges based on your JEE Rank, Category and Home State.
        </p>

      </div>

      <div className="card shadow-lg border-0">

        <div className="card-body">

          <div className="row">

            <div className="col-md-6 mb-3">

              <label className="form-label fw-bold">
                JEE Rank
              </label>

              <input
                type="number"
                className="form-control"
                placeholder="Enter JEE Rank"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label fw-bold">
                Category
              </label>

              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="GENERAL">GENERAL</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
              </select>

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label fw-bold">
                Home State
              </label>

              <select
                className="form-select"
                value={homeState}
                onChange={(e) => setHomeState(e.target.value)}
              >

                <option value="">Select State</option>

                <option>Andhra Pradesh</option>
                <option>Assam</option>
                <option>Bihar</option>
                <option>Delhi</option>
                <option>Gujarat</option>
                <option>Haryana</option>
                <option>Himachal Pradesh</option>
                <option>Karnataka</option>
                <option>Madhya Pradesh</option>
                <option>Maharashtra</option>
                <option>Punjab</option>
                <option>Rajasthan</option>
                <option>Tamil Nadu</option>
                <option>Telangana</option>
                <option>Uttar Pradesh</option>
                <option>Uttarakhand</option>
                <option>West Bengal</option>

              </select>

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label fw-bold">
                College Type
              </label>

              <select
                className="form-select"
                value={collegeType}
                onChange={(e) => setCollegeType(e.target.value)}
              >
                <option>All</option>
                <option>IIT</option>
                <option>NIT</option>
                <option>IIIT</option>
                <option>GFTI</option>
              </select>

            </div>

            <div className="col-md-12 mb-3">

              <label className="form-label fw-bold">
                Preferred Branch
              </label>

              <select
                className="form-select"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              >

                <option>Any</option>

                <option>Computer Science and Engineering</option>

                <option>Electronics and Communication Engineering</option>

                <option>Electrical Engineering</option>

                <option>Mechanical Engineering</option>

                <option>Civil Engineering</option>

              </select>

            </div>

            <div className="col-12">

              <button
                className="btn btn-primary btn-lg w-100"
                onClick={handlePredict}
              >
                🔍 Predict Colleges
              </button>

            </div>

          </div>

        </div>

      </div>
            {/* Prediction Results */}

            <div className="mt-5">

              <h3 className="mb-3 text-primary">
                Prediction Results
              </h3>

              {results.length > 0 ? (

                <>

                  {/* Summary Card */}

                  <div className="alert alert-success shadow-sm">

                    <h5>📊 Prediction Summary</h5>

                    <p className="mb-1">
                      <strong>Rank:</strong> {rank}
                    </p>

                    <p className="mb-1">
                      <strong>Category:</strong> {category}
                    </p>

                    <p className="mb-1">
                      <strong>Home State:</strong> {homeState}
                    </p>

                    <p className="mb-0">
                      <strong>Total Colleges Found:</strong> {results.length}
                    </p>

                  </div>

                  {/* College Cards */}

                  <div className="row">

                    {results.map((college, index) => (

                      <div className="col-lg-6 mb-4" key={index}>

                        <div className="card border-0 shadow h-100">

                          <div className="card-body">

                            <h4 className="text-primary mb-3">
                              🏛 {college.collegeName}
                            </h4>

                            <hr />

                            <p>
                              <strong>🎓 Branch:</strong>{" "}
                              {college.branchName}
                            </p>

                            <p>
                              <strong>📂 Category:</strong>{" "}
                              {college.category}
                            </p>

                            <p>
                              <strong>📍 Home State:</strong>{" "}
                              {college.homeState}
                            </p>

                            <p>
                              <strong>📈 Opening Rank:</strong>{" "}
                              {college.openingRank}
                            </p>

                            <p>
                              <strong>📉 Closing Rank:</strong>{" "}
                              {college.closingRank}
                            </p>

                            <p>
                              <strong>📅 Year:</strong>{" "}
                              {college.year}
                            </p>

                            <span className="badge bg-success fs-6">
                              ✅ Eligible
                            </span>

                          </div>

                        </div>

                      </div>

                    ))}

                  </div>

                </>

              ) : (

                <div className="alert alert-warning text-center mt-4">

                  <h5>😕 No Colleges Found</h5>

                  <p className="mb-0">
                    Try changing your rank, category or home state.
                  </p>

                </div>

              )}

            </div>

          </div>

        );

      }

      export default CutoffPrediction;
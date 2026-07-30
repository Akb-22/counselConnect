import { useState } from "react";
import api from "../../services/api";

function CutoffPrediction() {
  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("GENERAL");
  const [homeState, setHomeState] = useState("");
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
      alert("Prediction failed");
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="text-center mb-4">
        College Cutoff Prediction
      </h2>

      <div className="card p-4 shadow">

        <div className="mb-3">
          <label>JEE Rank</label>

          <input
            type="number"
            className="form-control"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Category</label>

          <select
            className="form-control"
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

        <div className="mb-3">
          <label>Home State</label>

          <input
            className="form-control"
            value={homeState}
            onChange={(e) => setHomeState(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={handlePredict}
        >
          Predict Colleges
        </button>

      </div>

      {results.length > 0 && (

        <table className="table table-bordered mt-4">

          <thead>
            <tr>
              <th>College</th>
              <th>Branch</th>
              <th>Category</th>
              <th>Opening Rank</th>
              <th>Closing Rank</th>
              <th>Year</th>
            </tr>
          </thead>

          <tbody>

            {results.map((college, index) => (

              <tr key={index}>
                <td>{college.collegeName}</td>
                <td>{college.branchName}</td>
                <td>{college.category}</td>
                <td>{college.openingRank}</td>
                <td>{college.closingRank}</td>
                <td>{college.year}</td>
              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}

export default CutoffPrediction;
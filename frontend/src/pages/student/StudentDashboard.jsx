import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function StudentDashboard() {

  const [dashboard, setDashboard] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {

      const token = localStorage.getItem("token");

      const response = await api.get("/students/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDashboard(response.data);

    } catch (error) {

      console.error(error);

      if (error.response?.status === 401) {

        alert("Session Expired. Please Login Again.");

        localStorage.removeItem("token");

        navigate("/student/login");
      }
    }
  };

  if (!dashboard) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }
  const handleLogout = () => {

      localStorage.removeItem("token");

     navigate("/student/login");

  };


  return (
    <div className="container mt-4">

                <div className=" text-center mb-4 card-header bg-warning">
                    <h2>Welcome {dashboard.studentName}</h2>
                </div>


      <div className="row">

        <div className="col-md-4 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Total Appointments</h5>
              <h2>{dashboard.totalAppointments}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Pending</h5>
              <h2>{dashboard.pendingAppointments}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Approved</h5>
              <h2>{dashboard.approvedAppointments}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Completed</h5>
              <h2>{dashboard.completedAppointments}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>JEE Percentile</h5>
              <h2>{dashboard.jeePercentile}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-12 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>All India Rank</h5>
              <h2>{dashboard.allIndiaRank}</h2>
            </div>
          </div>
        </div>

<div className="row mt-5 justify-content-center g-4">

    <div className="col-lg-2 col-md-4 col-sm-6">
      <button
        className="dashboard-btn w-100"
        onClick={() => navigate("/student/cutoff-prediction")}
      >
        <div className="fs-3 mb-2">🎯</div>
        <span>Cutoff Prediction</span>
      </button>
    </div>

  <div className="col-lg-2 col-md-4 col-sm-6">
    <button
      className="dashboard-btn w-100"
      onClick={() => navigate("/student/book-appointment")}
    >
      <div className="fs-3 mb-2">📅</div>
      <span>Book Appointment</span>
    </button>
  </div>

  <div className="col-lg-2 col-md-4 col-sm-6">
    <button
      className="dashboard-btn w-100"
      onClick={() => navigate("/student/my-appointments")}
    >
      <div className="fs-3 mb-2">📖</div>
      <span>My Appointments</span>
    </button>
  </div>

  <div className="col-lg-2 col-md-4 col-sm-6">
    <button
      className="dashboard-btn w-100"
      onClick={() => navigate("/student/profile")}
    >
      <div className="fs-3 mb-2">👤</div>
      <span>My Profile</span>
    </button>
  </div>

  <div className="col-lg-2 col-md-4 col-sm-6">
    <button
      className="dashboard-btn w-100"
      onClick={() => navigate("/student/update-profile")}
    >
      <div className="fs-3 mb-2">✏️</div>
      <span>Update Profile</span>
    </button>
  </div>
  <div className="col-lg-2 col-md-4 col-sm-6">
    <button
      className="dashboard-btn w-100"
      onClick={() => navigate("/student/upload-documents")}
    >
      <div className="fs-3 mb-2">📁</div>
      <span>Upload Documents</span>
    </button>
  </div>

  <div className="col-lg-2 col-md-4 col-sm-6">
    <button
      className="dashboard-btn w-100"
      onClick={() => navigate("/student/change-password")}
    >
      <div className="fs-3 mb-2">🔒</div>
      <span>Change Password</span>
    </button>
  </div>

  <div className="col-lg-2 col-md-4 col-sm-6">
    <button
      className="dashboard-btn w-100"
      onClick={handleLogout}
    >
      <div className="fs-3 mb-2">🚪</div>
      <span>Logout</span>
    </button>
  </div>

</div></div></div>
  );
}

export default StudentDashboard;
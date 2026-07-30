import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function CounsellorDashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/appointments/counsellor/dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setDashboard(response.data);

        } catch (error) {

            console.error(error);

            if (error.response?.status === 401) {

                alert("Session Expired");

                localStorage.removeItem("token");

                navigate("/counsellor/login");

            }

        }

    };

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/counsellor/login");

    };

    if (!dashboard) {

        return <h3 className="text-center mt-5">Loading...</h3>;

    }

    return (
      <div className="container mt-4">

                <div className=" text-center mb-4 card-header bg-warning">
                    <h2>Welcome {dashboard.counsellorName}</h2>
                </div>


        <div className="row">

          <div className="col-md-3 mb-3">
            <div className="card text-center shadow">
              <div className="card-body">
                <h5>Total Appointments</h5>
                <h2>{dashboard.totalAppointments}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card text-center shadow">
              <div className="card-body">
                <h5>Pending</h5>
                <h2>{dashboard.pendingAppointments}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card text-center shadow">
              <div className="card-body">
                <h5>Approved</h5>
                <h2>{dashboard.approvedAppointments}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card text-center shadow">
              <div className="card-body">
                <h5>Completed</h5>
                <h2>{dashboard.completedAppointments}</h2>
              </div>
            </div>
          </div>

          <div className="row mt-5 justify-content-center g-4">

            <div className="col-lg-2 col-md-4 col-sm-6">
              <button
                className="dashboard-btn w-100"
                onClick={() => navigate("/counsellor/appointments")}
              >
                <div className="fs-3 mb-2">📖</div>
                <span>View Appointments</span>
              </button>
            </div>



            <div className="col-lg-2 col-md-4 col-sm-6">
              <button
                className="dashboard-btn w-100"
                onClick={() => navigate("/counsellor/profile")}
              >
                <div className="fs-3 mb-2">👤</div>
                <span>My Profile</span>
              </button>
            </div>

            <div className="col-lg-2 col-md-4 col-sm-6">
              <button
                className="dashboard-btn w-100"
                onClick={() => navigate("/counsellor/update-profile")}
              >
                <div className="fs-3 mb-2">✏️</div>
                <span>Update Profile</span>
              </button>
            </div>

            <div className="col-lg-2 col-md-4 col-sm-6">
              <button
                className="dashboard-btn w-100"
                onClick={() => navigate("/counsellor/change-password")}
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

          </div>
        </div>
      </div>
    );
  }

  export default CounsellorDashboard;


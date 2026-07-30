import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import AdminLayout from "../../components/AdminLayout";

function AdminDashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/admin/dashboard",
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

                localStorage.removeItem("token");
                navigate("/admin/login");

            }

        }

    };

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/admin/login");

    };

    if (!dashboard) {

        return <h3 className="text-center mt-5">Loading...</h3>;

    }

    return (
<AdminLayout>
        <div className="container mt-4">

            <h2 className="text-center mb-4">
                Admin Dashboard
            </h2>

            <div className="row">

                <div className="col-md-3 mb-3">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h5>Total Students</h5>

                            <h2>{dashboard.totalStudents}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-3">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h5>Total Counsellors</h5>

                            <h2>{dashboard.totalCounsellors}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-3">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h5>Total Appointments</h5>

                            <h2>{dashboard.totalAppointments}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-3">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h5>Pending</h5>

                            <h2>{dashboard.pendingAppointments}</h2>

                        </div>

                    </div>

                </div>

            </div>

            <div className="row">

                <div className="col-md-4 mb-3">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h5>Approved</h5>

                            <h2>{dashboard.approvedAppointments}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4 mb-3">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h5>Rejected</h5>

                            <h2>{dashboard.rejectedAppointments}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4 mb-3">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h5>Completed</h5>

                            <h2>{dashboard.completedAppointments}</h2>

                        </div>

                    </div>

                </div>

            </div>




        </div>
    </AdminLayout>

    );

}

export default AdminDashboard;
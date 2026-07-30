import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function ManageAppointments() {

    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/admin/appointments", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setAppointments(response.data);

        } catch (error) {
            console.error(error);

            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/admin/login");
            }
        }
    };

    const getBadge = (status) => {

        switch (status) {

            case "PENDING":
                return "badge bg-warning text-dark";

            case "APPROVED":
                return "badge bg-primary";

            case "COMPLETED":
                return "badge bg-success";

            case "REJECTED":
                return "badge bg-danger";

            default:
                return "badge bg-secondary";
        }
    };

    return (
        <div className="container mt-4">

            <h2 className="text-center mb-4">
                Manage Appointments
            </h2>

            <table className="table table-bordered table-striped">

                <thead className="table-dark">

                    <tr>
                        <th>ID</th>
                        <th>Student</th>
                        <th>Counsellor</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    {appointments.length > 0 ? (

                        appointments.map((appointment) => (

                            <tr key={appointment.appointmentId}>

                                <td>{appointment.appointmentId}</td>

                                <td>{appointment.studentName}</td>

                                <td>{appointment.counsellorName}</td>

                                <td>{appointment.appointmentDate}</td>

                                <td>{appointment.appointmentTime}</td>

                                <td>{appointment.reason}</td>

                                <td>
                                    <span className={getBadge(appointment.status)}>
                                        {appointment.status}
                                    </span>
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>
                            <td colSpan="7" className="text-center">
                                No Appointments Found
                            </td>
                        </tr>

                    )}

                </tbody>

            </table>

            <button
                className="btn btn-secondary"
                onClick={() => navigate("/admin/dashboard")}
            >
                Back
            </button>

        </div>
    );
}

export default ManageAppointments;
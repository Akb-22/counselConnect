import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function CounsellorAppointments() {

    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/counsellors/appointments",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setAppointments(response.data);

        } catch (error) {

            console.error(error);

            if (error.response?.status === 401) {

                localStorage.removeItem("token");
                navigate("/counsellor/login");

            }

        }

    };

    const approveAppointment = async (id) => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.put(
                `/counsellors/appointments/${id}/approve`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(response.data);

            fetchAppointments();

        } catch (error) {

            console.error(error);
            alert("Failed to approve appointment.");

        }

    };

    const completeAppointment = async (id) => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.put(
                `/counsellors/appointments/${id}/complete`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(response.data);

            fetchAppointments();

        } catch (error) {

            console.error(error);
            alert("Failed to complete appointment.");

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="text-center mb-4">
                Counsellor Appointments
            </h2>

            <div className="mb-3">

                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/counsellor/dashboard")}
                >
                    Back to Dashboard
                </button>

            </div>

            <table className="table table-bordered table-hover shadow">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>Student Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {appointments.length === 0 ? (

                        <tr>

                            <td colSpan="7" className="text-center">
                                No Appointments Found
                            </td>

                        </tr>

                    ) : (

                        appointments.map((appointment) => (

                            <tr key={appointment.appointmentId}>

                                <td>{appointment.appointmentId}</td>

                                <td>{appointment.studentName}</td>

                                <td>{appointment.appointmentDate}</td>

                                <td>{appointment.appointmentTime}</td>

                                <td>{appointment.reason}</td>

                                <td>

                                    {appointment.status === "PENDING" && (
                                        <span className="badge bg-warning text-dark">
                                            Pending
                                        </span>
                                    )}

                                    {appointment.status === "APPROVED" && (
                                        <span className="badge bg-primary">
                                            Approved
                                        </span>
                                    )}

                                    {appointment.status === "COMPLETED" && (
                                        <span className="badge bg-success">
                                            Completed
                                        </span>
                                    )}

                                </td>

                                <td>

                                    {appointment.status === "PENDING" && (
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() =>
                                                approveAppointment(appointment.appointmentId)
                                            }
                                        >
                                            Approve
                                        </button>
                                    )}

                                    {appointment.status === "APPROVED" && (
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() =>
                                                completeAppointment(appointment.appointmentId)
                                            }
                                        >
                                            Complete
                                        </button>
                                    )}

                                    {appointment.status === "COMPLETED" && (
                                        <span className="text-success fw-bold">
                                            No Action
                                        </span>
                                    )}

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default CounsellorAppointments;
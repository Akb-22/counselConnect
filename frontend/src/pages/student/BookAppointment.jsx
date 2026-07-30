import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function BookAppointment() {

    const navigate = useNavigate();

    const [counsellors, setCounsellors] = useState([]);

    const [appointment, setAppointment] = useState({
        counsellorId: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: ""
    });

    useEffect(() => {
        fetchCounsellors();
    }, []);

    const fetchCounsellors = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/students/counsellors",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);

            setCounsellors(response.data);

        } catch (error) {

            console.error(error);
            alert("Failed to load counsellors");
        }
    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setAppointment({
            ...appointment,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const response = await api.post(
                "/students/appointments",
                appointment,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(response.data);

            navigate("/student/my-appointments");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data ||
                "Failed to book appointment"
            );
        }
    };

    const selectedCounsellor = counsellors.find(
        (counsellor) =>
            counsellor.id == appointment.counsellorId
    );
return (
    <div className="container mt-4">

        <div className="card shadow p-4">

            <h2 className="text-center mb-4">
                Book Appointment
            </h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">

                    <label className="form-label">
                        Select Counsellor
                    </label>

                    <select
                        className="form-select"
                        name="counsellorId"
                        value={appointment.counsellorId}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select Counsellor
                        </option>

                        {counsellors.map((counsellor) => (
                           <option
                               key={counsellor.id}
                               value={counsellor.id}
                           >
                               {counsellor.fullName}
                           </option>
                        ))}

                    </select>

                    {selectedCounsellor && (

                        <div className="card border-primary shadow-sm mt-3">

                            <div className="card-body">

                                <h5 className="text-primary mb-3">
                                    Counsellor Details
                                </h5>

                                <div className="row">

                                    <div className="col-md-6">
<p>
                                       <strong>Name :</strong><br />
                                       {selectedCounsellor.fullName}
</p>
                                        <p>
                                            <strong>Email :</strong><br />
                                            {selectedCounsellor.email}
                                        </p>

                                        <p>
                                            <strong>Phone :</strong><br />
                                            {selectedCounsellor.phone}
                                        </p>

                                    </div>

                                    <div className="col-md-6">

                                        <p>
                                            <strong>Specialization :</strong><br />
                                            {selectedCounsellor.specialization}
                                        </p>

                                        <p>
                                            <strong>Experience :</strong><br />
                                            {selectedCounsellor.experience} Years
                                        </p>

                                        <p>
                                            <strong>Location :</strong><br />
                                            {selectedCounsellor.city}, {selectedCounsellor.state}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    )}

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Appointment Date
                    </label>

                    <input
                        type="date"
                        className="form-control"
                        name="appointmentDate"
                        value={appointment.appointmentDate}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Appointment Time
                    </label>

                    <input
                        type="time"
                        className="form-control"
                        name="appointmentTime"
                        value={appointment.appointmentTime}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Reason
                    </label>

                    <textarea
                        className="form-control"
                        rows="4"
                        name="reason"
                        value={appointment.reason}
                        onChange={handleChange}
                        required
                    />

                </div>

                <button
                    type="submit"
                    className="btn btn-success w-100"
                >
                    Book Appointment
                </button>

            </form>

        </div>

    </div>
);

}

export default BookAppointment;
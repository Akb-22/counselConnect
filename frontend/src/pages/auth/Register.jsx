import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Register() {

    const navigate = useNavigate();

    const [student, setStudent] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        category: ""
    });

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async () => {

        try {

            const response = await api.post(
                "/students/register",
                student
            );

            alert("Registration Successful!");

            navigate("/student/login");

        } catch (error) {

            console.error(error);

            if (error.response) {
                alert(
                    typeof error.response.data === "string"
                        ? error.response.data
                        : JSON.stringify(error.response.data)
                );
            } else {
                alert("Unable to connect to server.");
            }
        }
    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-header update-header text-center">
                            <h3 className="text-white">
                                Student Registeration
                            </h3>
                        </div>

                        <div className="card-body">

                            <div className="mb-3">
                                <label className="form-label">
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    value={student.firstName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    value={student.lastName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={student.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={student.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Phone Number
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={student.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Gender
                                </label>

                                <select
                                    className="form-select"
                                    name="gender"
                                    value={student.gender}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </select>

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Category
                                </label>

                                <select
                                    className="form-select"
                                    name="category"
                                    value={student.category}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Category</option>
                                    <option value="GENERAL">GENERAL</option>
                                    <option value="OBC">OBC</option>
                                    <option value="SC">SC</option>
                                    <option value="ST">ST</option>
                                    <option value="EWS">EWS</option>
                                </select>

                            </div>

                            <button
                                className="btn btn-primary w-100"
                                onClick={handleRegister}
                            >
                                Register
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Register;
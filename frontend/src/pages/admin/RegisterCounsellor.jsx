import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function RegisterCounsellor() {

    const navigate = useNavigate();

    const [counsellor, setCounsellor] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        specialization: "",
        phone: ""
    });

    const handleChange = (e) => {

        setCounsellor({
            ...counsellor,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "/counsellors/register",
                counsellor
            );

            alert(response.data);

            navigate("/admin/dashboard");

        } catch (error) {

            console.error(error);

            if (typeof error.response?.data === "string") {

                alert(error.response.data);

            } else {

                alert(error.response?.data?.message || "Registration Failed");

            }

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-8">

                    <div className="card shadow">

                      <div className="card-header update-header text-center">
                                          <h3 className="text-white">
                                             Register Counsellor
                                          </h3>
                                      </div>
                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label>First Name</label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="firstName"
                                            value={counsellor.firstName}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label>Last Name</label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="lastName"
                                            value={counsellor.lastName}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label>Email</label>

                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={counsellor.email}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label>Password</label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={counsellor.password}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label>Specialization</label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="specialization"
                                            value={counsellor.specialization}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label>Phone</label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phone"
                                            value={counsellor.phone}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                </div>

                                <div className="d-flex justify-content-between">

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate("/admin/dashboard")}
                                    >
                                        Back
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                    >
                                        Register Counsellor
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default RegisterCounsellor;
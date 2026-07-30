import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function CounsellorChangePassword() {

    const navigate = useNavigate();

    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {

        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (passwords.newPassword !== passwords.confirmPassword) {

            alert("New Password and Confirm Password do not match.");
            return;

        }

        try {

            const token = localStorage.getItem("token");

            const response = await api.put(
                "/counsellors/change-password",
                passwords,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(response.data);

            localStorage.removeItem("token");

            navigate("/counsellor/login");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data || "Failed to change password."
            );

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                         <div className="card-header update-header text-center">
                                                <h3 className="text-white">
                                                    Change password
                                                </h3>
                                            </div>
                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Current Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        name="currentPassword"
                                        value={passwords.currentPassword}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        New Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        name="newPassword"
                                        value={passwords.newPassword}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Confirm Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        name="confirmPassword"
                                        value={passwords.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="d-flex justify-content-between">

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate("/counsellor/dashboard")}
                                    >
                                        Back
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                    >
                                        Change Password
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

export default CounsellorChangePassword;
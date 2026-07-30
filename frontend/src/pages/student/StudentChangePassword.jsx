import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function StudentChangePassword() {

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
                "/students/change-password",
                passwords,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(
                typeof response.data === "string"
                    ? response.data
                    : response.data.message || "Password changed successfully."
            );

            localStorage.removeItem("token");

            navigate("/student/login");

        } catch (error) {

            console.error(error);

            console.log("Status:", error.response?.status);
            console.log("Data:", error.response?.data);

            const errorData = error.response?.data;

            if (typeof errorData === "string") {

                alert(errorData);

            } else if (errorData?.message) {

                alert(errorData.message);

            } else if (errorData?.error) {

                alert(errorData.error);

            } else if (errorData?.errors) {

                alert(Object.values(errorData.errors).join("\n"));

            } else {

                alert(JSON.stringify(errorData));

            }

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">
<div className="card-header update-header text-center">
                                                <h3 className="text-white">
                                                    Change password
                                                </h3>
                                            </div>
                    <div className="card shadow">


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
                                        onClick={() => navigate("/student/dashboard")}
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

export default StudentChangePassword;
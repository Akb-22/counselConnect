import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AdminLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        console.log("Email:", email);
        console.log("Password:", password);

        try {

            const response = await api.post("/admin/login", {
                email,
                password
            });

            console.log(response.data);

            localStorage.setItem("token", response.data);

            navigate("/admin/dashboard");

        } catch (error) {

            console.log(error.response);

            alert(error.response?.data || "Login Failed");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow">

                       <div className="card-header update-header text-center">
                           <h3 className="text-white">
                            Admin Login
                           </h3>
                       </div>
                        <div className="card-body">

                            <div className="mb-3">
                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button
                                className="btn btn-danger w-100"
                                onClick={handleLogin}
                            >
                                Login
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default AdminLogin;
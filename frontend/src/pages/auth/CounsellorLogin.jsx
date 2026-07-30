import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function CounsellorLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        try {

            const response = await api.post("/counsellors/login", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);

            alert(response.data.message);

            navigate("/counsellor/dashboard");

        } catch (error) {

            console.error(error);

            if (error.response) {
                alert(error.response.data.message || "Invalid Email or Password");
            } else {
                alert("Unable to connect to server.");
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow">

                   <div className="card-header update-header text-center">
                       <h3 className="text-white">
                           Counsellor Login
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
                                className="btn btn-success w-100"
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

export default CounsellorLogin;
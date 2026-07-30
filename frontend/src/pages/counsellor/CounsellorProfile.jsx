import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function CounsellorProfile() {

    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/counsellors/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setProfile(response.data);

        } catch (error) {

            console.error(error);

            if (error.response?.status === 401) {

                localStorage.removeItem("token");
                navigate("/counsellor/login");

            }

        }

    };

    if (!profile) {
        return <h3 className="text-center mt-5">Loading...</h3>;
    }

    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-header update-header text-center">
                         <h3 className="text-white">
                             Counsellor Profile
                         </h3>
                     </div>

                <div className="card-body">

                    <table className="table table-bordered">

                        <tbody>

                            <tr>
                                <th>First Name</th>
                                <td>{profile.firstName}</td>
                            </tr>

                            <tr>
                                <th>Last Name</th>
                                <td>{profile.lastName}</td>
                            </tr>

                            <tr>
                                <th>Email</th>
                                <td>{profile.email}</td>
                            </tr>

                            <tr>
                                <th>Phone</th>
                                <td>{profile.phone}</td>
                            </tr>

                            <tr>
                                <th>Specialization</th>
                                <td>{profile.specialization}</td>
                            </tr>

                            <tr>
                                <th>Experience</th>
                                <td>{profile.experience} Years</td>
                            </tr>

                            <tr>
                                <th>Address</th>
                                <td>{profile.address}</td>
                            </tr>

                            <tr>
                                <th>City</th>
                                <td>{profile.city}</td>
                            </tr>

                            <tr>
                                <th>State</th>
                                <td>{profile.state}</td>
                            </tr>

                            <tr>
                                <th>Pincode</th>
                                <td>{profile.pincode}</td>
                            </tr>

                        </tbody>

                    </table>

                    <div className="d-flex justify-content-between">

                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate("/counsellor/dashboard")}
                        >
                            Back
                        </button>

                        <button
                            className="btn btn-warning"
                            onClick={() => navigate("/counsellor/update-profile")}
                        >
                            Update Profile
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CounsellorProfile;
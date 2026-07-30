import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function UpdateCounsellorProfile() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        specialization: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        experience: ""
    });

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

            setProfile({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                specialization: response.data.specialization,
                phone: response.data.phone,
                address: response.data.address,
                city: response.data.city,
                state: response.data.state,
                pincode: response.data.pincode,
                experience: response.data.experience
            });

        } catch (error) {

            console.error(error);

            if (error.response?.status === 401) {

                localStorage.removeItem("token");
                navigate("/counsellor/login");

            }

        }

    };

    const handleChange = (e) => {

        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const response = await api.put(
                "/counsellors/profile",
                profile,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(response.data);

            navigate("/counsellor/profile");

        } catch (error) {

            console.error(error);

            alert("Failed to update profile.");

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">
                  <div className="card-header update-header text-center">
                                         <h3 className="text-white">
                                            Update Counsellor Profile
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
                                    value={profile.firstName}
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
                                    value={profile.lastName}
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
                                    value={profile.specialization}
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
                                    value={profile.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-12 mb-3">
                                <label>Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    value={profile.address}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label>City</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="city"
                                    value={profile.city}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label>State</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="state"
                                    value={profile.state}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label>Pincode</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="pincode"
                                    value={profile.pincode}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label>Experience (Years)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="experience"
                                    value={profile.experience}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>

                        <div className="d-flex justify-content-between">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate("/counsellor/profile")}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-success"
                            >
                                Update Profile
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default UpdateCounsellorProfile;
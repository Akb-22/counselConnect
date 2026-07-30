import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function UpdateProfile() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        phone: "",
        dateOfBirth: "",
        address: "",
        city: "",
        state: "",
        pincode: "",

        parentName: "",
        parentPhone: "",

        jeeApplicationNumber: "",
        jeePercentile: "",
        allIndiaRank: "",
        categoryRank: "",

        class12Percentage: "",
        passingYear: "",

        pwd: false,

        homeState: "",
        stateOfEligibility: ""

    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/students/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setFormData({

                phone: response.data.phone || "",
                dateOfBirth: response.data.dateOfBirth || "",
                address: response.data.address || "",
                city: response.data.city || "",
                state: response.data.state || "",
                pincode: response.data.pincode || "",

                parentName: response.data.parentName || "",
                parentPhone: response.data.parentPhone || "",

                jeeApplicationNumber:
                    response.data.jeeApplicationNumber || "",

                jeePercentile:
                    response.data.jeePercentile || "",

                allIndiaRank:
                    response.data.allIndiaRank || "",

                categoryRank:
                    response.data.categoryRank || "",

                class12Percentage:
                    response.data.class12Percentage || "",

                passingYear:
                    response.data.passingYear || "",

                pwd:
                    response.data.pwd ?? false,

                homeState:
                    response.data.homeState || "",

                stateOfEligibility:
                    response.data.stateOfEligibility || ""

            });

        } catch (error) {

            console.error(error);

            if (error.response?.status === 401) {

                localStorage.removeItem("token");

                navigate("/student/login");

            }

        }

    };

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData({

            ...formData,

            [name]:
                type === "checkbox"
                    ? checked
                    : value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await api.put(

                "/students/profile",

                formData,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            alert("Profile Updated Successfully");

            navigate("/student/profile");

        } catch (error) {

            console.error(error);

            alert("Failed to update profile");

        }

    };
    return (
        <div className="container mt-4 mb-5">

            <div className="card shadow">

         <div className="card-header update-header text-center">
             <h3 className="text-white">
                 Update Student Profile
             </h3>
         </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Date of Birth</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-12 mb-3">
                                <label className="form-label">Address</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label className="form-label">City</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label className="form-label">State</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label className="form-label">Pincode</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Parent Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="parentName"
                                    value={formData.parentName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Parent Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="parentPhone"
                                    value={formData.parentPhone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">JEE Application Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="jeeApplicationNumber"
                                    value={formData.jeeApplicationNumber}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">JEE Percentile</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="jeePercentile"
                                    value={formData.jeePercentile}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">All India Rank</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="allIndiaRank"
                                    value={formData.allIndiaRank}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Category Rank</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="categoryRank"
                                    value={formData.categoryRank}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Class 12 Percentage</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="class12Percentage"
                                    value={formData.class12Percentage}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Passing Year</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="passingYear"
                                    value={formData.passingYear}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Home State</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="homeState"
                                    value={formData.homeState}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">State Of Eligibility</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="stateOfEligibility"
                                    value={formData.stateOfEligibility}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-12 mb-4">

                                <div className="form-check">

                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="pwd"
                                        checked={formData.pwd}
                                        onChange={handleChange}
                                    />

                                    <label className="form-check-label">
                                        PwD Candidate
                                    </label>

                                </div>

                            </div>

                        </div>

                        <div className="text-center">

                            <button
                                type="submit"
                                className="btn btn-success me-3"
                            >
                                Update Profile
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate("/student/profile")}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );

}

export default UpdateProfile;
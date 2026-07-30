import { useEffect, useState } from "react";
import api from "../../services/api";

function ManageCounsellors() {

    const [counsellors, setCounsellors] = useState([]);

    useEffect(() => {
        fetchCounsellors();
    }, []);

    const fetchCounsellors = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/admin/counsellors", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setCounsellors(response.data);

        } catch (error) {

            console.error(error);
            alert("Failed to load counsellors.");
        }
    };

    const deleteCounsellor = async (id) => {

        if (!window.confirm("Delete this counsellor?")) return;

        try {

            const token = localStorage.getItem("token");

            const response = await api.delete(`/admin/counsellors/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert(response.data);

            fetchCounsellors();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to delete counsellor."
            );
        }
    };

    return (
        <div className="container mt-4">

            <h2 className="mb-4">Manage Counsellors</h2>

            <table className="table table-bordered table-hover">

             <thead className="table-dark">
                 <tr>
                     <th>ID</th>

                     <th> Name</th>
                     <th>Email</th>
                     <th>Phone</th>
                     <th>Specialization</th>
                     <th>City</th>
                     <th>State</th>
                     <th>Experience</th>
                     <th>Action</th>

                 </tr>
             </thead>
                <tbody>

                    {counsellors.map(counsellor => (

                        <tr key={counsellor.id}>
<td>{counsellor.id}</td>
    <td>{counsellor.firstName} {counsellor.lastName}</td>
    <td>{counsellor.email}</td>
    <td>{counsellor.phone}</td>
    <td>{counsellor.specialization}</td>
    <td>{counsellor.city}</td>
    <td>{counsellor.state}</td>
    <td>{counsellor.experience} Years</td>

                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteCounsellor(counsellor.id)}
                                >
                                    Delete
                                </button>
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default ManageCounsellors;
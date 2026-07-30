import { useEffect, useState } from "react";
import api from "../../services/api";

function ManageColleges() {

    const [colleges, setColleges] = useState([]);

    useEffect(() => {
        fetchColleges();
    }, []);

    const fetchColleges = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/admin/colleges", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setColleges(response.data);

        } catch (error) {

            console.error(error);
            alert("Failed to load colleges.");
        }
    };

    const deleteCollege = async (id) => {

        if (!window.confirm("Delete this college?")) return;

        try {

            const token = localStorage.getItem("token");

            const response = await api.delete(`/admin/colleges/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert(response.data);

            fetchColleges();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to delete college."
            );
        }
    };

    return (
        <div className="container mt-4">

            <h2 className="mb-4">Manage Colleges</h2>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>College Name</th>
                        <th>NirfRanking</th>
                        <th>Courses</th>
                        <th>Action</th>

                    </tr>
                </thead>

                <tbody>

                    {colleges.map((college) => (

                        <tr key={college.id}>

                           <td>{college.city}, {college.state}</td>
                           <td>{college.collegeType}</td>
                           <td>{college.nirfRanking}</td>
                           <td>{college.website}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteCollege(college.id)}
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

export default ManageColleges;
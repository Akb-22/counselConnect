import { useEffect, useState } from "react";
import api from "../../services/api";

function ManageStudents() {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/admin/students", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setStudents(response.data);

        } catch (error) {
            console.error(error);
            alert("Failed to load students.");
        }
    };

    const deleteStudent = async (id) => {

        if (!window.confirm("Delete this student?")) return;

        try {

            const token = localStorage.getItem("token");

            const response = await api.delete(`/admin/students/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert(response.data);

            fetchStudents();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to delete student."
            );
        }
    };

    return (
        <div className="container mt-4">

            <h2 className="mb-4">Manage Students</h2>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Category</th>
                        <th>Action</th>

                    </tr>
                </thead>

                <tbody>

                    {students.map(student => (

                        <tr key={student.id}>
                         <td>{student.id}</td>
                         <td>{student.firstName} {student.lastName}</td>
                         <td>{student.email}</td>
                         <td>{student.phone}</td>
                         <td>{student.category}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteStudent(student.id)}
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

export default ManageStudents;
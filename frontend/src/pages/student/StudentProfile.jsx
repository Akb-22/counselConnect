import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function StudentProfile() {

  const [student, setStudent] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {

      const token = localStorage.getItem("token");

      const response = await api.get("/students/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudent(response.data);

    } catch (error) {

      console.error(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  if (!student) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="container mt-4">

      <div className="card shadow">

     <div className="card-header update-header text-center">
         <h3 className="text-white">
             Student Profile
         </h3>
     </div>
        <div className="card-body">

          <div className="row">

            <div className="col-md-6">
              <p><strong>First Name :</strong> {student.firstName}</p>
              <p><strong>Last Name :</strong> {student.lastName}</p>
              <p><strong>Email :</strong> {student.email}</p>
              <p><strong>Phone :</strong> {student.phone}</p>
              <p><strong>Gender :</strong> {student.gender}</p>
              <p><strong>Category :</strong> {student.category}</p>
              <p><strong>Date of Birth :</strong> {student.dateOfBirth}</p>
              <p><strong>Role :</strong> {student.role}</p>
            </div>

            <div className="col-md-6">
              <p><strong>Parent Name :</strong> {student.parentName}</p>
              <p><strong>Parent Phone :</strong> {student.parentPhone}</p>
              <p><strong>JEE Application No :</strong> {student.jeeApplicationNumber}</p>
              <p><strong>JEE Percentile :</strong> {student.jeePercentile}</p>
              <p><strong>All India Rank :</strong> {student.allIndiaRank}</p>
              <p><strong>Category Rank :</strong> {student.categoryRank}</p>
              <p><strong>Class 12 Percentage :</strong> {student.class12Percentage}</p>
              <p><strong>Passing Year :</strong> {student.passingYear}</p>
            </div>

          </div>

          <hr />

          <h5>Address Details</h5>

          <p><strong>Address :</strong> {student.address}</p>
          <p><strong>City :</strong> {student.city}</p>
          <p><strong>State :</strong> {student.state}</p>
          <p><strong>Pincode :</strong> {student.pincode}</p>
          <p><strong>Home State :</strong> {student.homeState}</p>
          <p><strong>State of Eligibility :</strong> {student.stateOfEligibility}</p>
          <p><strong>PWD :</strong> {student.pwd ? "Yes" : "No"}</p>

        </div>

      </div>

    </div>
  );
}

export default StudentProfile;
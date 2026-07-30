import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function MyAppointments() {

    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/appointments/student",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setAppointments(response.data);

        } catch (error) {

            console.error(error);

            if (error.response?.status === 401) {

                localStorage.removeItem("token");
                navigate("/login");

            }

        }

    };

   return (

       <div className="container mt-4">

             <div className=" text-center mb-4 card-header bg-warning">
                               <h2>My Appointments</h2>
                           </div>

           <table className="table table-bordered table-striped">

               <thead className="table-dark">

                   <tr>

                       <th>ID</th>
                       <th>Counsellor</th>
                       <th>Date</th>
                       <th>Time</th>
                       <th>Reason</th>
                       <th>Status</th>

                   </tr>

               </thead>

               <tbody>

                   {appointments.map((appointment) => (

                       <tr key={appointment.appointmentId}>

                           <td>{appointment.appointmentId}</td>

                           <td>{appointment.counsellorName}</td>

                           <td>{appointment.appointmentDate}</td>

                           <td>{appointment.appointmentTime}</td>

                           <td>{appointment.reason}</td>

                           <td>{appointment.status}</td>

                       </tr>

                   ))}

               </tbody>

           </table>

       </div>

   );
}

export default MyAppointments;
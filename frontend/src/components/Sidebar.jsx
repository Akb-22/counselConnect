import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/admin/login");

    };

    return (

        <div className="sidebar">

          <div className="logo">
              <i className="bi bi-mortarboard-fill"></i>
              <h4>CounselConnect</h4>
              <small>Admin Panel</small>
          </div>
            <NavLink to="/admin/dashboard">

                <i className="bi bi-speedometer2"></i>

                Dashboard

            </NavLink>

            <NavLink to="/admin/students">

                <i className="bi bi-people-fill"></i>

                Students

            </NavLink>

            <NavLink to="/admin/counsellors">

                <i className="bi bi-person-workspace"></i>

                Counsellors

            </NavLink>

            <NavLink to="/admin/colleges">

                <i className="bi bi-building-fill"></i>

                Colleges

            </NavLink>

            <NavLink to="/admin/appointments">

                <i className="bi bi-calendar-check-fill"></i>

                Appointments

            </NavLink>

            <NavLink to="/admin/register-counsellor">

                <i className="bi bi-person-plus-fill"></i>

                Register Counsellor

            </NavLink>

            <button
                className="logout"
                onClick={logout}
            >

                <i className="bi bi-box-arrow-right"></i>

                Logout

            </button>

        </div>

    );

}

export default Sidebar;
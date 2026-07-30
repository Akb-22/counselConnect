import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./AdminLayout.css";

function AdminLayout({ children }) {
    return (
        <div className="admin-wrapper">

            <Sidebar />

            <div className="main-section">

                <Topbar />

                <div className="page-content">

                    {children}

                </div>

            </div>

        </div>
    );
}

export default AdminLayout;
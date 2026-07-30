function Topbar() {

    return (

        <div className="topbar">

            <div>
                <h4 className="mb-0">Dashboard</h4>
                <small className="text-muted">
                    Welcome back, Admin 👋
                </small>
            </div>

            <div className="d-flex align-items-center gap-3">

                <i className="bi bi-bell-fill fs-5"></i>

                <i className="bi bi-person-circle fs-4"></i>

            </div>

        </div>

    );

}

export default Topbar;
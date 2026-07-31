import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StudentLogin from "./pages/auth/StudentLogin";
import ManageAppointments from "./pages/admin/ManageAppointments";
import UpdateStudentProfile from "./pages/student/UpdateProfile";
import CounsellorLogin from "./pages/auth/CounsellorLogin";
import AdminLogin from "./pages/auth/AdminLogin";
import BookAppointment from "./pages/student/BookAppointment";
import CounsellorAppointments from "./pages/counsellor/CounsellorAppointments";
import MyAppointments from "./pages/student/MyAppointments";
import ManageColleges from "./pages/admin/ManageColleges";
import Register from "./pages/auth/Register";
import AIChat from "./components/AIChat";
import ProtectedRoute from "./routes/ProtectedRoute";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import ManageStudents from "./pages/admin/ManageStudents";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CounsellorDashboard from "./pages/counsellor/CounsellorDashboard";
import ManageCounsellors from "./pages/admin/ManageCounsellors";
import CounsellorProfile from "./pages/counsellor/CounsellorProfile";
import UpdateCounsellorProfile from "./pages/counsellor/UpdateCounsellorProfile";
import CounsellorChangePassword from "./pages/counsellor/CounsellorChangePassword";
import StudentChangePassword from "./pages/student/StudentChangePassword";
import RegisterCounsellor from "./pages/admin/RegisterCounsellor";
import CutoffPrediction from "./pages/student/CutoffPrediction";

import DocumentUpload from "./pages/DocumentUpload";

function Home() {
  return (
    <>
      {/* ================= NAVBAR ================= */}

      <nav className="navbar navbar-expand-lg sticky-top">
        <div className="container">

          <Link className="navbar-brand" to="/">
            🎓 Counsel<span style={{ color: "#FFD54A" }}>Connect</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto">

              <li className="nav-item">
                <a className="nav-link" href="#features">
                  Features
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#portals">
                  Portals
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#stats">
                  Statistics
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#ai">
                  AI Assistant
                </a>
              </li>

            </ul>
          </div>

        </div>
      </nav>

      {/* ================= HERO ================= */}

      <section className="hero-section">

        <div className="container">

          <div className="glass">

            <h1 className="main-title">
              Counsel<span>Connect</span>
            </h1>

            <h3 className="sub-title">
              Smart JEE Counselling Management System
            </h3>

            <p className="hero-text">

              Empowering students with
              AI-powered counselling,
              college prediction,
              appointment booking,
              and expert career guidance.

            </p>

            <div className="d-flex justify-content-center flex-wrap gap-3 mt-5">

              <Link
                to="/student/login"
                className="btn btn-primary btn-lg"
              >
                Student Login
              </Link>

              <Link
                to="/student/register"
                className="btn btn-primary btn-lg"
              >
                Register
              </Link>

              <Link
                to="/counsellor/login"
                className="btn btn-warning btn-lg"
              >
                Counsellor Login
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section
        id="features"
        className="py-5"
      >

        <div className="container">

          <div className="text-center mb-5">

            <h2 className="section-title">
              Why Choose CounselConnect?
            </h2>

            <p className="section-subtitle">
              One platform for students,
              counsellors and administrators
              to simplify the entire
              JEE counselling process.
            </p>

          </div>

          <div className="row g-4">

            <div className="col-lg-4">

              <div className="card h-100 text-center">

                <div className="card-body">

                  <i className="bi bi-robot"></i>

                  <h4>AI Guidance</h4>

                  <p>

                    Get instant answers about
                    JEE counselling,
                    colleges,
                    JoSAA,
                    CSAB
                    and admissions.

                  </p>

                </div>

              </div>

            </div>

            <div className="col-lg-4">

              <div className="card h-100 text-center">

                <div className="card-body">

                  <i className="bi bi-building"></i>

                  <h4>College Prediction</h4>

                  <p>

                    Discover the most suitable
                    engineering colleges
                    based on your rank
                    and preferences.

                  </p>

                </div>

              </div>

            </div>

            <div className="col-lg-4">

              <div className="card h-100 text-center">

                <div className="card-body">

                  <i className="bi bi-shield-lock"></i>

                  <h4>Secure Platform</h4>

                  <p>

                    Dedicated portals
                    for Students,
                    Counsellors
                    and Administrators.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
      {/* ================= PORTALS ================= */}

      <section id="portals" className="portal-section">

        <div className="container">

          <div className="text-center mb-5">

            <h2 className="section-title">
              Access Your Portal
            </h2>

            <p className="section-subtitle">
              Choose your role and continue.
            </p>

          </div>

          <div className="row g-4">

            {/* Student */}

            <div className="col-lg-4">

              <div className="card h-100 text-center">

                <div className="card-body">

                  <div className="display-3 mb-3">🎓</div>

                  <h3>Student Portal</h3>

                  <p>
                    Register, explore colleges,
                    book counselling appointments,
                    and chat with CounselConnect AI.
                  </p>

                  <div className="d-flex justify-content-center gap-3 mt-4">

                    <Link
                      to="/student/login"
                      className="btn btn-primary px-4"
                    >
                      Login
                    </Link>

                    <Link
                      to="/student/register"
                      className="btn btn-primary px-4"
                    >
                      Register
                    </Link>

                  </div>

                </div>

              </div>

            </div>

            {/* Counsellor */}

            <div className="col-lg-4">

              <div className="card h-100 text-center">

                <div className="card-body">

                  <div className="display-3 mb-3">👨‍🏫</div>

                  <h3>Counsellor Portal</h3>

                  <p>
                    Manage appointments,
                    guide students,
                    and monitor counselling sessions.
                  </p>

                  <div className="mt-4">

                    <Link
                      to="/counsellor/login"
                      className="btn btn-success px-4"
                    >
                      Login
                    </Link>

                  </div>

                </div>

              </div>

            </div>

            {/* Admin */}

            <div className="col-lg-4">

              <div className="card h-100 text-center">

                <div className="card-body">

                  <div className="display-3 mb-3">🛡️</div>

                  <h3>Administrator</h3>

                  <p>
                    Manage colleges,
                    counsellors,
                    students,
                    and the complete system.
                  </p>

                  <div className="mt-4">

                    <Link
                      to="/admin/login"
                      className="btn btn-danger px-4"
                    >
                      Login
                    </Link>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= STATISTICS ================= */}

      <section id="stats" className="stats py-5">

        <div className="container">

          <div className="row text-center g-4">

            <div className="col-md-3">

              <div className="stat-box">

                <h1>500+</h1>

                <h5>Students</h5>

              </div>

            </div>

            <div className="col-md-3">

              <div className="stat-box">

                <h1>100+</h1>

                <h5>Engineering Colleges</h5>

              </div>

            </div>

            <div className="col-md-3">

              <div className="stat-box">

                <h1>50+</h1>

                <h5>Expert Counsellors</h5>

              </div>

            </div>

            <div className="col-md-3">

              <div className="stat-box">

                <h1>24×7</h1>

                <h5>AI Support</h5>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= AI SECTION ================= */}

      <section id="ai" className="ai-section">

        <div className="container text-center">

          <h2 className="fw-bold mb-4">
            🤖 Meet CounselConnect AI
          </h2>

          <p className="lead">

            Your intelligent counselling assistant
            for JEE Main, JoSAA, CSAB,
            college prediction,
            admission guidance,
            and career planning.

          </p>

          <div className="row mt-5 g-4">

            <div className="col-md-3">
              <div className="card h-100">
                <div className="card-body">
                  📚
                  <h5 className="mt-3" style={{ color: "#0c3d34" }}>JEE Main</h5>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card h-100">
                <div className="card-body">
                  🏫
                  <h5 className="mt-3" style={{ color: "#0c3d34" }}>JoSAA</h5>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card h-100">
                <div className="card-body">
                  🎯
                  <h5 className="mt-3" style={{ color: "#0c3d34" }}>CSAB</h5>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card h-100">
                <div className="card-body">
                  💼
                  <h5 className="mt-3" style={{ color: "#0c3d34" }}>Career Guidance</h5>
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>
      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="container text-center">

          <h3 className="mb-3">
            🎓 CounselConnect
          </h3>

          <p>
            Smart JEE Counselling Management System
          </p>

          <hr />

          <small>

            © 2026 CounselConnect •
            Built with React, Spring Boot,
            MySQL & Gemini AI

          </small>
          <div>
           <span
             className="px-3 py-1 rounded-pill"
             style={{
               border: "1px solid #FFD700",
               color: "#FFD700",
               fontSize: "0.8rem",
               fontWeight: "600"
             }}
           >
             CounselConnect™ • Built by Akansha
           </span></div>


        </div>

      </footer>

    </>
  );
}
function App() {
  return (
    <BrowserRouter>
<Routes>

  <Route path="/" element={<Home />} />

 <Route path="/student/login" element={<StudentLogin />} />

 <Route path="/counsellor/login" element={<CounsellorLogin />} />

 <Route path="/admin/login" element={<AdminLogin />} />
<Route path="/student/register" element={<Register />} />
<Route
    path="/student/book-appointment"
    element={
        <ProtectedRoute>
            <BookAppointment />
        </ProtectedRoute>
    }
/>

  <Route
    path="/student/dashboard"
    element={
      <ProtectedRoute>
        <StudentDashboard />
      </ProtectedRoute>
    }
  />
  <Route
      path="/counsellor/update-profile"
      element={
          <ProtectedRoute>
              <UpdateCounsellorProfile />
          </ProtectedRoute>
      }
  />
  <Route
      path="/student/profile"
      element={
          <ProtectedRoute>
              <StudentProfile />
          </ProtectedRoute>
      }
  />
  <Route
      path="/admin/dashboard"
      element={
          <ProtectedRoute>
              <AdminDashboard />
          </ProtectedRoute>
      }
  />
  <Route
      path="/counsellor/change-password"
      element={
          <ProtectedRoute>
              <CounsellorChangePassword />
          </ProtectedRoute>
      }
  />
  <Route
      path="/counsellor/dashboard"
      element={
          <ProtectedRoute>
              <CounsellorDashboard />
          </ProtectedRoute>
      }
  />
  <Route
      path="/admin/students"
      element={
          <ProtectedRoute>
              <ManageStudents />
          </ProtectedRoute>
      }
  />
  <Route
      path="/admin/counsellors"
      element={
          <ProtectedRoute>
              <ManageCounsellors />
          </ProtectedRoute>
      }
  />
  <Route
      path="/admin/colleges"
      element={
          <ProtectedRoute>
              <ManageColleges />
          </ProtectedRoute>
      }
  />
<Route
    path="/student/book-appointment"
    element={
        <ProtectedRoute>
            <BookAppointment />
        </ProtectedRoute>
    }
/>
<Route
    path="/admin/appointments"
    element={
        <ProtectedRoute>
            <ManageAppointments />
        </ProtectedRoute>
    }
/>
<Route
    path="/counsellor/appointments"
    element={
        <ProtectedRoute>
            <CounsellorAppointments />
        </ProtectedRoute>
    }
/>

<Route
    path="/student/my-appointments"
    element={
        <ProtectedRoute>
            <MyAppointments />
        </ProtectedRoute>
    }
/>
<Route
    path="/counsellor/profile"
    element={
        <ProtectedRoute>
            <CounsellorProfile />
        </ProtectedRoute>
    }
/>
<Route
    path="/admin/register-counsellor"
    element={
        <ProtectedRoute>
            <RegisterCounsellor />
        </ProtectedRoute>
    }
/>
<Route
    path="/student/change-password"
    element={
        <ProtectedRoute>
            <StudentChangePassword />
        </ProtectedRoute>
    }
/>
<Route
  path="/student/update-profile"
  element={
    <ProtectedRoute>
      <UpdateStudentProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="/student/cutoff-prediction"
  element={
    <ProtectedRoute>
      <CutoffPrediction />
    </ProtectedRoute>
  }
/>
<Route
  path="/student/upload-documents"
  element={<DocumentUpload />}
/>
</Routes>


  <AIChat />
    </BrowserRouter>
  );
}

export default App;
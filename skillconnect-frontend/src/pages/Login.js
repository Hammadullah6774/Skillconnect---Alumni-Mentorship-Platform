import React from 'react';
import '../assets/style.css'; // This tells React where your CSS is

function Login() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light-blue">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg p-4 login-card">
              <div className="card-body">
                <h2 className="card-title text-center text-primary mb-4">SkillConnect Login</h2>
                <form id="loginForm">
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" placeholder="name@example.com" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="Enter your password" required />
                  </div>
                  <div className="mb-4">
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="userType" id="alumniRadio" defaultChecked />
                      <label className="form-check-label" htmlFor="alumniRadio">Login as Alumni</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="userType" id="studentRadio" />
                      <label className="form-check-label" htmlFor="studentRadio">Login as Student</label>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 btn-lg">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
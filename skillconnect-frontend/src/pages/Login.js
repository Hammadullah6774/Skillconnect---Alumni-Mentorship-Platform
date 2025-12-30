import React, { useState } from 'react';
import '../assets/style.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        alert("Login Successful! Welcome to SkillConnect.");
        // This will move the user to the dashboard page
        window.location.href = "/dashboard"; 
      } else {
        alert(data.message || "Invalid Email or Password!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Cannot connect to server. Did you start node server.js?");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light-blue">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg p-4 login-card">
              <div className="card-body">
                <h2 className="card-title text-center text-primary mb-4">SkillConnect Login</h2>
                
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="name@example.com" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      placeholder="Enter your password" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
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
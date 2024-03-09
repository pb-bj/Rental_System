import { Link } from "react-router-dom";
import { Button } from "../components";
import { useState } from "react";

const Register = () => {
  const [ fullname, setFullname ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');

  // const handleSubmit (e) => {
      
  // }
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="text-center">
          <h3>Sign Up</h3>
          <p>
            Already have an account?{" "}
            <Link className="text-black fw-bold text-decoration-none" to="/login">
              Login
            </Link>
          </p>
        </div>
        <form className="w-25" >
          <div className="mb-3">
            <label className="form-label">
              <b>Fullname</b>
            </label>
            <input
              type="text"
              className="form-control shadow-none"
              placeholder="Fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value) }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <b>Email</b>
            </label>
            <input
              type="email"
              className="form-control shadow-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value) }
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">
              <b>Password</b>
            </label>
            <input
              type="password"
              className="form-control shadow-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value) }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              <b>Confirm Password</b>
            </label>
            <input
              type="password"
              className="form-control shadow-none"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value) }
            />
          </div>

          <div className="d-grid gap-2 col-12 mx-auto">
          <Button title="Register" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;

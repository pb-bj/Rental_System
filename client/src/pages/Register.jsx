import { Link } from "react-router-dom";
import { Button } from "../components";

const Register = () => {
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
        <form className="w-25">
          <div className="mb-3">
            <label className="form-label">
              <b>Fullname</b>
            </label>
            <input
              type="text"
              className="form-control shadow-none"
              placeholder="Fullname"
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

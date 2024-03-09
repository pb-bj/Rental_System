import { Link } from "react-router-dom";
import { Button } from "../components";

const Login = () => {
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="text-center">
          <h3>Login</h3>
          <p>
            Dont have an account?{" "}
            <Link
              to="/register"
              className="text-black fw-bold text-decoration-none"
            >
              Sign In
            </Link>
          </p>
        </div>
        <form className="w-25">
          <div className="mb-3">
            <label className="form-label">
              <b>Email</b>
            </label>
            <input
              type="email"
              className="form-control shadow-none"
              placeholder="abc@gmail.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              <b>Password</b>
            </label>
            <input
              type="password"
              className="form-control shadow-none"
              autoComplete="off"
            />
          </div>

          <div className="d-grid gap-2 col-12 mx-auto">
            <Button title="Login" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

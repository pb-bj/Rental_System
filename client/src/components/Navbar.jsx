import { Link } from "react-router-dom";
import { Button } from "./index";

const Navbar = () => {
  return (
    <>
      <nav className="navbar bg-body-tertiary position-fixed w-100 top-0">
        <div className="container">
          <Link to="/" className="navbar-brand"><b>
            Rental <span style={{ color: "#8134A6" }}>Hub</span></b>
          </Link>
          <form className="d-flex">
            <Link to="/login">
              <Button title="Sign In" />
            </Link>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

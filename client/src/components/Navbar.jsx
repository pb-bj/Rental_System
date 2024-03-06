import { Link } from "react-router-dom";
import { Button } from "./index";

const Navbar = () => {
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand"><b>
            Rental<span style={{color: "#8134A6"}}>X</span></b>
          </Link>
          <form className="d-flex">
            <Button title="Sign In"/>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

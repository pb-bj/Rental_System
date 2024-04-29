import { Link } from "react-router-dom";
import { Button, UserDropDown } from "./index";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { authData } = useAuth();

  return (
    <>
      <nav className="navbar bg-body-tertiary position-fixed w-100 top-0">
        <div className="container">
          <Link to="/" className="navbar-brand"><b>
            Rental <span style={{ color: "#8134A6" }}>Hub</span></b>
          </Link>
          <form className="d-flex">
            {authData?.fullname ? (
              <span style={{ cursor: 'pointer' }} onClick={() => setShowUserMenu(!showUserMenu)}>
                <i className="bi bi-person-circle"></i>{" "}
                {authData?.fullname}
                <i className="bi bi-caret-down-fill" ></i>
              </span>
            ) :
              <Link to="/login">
                <Button title="Sign In" />
              </Link>
            }
          </form>
        </div>
      </nav>
      {showUserMenu && <UserDropDown onClose={setShowUserMenu} />}
    </>
  );
};

export default Navbar;

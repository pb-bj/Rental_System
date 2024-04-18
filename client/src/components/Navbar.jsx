import { Link } from "react-router-dom";
import { Button, UserDropDown } from "./index";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { userData } = useAuth();
  return (
    <>
      <nav className="navbar bg-body-tertiary position-fixed w-100 top-0">
        <div className="container">
          <Link to="/" className="navbar-brand"><b>
            Rental <span style={{ color: "#8134A6" }}>Hub</span></b>
          </Link>
          <form className="d-flex">
            {userData.fullname ? (
              <span>
                {userData.fullname}
                <i className="bi bi-caret-down-fill" style={{ cursor: 'pointer' }} onClick={() => setShowUserMenu(!showUserMenu)}></i>
              </span>
            ) :
              <Link to="/login">
                <Button title="Sign In" />
              </Link>
            }
          </form>
        </div>
      </nav>
      {showUserMenu && <UserDropDown />}
    </>
  );
};

export default Navbar;

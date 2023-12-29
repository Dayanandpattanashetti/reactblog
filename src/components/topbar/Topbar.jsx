import React, { useContext } from "react";
import "./topbar.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

function Topbar() {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const PF = "https://mernblog.onrender.com/images/";
  const handleClick = (path) => {
    window.location.replace(path);
  };

  return (
    <nav className="top navbar navbar-expand-lg bg-body-tertiary px-lg-5 px-3">
      <div className="container-fluid ">
        <Link to="/" className="navbar-brand">
          <span className="logo">VersaBlog Central</span>
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav justify-content-center me-auto mb-2 mb-lg-0">
            {user && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarText"
                  onClick={() => handleClick("/")}
                >
                  HOME
                </Link>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  onClick={() => handleClick("/write")}
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarText"
                >
                  WRITE
                </Link>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  onClick={() => handleClick("/settings")}
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarText"
                >
                  PROFILE
                </Link>
              </li>
            )}
            {user && (
              <li
                className="nav-link nav-item logout "
                aria-current="page"
                onClick={handleLogout}
                data-bs-toggle="collapse"
                data-bs-target="#navbarText"
              >
                LOGOUT
              </li>
            )}
            {!user && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  onClick={() => handleClick("/login")}
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarText"
                >
                  LOGIN
                </Link>
              </li>
            )}
            {!user && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  onClick={() => handleClick("/register")}
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarText"
                >
                  REGISTER
                </Link>
              </li>
            )}
          </ul>
          <span class="navbar-text">
            {user ? (
              <Link to="/settings">
                <img
                  className="topImg"
                  src={user.profilePic ? PF + user.profilePic : PF + "user.png"}
                  alt=""
                />
              </Link>
            ) : (
              ""
            )}
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;

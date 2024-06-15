import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../context/tokenContext";

function Navbar() {
  let { userToken, setUserToken } = useContext(userContext);
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/signin");
  }


  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">

        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          {userToken !== null ? (
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link fw-bold text-main" to="userData">
                  UsersData
                </Link>
              </li>

            </ul>
          ) : (
            ""
          )}
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            {userToken == null ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-main fw-bold" to="signup">
                    Resgister
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link text-main fw-bold" to="signin">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}

            {userToken !== null ? (
              <>
                <li className="nav-item d-flex align-items-center">
                  <i className="fa-brands fa-facebook mx-3"></i>
                  <i className="fa-brands fa-twitter mx-3"></i>
                  <i className="fa-brands fa-instagram mx-3"></i>
                  <i className="fa-brands fa-linkedin mx-3"></i>
                </li>

                <li
                  className="nav-item"
                  onClick={() => {
                    logout();
                  }}
                >
                  <Link className="nav-link text-main fw-bold">Logout</Link>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React from "react";
import Logo from "../assets/logo.png";
import { Link, useHistory } from "react-router-dom";

const Header = () => {
  
  const history = useHistory()

  const logout = () => {
    localStorage.clear()
    history.push('/login')
  }

  return (
    <header className="shadow fixed-top bg-white">
      <nav className="navbar navbar-expand-lg navbar-light p-2">
        <div className="container-fluid">
          <Link
            to="/"
            className="text-decoration-none text-dark py-2 font-weight-bold"
          >
            {/* <img src={Logo} height="35px" alt="logo" /> */}
            <div className="fw-bold text-decoration-none text-dark font-weight-bold">
              THE DISTINGUISHED SOCIETY
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul
              className="navbar-nav mb-2 mb-lg-0"
              style={{ fontSize: "14px" }}
            >
              <li className="nav-item dropdown me-3">
                <a
                  className="nav-link d-flex align-items-center fw-600"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: "#4B475C", fontWeight: "600" }}
                >
                  <span
                    className="material-icons me-1"
                    style={{ fontSize: "22px", marginRight: "8px" }}
                  >
                    article
                  </span>
                  {"   "}
                  Help&nbsp;
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <a
                      className="dropdown-item p-2 d-flex justify-content-between align-items-center"
                      href="#"
                    >
                      Play demo video
                      <span
                        className="material-icons ms-3"
                        style={{ fontSize: "20px" }}
                      >
                        play_circle_outline
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item p-2 d-flex justify-content-between align-items-center"
                      href="#"
                    >
                      Action
                      <span
                        className="material-icons"
                        style={{ fontSize: "20px" }}
                      >
                        help_outline
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item p-2 d-flex justify-content-between align-items-center"
                      href="#"
                    >
                      Action
                      <span
                        className="material-icons"
                        style={{ fontSize: "20px" }}
                      >
                        help_outline
                      </span>
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown me-3">
                <a
                  className="nav-link d-flex align-items-center fw-600"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: "#4B475C", fontWeight: "600" }}
                >
                  <span
                    className="material-icons me-2"
                    style={{ fontSize: "22px", marginRight: "4px" }}
                  >
                    settings
                  </span>{" "}
                  Settings&nbsp;
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <a
                      className="dropdown-item p-2"
                      href="/moas/admin/customer/customerpreferences"
                    >
                      Product Settings
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item p-2"
                      href="/moas/admin/customer/securitypreferences"
                    >
                      Security Settings
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown me-3">
                <a
                  className="nav-link d-flex align-items-center fw-600"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: "#4B475C", fontWeight: "600" }}
                >
                  <span
                    className="material-icons me-2"
                    style={{ fontSize: "22px", marginRight: "4px" }}
                  >
                    person
                  </span>{" "}
                  Profile&nbsp;
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <a className="dropdown-item p-2" href="/moas/viewenduser">
                      Personal Profile
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item p-2"
                      href="/moas/admin/customer/passwordreset"
                    >
                      Change Password
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item p-2"
                      href="/moas/enduserwelcome"
                    >
                      User Dashboard
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item p-2" onClick={logout}>
                      Sign out
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

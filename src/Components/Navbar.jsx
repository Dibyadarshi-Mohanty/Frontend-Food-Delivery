import React, { useEffect, useContext, useState } from "react";
import { Dropdown, initMDB } from "mdb-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";

export default function Navbar({ setShowlogin }) {
  
  useEffect(() => {
    initMDB({ Dropdown });
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const { getTotalAmount, setToken, token, url } = useContext(StoreContext);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
    setIsLoading(false); // Set loading to false after checking
  }, [setToken]);


  if (isLoading) {
    // Show nothing or a loader while loading
    return null;
  }

  const handleSignInClick = () => {
    navigate("/auth"); // Redirect to /auth page
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary ">
      <div className="container-fluid justify-content-between">
        <div className="d-flex">
          <Link
            className="navbar-brand me-2 mb-1 d-flex align-items-center navbar-h1"
            to="/"
          >
           Bistro Bliss
          </Link>
        </div>
        <ul className="navbar-nav flex-row d-none d-md-flex">
          <li className="nav-item me-3 me-lg-1 active">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item me-3 me-lg-1">
            <Link className="nav-link" to="#">
              About
            </Link>
          </li>
          <li className="nav-item me-3 me-lg-1">
            <Link className="nav-link" to="#explore-menu">
              Menu
            </Link>
          </li>
          {/* <li className="nav-item dropdown me-3 me-lg-1">
            <Link
              data-mdb-dropdown-init
              className="nav-link dropdown-toggle "
              to="#"
              id="navbarDropdownMenuLink"
              role="button"
              aria-expanded="false"
            >
           Menu
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <Link className="dropdown-item" to="#">Some news</Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">Another news</Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">Something else here</Link>
              </li>
            </ul>
          </li> */}
          <li className="nav-item dropdown me-3 me-lg-1">
            <Link
              data-mdb-dropdown-init
              className="nav-link dropdown-toggle "
              to="#"
              id="navbarDropdownMenuLink"
              role="button"
              aria-expanded="false"
            >
              Services
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <Link className="dropdown-item" to="#">
                  Some news
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Another news
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Something else here
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item me-3 me-lg-1">
            <Link className="nav-link" to="#">
              Offers
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav flex-row">
          <li className="nav-item me-3 me-lg-1">
            <Link className="nav-link d-sm-flex align-items-sm-center" to="#">
              <span>
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
            </Link>
          </li>
          <li className="nav-item me-3 me-lg-1">
            <Link
              className="nav-link d-sm-flex align-items-sm-center cart-icon"
              to="/cart"
            >
              <span>
                <i className="fa-solid fa-cart-shopping"></i>
              </span>
              <div className={getTotalAmount() === 0 ? "" : "dot"}></div>
            </Link>
          </li>
          {!token ? (
            <button
              data-mdb-ripple-init
              type="button"
              className="btn btn-success "
              onClick={handleSignInClick}
            >
              Sign In
            </button>
          ) : (
            <div className="dropdown text-end me-2 ">
              <a
                href="#"
                id="profileDropdown"
                className="d-block link-dark text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://via.placeholder.com/40"
                  alt="Profile Picture"
                  className="profile-pic"
                />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="profileDropdown"
              >
                <li onClick={()=>navigate("/myorders")}> 
                  <a className="dropdown-item" href="#">
                    Orders
                  </a>
                </li>
                <li onClick={logout}>
                  <a className="dropdown-item" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
}

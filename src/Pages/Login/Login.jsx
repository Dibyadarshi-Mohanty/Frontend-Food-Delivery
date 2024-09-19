import React, { useContext, useState } from "react";
import "./Login.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";  // Import useNavigate

export default function Login() {
  const [currstate, setcurrstate] = useState("Register");
  const { url, setToken } = useContext(StoreContext);
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();  // Initialize useNavigate

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata(data => ({ ...data, [name]: value }));
  };

  const onlogin = async (event) => {
    event.preventDefault();
    let newurl = url;

    if (currstate === "Register") {
      newurl += "/api/user/register";
    } else {
      newurl += "/api/user/login";
    }

    try {
      const response = await axios.post(newurl, data);

      if (response.data.success) {
        if (currstate === "Register") {
          toast.success("Registration Successful! Please log in.");
          setcurrstate("Login");  // Switch to login after successful registration
        } else {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Login Successful");
          navigate("/");  // Redirect to home after successful login
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during login/register:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-light p-3 p-md-4 p-xl-5 " style={{ height: "90vh" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
            <div className="card border border-light-subtle rounded-4">
              <div className="card-body p-1 p-md-3 p-xl-4">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <h2 className="h4 text-center">{currstate}</h2>
                    </div>
                  </div>
                </div>
                <form onSubmit={onlogin}>
                  <div className="row gy-3 overflow-hidden">
                    {currstate === "Register" && (
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            onChange={onChangeHandler}
                            value={data.name}
                            id="firstName"
                            placeholder="First Name"
                            required
                          />
                          <label htmlFor="firstName" className="form-label">
                            First Name
                          </label>
                        </div>
                      </div>
                    )}
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          onChange={onChangeHandler}
                          value={data.email}
                          placeholder="name@example.com"
                          required
                        />
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          id="password"
                          onChange={onChangeHandler}
                          value={data.password}
                          placeholder="Password"
                          required
                        />
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                      </div>
                    </div>
                    {currstate === "Register" && (
                      <div className="col-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="iAgree"
                            id="iAgree"
                            required
                          />
                          <label className="form-check-label text-secondary" htmlFor="iAgree">
                            I agree to the{" "}
                            <a href="#!" className="link-primary text-decoration-none">
                              terms and conditions
                            </a>
                          </label>
                        </div>
                      </div>
                    )}
                    <div className="col-12">
                      <div className="d-grid">
                        <button className="btn bsb-btn-xl btn-primary" type="submit">
                          {currstate === "Register" ? "Create Account" : "Login"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-12">
                    <hr className="mt-3 mb-4 border-secondary-subtle" />
                    {currstate === "Login" ? (
                      <p className="m-0 text-secondary text-center">
                        Create a new account!!{" "}
                        <a
                          href="#!"
                          className="link-primary text-decoration-none"
                          onClick={() => setcurrstate("Register")}
                        >
                          Register
                        </a>
                      </p>
                    ) : (
                      <p className="m-0 text-secondary text-center">
                        Already have an account?{" "}
                        <a
                          href="#!"
                          className="link-primary text-decoration-none"
                          onClick={() => setcurrstate("Login")}
                        >
                          Login
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

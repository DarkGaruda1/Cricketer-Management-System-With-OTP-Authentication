import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const contextData = useContext(AuthContext);
  const { backendURL, isLoggedIn, checkAuthenticationStatus } = contextData;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn) navigate("/dashboard");
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    const { password, email, username } = formData;

    if (!password || !email || !username)
      toast.error(`None Of The Required Fields Can Be Empty`);

    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.post(`${backendURL}/auth/login`, {
        password,
        email,
        username,
      });

      console.log(data);

      if (data.success) {
        toast.success(data.message);
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
      return;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <h3 className="text-center">Login Page</h3>

      <form className="container" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4 p-2  mx-auto">
            <div className="w-100 my-2">
              <p className="m-0">Email</p>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="johndoe@email.com"
                className="w-100"
              />
              <small style={{ fontSize: "11px" }}>Enter a valid email id</small>
            </div>
            <div className="my-2 ">
              <p className="m-0">Username</p>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                className="w-100"
              />
              <small style={{ fontSize: "11px", lineHeight: "0.5px" }}>
                Atleast 6 character long ,must contain one uppercase character
                and a number. Only _ is allowed for specials
              </small>
            </div>
            <div className="w-100 my-2">
              <p className="m-0">Password</p>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter Password"
                className="w-100"
              />
              <small style={{ fontSize: "11px", lineHeight: "0.5px" }}>
                Atleast 8 character long ,must contain one uppercase and a
                special character,a number
              </small>
            </div>

            <button className="btn btn-dark w-100" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
      <div className="text-center">
        <p>
          Dont Have An Account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </>
  );
};

export default Login;

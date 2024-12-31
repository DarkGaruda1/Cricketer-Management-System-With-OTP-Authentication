import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const contextData = useContext(AuthContext);
  const { backendURL, isLoggedIn, checkAuthenticationStatus } = contextData;
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard");
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    const { name, password, email, username, confirmPassword } = formData;

    if (!name || !password || !email || !confirmPassword || !username) {
      toast.error(`None Of The Required Fields Can Be Empty`);
      return;
    }

    if (password !== confirmPassword) {
      toast.error(`Passwords Donot Match. Try Again`);
      return;
    }

    axios.defaults.withCredentials = true;

    try {
      const { data } = await axios.post(`${backendURL}/auth/signup`, {
        name,
        email,
        password,
        username,
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
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
      <h3 className="text-center">Sign Up Page</h3>

      <form className="container" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4 p-2  mx-auto">
            <div className="w-100 my-2">
              <p className="m-0">Name</p>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                placeholder="Name"
                className="w-100"
                onChange={handleInputChange}
              />
              <small style={{ fontSize: "11px" }}>
                Your data is safe with us and wont be shared anywhere else
              </small>
            </div>
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
            <div className="w-100 my-2">
              <p className="m-0">Confirm Password</p>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleInputChange}
                value={formData.confirmPassword}
                placeholder="Enter Password"
                className="w-100"
              />
              <small style={{ fontSize: "11px", lineHeight: "0.5px" }}>
                Re enter password
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
          Already Have An Account? <Link to="/login">Login</Link>
        </p>
      </div>
    </>
  );
};

export default SignUp;

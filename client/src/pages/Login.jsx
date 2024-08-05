import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("All fields are required!!");
    }
    try {
      const response = await axios.post(
        "https://intern-task-api.bravo68web.workers.dev/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.token);
      navigate("/productListing");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="h-screen px-12 py-8 mx-auto flex flex-col items-center">
        <form
          className="bg-blue-500 w-full md:w-3/6 lg:w-2/6 px-8 py-5 rounded-lg"
          onSubmit={handleSubmit}>
          <h1 className="text-white font-semibold text-3xl text-center mb-4">
            Login
          </h1>

          <div className="mt-4">
            <label htmlFor="">Email</label>
            <input
              type="email"
              required
              name="email"
              onChange={handleChange}
              value={email}
              className="w-full mt-2 p-2 bg-blue-200 outline-none rounded"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={handleChange}
              name="password"
              className="w-full mt-2 p-2 bg-blue-200 outline-none rounded"
            />
          </div>
          <div>
            <button className="w-full mt-4 bg-red-500 hover:bg-red-600 px-7 py-3 rounded text-white uppercase transition duration-150 ease-in-out">
              Submit
            </button>
          </div>
          <p className="flex justify-center items-center mt-4 text-white font-semibold">
            Or
          </p>
          <p className="flex justify-center items-center mt-4 text-white font-semibold">
            Don't Have an Account? &nbsp;
            <Link to="/" className=" hover:text-zinc-300">
              <u>Register</u>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;

import React, { useState } from "react";
// import validator from 'validator';
import isEmail from "validator/lib/isEmail";

const SignUp = () => {
  const [err, setErr] = useState("");
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitt = (e) => {
    e.preventDefault();

    if (!isEmail(formInput.email)) {
      setErr("Please enter a valid email");
    } else if (formInput.password.length < 5) {
      setErr("Password must contain 5 or more characters");
    } else {
      setErr("");
    }
  };
  return (
    <div className="container">
      <div className="py-4 px-5 my-5 " style={{ background: "#dddddd" }}>
        <label htmlFor="email" className="form-label">
          Your email
        </label>
        <div className="input-group mb-3">
          <input
            type="email"
            value={formInput.email}
            className="form-control"
            id="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className="input-group mb-3">
          <input
            type="password"
            value={formInput.password}
            className="form-control"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password
        </label>
        <div className="input-group mb-3">
          <input
            value={formInput.confirmPassword}
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleChange}
          />
        </div>
        {err && <p className="text-danger">{err}</p>}
        <button className="btn btn-primary" onClick={handleSubmitt}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default SignUp;

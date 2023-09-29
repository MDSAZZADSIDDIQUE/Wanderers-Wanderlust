import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUserDetails } = useContext(UserContext);
  const [error, setError] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    await axios
      .post("http://localhost:3000/user/login", data, {
        withCredentials: true,
      })
      .then((response) => {
        setUserDetails(response.data);
        navigate("/userprofile");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(janko-ferlic-sfL_QOnmy00-unsplash.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content flex-col text-center text-neutral-content">
        <div className="card flex-shrink-0 w-96 shadow-2xl bg-base-100 bg-opacity-75 max-sm:w-80">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="card-title text-neutral justify-center mb-5">
              Login
            </h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Email"
                className={`input text-black ${
                  errors.firstName
                    ? "input-error"
                    : "input-bordered border-black"
                }`}
                {...register("email", { required: true })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email?.type === "required" && (
                <label className="label">
                  <span className="label-text text-error">
                    Email is required
                  </span>
                </label>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                placeholder="Password"
                className={`input text-black ${
                  errors.firstName
                    ? "input-error"
                    : "input-bordered border-black"
                }`}
                {...register("password", { required: true })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.password?.type === "required" && (
                <label className="label">
                  <span className="label-text text-error">
                    Password is required
                  </span>
                </label>
              )}
              {error && (
                <label className="label">
                  <span className="label-text text-error">{error}</span>
                </label>
              )}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
              <label className="label">
                <a
                  href="/registration"
                  className="label-text-alt link link-hover"
                >
                  New to Natural Harmony? Sign Up Now.
                </a>
              </label>
            </div>
            <div className="form-control">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

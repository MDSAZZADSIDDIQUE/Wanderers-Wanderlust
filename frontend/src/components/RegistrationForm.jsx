import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("image", data.image[0]);
      const res = await axios.post("http://localhost:3000/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      navigate("/dashboard");
    } catch (error) {}
  };
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(janko-ferlic-sfL_QOnmy00-unsplash.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content  flex-col text-center text-neutral-content font-black">
        <div className="card flex-shrink-0 w-96 shadow-2xl bg-base-100 bg-opacity-75  max-sm:w-80">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="card-title text-neutral mb-5 justify-center font-black">
              Registration
            </h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                className={`input text-black ${
                  errors.firstName
                    ? "input-error"
                    : "input-bordered border-black"
                }`}
                {...register("firstName", {
                  required: true,
                  pattern: /^[A-Za-z]+$/i,
                })}
                aria-invalid={errors.firstName ? "true" : "false"}
              />
              {errors.firstName?.type === "required" && (
                <label className="label">
                  <span className="label-text text-error">
                    First Name is required
                  </span>
                </label>
              )}
              {errors.firstName?.type === "pattern" && (
                <label className="label">
                  <span className="label-text text-error">
                    First Name can only contains letters
                  </span>
                </label>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className={`input text-black ${
                  errors.lastName
                    ? "input-error"
                    : "input-bordered border-black"
                }`}
                {...register("lastName", {
                  required: true,
                  pattern: /^[A-Za-z]+$/i,
                })}
                aria-invalid={errors.lastName ? "true" : "false"}
              />
              {errors.lastName?.type === "required" && (
                <label className="label">
                  <span className="label-text text-error">
                    Last name is required
                  </span>
                </label>
              )}
              {errors.lastName?.type === "pattern" && (
                <label className="label">
                  <span className="label-text text-error">
                    Last Name can only contain letters
                  </span>
                </label>
              )}
            </div>
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
                    {" "}
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
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Profile Picture</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered  border-black w-full max-w-xs"
                  {...register("image", { required: true })}
                  aria-invalid={errors.image ? "true" : "false"}
                />
                {errors.image?.type === "required" && (
                  <label className="label">
                    <span className="label-text text-error">
                      Image is required
                    </span>
                  </label>
                )}
              </div>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
              <label className="label">
                <Link to={"/login"} className="label-text-alt link link-hover">
                  Already have an account?
                </Link>
              </label>
            </div>
            <div className="form-control">
              <button className="btn glass" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;

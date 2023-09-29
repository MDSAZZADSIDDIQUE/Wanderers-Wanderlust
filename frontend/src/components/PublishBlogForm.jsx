import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UserContext } from "./UserContext";

const PublishBlogForm = () => {
  const [value, setValue] = useState("");
  const { userDetails } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", userDetails.id);
    formData.append("category", data.category);
    formData.append("summary", data.summary);
    formData.append("content", value);
    formData.append("image", data.image[0]);
    try {
      const res = await axios.post(
        "http://localhost:3000/blog/publishblog",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      navigate("/dashboard");
    } catch (error) {}
  };
  return (
    <form
      className="flex flex-col justify-center items-center font-black"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-1/2">
        <h1 className="text-4xl my-5">Publish Blog</h1>
        <div className="form-control my-5">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered border-black"
            {...register("title")}
          />
        </div>
        <div className="form-control my-5">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <input
            type="text"
            placeholder="Category"
            className="input input-bordered border-black"
            {...register("category")}
          />
        </div>
        <div className="form-control my-5">
          <label className="label">
            <span className="label-text">Summary</span>
          </label>
          <input
            type="text"
            placeholder="Summary"
            className="input input-bordered border-black"
            {...register("summary")}
          />
        </div>
        <div className="form-control my-5">
          <label className="label">
            <span className="label-text">Content</span>
          </label>
          <ReactQuill
            theme="snow"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image"],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "link",
              "image",
            ]}
            className="h-96 "
            value={value}
            onChange={setValue}
          ></ReactQuill>
        </div>
        <div className="form-control mt-16">
          <label className="label">
            <span className="label-text">Featured Image</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered border-black"
            {...register("image")}
          />
        </div>
        <div className="form-control mt-10">
          <button className="btn">Publish Blog</button>
        </div>
      </div>
    </form>
  );
};

export default PublishBlogForm;

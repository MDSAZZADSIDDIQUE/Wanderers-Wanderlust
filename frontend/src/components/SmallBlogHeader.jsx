import React from "react";
import { format } from "date-fns";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

const SmallBlogHeader = (props) => {
  return (
    <div className="card card-side bg-base-100 shadow-xl h-72 my-10">
      <figure className="w-52">
        <img
          src={`http://localhost:3000/blog/getfeaturedpicture/${props.blog.featuredImage}`}
        />
      </figure>
      <div className="card-body">
        <Link to={`/blog/${props.blog._id}`}>
          <h2 className="card-title font-bold text-3xl mb-3">
            {props.blog.title}
          </h2>
        </Link>
        <p>{props.blog.summary}</p>
        <p className="text-sm text-gray-400">
          {props.blog.author.firstName} {props.blog.author.lastName}
          {", "}
          {format(new Date(props.blog.createdAt), "do MMMM, yyyy")}
        </p>
        <div>
          <button className="btn btn-outline btn-xs">
            {props.blog.category}
          </button>
        </div>
        <p className="flex justify-start items-center">
          <span>
            <AiFillHeart />
          </span>
          <span>{props.blog.likes}</span>
        </p>
        <div className="card-actions relative ">
          <button className="btn btn-outline absolute bottom-0 right-0 ">
            Read
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmallBlogHeader;

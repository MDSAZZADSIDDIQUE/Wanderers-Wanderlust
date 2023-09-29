import React from "react";

const BigBlogHeaderCard = (props) => {
  return (
    <div className="mx-52 my-10">
      <div className="group card card-compact bg-base-100 image-full items-end shadow-xl">
        <figure className="h-96">
          <img
            src={`http://localhost:3000/blog/getfeaturedpicture/${props.blog.featuredImage}`}
            className="w-full"
          />
        </figure>
        <div className="hidden group-hover:card-body bg-white rounded-xl">
          <h2 className="card-title">{props.blog.title}</h2>
          <p>{props.blog.summary}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-outline">Read Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigBlogHeaderCard;

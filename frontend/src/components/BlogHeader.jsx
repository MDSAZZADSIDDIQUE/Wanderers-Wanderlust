import React, { useState, useEffect } from "react";
import SmallBlogHeader from "./SmallBlogHeader";
import BigBlogHeaderCarousel from "./BigBlogHeaderCarousel";
import axios from "axios";

const BlogHeader = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchData = async () => {
    await axios
      .get("http://localhost:3000/blog/getallblogs", {
        withCredentials: true,
      })
      .then((response) => {
        setBlogs(response.data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <BigBlogHeaderCarousel />
      <div className="mx-52 flex justify-between">
        <div>
          <button className="btn btn-outline mr-1">Deep Learning</button>
          <button className="btn btn-outline mx-1">Machine Learning</button>
          <button className="btn btn-outline mx-1">Mathematics</button>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div>
        <div className="mx-52">
          {blogs.map((blog) => (
            <div key={blog._id}>
              <SmallBlogHeader blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;

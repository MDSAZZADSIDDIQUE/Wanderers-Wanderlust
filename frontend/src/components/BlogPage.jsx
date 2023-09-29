import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BlogSection from "./BlogSection";

const BlogPage = () => {
  const { blogID } = useParams();

  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    await axios
      .get(`http://localhost:3000/blog/getblog/${blogID}`)
      .then((response) => {
        setBlog(response.data);
        setLoading(true);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>{!loading ? <p>Loading</p> : <BlogSection blog={blog} />}</div>;
};

export default BlogPage;

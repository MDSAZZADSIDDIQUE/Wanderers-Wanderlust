import React, { useEffect, useState } from "react";

import axios from "axios";

const useFetchBlogData = (blogID, loading) => {
  const [blog, setBlog] = useState({});
  const fetchData = async () => {
    await axios
      .get(`http://localhost:3000/blog/getblog/${blogID}`)
      .then((response) => {
        setBlog(response.data);
        loading = false;
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return [blog, loading];
};

export default useFetchBlogData;

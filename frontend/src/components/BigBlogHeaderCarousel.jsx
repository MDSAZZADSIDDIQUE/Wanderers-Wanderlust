import React, { useEffect, useState } from "react";
import BigBlogHeaderCard from "./BigBlogHeaderCard";
import axios from "axios";

const BigBlogHeaderCarousel = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    const nextSlideNumber = currentSlide % 4;
    setCurrentSlide(nextSlideNumber + 1);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await axios
      .get("http://localhost:3000/blog/gettopblogs", {
        withCredentials: true,
      })
      .then((response) => {
        setBlogs(response.data);
      });
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [currentSlide]);
  return (
    <>
      {blogs[currentSlide] && <BigBlogHeaderCard blog={blogs[currentSlide]} />}
    </>
  );
};

export default BigBlogHeaderCarousel;

import React, { useEffect, useState, useContext } from "react";
import { format } from "date-fns";
import { AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { useForm } from "react-hook-form";
import { UserContext } from "./UserContext";

const BlogSection = (props) => {
  const { userDetails } = useContext(UserContext);
  const [like, setLike] = useState(false);
  const [blog, setBlog] = useState(props.blog);
  const [commentPosted, setCommentPosted] = useState([]);
  const [showComment, setShowComment] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const likedBlog = () => {
    fetchData();
    setLike(!like);
  };
  const onSubmit = async (data) => {
    data.id = userDetails.id;
    await axios
      .post(`http://localhost:3000/blog/comment/${blog._id}`, data, {
        withCredentials: true,
      })
      .then((response) => {
        setBlog(response.data);
        setShowComment(!showComment);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const fetchData = async () => {
    const data = { id: userDetails.id };
    await axios
      .post(`http://localhost:3000/blog/likeblog/${blog._id}`, data)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const newJsonObject = {};
  const fetchUserData = async () => {
    for (const [key, value] of Object.entries(blog.comments)) {
      let userName = "";
      await axios
        .get(`http://localhost:3000/user/getuser/${key}`)
        .then((response) => {
          userName = response.data.firstName + " " + response.data.lastName;
        })
        .catch((error) => {
          console.error(error.message);
        });
      newJsonObject[userName] = [value];
      setCommentPosted(newJsonObject);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [showComment]);

  let commentSection = [];

  for (let key in commentPosted) {
    commentSection.push(
      <div key={key}>
        <p>
          {key}: {commentPosted[key]}
        </p>
      </div>,
    );
  }

  return (
    <div className="mx-52 my-5 max-md:mx-10">
      <div className="card bg-base-100 shadow-xl">
        <figure className="h-96">
          <img
            src={`http://localhost:3000/blog/getfeaturedpicture/${blog.featuredImage}`}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-4xl">{blog.title}</h2>
          <h2>{blog.author.firstName}</h2>
          <h2>{format(new Date(blog.createdAt), "do MMMM, yyyy")}</h2>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          <button className={`btn btn-outline w-20 btn-sm`} onClick={likedBlog}>
            <span>
              <AiFillHeart />
            </span>
            <span>{blog.likes.length}</span>
          </button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="my-3">Comments</h1>
            <input
              type="text"
              placeholder="Comment"
              className="input input-bordered w-full max-w-xs"
              {...register("comment")}
            />
            <button className="btn btn-primary">Post</button>
          </form>
          <div>{console.log(Object.keys(commentPosted))}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;

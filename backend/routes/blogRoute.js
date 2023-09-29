import express from "express";
import { Blog } from "../models/blogModel.js";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/featured_pictures");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/publishblog", upload.single("image"), async (req, res) => {
  const newBlog = {
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    summary: req.body.summary,
    content: req.body.content,
    likes: [],
    comments: {},
    featuredImage: req.file.filename,
  };
  const blog = await Blog.create(newBlog);
  return res.status(201).send(blog);
});

router.get("/getallblogs", async (req, res) => {
  const blogs = await Blog.find().populate("author");
  res.json(blogs);
});

router.get("/gettopblogs", async (req, res) => {
  const blogs = await Blog.find()
    .populate("author")
    .sort({ field: "asc", createdAt: -1 })
    .limit(5);
  res.json(blogs);
});

router.get("/getfeaturedpicture/:featuredPicture", (req, res) => {
  const featuredPicture = req.params["featuredPicture"];
  res.sendFile(
    "D:/My Projects/Wanderer's Wanderlust/backend/public/featured_pictures/" +
      featuredPicture
  );
});

router.get("/getblog/:blogID", async (req, res) => {
  const blogID = req.params["blogID"];
  const blog = await Blog.findOne({ _id: blogID }).populate("author");
  res.send(blog);
});

router.post("/likeblog/:blogID", async (req, res) => {
  const blog = await Blog.findById(req.params["blogID"]);
  let likes = blog.likes;
  if (likes.includes(req.body.id)) {
    const indexToRemove = likes.indexOf(req.body.id);
    likes.splice(indexToRemove, 1);
  } else {
    likes.push(req.body.id);
  }
  await blog.updateOne({
    likes,
  });
  res.send(blog);
});

router.post("/comment/:blogID", async (req, res) => {
  const blogID = req.params["blogID"];
  const blog = await Blog.findById(blogID).populate("author");
  let comments = {};
  let alreadyCommented = false;
  if (blog.comments == null || Object.keys(blog.comments).length === 0) {
    console.log(comments);
    comments[req.body.id] = [req.body.comment];
  } else {
    for (const key in blog.comments) {
      if (blog.comments.hasOwnProperty(key)) {
        if (key == req.body.id) {
          comments = blog.comments;
          const value = blog.comments[key];
          value.push(req.body.comment);
          comments[req.body.id] = value;
          alreadyCommented = true;
          break;
        }
      }
    }
  }
  if (!alreadyCommented) {
    comments = blog.comments;
    comments[req.body.id] = [req.body.comment];
  }
  await blog.updateOne({
    comments,
  });
  return res.send(blog);
});

export default router;

import express from "express";
import { User } from "../models/userModel.js";
import multer from "multer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const router = express.Router();
const secret = "Gojo Satoru";
router.use(cookieParser());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/profile_pictures");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const salt = bcrypt.genSaltSync(10);
router.post("/", upload.single("image"), async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, salt);

  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash,
    profilePicture: req.file.filename,
  };
  const users = await User.find({});
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === req.body.email) {
      return res.status(208).send({ message: "Email is already registered" });
    }
  }
  const user = await User.create(newUser);

  jwt.sign({ id: newUser._id }, secret, {}, (err, token) => {
    if (err) throw err;
    return res.cookie("token", token).status(201).send(user);
  });
});

// Log in
router.post("/login", async (req, res) => {
  console.log(req.body.email);
  const user = await User.findOne({
    email: req.body.email,
  });
  if (user === null) {
    return res.status(401).send({ message: "Wrong username or password" });
  }
  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).send({ message: "Wrong username or password" });
  } else {
    jwt.sign(
      {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        profilePicture: user.profilePicture,
      },
      secret,
      {},
      (error, token) => {
        if (error) throw error;
        return res.status(202).cookie("token", token).send(user);
      }
    );
  }
});

// User Profile
router.get("/userprofile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

// Get Profile Picture
router.get("/getprofilepicture/:profilePicture", (req, res) => {
  const profilePictures = req.params["profilePicture"];
  res.sendFile(
    "D:/My Projects/Wanderer's Wanderlust/backend/public/profile_pictures/" +
      profilePictures
  );
});

// User Profile
router.get("/getuser/:userID", async (req, res) => {
  const userID = req.params.userID;
  const user = await User.findById(userID);
  res.send(user);
});

export default router;

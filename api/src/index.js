import express from "express";
import mongoose from "mongoose";
import { Post } from "./schema.js";
import postData from "./utils.js";
import cors from 'cors'
import cookieParser from "cookie-parser"
import { verifyUser } from "./verifyUser.js";
const mongo =
  "mongodb+srv://yanuarprayogat:lxvMKmR55xxzBWUQ@prep.lhacvco.mongodb.net/?retryWrites=true&w=majority&appName=prep";
mongoose
  .connect(mongo)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(cookieParser());
var corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true };

app.use(cors(corsOptions));
app.use(express.json());


app.get("/login", (req, res) => {
  const {username,password} = req.body
  res
  .cookie({username,role:"admin"})
  .json({username,role:"admin"});
});


app.get("/post",verifyUser, async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200)
    .cookie('user','user')
    .json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
});

app.get("*", (req, res) => {
  res.json({ status: 404, message: "NOT FOUND" });
});

app.listen(5000, () => {
  console.log("app running");
});

const error = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};

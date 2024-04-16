import express from "express";
import mongoose from "mongoose";
import { Movie, Post } from "./schema.js";
import { postData, movieData } from "./utils.js";
import cors from "cors";
import cookieParser from "cookie-parser";
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
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/login", (req, res) => {
  const { username, password } = req.body;
  res.cookie({ username, role: "admin" }).json({ username, role: "admin" });
});

app.get("/post", async (req, res) => {
  try {
    const page = parseInt(req.query.page - 1) || 0;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 5;
    const sort = req.query.sort === "asc" ? 1 : -1;
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
      .sort({ updatedAt: sort })
      .skip(page * limit)
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

    res.status(200).cookie("user", "user").json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
});

app.get("/movies-add", async (req, res) => {
  const movie = await Movie.create(movieData);
  res.json(movie)
});

app.get("/movies", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "rating";
    let genre = req.query.genre || "All";

    const genreOptions = [
      "Action",
      "Romance",
      "Fantasy",
      "Drama",
      "Crime",
      "Adventure",
      "Thriller",
      "Sci-fi",
      "Music",
      "Family",
    ];

    genre === "All"
      ? (genre = [...genreOptions])
      : (genre = req.query.genre.split(","));
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    const movies = await Movie.find({ name: { $regex: search, $options: "i" } })
      .where("genre")
      .in([...genre])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Movie.countDocuments({
      genre: { $in: [...genre] },
      name: { $regex: search, $options: "i" },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      genres: genreOptions,
      movies,
    };

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
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

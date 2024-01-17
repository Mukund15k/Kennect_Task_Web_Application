const express = require("express");
const {
  getAllPostsController,
  createPostController,
  updatePostController,
  getPostByIdController,
  deletePostController,
  userPostControlller,
} = require("../controllers/postController");

//router object
const router = express.Router();

//routes
// GET || all posts
router.get("/all-post", getAllPostsController);

//POST || create post
router.post("/create-post", createPostController);

//PUT || update post
router.put("/update-post/:id", updatePostController);

//GET || SIngle Post Details
router.get("/get-post/:id", getPostByIdController);

//DELETE || delete post
router.delete("/delete-post/:id", deletePostController);

//GET || user post
router.get("/user-post/:id", userPostControlller);

module.exports = router;
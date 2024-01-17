const mongoose = require("mongoose");
const postModel = require("../models/postModel");
const userModel = require("../models/userModel");

//GET ALL BLOGS
exports.getAllPostsController = async (req, res) => {
  try {
    const posts = await postModel.find({}).populate("user");
    if (!posts) {
      return res.status(200).send({
        success: false,
        message: "No Posts Found",
      });
    }
    return res.status(200).send({
      success: true,
      PostCount: posts.length,
      message: "All Posts lists",
      posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error WHile Getting Posts",
      error,
    });
  }
};

//Create Post
exports.createPostController = async (req, res) => {
  try {
    const { title, description, user } = req.body;
    //validation
    if (!title || !description || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide ALl Fields",
      });
    }
    const exisitingUser = await userModel.findById(user);
    //validaton
    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }

    const newPost = new postModel({ title, description, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newPost.save({ session });
    exisitingUser.posts.push(newPost);
    await exisitingUser.save({ session });
    await session.commitTransaction();
    await newPost.save();
    return res.status(201).send({
      success: true,
      message: "Post Created!",
      newPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error WHile Creting post",
      error,
    });
  }
};

//Update Post
exports.updatePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const post = await postModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Post Updated!",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error WHile Updating Post",
      error,
    });
  }
};

//SIngle Post
exports.getPostByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).send({
        success: false,
        message: "post not found with this is",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetch single post",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while getting single post",
      error,
    });
  }
};

//Delete Post
exports.deletePostController = async (req, res) => {
  try {
    const post = await postModel
      // .findOneAndDelete(req.params.id)
      .findByIdAndDelete(req.params.id)
      .populate("user");
    await post.user.posts.pull(post);
    await post.user.save();
    return res.status(200).send({
      success: true,
      message: "Post Deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Erorr WHile Deleteing Post",
      error,
    });
  }
};

//GET USER Post
exports.userPostControlller = async (req, res) => {
  try {
    const userPost = await userModel.findById(req.params.id).populate("posts");

    if (!userPost) {
      return res.status(404).send({
        success: false,
        message: "posts not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user posts",
      userPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error in user post",
      error,
    });
  }
};
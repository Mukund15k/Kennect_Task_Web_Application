import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  //get posts
  const getAllPosts = async () => {
    try {
      const { data } = await axios.get("/api/v1/post/all-post");
      if (data?.success) {
        setPosts(data?.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <div>
      {posts &&
        posts.map((post) => (
          <PostCard
            id={post?._id}
            isUser={localStorage.getItem("userId") === post?.user?._id}
            title={post?.title}
            description={post?.description}
            username={post?.user?.username}
            time={post.createdAt}
          />
        ))}
    </div>
  );
};

export default Posts;

import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
const UserPosts = () => {
  const [posts, setPosts] = useState([]);

  //get user posts
  const getUserPosts = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/post/user-post/${id}`);
      if (data?.success) {
        setPosts(data?.userPost.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);
  console.log(posts);
  return (
    <div>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            id={post._id}
            isUser={true}
            title={post.title}
            description={post.description}
            username={post.user.username}
            time={post.createdAt}
          />
        ))
      ) : (
        <h1>You Havent Created a post</h1>
      )}
    </div>
  );
};

export default UserPosts;

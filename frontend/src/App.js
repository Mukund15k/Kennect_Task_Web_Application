import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Posts from "./pages/Posts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserPosts from "./pages/UserPosts";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/my-posts" element={<UserPosts />} />
        <Route path="/post-details/:id" element={<PostDetails />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;

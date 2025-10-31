import { useState } from "react";
import axiosClient from "../../../utils/axiosClient";
import PostCard from "../../Dashboard/Components/Post/PostCard";

export default function ProfilePosts({ posts }) {
  const [userPosts, setUserPosts] = useState(posts);

  if (!posts.length) return <div className="flex items-center justify-center"><p>No notes yet! 😔</p></div>;

  const handlePostRefresh = async (postId) => {
    try {
      const res = await axiosClient.get(`/posts/${postId}`);
      const updatedPost = res.data;
      setUserPosts((prev) =>
        prev.map((p) => (p.id === postId ? updatedPost : p))
      );
    } catch (err) {
      console.error("Failed to refresh post:", err);
    }
  };

  return (
    <div className="flex justify-center flex-wrap gap-6 items-start">
      {userPosts.map((post) => (
        <PostCard key={post.id} post={post} onPostUpdate={() => handlePostRefresh(post.id)} />
      ))}
    </div>
  );
}

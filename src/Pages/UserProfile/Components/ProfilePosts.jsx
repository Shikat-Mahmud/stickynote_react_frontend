import PostCard from "../../Dashboard/Components/Post/PostCard";

export default function ProfilePosts({ posts }) {
  if (!posts.length) return <p>No posts yet.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

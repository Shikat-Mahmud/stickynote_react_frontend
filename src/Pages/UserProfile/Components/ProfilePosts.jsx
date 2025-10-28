import PostCard from "../../Dashboard/Components/Post/PostCard";

export default function ProfilePosts({ posts }) {
  if (!posts.length) return <p>No posts yet.</p>;

  return (
    <div className="flex justify-center flex-wrap gap-6 items-start">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default function ProfileAbout({ user }) {
  return (
    <div className=" bg-white shadow-lg p-8 border-t-4 border-orange-400">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">About {user.name}</h3>
      <ul className="space-y-2 text-gray-700">
        <li><b>Email:</b> {user.email}</li>
        <li><b>Graduated From:</b> {user.school || "Not specified"}</li>
        <li><b>Address:</b> {user.address || "Not specified"}</li>
        <li><b>Country:</b> {user.country || "Not specified"}</li>
        <li><b>Joined:</b> {new Date(user.created_at).toLocaleDateString()}</li>
        <li><b>Bio:</b> {user.bio == null && "No bio added yet."}</li>
        {user.bio != null &&
          <p>{user.bio}</p>
        }
      </ul>
    </div>
  );
}

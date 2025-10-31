export default function ProfileAbout({ user }) {
  return (
    <div className="bg-white shadow-lg p-8 border-t-4 border-orange-400">
      <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
        <i className="ri-user-3-line text-orange-400"></i>
        About {user.name}
      </h3>

      <ul className="space-y-3 text-gray-700">
        <li className="flex items-center gap-2">
          <i className="ri-mail-line text-gray-500"></i>
          <span><b>Email:</b> {user.email}</span>
        </li>

        <li className="flex items-center gap-2">
          <i className="ri-building-line text-gray-500"></i>
          <span><b>Graduated From:</b> {user.school || "Not specified"}</span>
        </li>

        <li className="flex items-center gap-2">
          <i className="ri-map-pin-line text-gray-500"></i>
          <span><b>Address:</b> {user.address || "Not specified"}</span>
        </li>

        <li className="flex items-center gap-2">
          <i className="ri-earth-line text-gray-500"></i>
          <span><b>Country:</b> {user.country || "Not specified"}</span>
        </li>

        <li className="flex items-center gap-2">
          <i className="ri-calendar-line text-gray-500"></i>
          <span><b>Joined:</b> {new Date(user.created_at).toLocaleDateString()}</span>
        </li>

        <li className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <i className="ri-chat-3-line text-gray-500"></i>
            <b>Bio:</b>
          </div>
          <p className="text-gray-600">{user.bio || "No bio added yet."}</p>
        </li>
      </ul>
    </div>
  );
}
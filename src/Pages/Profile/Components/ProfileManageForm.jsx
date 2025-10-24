import { useState } from "react";

export default function ProfileManageForm({ user }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", { name, email, avatar });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Management</h2>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg p-2 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg p-2 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="gender" className="block text-gray-700 font-medium mb-1">Gender</label>
        <select name="gender" id="gender" className="w-full border rounded-lg p-2 focus:outline-none">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="country" className="block text-gray-700 font-medium mb-1">Country</label>
        <select name="country" id="country" className="w-full border rounded-lg p-2 focus:outline-none">
          <option value="">Select Country</option>
          <option value="Bangladesh">Bangladesh</option>
          <option value="India">India</option>
          <option value="Pakistan">Pakistan</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Profile Picture</label>
        <input
          type="text"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="Image URL"
          className="w-full border rounded-lg p-2 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
      >
        Save Changes
      </button>
    </form>
  );
}
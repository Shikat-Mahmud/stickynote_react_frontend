import { useState } from "react";

export default function PasswordManageForm() {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password update submitted:", { current, newPass, confirm });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Password Management</h2>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Current Password</label>
        <input
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          className="w-full border rounded-lg p-2 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">New Password</label>
        <input
          type="password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          className="w-full border rounded-lg p-2 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full border rounded-lg p-2 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
      >
        Update Password
      </button>
    </form>
  );
}
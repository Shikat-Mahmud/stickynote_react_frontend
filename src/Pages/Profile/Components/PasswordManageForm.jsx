import { useState } from "react";
import axiosClient from "../../../utils/axiosClient";
import { apiBaseUrl } from "../../../config";

export default function PasswordManageForm() {
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!form.new_password || !form.new_password_confirmation) {
      setMessage("❌ Please fill out new password and confirm it.");
      setLoading(false);
      return;
    }

    try {
      const res = await axiosClient.put(`${apiBaseUrl}/profile/password`, form);

      if (res.data.success) {
        setMessage("✅ Password updated successfully!");
        setForm({
          current_password: "",
          new_password: "",
          new_password_confirmation: "",
        });
      } else {
        setMessage(res.data.message || "❌ Failed to update password.");
      }
    } catch (error) {
      if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        const firstError = Object.values(errors)?.[0]?.[0] || "Validation error.";
        setMessage(`❌ ${firstError}`);
      } else if (error.response?.status === 401) {
        setMessage("❌ Current password is incorrect.");
      } else {
        setMessage("❌ An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Password Management</h2>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Current Password</label>
        <input
          type="password"
          name="current_password"
          value={form.current_password}
          onChange={handleChange}
          placeholder="Write Current Password"
          className="w-full border rounded-lg p-2 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">New Password</label>
        <input
          type="password"
          name="new_password"
          value={form.new_password}
          onChange={handleChange}
          placeholder="Write New Password"
          className="w-full border rounded-lg p-2 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
        <input
          type="password"
          name="new_password_confirmation"
          value={form.new_password_confirmation}
          onChange={handleChange}
          placeholder="Rewrite New Password"
          className="w-full border rounded-lg p-2 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`bg-orange-400 text-white px-5 py-2.5 rounded-lg hover:bg-orange-500 transition ${loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
      >
        {loading ? "Updating..." : "Update Password"}
      </button>

      {message && (
        <div
          className={`text-sm font-medium mt-2 ${message.includes("✅") ? "text-green-600" : "text-red-500"
            }`}
        >
          {message}
        </div>
      )}
    </form>
  );
}
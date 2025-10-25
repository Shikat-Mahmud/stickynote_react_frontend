import { useState, useEffect } from "react";
import { apiBaseUrl, apiStorageUrl } from "../../../config";
import axiosClient from "../../../utils/axiosClient";
import axios from "axios";

export default function ProfileManageForm({ user }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    gender: user?.gender || "",
    country: user?.country || "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(user?.avater ? `${apiStorageUrl}/${user.avater}` : "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [countries, setCountries] = useState([]); // 🆕

  // 🆕 Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get("https://restcountries.com/v3.1/all?fields=name,cca2");
        const sorted = res.data
          .map((country) => country.name.common)
          .sort((a, b) => a.localeCompare(b));
        setCountries(sorted);
      } catch (error) {
        console.error("Failed to load countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (avatarFile) data.append("avater", avatarFile);

      const res = await axiosClient.putForm(`${apiBaseUrl}/profile/${user.id}`, data);
      if (res.data.success) {
        setMessage("✅ Profile updated successfully!");
      } else {
        setMessage("❌ Failed to update profile");
      }
    } catch (error) {
      console.error("Update error:", error);
      setMessage("❌ An error occurred while updating profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Management</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="gender" className="block text-gray-700 font-medium mb-1">Gender</label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:outline-none"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="country" className="block text-gray-700 font-medium mb-1">Country</label>
          <select
            name="country"
            id="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:outline-none"
          >
            <option value="">Select Country</option>
            {countries.length > 0 ? (
              countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))
            ) : (
              <option disabled>Loading countries...</option>
            )}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="avater" className="block text-gray-700 font-medium mb-1">Profile Picture</label>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {preview && (
            <label htmlFor="avater" className="cursor-pointer">
              <img
                src={preview}
                alt="Preview"
                className="w-16 h-16 rounded-full object-cover border border-gray-300 mx-auto sm:mx-0"
              />
            </label>
          )}
          <input
            type="file"
            name="avater"
            id="avater"
            accept="image/*"
            onChange={handleAvatarChange}
            className="block text-sm text-gray-700 w-full sm:w-auto"
          />
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className={`bg-orange-400 text-white px-5 py-2.5 rounded-lg hover:bg-orange-500 transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {message && (
        <div
          className={`text-sm font-medium mt-2 ${message.includes("✅") ? "text-green-600" : "text-red-500"}`}
        >
          {message}
        </div>
      )}
    </form>
  );
}
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { setPageTitle } from "../../utils/setPageTitle";
import ProfileCard from "./Components/ProfileCard";
import ProfileAbout from "./Components/ProfileAbout";
import ProfilePosts from "./Components/ProfilePosts";
import axiosClient from "../../utils/axiosClient";
import ChatButton from "../Message/Component/ChatButton";

export default function UserProfile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("about");
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    setPageTitle("User Profile");

    const fetchUserData = async () => {
      try {
        const res = await axiosClient.get(`/user/${id}`);
        setUserData(res.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const res = await axiosClient.get(`/user/${id}/posts`);
        setUserPosts(res.data.posts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
    fetchUserPosts();
  }, [id]);

  if (!userData) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 pt-3 text-center page-title">
        {userData.name}'s Profile
      </h1>

      <div className="pt-4 pb-10 px-10 mx-0 md:mx-10 flex flex-col md:flex-row justify-center items-start gap-8">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/4 max-w-sm mx-auto">
          <ProfileCard user={userData} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Right Content Area */}
        <div className="w-full md:w-3/4">
          {activeTab === "about" && <ProfileAbout user={userData} />}
          {activeTab === "posts" && <ProfilePosts posts={userPosts} />}
        </div>
      </div>

      <ChatButton receiver={userData} />
    </div>
  );
}
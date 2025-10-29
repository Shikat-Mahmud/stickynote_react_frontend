import { useState, useEffect, useContext } from "react";
import { setPageTitle } from "../../utils/setPageTitle";
import { AuthContext } from "../../contexts/AuthContext";
import ProfileCard from "./Components/ProfileCard";
import ProfileManageForm from "./Components/ProfileManageForm";
import PasswordManageForm from "./Components/PasswordManageForm";
import NewPostButton from "../Dashboard/Components/Post/NewPostButton";
import CreatePostModal from "../Dashboard/Components/Post/CreatePost";
import ProfilePosts from "./Components/ProfilePosts";

export default function Profile() {
    const [activeTab, setActiveTab] = useState("profile");
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    // const [userPosts, setUserPosts] = useState([]);

    const handlePostCreated = () => {
        setShowModal(false);
    };

    useEffect(() => {
        setPageTitle("Profile");
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 pt-3 text-center page-title">
                Profile
            </h1>
            <div className="pt-4 pb-10 px-10 mx-0 md:mx-10 flex flex-col md:flex-row justify-center items-start gap-8">
                {/* Left Sidebar */}
                <div className="w-full md:w-1/4 max-w-sm mx-auto">
                    <ProfileCard activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>

                {/* Right Content Area */}
                {activeTab === "profile" || activeTab === "password" ? (
                    <div className="w-full md:w-3/4 bg-white shadow-lg p-8 border-t-4 border-orange-400">
                        {activeTab === "profile" && <ProfileManageForm user={user} />}
                        {activeTab === "password" && <PasswordManageForm />}
                    </div>
                ) : (
                    <div className="w-full md:w-3/4">
                        {activeTab === "posts" && <ProfilePosts posts={user.posts} />}
                    </div>
                )}
            </div>

            {user && (
                <div className="fixed bottom-5 right-5">
                    <NewPostButton onClick={() => setShowModal(true)} />
                    {showModal && (
                        <CreatePostModal
                            user={user}
                            onClose={() => setShowModal(false)}
                            onPostCreated={handlePostCreated}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
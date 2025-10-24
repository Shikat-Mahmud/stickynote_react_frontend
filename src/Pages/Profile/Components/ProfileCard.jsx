import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProfileTabs from "./ProfileTabs";
import axiosClient from "../../../utils/axiosClient";
import { apiBaseUrl } from "../../../config";
import { AuthContext } from "../../../contexts/AuthContext";

export default function ProfileCard({ activeTab, setActiveTab }) {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            await axiosClient.post(`${apiBaseUrl}/logout`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });

            localStorage.removeItem("token");
            setUser(null);
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error.response?.data || error.message);
        }
    };

    return (
        <div className="square-card relative p-6 border-t-4 border-green-500 bg-white shadow-md rounded-2xl overflow-hidden">
            <img src="/assets/icons/alpin.svg" alt="pin" className="pin-icon" />

            <div className="flex flex-col items-center text-center">
                <img
                    src={user.avatar || `/assets/icons/male_avater.png`}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-green-500 object-cover mb-4"
                />
                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-500 text-sm mb-4">{user.email}</p>

                <ProfileTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onLogout={handleLogout}
                />
            </div>
        </div>
    );
}
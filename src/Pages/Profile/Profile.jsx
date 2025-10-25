import { useState, useEffect, useContext } from "react";
import { setPageTitle } from "../../utils/setPageTitle";
import { AuthContext } from "../../contexts/AuthContext";
import ProfileCard from "./Components/ProfileCard";
import ProfileManageForm from "./Components/ProfileManageForm";
import PasswordManageForm from "./Components/PasswordManageForm";

export default function Profile() {
    const [activeTab, setActiveTab] = useState("profile");
    const { user } = useContext(AuthContext);

    useEffect(() => {
        setPageTitle("Profile");
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 pt-3 text-center">
                Profile
            </h1>
        <div className="pt-4 pb-10 px-10 mx-0 md:mx-10 flex flex-col md:flex-row justify-center items-start gap-8">
            {/* Left Sidebar */}
            <div className="w-full md:w-1/4 max-w-sm mx-auto">
                <ProfileCard activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            {/* Right Content Area */}
            <div className="w-full md:w-3/4 bg-white shadow-lg p-8 border-t-4 border-orange-400">
                {activeTab === "profile" && <ProfileManageForm user={user} />}
                {activeTab === "password" && <PasswordManageForm />}
            </div>
        </div>
        </div>
    );
}
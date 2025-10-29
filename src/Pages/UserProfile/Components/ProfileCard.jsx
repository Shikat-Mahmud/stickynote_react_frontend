import { useState } from "react";
import { apiStorageUrl } from "../../../config";
import FollowButton from "../../../components/Follow/FollowButton";
import randomAvatar from "../../../components/Utility/GenerateRandomAvatar";

export default function ProfileCard({ user, activeTab, setActiveTab }) {
    const [randomCardAvater] = useState(randomAvatar);

    return (
        <div className="square-card relative p-6 border-t-4 border-green-500 bg-white shadow-md rounded-2xl overflow-hidden">
            <img src="/assets/icons/alpin.svg" alt="pin" className="pin-icon" />
            <div className="flex flex-col items-center text-center">
                <img
                    src={
                        user.avater ? `${apiStorageUrl}/${user.avater}`
                            : `/assets/icons/${user?.gender == 'male'
                                ? 'male_avater.png'
                                : (user?.gender == 'female'
                                    ? 'female_avater.png'
                                    : randomCardAvater
                                )
                            }`
                    }
                    alt={user.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-3"
                />
                <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                <p className="text-sm text-gray-500">
                    {user.uid} <br />
                    {user.email}
                </p>

                <div className="flex justify-center gap-4 mt-3 text-gray-600 text-sm">
                    <div><b>{user.posts_count || 0}</b> Notes</div>
                    <div><b>{user.followers_count || 0}</b> Followers</div>
                    <div><b>{user.followings_count || 0}</b> Following</div>
                </div>
                <FollowButton targetUserId={user.id} initialFollowing={user.is_following} className={`mt-3 ${user.is_following ? 'bg-gray-200' : ''}`} />
            </div>

            <div className="flex justify-around mt-3">
                <button
                    onClick={() => setActiveTab("about")}
                    className={`flex-1 py-3 font-medium ${activeTab === "about" ? "border-t-2 bg-orange-200 border-orange-400 shadow-md" : "bg-gray-50"
                        }`}
                    style={activeTab === "about" ? { boxShadow: '0 5px 5px rgba(0, 0, 0, 0.20)' } : {}}
                >
                    <i className="ri-information-2-line me-2"></i>
                    About
                </button>
                <button
                    onClick={() => setActiveTab("posts")}
                    className={`flex-1 py-3 font-medium ${activeTab === "posts" ? "border-t-2 bg-orange-200 border-orange-400 shadow-md" : "bg-gray-50"
                        }`}
                    style={activeTab === "posts" ? { boxShadow: '0 5px 5px rgba(0, 0, 0, 0.20)' } : {}}
                >
                    <i className="ri-sticky-note-line me-2"></i>
                    Notes
                </button>
            </div>
        </div>
    );
}

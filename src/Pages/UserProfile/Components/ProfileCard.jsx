import { useState } from "react";
import { apiStorageUrl } from "../../../config";
import FollowButton from "../../../components/Follow/FollowButton";
import randomAvatar from "../../../components/Utility/GenerateRandomAvatar";

export default function ProfileCard({ user, activeTab, setActiveTab }) {
    const [randomCardAvater] = useState(randomAvatar);

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
            <div className="p-6 text-center">
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
                <p className="text-sm text-gray-500">{user.email}</p>

                <div className="flex justify-center gap-4 mt-3 text-gray-600 text-sm">
                    <div><b>{user.posts_count || 0}</b> Notes</div>
                    <div><b>{user.followers_count || 0}</b> Followers</div>
                    <div><b>{user.followings_count || 0}</b> Following</div>
                </div>
                <FollowButton targetUserId={user.id} initialFollowing={user.is_following} className={`mt-3 ${user.is_following ? 'bg-gray-200' : ''}`} />
            </div>

            <div className="flex justify-around border-t border-gray-200">
                <button
                    onClick={() => setActiveTab("about")}
                    className={`flex-1 py-3 font-medium ${activeTab === "about" ? "bg-orange-100 text-orange-600" : "hover:bg-gray-50"
                        }`}
                >
                    About
                </button>
                <button
                    onClick={() => setActiveTab("posts")}
                    className={`flex-1 py-3 font-medium ${activeTab === "posts" ? "bg-orange-100 text-orange-600" : "hover:bg-gray-50"
                        }`}
                >
                    Posts
                </button>
            </div>
        </div>
    );
}

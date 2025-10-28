import React, { useState } from 'react';
import CommentSection from '../Comment/CommentSection';
import { timeAgo } from '../../../../components/Utility/TimeAgo';
import { useAuth } from '../../../../contexts/AuthContext';
import Reactions from '../../../../components/Reaction/Reactions';
import { apiBaseUrl, apiStorageUrl } from '../../../../config';
import axiosClient from '../../../../utils/axiosClient';
import CountryFlag from '../../../../components/Utility/CountryFlag';
import FollowButton from '../../../../components/Follow/FollowButton';
import { useNavigate } from 'react-router-dom';
import randomAvatar from '../../../../components/Utility/GenerateRandomAvatar';
import randomColor from '../../../../components/Utility/GenerateRandomColor';


function PostCard({ post, onPostUpdate }) {
    const [showComments, setShowComments] = useState(false);
    const { user } = useAuth();
    const [randomCardColor] = useState(randomColor);
    const [randomCardAvater] = useState(randomAvatar);
    const navigate = useNavigate();

    const isUserProfilePage = location.pathname.includes('/user-profile');

    const goToUserProfile = () => {
        if (post.user.id === user?.id) {
            navigate('/profile');
            return;
        }
        navigate(`/user-profile/${post.user.id}`);
    };

    const handleReaction = async (reactionType) => {
        if (!user) {
            alert('Please log in to react.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            await axiosClient.post(
                `${apiBaseUrl}/posts/${post.id}/react`,
                { type: reactionType },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            onPostUpdate();
        } catch (error) {
            console.error("Error reacting to post:", error);
        }
    };

    return (
        <div className={`square-card relative p-6 w-96 max-w-full sm:max-w-sm border-t-4 ${randomCardColor} overflow-hidden`}>
            <img src="/assets/icons/alpin.svg" alt="pin" className="pin-icon" />

            <div className="flex flex-row items-center justify-between mb-4">
                <div className="flex items-center">
                    <img
                        src={
                            post.user.avater ? `${apiStorageUrl}/${post.user.avater}`
                                : `/assets/icons/${post.user?.gender == 'male'
                                    ? 'male_avater.png'
                                    : (post.user?.gender == 'female'
                                        ? 'female_avater.png'
                                        : randomCardAvater
                                    )
                                }`
                        }
                        alt="user"
                        className="text-3xl mr-3 max-h-12 h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-1">
                            <span onClick={goToUserProfile} className="cursor-pointer hover:underline">
                                {post.user.name}
                            </span>
                            {post.user.country && !isUserProfilePage && (
                                <CountryFlag countryName={post.user.country} />
                            )}

                            {/* Hide Follow button on user profile page */}
                            {!isUserProfilePage && (
                                <FollowButton
                                    targetUserId={post.user.id}
                                    initialFollowing={post.user.is_following}
                                    className="ms-3"
                                />
                            )}                        </h3>
                        <div className="flex items-center">
                            <p className="text-sm text-gray-600">{post.user.uid}</p>
                            <span className="text-xs text-gray-500 ms-2">
                                <i className="ri-time-line pe-0.5"></i>
                                {timeAgo(post.created_at)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <p className="font-medium text-gray-700 mb-4 whitespace-pre-wrap w-full">{post.content}</p>

            <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                <Reactions
                    reactionCounts={post.reaction_counts}
                    onReact={handleReaction}
                    isAuthenticated={!!user}
                />
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center space-x-1 hover:text-gray-800"
                >
                    <i className="ri-chat-1-line text-xl"></i>
                    <span>{post.comments_count || post.comments.length || 0} comments</span>
                </button>
            </div>

            {showComments && <CommentSection postId={post.id} />}
        </div>
    );
}

export default PostCard;
import { useState, useEffect } from 'react';
import { apiBaseUrl } from '../../config';
import axiosClient from '../../utils/axiosClient';

export default function FollowButton({ targetUserId, initialFollowing = false, className = ''}) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialFollowing === undefined) {
      (async () => {
        try {
          const res = await axiosClient.get(`${apiBaseUrl}/users/${targetUserId}/follow-status`);
          setIsFollowing(res.data.data.is_following);
        } catch (err) {
            console.error('Error fetching follow status', err);
        }
      })();
    }
  }, [targetUserId, initialFollowing]);

  const toggleFollow = async () => {
    setLoading(true);
    try {
      if (isFollowing) {
        await axiosClient.delete(`${apiBaseUrl}/users/${targetUserId}/follow`);
        setIsFollowing(false);
      } else {
        await axiosClient.post(`${apiBaseUrl}/users/${targetUserId}/follow`);
        setIsFollowing(true);
      }
    } catch (err) {
      console.error('Follow toggle error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
      <button
        onClick={toggleFollow}
        disabled={loading}
        className={`px-2 py-1 rounded-md text-sm font-medium ${className} ${isFollowing ? '' : 'bg-gray-700 hover:bg-gray-800 text-white'}`}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
  );
}

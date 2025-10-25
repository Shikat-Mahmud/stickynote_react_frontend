import { useState, useEffect } from 'react';
import { apiBaseUrl } from '../../config';
import axiosClient from '../../utils/axiosClient';

export default function ProfileFollowButton({ targetUserId, initialFollowing = false, initialCount = 0 }) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialFollowing === undefined) {
      (async () => {
        try {
          const res = await axiosClient.get(`${apiBaseUrl}/users/${targetUserId}/follow-status`);
          setIsFollowing(res.data.data.is_following);
          setCount(res.data.data.followers_count);
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
        setCount((c) => Math.max(0, c - 1));
      } else {
        await axiosClient.post(`${apiBaseUrl}/users/${targetUserId}/follow`);
        setIsFollowing(true);
        setCount((c) => c + 1);
      }
    } catch (err) {
      console.error('Follow toggle error', err);
      // optionally show error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inline-flex items-center gap-3">
      <button
        onClick={toggleFollow}
        disabled={loading}
        className={`px-3 py-1 rounded-md text-sm font-medium ${isFollowing ? 'bg-gray-200 text-gray-700' : 'bg-orange-500 text-white'}`}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>

      <span className="text-sm text-gray-600">
        {count}
        <span className="ml-1">followers</span>
      </span>
    </div>
  );
}

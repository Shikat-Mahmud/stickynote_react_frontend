import { useEffect, useState } from 'react';
import axiosClient from '../../utils/axiosClient';
import { apiBaseUrl } from '../../config';
import FollowButton from './ProfileFollowButton';

export default function FollowingsList({ userId }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axiosClient.get(`${apiBaseUrl}/users/${userId}/followings`);
        if (!mounted) return;
        setList(res.data.data.data || res.data.data); // depending on pagination wrapper
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [userId]);

  if (loading) return <div>Loading followings...</div>;
  if (!list.length) return <div>No followings yet.</div>;

  return (
    <ul className="space-y-3">
      {list.map((u) => (
        <li key={u.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={u.avatar ? `/storage/${u.avatar}` : '/default-avatar.png'} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <div className="font-medium">{u.name}</div>
              <div className="text-sm text-gray-500">{u.uid}</div>
            </div>
          </div>
          <FollowButton targetUserId={u.id} />
        </li>
      ))}
    </ul>
  );
}

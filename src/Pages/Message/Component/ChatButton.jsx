import { useState, useEffect, useCallback } from "react";
import ChatPanel from "../ChatPanel";
import axiosClient from "../../../utils/axiosClient";
import { apiBaseUrl } from "../../../config";

export default function ChatButton({ receiver }) {
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchUnreadCount = useCallback(async () => {
        if (!receiver) return;
        try {
            const token = localStorage.getItem("token");
            const res = await axiosClient.get(`${apiBaseUrl}/messages/unread-count/${receiver.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUnreadCount(res.data.count || 0);
        } catch (err) {
            console.error("Failed to fetch unread count:", err);
        }
    }, [receiver]); // receiver is a dependency

    useEffect(() => {
        fetchUnreadCount();
        const id = setInterval(fetchUnreadCount, 5000);
        return () => clearInterval(id);
    }, [fetchUnreadCount]); // now safe to include

    useEffect(() => {
        if (isOpen) setUnreadCount(0);
    }, [isOpen]);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-gray-800 hover:bg-gray-900 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg transition-all z-40 cursor-pointer"
                aria-label="Open chat"
            >
                <i className="ri-wechat-line"></i>

                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                        {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                )}
            </button>

            <ChatPanel
                receiver={receiver}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}
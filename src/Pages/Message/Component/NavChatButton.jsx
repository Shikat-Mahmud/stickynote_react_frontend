import { useState, useEffect, useRef } from "react";
import ChatPanel from "../ChatPanel";
import axiosClient from "../../../utils/axiosClient";
import { apiBaseUrl, apiStorageUrl } from "../../../config";
import randomAvatar from "../../../components/Utility/GenerateRandomAvatar";

export default function NavChatButton({ onOpenAnotherDropdown }) {
    const [randomCardAvater] = useState(randomAvatar);
    const [chatOpen, setChatOpen] = useState(false);
    const [chatList, setChatList] = useState([]);
    const [unreadTotal, setUnreadTotal] = useState(0);
    const [selectedReceiver, setSelectedReceiver] = useState(null);
    const chatListRef = useRef(null);

    console.log(selectedReceiver)

    const fetchUnreadTotal = async () => {
        try {
            const { data } = await axiosClient.get(`${apiBaseUrl}/chat/unread-count`);
            setUnreadTotal(data.count);
        } catch (err) {
            console.error("Unread total fetch error:", err);
        }
    };

    const fetchRecentUsers = async () => {
        try {
            const { data } = await axiosClient.get(`${apiBaseUrl}/chat/recent-users`);
            setChatList(data);
        } catch (err) {
            console.error("Recent users fetch error:", err);
        }
    };

    useEffect(() => {
        fetchUnreadTotal();
        const id = setInterval(fetchUnreadTotal, 10000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (chatOpen) fetchRecentUsers();
    }, [chatOpen]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (chatListRef.current && !chatListRef.current.contains(e.target)) {
                setChatOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const truncate = (str, max = 20) => {
        if (!str && str !== "") return "";
        return str.length > max ? `${str.slice(0, max)}...` : str;
    };

    return (
        <>
            <div className="md:relative" ref={chatListRef}>
                <button
                    onClick={() => {
                        setChatOpen((prev) => !prev);
                        onOpenAnotherDropdown("chat");
                    }}
                    className="relative text-2xl focus:outline-none"
                >
                    <i className="ri-wechat-line"></i>
                    {unreadTotal > 0 && (
                        <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">
                            {unreadTotal}
                        </span>
                    )}
                </button>

                {chatOpen && (
                    <div
                        className="absolute mt-3 bg-white text-gray-800 rounded-lg shadow-lg p-3 z-50 overflow-y-auto transition-transform transform origin-top animate-fadeIn w-full left-0 md:w-64 md:right-0 md:left-auto md:translate-x-0"
                        style={{ maxHeight: "400px" }}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-sm">Recent Chats</span>
                            <button
                                onClick={() => setChatOpen(false)}
                                className="text-gray-500 hover:text-red-500 text-sm"
                            >
                                ✕
                            </button>
                        </div>

                        {chatList.length ? (
                            chatList.map(({ user: u, unread_count, last_message }) => (
                                <div
                                    key={u.id}
                                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                                    onClick={() => {
                                        setSelectedReceiver(u);
                                        setChatOpen(false);
                                    }}
                                >
                                    <img
                                        src={
                                            u.avater
                                                ? `${apiStorageUrl}/${u.avater}`
                                                : `/assets/icons/${u.gender === "male"
                                                    ? "male_avater.png"
                                                    : (u.gender == 'female'
                                                        ? 'female_avater.png'
                                                        : randomCardAvater
                                                    )
                                                }`
                                        }
                                        className="w-10 h-10 rounded-full object-cover"
                                        alt={u.name}
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">{truncate(u.name, 25)}</p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {truncate(last_message ?? "", 20)}
                                        </p>
                                    </div>
                                    {unread_count > 0 && (
                                        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                                            {unread_count}
                                        </span>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No recent chats</p>
                        )}
                    </div>
                )}
            </div>

            {selectedReceiver && (
                <ChatPanel
                    receiver={selectedReceiver}
                    isOpen={!!selectedReceiver}
                    onClose={() => setSelectedReceiver(null)}
                />
            )}
        </>
    );
}

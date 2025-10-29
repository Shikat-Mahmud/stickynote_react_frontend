import { useCallback, useEffect, useRef, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { apiBaseUrl, apiStorageUrl } from "../../config";
import randomAvatar from "../../components/Utility/GenerateRandomAvatar";

export default function ChatPanel({ receiver, isOpen, onClose }) {
    const [randomCardAvater] = useState(randomAvatar);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const scrollerRef = useRef(null);
    const messageRefs = useRef({});

    // Helper function to format date labels
    const getDateLabel = (dateString) => {
        const msgDate = new Date(dateString);
        const now = new Date();

        const isToday =
            msgDate.getDate() === now.getDate() &&
            msgDate.getMonth() === now.getMonth() &&
            msgDate.getFullYear() === now.getFullYear();

        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        const isYesterday =
            msgDate.getDate() === yesterday.getDate() &&
            msgDate.getMonth() === yesterday.getMonth() &&
            msgDate.getFullYear() === yesterday.getFullYear();

        if (isToday) return "Today";
        if (isYesterday) return "Yesterday";

        return msgDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const fetchMessages = useCallback(async () => {
        if (!receiver) return;
        try {
            const token = localStorage.getItem("token");
            const res = await axiosClient.get(`${apiBaseUrl}/messages/${receiver.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessages(res.data || []);
        } catch (err) {
            console.error("Failed to load messages:", err);
        }
    }, [receiver]);

    // Scroll logic: scroll to first unread message
    useEffect(() => {
        if (!isOpen || !messages.length) return;

        const firstUnread = messages.find(
            (m) => !m.is_read && m.receiver_id !== receiver.id
        );

        if (firstUnread && messageRefs.current[firstUnread.id]) {
            messageRefs.current[firstUnread.id].scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [messages, isOpen, receiver]);


    // Detect visibility of each message
    useEffect(() => {
        if (!isOpen) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleUnread = entries
                    .filter((e) => e.isIntersecting)
                    .map((e) => parseInt(e.target.dataset.id))
                    .filter((id) => {
                        const msg = messages.find((m) => m.id === id);
                        return msg && !msg.is_read && msg.receiver_id !== receiver.id;
                    });

                if (visibleUnread.length) markAsRead(visibleUnread);
            },
            { threshold: 0.6 } // message must be 60% visible
        );

        Object.values(messageRefs.current).forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [messages, receiver, isOpen]);

    const markAsRead = async (ids) => {
        try {
            const token = localStorage.getItem("token");
            await axiosClient.post(
                `${apiBaseUrl}/messages/mark-read`,
                { message_ids: ids },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessages((prev) =>
                prev.map((m) =>
                    ids.includes(m.id) ? { ...m, is_read: true, read_at: new Date().toISOString() } : m
                )
            );
        } catch (err) {
            console.error("Mark read failed:", err);
        }
    };

    const sendMessage = async (e) => {
        e?.preventDefault();
        if (!input.trim()) return;

        try {
            const token = localStorage.getItem("token");
            const res = await axiosClient.post(
                `${apiBaseUrl}/messages`,
                { receiver_id: receiver.id, message: input },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessages((prev) => [...prev, res.data]);
            setInput("");
            setTimeout(() => {
                if (scrollerRef.current)
                    scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
            }, 50);
        } catch (err) {
            console.error("Send message failed:", err);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    useEffect(() => {
        if (isOpen && receiver) fetchMessages();

        // poll every 2 seconds
        const id = setInterval(fetchMessages, 2000);
        return () => clearInterval(id);
    }, [isOpen, receiver, fetchMessages]);

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/30 transition-opacity duration-300 z-40 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
                aria-hidden="true"
            />

            <aside
                aria-hidden={!isOpen}
                className={`fixed top-0 right-0 z-50 h-full transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          w-full sm:w-96 bg-white shadow-xl flex flex-col`}
                style={{ maxWidth: "100%" }}
            >
                <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-600 text-white">
                    <div className="flex items-center justify-center gap-3">
                        <img
                            src={
                                receiver.avater
                                    ? `${apiStorageUrl}/${receiver.avater}`
                                    : `/assets/icons/${receiver?.gender == "male"
                                        ? "male_avater.png"
                                        : receiver?.gender == "female"
                                            ? "female_avater.png"
                                            : randomCardAvater
                                    }`
                            }
                            alt={receiver.name}
                            className="w-12 h-12 rounded-full object-cover mx-auto"
                        />
                        <div>
                            <div className="font-semibold">{receiver?.name || "User"}</div>
                            <div className="text-sm font-medium">{receiver?.uid || "Chat"}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={fetchMessages}
                            className="text-white px-2 py-1 rounded"
                            title="Refresh"
                        >
                            <i className="ri-reset-right-line"></i>
                        </button>
                        <button onClick={onClose} className="text-2xl leading-none px-3">
                            <i className="ri-close-line"></i>
                        </button>
                    </div>
                </div>

                {/* Messages area */}
                <div ref={scrollerRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                    {!messages.length && (
                        <div className="text-center text-sm text-gray-400">No messages yet. Say hi 👋</div>
                    )}

                    {messages.reduce((acc, msg, idx) => {
                        const mine = msg.sender_id !== receiver.id;
                        const msgDateLabel = getDateLabel(msg.created_at);
                        const prevMsg = messages[idx - 1];
                        const prevMsgDateLabel = prevMsg ? getDateLabel(prevMsg.created_at) : null;

                        // Insert date divider if first message or day changed
                        if (idx === 0 || msgDateLabel !== prevMsgDateLabel) {
                            acc.push(
                                <div key={`divider-${msgDateLabel}`} className="flex justify-center items-center flex-col my-4">
                                    <span className="text-xs text-gray-500">{msgDateLabel}</span>
                                    <hr className="w-4/5 border-t border-gray-300 mt-1" />
                                </div>
                            );
                        }

                        acc.push(
                            <div
                                key={msg.id}
                                data-id={msg.id}
                                ref={(el) => (messageRefs.current[msg.id] = el)}
                                className={`max-w-full ${mine ? "ml-auto text-right" : "mr-auto text-left"}`}
                            >
                                <div
                                    className={`${mine
                                        ? "bg-white border border-gray-400 text-gray-800 rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl rounded-br-none"
                                        : "bg-blue-500 text-white rounded-tr-2xl rounded-br-2xl rounded-bl-2xl rounded-tl-none"
                                        } inline-block px-3 py-2 shadow-sm`}
                                >
                                    <div className="whitespace-pre-wrap text-sm">{msg.message}</div>
                                    <div
                                        className={`flex items-center justify-between mt-1 text-xs ${mine ? "text-gray-500" : "text-white"
                                            }`}
                                    >
                                        <span>
                                            {new Date(msg.created_at).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                        {mine && (
                                            <span
                                                className={`ms-1 ${msg.read_at ? "text-blue-500" : "text-gray-400"} flex items-center`}
                                                title={msg.read_at ? "Read" : "Sent"}
                                            >
                                                {msg.is_read ? (
                                                    <i className="ri-check-double-line"></i>
                                                ) : (
                                                    <i className="ri-check-line"></i>
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );

                        return acc;
                    }, [])}
                </div>

                <form onSubmit={sendMessage} className="p-3 border-t bg-white flex gap-2 items-end">
                    <textarea
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="flex-1 resize-none border rounded-lg p-2 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                    >
                        <i className="ri-send-plane-fill text-xl"></i>
                    </button>
                </form>
            </aside>
        </>
    );
}

import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../../utils/axiosClient";
import { apiBaseUrl, apiStorageUrl } from "../../../../config";
import randomAvatar from "../../../Utility/GenerateRandomAvatar";
import { AuthContext } from "../../../../contexts/AuthContext";

export default function NavSearch({ onOpenAnotherDropdown }) {
    const { user } = useContext(AuthContext);
    const [searchOpen, setSearchOpen] = useState(false);
    const navigate = useNavigate();
    const [randomCardAvater] = useState(randomAvatar);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState({ users: [], posts: [] });
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (query.trim() === "") {
            setResults({ users: [], posts: [] });
            return;
        }

        const delay = setTimeout(async () => {
            try {
                const res = await axiosClient.get(`${apiBaseUrl}/search?q=${query}`);
                setResults(res.data);
            } catch (err) {
                console.error(err);
            }
        }, 400);

        return () => clearTimeout(delay);
    }, [query]);

    const handleToggle = () => {
        onOpenAnotherDropdown("search");
        setSearchOpen((prev) => !prev);
        if (!searchOpen) setTimeout(() => inputRef.current?.focus(), 100);
    };

    const handleClose = () => {
        setSearchOpen(false);
        setQuery("");
        setResults({ users: [], posts: [] });
    };

    const handleNavigate = (userId) => {
        userId !== user.id ?
            navigate(`/user-profile/${userId}`) :
            navigate('/profile');
        handleClose();
    };

    const containerStyle = isMobile
        ? "fixed inset-0 z-50 flex flex-col"
        : "absolute right-0 top-12 shadow-md rounded-xl w-96 max-h-[400px] overflow-y-auto";

    return (
        <div className="relative" ref={containerRef}>
            <button onClick={handleToggle} className="text-xl hover:text-green-400 transition">
                <i className="ri-search-line"></i>
            </button>

            {searchOpen && (
                <div className={`animate-fadeIn bg-white text-gray-800 ${containerStyle}`}>
                    <div className="flex items-center border-b px-3 py-2">
                        <i className="ri-search-line text-lg text-gray-500 me-2"></i>
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search users or posts..."
                            className="flex-1 bg-transparent outline-none text-sm"
                        />
                        <button onClick={handleClose} className="text-gray-500 text-lg">
                            <i className="ri-close-large-line"></i>
                        </button>
                    </div>

                    {/* Suggestions */}
                    <div className="p-3 overflow-y-auto">
                        {results.users.length === 0 && results.posts.length === 0 && query ? (
                            <p className="text-gray-500 text-sm text-center">No results found</p>
                        ) : (
                            <>
                                {results.users.length > 0 && (
                                    <div>
                                        <h4 className="text-xs font-semibold text-gray-400 uppercase mb-1">Users</h4>
                                        {results.users.map((user) => (
                                            <div
                                                key={user.id}
                                                onClick={() => handleNavigate(user.id)}
                                                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                                            >
                                                <img
                                                    src={
                                                        user.avatar
                                                            ? `${apiStorageUrl}/${user.avatar}`
                                                            : `/assets/icons/${user.gender === "male"
                                                                ? "male_avater.png"
                                                                : (user?.gender == 'female'
                                                                    ? 'female_avater.png'
                                                                    : randomCardAvater
                                                                )
                                                            }`
                                                    }
                                                    alt={user.name}
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                <div>
                                                    <p className="font-medium text-sm">{user.name}</p>
                                                    <p className="text-xs text-gray-500">{user.uid}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {results.posts.length > 0 && (
                                    <div className="mt-3">
                                        <h4 className="text-xs font-semibold text-gray-400 uppercase mb-1">Posts</h4>
                                        {results.posts.map((post) => (
                                            <div
                                                key={post.id}
                                                onClick={() => handleNavigate(post.user?.id)}
                                                className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                                            >
                                                <p className="font-medium text-sm">{post.user?.name || ""}</p>
                                                <p className="text-xs text-gray-500 line-clamp-1">{post.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

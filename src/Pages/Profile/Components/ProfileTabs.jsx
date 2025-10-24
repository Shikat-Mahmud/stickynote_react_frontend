export default function ProfileTabs({ activeTab, setActiveTab, onLogout }) {
  const tabs = [
    { key: "profile", label: "Profile Manage", icon: "ri-user-3-line" },
    { key: "password", label: "Password Manage", icon: "ri-lock-password-line" },
    { key: "logout", label: "Logout", icon: "ri-logout-circle-r-line", isLogout: true },
  ];

  return (
    <div className="w-full space-y-2 mt-4">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => (tab.isLogout ? onLogout() : setActiveTab(tab.key))}
          className={`flex items-center justify-center md:justify-start w-full px-4 py-2 rounded-lg transition-all duration-200 font-medium
            ${activeTab === tab.key
              ? "bg-green-500 text-white shadow-md"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"}
          `}
        >
          <i className={`${tab.icon} mr-2 text-lg`}></i>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
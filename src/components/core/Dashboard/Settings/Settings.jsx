import { useState } from "react"
import { AiOutlineUser, AiOutlineLock, AiOutlineCamera, AiOutlineDelete } from "react-icons/ai"
import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile")

  const tabs = [
    { id: "profile", label: "Profile", icon: AiOutlineUser },
    { id: "password", label: "Password", icon: AiOutlineLock },
    { id: "picture", label: "Profile Picture", icon: AiOutlineCamera },
    { id: "delete", label: "Delete Account", icon: AiOutlineDelete },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-richblack-5 mb-2">Settings</h1>
        <p className="text-richblack-300">Manage your account settings and preferences</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 bg-richblack-800 p-2 rounded-lg border border-richblack-700">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg"
                  : "text-richblack-300 hover:text-richblack-5 hover:bg-richblack-700"
              }`}
            >
              <Icon className="text-lg" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        {activeTab === "profile" && (
          <div className="animate-fade-in">
            <EditProfile />
          </div>
        )}
        {activeTab === "password" && (
          <div className="animate-fade-in">
            <UpdatePassword />
          </div>
        )}
        {activeTab === "picture" && (
          <div className="animate-fade-in">
            <ChangeProfilePicture />
          </div>
        )}
        {activeTab === "delete" && (
          <div className="animate-fade-in">
            <DeleteAccount />
          </div>
        )}
      </div>
    </div>
  )
}
import { useEffect } from "react"
import { RiEditBoxLine } from "react-icons/ri"
import { AiOutlineUser, AiOutlineMail, AiOutlineCalendar, AiOutlineIdcard, AiOutlineCheckCircle } from "react-icons/ai"
import { BsInfoCircle } from "react-icons/bs"
import { FiPhone } from "react-icons/fi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"
import Img from './../../common/Img';

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate();

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-richblack-5 mb-2">My Profile</h1>
        <p className="text-richblack-300">Manage and view your account information</p>
      </div>

      {/* Profile Header Card */}
      <div className="relative bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-2xl border border-richblack-700 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl"></div>

        <div className="relative flex flex-col sm:flex-row items-center gap-6">
          {/* Profile Image */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <Img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className="relative aspect-square w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-500 shadow-2xl"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-richblack-5 mb-2 capitalize">
              {user?.firstName + " " + user?.lastName}
            </h2>
            <p className="text-base sm:text-lg text-richblack-300 mb-4">{user?.email}</p>

            <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 text-xs sm:text-sm">
              <span className="px-3 py-1 bg-richblack-700 rounded-full text-richblack-300 capitalize">
                {user?.accountType}
              </span>
              <span className="px-3 py-1 bg-richblack-700 text-richblack-300 rounded-full font-medium capitalize">
                Active Member
              </span>
              <span className="px-3 py-1 bg-richblack-700 text-richblack-300 rounded-full font-medium flex items-center gap-1 capitalize">
                <AiOutlineCheckCircle className="w-4 h-4" />
                Verified
              </span>
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex-shrink-0">
            <IconBtn
              text="Edit Profile"
              onclick={() => navigate("/dashboard/settings")}
              customClasses="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:from-blue-600 hover:to-blue-700"
            >
              <RiEditBoxLine />
            </IconBtn>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-xl border border-richblack-700 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <BsInfoCircle className="text-2xl text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-richblack-5">About</h3>
              <p className="text-richblack-300 text-xs sm:text-sm">Tell us about yourself</p>
            </div>
          </div>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
            customClasses="bg-richblack-700 text-richblack-5 hover:bg-richblack-600"
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="bg-richblack-700/50 rounded-lg p-3 sm:p-4 border border-richblack-600">
          <p className={`text-sm leading-relaxed ${user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400 italic"
            }`}>
            {user?.additionalDetails?.about ?? "You haven't added a bio yet. Click edit to tell others about yourself!"}
          </p>
        </div>
      </div>

      {/* Personal Details Section */}
      <div className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-xl border border-richblack-700 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <AiOutlineUser className="text-2xl text-richblack-900" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-richblack-5">Personal Details</h3>
              <p className="text-richblack-300 text-xs sm:text-sm">Your personal information</p>
            </div>
          </div>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
            customClasses="bg-richblack-700 text-richblack-5 hover:bg-richblack-600"
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-richblack-700/30 rounded-lg border border-richblack-600 hover:bg-richblack-700/50 transition-colors">
              <AiOutlineUser className="text-blue-400 text-lg sm:text-xl flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm text-richblack-400 mb-1">First Name</p>
                <p className="text-richblack-5 font-medium capitalize">{user?.firstName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-richblack-700/30 rounded-lg border border-richblack-600 hover:bg-richblack-700/50 transition-colors">
              <AiOutlineIdcard className="text-blue-400 text-lg sm:text-xl flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm text-richblack-400 mb-1">Account Type</p>
                <p className="text-richblack-5 font-medium capitalize">{user?.accountType}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-richblack-700/30 rounded-lg border border-richblack-600 hover:bg-richblack-700/50 transition-colors">
              <AiOutlineMail className="text-blue-400 text-lg sm:text-xl flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm text-richblack-400 mb-1">Email</p>
                <p className="text-richblack-5 font-medium">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-richblack-700/30 rounded-lg border border-richblack-600 hover:bg-richblack-700/50 transition-colors">
              <AiOutlineUser className="text-blue-400 text-lg sm:text-xl flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm text-richblack-400 mb-1">Gender</p>
                <p className="text-richblack-5 font-medium">
                  {user?.additionalDetails?.gender ?? "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-richblack-700/30 rounded-lg border border-richblack-600 hover:bg-richblack-700/50 transition-colors">
              <AiOutlineUser className="text-blue-400 text-lg sm:text-xl flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm text-richblack-400 mb-1">Last Name</p>
                <p className="text-richblack-5 font-medium capitalize">{user?.lastName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-richblack-700/30 rounded-lg border border-richblack-600 hover:bg-richblack-700/50 transition-colors">
              <FiPhone className="text-blue-400 text-lg sm:text-xl flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm text-richblack-400 mb-1">Phone Number</p>
                <p className="text-richblack-5 font-medium">
                  {user?.additionalDetails?.contactNumber ?? "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-richblack-700/30 rounded-lg border border-richblack-600 hover:bg-richblack-700/50 transition-colors">
              <AiOutlineCalendar className="text-blue-400 text-lg sm:text-xl flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm text-richblack-400 mb-1">Date of Birth</p>
                <p className="text-richblack-5 font-medium">
                  {formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Not specified"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
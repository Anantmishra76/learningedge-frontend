import { useEffect, useRef, useState } from "react"
import { FiUpload, FiCamera } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"

import { updateUserProfileImage } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"
import Img from './../../../common/Img';

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = () => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("profileImage", profileImage)

      dispatch(updateUserProfileImage(token, formData)).then(() => {
        setLoading(false)
      })
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  useEffect(() => {
    if (profileImage) {
      previewFile(profileImage)
    }
  }, [profileImage])

  return (
    <div className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-xl border border-richblack-700 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full">
          <FiCamera className="text-2xl text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-richblack-5">Profile Picture</h2>
          <p className="text-richblack-300 text-sm">Update your profile picture</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative group">
          <Img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <FiCamera className="text-white text-2xl" />
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="text-center sm:text-left">
            <p className="text-richblack-5 font-medium mb-2">Upload a new picture</p>
            <p className="text-richblack-300 text-sm">JPG, PNG or GIF. Max size 5MB.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg, image/jpg"
            />

            <button
              onClick={handleClick}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-richblack-700 hover:bg-richblack-600 text-richblack-5 rounded-lg transition-colors duration-200 border border-richblack-600"
            >
              <FiUpload className="text-lg" />
              Choose File
            </button>

            {profileImage && (
              <IconBtn
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
                disabled={loading}
                customClasses="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:from-blue-600 hover:to-blue-700"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
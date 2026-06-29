import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import ConfirmationModal from '@/components/common/ConfirmationModal';
import { deleteProfile } from "@/features/dashboard/services/SettingsAPI"

export default function DeleteAccount() {
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [check, setCheck] = useState(false);

  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className="bg-gradient-to-br from-pink-900 to-red-900 rounded-xl border border-pink-700 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-pink-200 rounded-full">
          <FiAlertTriangle className="text-2xl text-pink-900" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Delete Account</h2>
          <p className="text-pink-25 text-sm">Permanently delete your account</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-pink-950 bg-opacity-50 rounded-lg p-4 border border-pink-700">
          <p className="text-pink-25 text-sm leading-relaxed">
            <strong className="text-pink-200">Warning:</strong> Deleting your account is permanent and will remove all content associated with it. This includes:
          </p>
          <ul className="text-pink-25 text-sm mt-2 space-y-1 ml-4">
            <li>• Your profile and personal information</li>
            <li>• All enrolled courses and progress</li>
            <li>• Purchase history and certificates</li>
            <li>• Discussion posts and comments</li>
          </ul>
        </div>

        <div className="flex items-start gap-3 p-4 bg-richblack-800 rounded-lg border border-richblack-700">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 text-pink-600 bg-richblack-700 border-richblack-600 rounded focus:ring-pink-500 focus:ring-2"
            checked={check}
            onChange={() => setCheck(prev => !prev)}
          />
          <div className="flex-1">
            <p className="text-slate-900 text-sm font-medium mb-1">
              I understand the consequences
            </p>
            <button
              type="button"
              className={`text-sm font-medium transition-colors ${
                check
                  ? "text-pink-300 hover:text-pink-200 cursor-pointer"
                  : "text-slate-500 cursor-not-allowed"
              }`}
              onClick={() => check &&
                setConfirmationModal({
                  text1: "Are you absolutely sure?",
                  text2: "This action cannot be undone. Your account will be permanently deleted.",
                  btn1Text: "Delete Account",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(deleteProfile(token, navigate)),
                  btn2Handler: () => { setConfirmationModal(null); setCheck(false) },
                })
              }
              disabled={!check}
            >
              I want to delete my account permanently
            </button>
          </div>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}


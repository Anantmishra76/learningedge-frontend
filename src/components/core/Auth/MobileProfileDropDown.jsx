import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import Img from './../../common/Img';
import { logout } from "../../../services/operations/authAPI"

import { VscDashboard, VscSignOut } from "react-icons/vsc"

export default function MobileProfileDropDown() {
    const { user } = useSelector((state) => state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    if (!user) return null


    return (

        // Mobile profile section with dashboard and logout options

        <div className="relative w-full">
            {/* User Profile Header */}
            <div className="flex items-center gap-x-3 p-4 bg-richblack-700 rounded-lg mb-4">
                <Img
                    src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    className={'aspect-square w-[50px] rounded-full object-cover'}
                />
                <div className="flex flex-col">
                    <span className="text-slate-900 font-semibold">{user?.firstName} {user?.lastName}</span>
                    <span className="text-slate-600 text-sm">{user?.email}</span>
                </div>
            </div>

            {/* Menu Options */}
            <div className="flex flex-col space-y-2">
                <Link to="/dashboard/my-profile">
                    <div className="flex w-full items-center gap-x-3 py-3 px-4 text-base text-slate-700 hover:bg-richblack-700 rounded-lg transition-all">
                        <VscDashboard className="text-xl" />
                        Dashboard
                    </div>
                </Link>

                <div
                    onClick={() => {
                        dispatch(logout(navigate))
                    }}
                    className="flex w-full items-center gap-x-3 py-3 px-4 text-base text-slate-700 hover:bg-richblack-700 rounded-lg transition-all cursor-pointer"
                >
                    <VscSignOut className="text-xl" />
                    Logout
                </div>
            </div>
        </div>
    )
}


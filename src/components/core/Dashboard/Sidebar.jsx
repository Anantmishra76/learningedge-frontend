import { useEffect, useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sidebarLinks } from './../../../../data/dashboard-links';
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../common/ConfirmationModal"
import SidebarLink from "./SidebarLink"
import Loading from './../../common/Loading';

import { HiMenuAlt1 } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'

import { setOpenSideMenu, setScreenSize } from "../../../slices/sidebarSlice";

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)

  const { openSideMenu, screenSize } = useSelector((state) => state.sidebar)

  useEffect(() => {
    const handleResize = () => dispatch(setScreenSize(window.innerWidth))

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [dispatch])

  // If screen size is small or medium then close the side bar
  useEffect(() => {
    if (screenSize <= 768) {
      dispatch(setOpenSideMenu(false))
    }
    else dispatch(setOpenSideMenu(true))
  }, [dispatch, screenSize])

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r border-r-richblack-700 bg-richblack-800">
        <Loading />
      </div>
    )
  }

  return (
    <>
      {/* Mobile menu toggle */}
      <div
        className="lg:hidden text-white fixed left-4 top-[4.5rem] z-30 cursor-pointer bg-richblack-800 p-2 rounded-full shadow-lg border border-richblack-600 hover:bg-richblack-700 transition-colors duration-200"
        onClick={() => dispatch(setOpenSideMenu(!openSideMenu))}
      >
        {openSideMenu ? <IoMdClose size={24} /> : <HiMenuAlt1 size={24} />}
      </div>

      {/* Mobile overlay */}
      {openSideMenu && screenSize <= 1024 && (
        <div
          className="lg:hidden fixed inset-0 z-10 bg-black/60 backdrop-blur-md"
          onClick={() => dispatch(setOpenSideMenu(false))}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-14 z-20 flex h-[calc(100vh-3.5rem)] 
        w-[80vw] sm:w-[260px] md:w-[280px] lg:w-[300px] max-w-[320px] 
        flex-col border-r border-r-richblack-600 bg-richblack-800 
        shadow-2xl lg:shadow-none transform transition-transform duration-300 
        ${openSideMenu ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-center p-6 border-b border-richblack-700 bg-richblack-900/50">
          <div className="text-center">
            <h2 className="text-xl font-bold text-richblack-100">Dashboard</h2>
            <p className="text-sm text-richblack-400 mt-1">Welcome back!</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto max-h-screen py-4">
          <div className="space-y-1 px-3">
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null
              return (
                <SidebarLink
                  key={link.id}
                  link={link}
                  iconName={link.icon}
                  setOpenSideMenu={setOpenSideMenu}
                />
              )
            })}
          </div>

          {/* Divider */}
          <div className="mx-3 my-6 h-[1px] bg-gradient-to-r from-transparent via-richblack-600 to-transparent" />

          {/* Settings & Logout */}
          <div className="space-y-1 px-3">
            <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName={"VscSettingsGear"}
              setOpenSideMenu={setOpenSideMenu}
            />

            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="w-full group relative overflow-hidden"
            >
              <div className="flex items-center gap-x-3 px-4 py-3 text-sm font-medium text-richblack-300 hover:bg-gradient-to-r hover:from-red-900/30 hover:via-red-800/25 hover:to-red-700/20 hover:text-red-200 rounded-lg transition-all duration-300 border border-transparent hover:border-red-600/30 hover:shadow-lg hover:shadow-red-900/20 active:scale-[0.98] active:transition-transform active:duration-100">
                <VscSignOut className="text-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <span className="group-hover:font-semibold">Logout</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-500/5 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </div>
            </button>
          </div>
        </div>

        {/* User Info Footer */}
        {user && (
          <div className="p-4 border-t border-richblack-700 bg-richblack-900/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-richblack-900 font-bold text-lg">
                {user.firstName?.[0]?.toUpperCase()}{user.lastName?.[0]?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-richblack-100 truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-richblack-400 capitalize">
                  {user.accountType?.toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

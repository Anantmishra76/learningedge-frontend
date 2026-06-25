import * as Icons from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"

import { resetCourseState } from "../../../slices/courseSlice"
import { setOpenSideMenu } from "../../../slices/sidebarSlice"

export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName]
  const location = useLocation()
  const dispatch = useDispatch()

  const { openSideMenu, screenSize } = useSelector(state => state.sidebar)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const handleClick = () => {
    dispatch(resetCourseState())
    if (openSideMenu && screenSize <= 640) dispatch(setOpenSideMenu(false))
  }

  return (
    <NavLink
      to={link.path}
      onClick={handleClick}
      className={`group relative flex items-center gap-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
        matchRoute(link.path)
          ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg"
          : "text-richblack-300 hover:bg-gradient-to-r hover:from-richblack-700 hover:to-richblack-600 hover:text-richblack-100"
      }`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.2rem] bg-gradient-to-b from-blue-500 to-blue-600 rounded-r transition-opacity duration-300 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0 group-hover:opacity-50"
        }`}
      >
      </span>

      <Icon className={`text-lg transition-transform duration-200 ${
        matchRoute(link.path) ? "scale-110" : "group-hover:scale-105"
      }`} />
      <span className="font-medium">{link.name}</span>
    </NavLink>
  )
}
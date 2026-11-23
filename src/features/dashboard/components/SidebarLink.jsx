import * as Icons from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"

import { resetCourseState } from "@/features/courses/slice/courseSlice"
import { setOpenSideMenu } from "@/features/dashboard/slice/sidebarSlice"

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
    if (openSideMenu && screenSize < 1024) dispatch(setOpenSideMenu(false))
  }

  return (
    <NavLink
      to={link.path}
      onClick={handleClick}
      className={`group relative flex h-10 items-center gap-x-3 rounded-lg px-3 text-sm transition-colors duration-150 ${
        matchRoute(link.path)
          ? "bg-slate-100 font-medium text-brand-700"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      <span
        className={`absolute left-0 top-2 h-6 w-0.5 rounded-r bg-brand-600 transition-opacity duration-150 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      >
      </span>

      <Icon className="text-base text-current" />
      <span>{link.name}</span>
    </NavLink>
  )
}


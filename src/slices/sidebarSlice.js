/**
 * Sidebar slice for managing sidebar state
 */
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    openSideMenu: false,
    screenSize: undefined,
    // Sidebar state for course view page
    courseViewSidebar: false,
}

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        /**
         * Sets whether the side menu is open
         * @param {Object} state - Current state
         * @param {Object} action - Action containing boolean payload
         */
        setOpenSideMenu: (state, action) => {
            state.openSideMenu = action.payload
        },
        /**
         * Sets the screen size
         * @param {Object} state - Current state
         * @param {Object} action - Action containing screen size payload
         */
        setScreenSize: (state, action) => {
            state.screenSize = action.payload
        },
        /**
         * Sets the course view sidebar state
         * @param {Object} state - Current state
         * @param {Object} action - Action containing boolean payload
         */
        setCourseViewSidebar: (state, action) => {
            state.courseViewSidebar = action.payload
        }

    }
})

export const { setOpenSideMenu, setScreenSize, setCourseViewSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer




import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import PageNotFound from "@/app/pages/PageNotFound";
import OpenRoute from "@/features/auth/components/OpenRoute";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import ForgotPassword from "@/features/auth/pages/ForgotPassword";
import Login from "@/features/auth/pages/Login";
import Signup from "@/features/auth/pages/Signup";
import UpdatePassword from "@/features/auth/pages/UpdatePassword";
import VerifyEmail from "@/features/auth/pages/VerifyEmail";
import BlogDetailsPage from "@/features/blog/pages/BlogDetailsPage";
import BlogPage from "@/features/blog/pages/BlogPage";
import Cart from "@/features/cart/components/Cart";
import Catalog from "@/features/catalog/pages/Catalog";
import About from "@/features/about/pages/About";
import Contact from "@/features/contact/pages/Contact";
import AllCourses from "@/features/courses/pages/AllCourses";
import CourseDetails from "@/features/courses/pages/CourseDetails";
import ViewCourse from "@/features/courses/pages/ViewCourse";
import VideoDetails from "@/features/courses/components/VideoDetails";
import AddCourse from "@/features/dashboard/add-course/AddCourse";
import EditCourse from "@/features/dashboard/add-course/EditCourse/EditCourse";
import AllInstructors from "@/features/dashboard/components/AllInstructors";
import AllStudents from "@/features/dashboard/components/AllStudents";
import CreateCategory from "@/features/dashboard/components/CreateCategory";
import EnrolledCourses from "@/features/dashboard/components/EnrolledCourses";
import Instructor from "@/features/dashboard/components/Instructor";
import MyCourses from "@/features/dashboard/components/MyCourses";
import MyProfile from "@/features/dashboard/components/MyProfile";
import PurchaseHistory from "@/features/dashboard/components/PurchaseHistory";
import Dashboard from "@/features/dashboard/pages/Dashboard";
import Settings from "@/features/dashboard/settings/Settings";
import Home from "@/features/home/pages/Home";
import { ACCOUNT_TYPE } from "@/utils/constants";

export default function AppRoutes() {
  const { user } = useSelector((state) => state.profile);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:blogId" element={<BlogDetailsPage />} />
      <Route path="/all-courses" element={<AllCourses />} />
      <Route path="catalog/:catalogName" element={<Catalog />} />
      <Route path="courses/:courseId" element={<CourseDetails />} />

      <Route path="signup" element={<OpenRoute><Signup /></OpenRoute>} />
      <Route path="login" element={<OpenRoute><Login /></OpenRoute>} />
      <Route path="forgot-password" element={<OpenRoute><ForgotPassword /></OpenRoute>} />
      <Route path="verify-email" element={<OpenRoute><VerifyEmail /></OpenRoute>} />
      <Route path="update-password/:id" element={<OpenRoute><UpdatePassword /></OpenRoute>} />

      <Route element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
        <Route path="dashboard/my-profile" element={<MyProfile />} />
        <Route path="dashboard/Settings" element={<Settings />} />

        {user?.accountType === ACCOUNT_TYPE.ADMIN && (
          <>
            <Route path="dashboard/create-category" element={<CreateCategory />} />
            <Route path="dashboard/all-students" element={<AllStudents />} />
            <Route path="dashboard/all-instructors" element={<AllInstructors />} />
          </>
        )}

        {user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
            <Route path="dashboard/cart" element={<Cart />} />
            <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
            <Route path="dashboard/purchase-history" element={<PurchaseHistory />} />
          </>
        )}

        {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
            <Route path="dashboard/instructor" element={<Instructor />} />
            <Route path="dashboard/add-course" element={<AddCourse />} />
            <Route path="dashboard/my-courses" element={<MyCourses />} />
            <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
          </>
        )}
      </Route>

      <Route element={<ProtectedRoute><ViewCourse /></ProtectedRoute>}>
        {user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <Route
            path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails />}
          />
        )}
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

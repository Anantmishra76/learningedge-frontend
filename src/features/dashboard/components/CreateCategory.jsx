import { useEffect, useState } from "react";
import { createNewCategory, deleteCategory, fetchCourseCategories } from "@/features/courses/services/courseDetailsAPI";
import IconBtn from '@/components/common/IconBtn';

import { IoIosAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineFolderOpen, AiOutlinePlus } from "react-icons/ai";

// loading skeleton
const LoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-richblack-700/30 rounded-lg border border-richblack-600">
          <div className="w-10 h-10 bg-richblack-600 rounded-lg skeleton"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 bg-richblack-600 rounded skeleton"></div>
            <div className="h-3 w-2/3 bg-richblack-600 rounded skeleton"></div>
          </div>
          <div className="w-8 h-8 bg-richblack-600 rounded skeleton"></div>
        </div>
      ))}
    </div>
  )
}

const CreateCategory = () => {
  const { token } = useSelector((state) => state.auth);
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const fetchSublinks = async () => {
    try {
      setLoading(true)
      const res = await fetchCourseCategories();
      setSubLinks(res);
    }
    catch (error) {
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchSublinks();
  }, [])

  // create new category
  const handleCreateCategory = async () => {
    if (!newCategory.trim() || !description.trim()) return;

    setIsCreating(true);
    try {
      await createNewCategory(newCategory, description, token);
      setNewCategory('');
      setDescription('');
      await fetchSublinks(); // Refresh the list
    } catch (error) {
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId, token);
      await fetchSublinks(); // Refresh the list
    } catch (error) {
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Category Management</h1>
        <p className="text-slate-600">Create and manage course categories</p>
      </div>

      {/* Create Category Form */}
      <div className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-xl border border-richblack-700 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-50 rounded-full">
            <AiOutlinePlus className="text-2xl text-slate-900" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Create New Category</h3>
            <p className="text-slate-600 text-sm">Add a new course category to organize your content</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Name */}
            <div className="space-y-2">
              <label htmlFor="categoryName" className="block text-sm font-medium text-slate-900">
                Category Name <span className="text-pink-200">*</span>
              </label>
              <input
                id="categoryName"
                type='text'
                value={newCategory}
                placeholder="Enter category name"
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full rounded-lg bg-richblack-700 p-3 text-slate-900 border border-richblack-600 focus:border-yellow-50 focus:outline-none focus:ring-1 focus:ring-yellow-50 transition-colors"
              />
            </div>

            {/* Category Description */}
            <div className="space-y-2">
              <label htmlFor="categoryDescription" className="block text-sm font-medium text-slate-900">
                Description <span className="text-pink-200">*</span>
              </label>
              <input
                id="categoryDescription"
                type='text'
                value={description}
                placeholder="Enter category description"
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg bg-richblack-700 p-3 text-slate-900 border border-richblack-600 focus:border-yellow-50 focus:outline-none focus:ring-1 focus:ring-yellow-50 transition-colors"
              />
            </div>
          </div>

          {/* Add Button */}
          <div className="flex justify-end">
            <IconBtn
              text={isCreating ? "Creating..." : "Create Category"}
              onclick={handleCreateCategory}
              disabled={!newCategory.trim() || !description.trim() || isCreating}
              customClasses={`${
                newCategory.trim() && description.trim() && !isCreating
                  ? "bg-yellow-50 text-slate-900 hover:bg-yellow-25 shadow-lg"
                  : "bg-richblack-700 text-slate-500 cursor-not-allowed"
              }`}
            >
              <IoIosAdd />
            </IconBtn>
          </div>
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-xl border border-richblack-700 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-richblack-300 rounded-full">
            <AiOutlineFolderOpen className="text-2xl text-slate-900" style={{ color: 'lightblue' }} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Existing Categories</h3>
            <p className="text-slate-600 text-sm">
              {subLinks?.length || 0} categories - Manage your course organization
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <LoadingSkeleton />
          ) : subLinks?.length > 0 ? (
            subLinks.map((subLink, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-richblack-700/30 rounded-lg border border-richblack-600 hover:bg-richblack-700/50 hover:border-richblack-500 transition-all duration-200 group"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-2 bg-richblack-600 rounded-lg group-hover:bg-richblack-500 transition-colors">
                    <AiOutlineFolderOpen className="text-yellow-50 text-lg" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-slate-900 font-medium">{subLink.name}</h4>
                    <p className="text-slate-600 text-sm">{subLink.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteCategory(subLink._id)}
                  className="p-2 text-slate-500 hover:text-pink-400 hover:bg-pink-900/20 rounded-lg transition-all duration-200 group"
                  title="Delete category"
                >
                  <RiDeleteBin6Line className="text-lg group-hover:scale-110 transition-transform" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <AiOutlineFolderOpen className="text-6xl text-slate-600 mx-auto mb-4" />
              <h4 className="text-xl font-medium text-slate-900 mb-2">No Categories Yet</h4>
              <p className="text-slate-600">Create your first category to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateCategory


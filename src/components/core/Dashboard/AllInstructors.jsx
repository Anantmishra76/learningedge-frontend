import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

import { getAllInstructorDetails } from "../../../services/operations/adminApi";



// loading skeleton
const LoadingSkeleton = () => {
  return (
    <Tr className="border-b border-richblack-500">
      <Td className="py-8 px-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="h-[100px] w-[100px] rounded-full skeleton"></div>
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-4 w-[200px] rounded skeleton"></div>
            <div className="h-3 w-[250px] rounded skeleton"></div>
            <div className="h-3 w-[150px] rounded skeleton"></div>
            <div className="h-3 w-[180px] rounded skeleton"></div>
          </div>
        </div>
      </Td>
      <Td className="py-8 px-6 text-center">
        <div className="h-6 w-[80px] rounded skeleton mx-auto"></div>
      </Td>
      <Td className="py-8 px-6 text-center">
        <div className="h-6 w-[100px] rounded skeleton mx-auto"></div>
      </Td>
    </Tr>
  );
}


function AllInstructors() {
  const { token } = useSelector((state) => state.auth);
  const [allInstructorDetails, setAllInstructorDetails] = useState([]);
  const [instructorsCount, setInstructorsCount] = useState();
  const [loading, setLoading] = useState(false)
  const [expandedInstructor, setExpandedInstructor] = useState(null);



  useEffect(() => {
    const fetchInstructorsData = async () => {
      setLoading(true)
      const { allInstructorsDetails, instructorsCount } = await getAllInstructorDetails(token);
      if (allInstructorsDetails) {
        setAllInstructorDetails(allInstructorsDetails);
        setInstructorsCount(instructorsCount)
      }
      setLoading(false)
    };

    fetchInstructorsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleCourses = (instructorId) => {
    setExpandedInstructor(expandedInstructor === instructorId ? null : instructorId);
  };

  return (
    <div className="w-full">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-slate-900">All Instructors</h1>
        <p className="text-slate-600">Total: {instructorsCount || 0}</p>
      </div>

      <div className="bg-richblack-800 rounded-lg border border-richblack-600 overflow-hidden">
        <Table className="w-full">
          <Thead className="bg-richblack-700">
            <Tr>
              <Th className="px-6 py-4 text-left text-sm font-medium uppercase text-slate-700 border-b border-richblack-600">
                Instructor Details
              </Th>
              <Th className="px-6 py-4 text-center text-sm font-medium uppercase text-slate-700 border-b border-richblack-600">
                Status
              </Th>
              <Th className="px-6 py-4 text-center text-sm font-medium uppercase text-slate-700 border-b border-richblack-600">
                Approval
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <>
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
              </>
            ) : !allInstructorDetails || allInstructorDetails.length === 0 ? (
              <Tr>
                <Td colSpan="3" className="py-12 text-center">
                  <div className="text-slate-600 text-lg">No instructors found</div>
                </Td>
              </Tr>
            ) : (
              allInstructorDetails.map((instructor) => (
                <React.Fragment key={instructor._id}>
                  <Tr className="border-b border-richblack-600 hover:bg-richblack-700/50 transition-colors">
                    <Td className="px-6 py-6">
                      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <img
                          src={instructor.image}
                          alt={`${instructor.firstName} ${instructor.lastName}`}
                          className="h-[80px] w-[80px] rounded-full object-cover border-2 border-richblack-500"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-slate-900 truncate">
                            {instructor.firstName} {instructor.lastName}
                          </h3>
                          <p className="text-sm text-slate-600 truncate">{instructor.email}</p>
                          <div className="mt-2 space-y-1">
                            <p className="text-xs text-slate-500">
                              <span className="font-medium">Gender:</span>{" "}
                              {instructor.additionalDetails?.gender || "Not specified"}
                            </p>
                            <p className="text-xs text-slate-500">
                              <span className="font-medium">Mobile:</span>{" "}
                              {instructor.additionalDetails?.contactNumber || "Not provided"}
                            </p>
                            <p className="text-xs text-slate-500">
                              <span className="font-medium">DOB:</span>{" "}
                              {instructor.additionalDetails?.dateOfBirth || "Not provided"}
                            </p>
                          </div>
                          {instructor.courses?.length > 0 && (
                            <button
                              onClick={() => toggleCourses(instructor._id)}
                              className="mt-3 text-sm text-caribbeangreen-300 hover:text-caribbeangreen-200 transition-colors"
                            >
                              {expandedInstructor === instructor._id ? "Hide Courses" : `Total created Courses (${instructor.courses.length})`}
                            </button>
                          )}
                        </div>
                      </div>
                    </Td>
                    <Td className="px-6 py-6 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        instructor.active
                          ? "bg-green-100 text-white"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {instructor.active ? "Active" : "Inactive"}
                      </span>
                    </Td>
                    <Td className="px-6 py-6 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        instructor.approved
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {instructor.approved ? "Approved" : "Pending"}
                      </span>
                    </Td>
                  </Tr>

                  {expandedInstructor === instructor._id && instructor.courses?.length > 0 && (
                    <Tr className="bg-richblack-700/30">
                      <Td colSpan="3" className="px-6 py-4">
                        <div className="bg-richblack-800 rounded-lg p-4 border border-richblack-600">
                          <h4 className="text-sm font-medium text-slate-700 mb-3">Created Courses</h4>
                          <div className="space-y-2">
                            {instructor.courses.map((course) => (
                              <div key={course._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-richblack-700 rounded border border-richblack-600">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-slate-900 truncate">{course.courseName}</p>
                                  <p className="text-xs text-slate-600">₹{course.price}</p>
                                </div>
                                <div className="mt-2 sm:mt-0 text-right">
                                  <p className="text-xs text-slate-500">
                                    {course.studentsEnrolled?.length || 0} students enrolled
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Td>
                    </Tr>
                  )}
                </React.Fragment>
              ))
            )}
          </Tbody>
        </Table>
      </div>
    </div>
  );
}

export default AllInstructors;


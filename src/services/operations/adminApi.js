import { apiConnector } from "../apiConnector"
import { adminEndPoints } from './../apis';
const { GET_ALL_STUDENTS_DATA_API, GET_ALL_INSTRUCTORS_DATA_API } = adminEndPoints


// ================ get all Students Data  ================
/**
 * Fetches all students data from the API.
 * @param {string} token - Authorization token
 * @returns {Array} List of students data
 */
export async function getAllStudentsData(token) {

    let result = []
    try {
        const response = await apiConnector("GET", GET_ALL_STUDENTS_DATA_API, null, {
            Authorization: `Bearer ${token}`,
        })
        console.log("GET_ALL_STUDENTS_DATA_API RESPONSE............", response)
        result = response?.data
    } catch (error) {
        console.log("GET_ALL_STUDENTS_DATA_API ERROR............", error)
    }
    return result
}



// ================ get all Instructor Data  ================
/**
 * Fetches all instructors data from the API.
 * @param {string} token - Authorization token
 * @returns {Array} List of instructors data
 */
export async function getAllInstructorDetails(token) {
    let result = []
    try {
        const response = await apiConnector("GET", GET_ALL_INSTRUCTORS_DATA_API, null, {
            Authorization: `Bearer ${token}`,
        })
        console.log("GET_ALL_INSTRUCTORS_DATA_API RESPONSE............", response)
        result = response?.data
    } catch (error) {
        console.log("GET_ALL_INSTRUCTORS_DATA_API ERROR............", error)
    }
    return result
}
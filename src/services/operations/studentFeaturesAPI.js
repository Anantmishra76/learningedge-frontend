import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Logo/Razorpay_logo.jpg"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";


const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

// ================ buyCourse ================ 
/**
 * Initiates the course purchase process using Razorpay.
 * @param {string} token - Authorization token
 * @param {Array} coursesId - IDs of courses to purchase
 * @param {Object} userDetails - User's details
 * @param {function} navigate - Navigation function
 * @param {function} dispatch - Dispatch function
 */
export async function buyCourse(token, coursesId, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");

    try {
        //load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            toast.error("Payment system is currently unavailable. Please try again later.");
            return;
        }

        // initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API,
            { coursesId },
            {
                Authorization: `Bearer ${token}`,
            })
        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }

        const RAZORPAY_KEY = import.meta.env.VITE_APP_RAZORPAY_KEY;

        // options
        const options = {
            key: RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: orderResponse.data.message.amount,
            order_id: orderResponse.data.message.id,
            name: "LearningEdge",
            description: "Thank You for Purchasing the Course",
            image: rzpLogo,
            prefill: {
                name: userDetails.firstName,
                email: userDetails.email
            },
            handler: function (response) {
                //send successful mail
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token);
                //verifyPayment
                verifyPayment({ ...response, coursesId }, token, navigate, dispatch);
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            toast.error("Payment failed. Please check your details and try again.");
            console.log("payment failed.... ", response.error);
        })

    }
    catch (error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Payment error: " + (error.response?.data?.message || "Please try again."));
    }
    toast.dismiss(toastId);
}


// ================ send Payment Success Email ================
/**
 * Sends payment success email.
 * @param {Object} response - Razorpay response
 * @param {number} amount - Payment amount
 * @param {string} token - Authorization token
 */
async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        }, {
            Authorization: `Bearer ${token}`
        })
    }
    catch (error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}


// ================ verify payment ================
/**
 * Verifies the payment and enrolls the user in the course.
 * @param {Object} bodyData - Payment verification data
 * @param {string} token - Authorization token
 * @param {function} navigate - Navigation function
 * @param {function} dispatch - Dispatch function
 */
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));

    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        })

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Payment successful. You have been enrolled in the course.");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }
    catch (error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Unable to verify payment. Please contact support if the issue persists.");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}
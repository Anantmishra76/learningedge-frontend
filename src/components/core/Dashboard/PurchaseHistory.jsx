import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPaymentHistory } from '../../../services/operations/profileAPI'

const PurchaseHistory = () => {
  const { token } = useSelector((state) => state.auth)
  const [paymentHistory, setPaymentHistory] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      setLoading(true)
      try {
        const history = await getPaymentHistory(token)
        setPaymentHistory(history)
      } catch (error) {
        console.error('Error fetching payment history:', error)
      }
      setLoading(false)
    }

    if (token) {
      fetchPaymentHistory()
    }
  }, [token])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-medium text-richblack-5 mb-8">Purchase History</h1>

      {paymentHistory.length === 0 ? (
        <div className="text-center text-richblack-300">
          <p className="text-lg">No payment history found.</p>
          <p className="text-sm mt-2">Your completed purchases will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {paymentHistory.map((payment, index) => (
            <div
              key={index}
              className="bg-richblack-800 p-6 rounded-lg border border-richblack-700"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-richblack-5">
                    {payment.courseName || 'Course Purchase'}
                  </h2>
                  <p className="text-richblack-300 text-sm mt-1">
                    Transaction ID: {payment.transactionId || 'N/A'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-400">
                    ₹{payment.amount || '0'}
                  </p>
                  <p className="text-richblack-300 text-sm">
                    {payment.date ? new Date(payment.date).toLocaleDateString() : 'Date N/A'}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-richblack-300">
                  <p>Status: <span className="text-green-400 font-medium">{payment.status || 'Completed'}</span></p>
                </div>
                <div className="text-richblack-300 text-sm">
                  Payment Method: {payment.paymentMethod || 'Razorpay'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PurchaseHistory

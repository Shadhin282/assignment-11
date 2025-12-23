import axios from 'axios'
import React, { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router'
import { IoBagCheckOutline } from 'react-icons/io5'
const PaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  useEffect(() => {
    if (sessionId) {
      axios.post(`http://localhost:5000/payment-success`, {
        sessionId,
      })
    }
  }, [sessionId])
  return (
    <div className='flex flex-col items-center justify-center my-20'>
      <div className='bg-linear-to-br from-indigo-900 via-slate-900 to-slate-950 p-10 rounded-lg shadow-xl text-center'>
        <IoBagCheckOutline className='w-16 h-16 text-green-500 mx-auto mb-4' />
        <h1 className='text-3xl font-bold text-white mb-2'>
          Payment Successful!
        </h1>
        <p className='text-gray-400 mb-6'>
          Thank you for your purchase. Your order is being processed.
        </p>
        <Link
          to='/dashboard/user/participated'
          className='bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors'
        >
          Go to My Orders
        </Link>
      </div>
    </div>
  )
}

export default PaymentSuccess
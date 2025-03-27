import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Define the Payment interface
interface Payment {
  _id: string;
  orderId: string;
  paymentId: string;
  signature: string;
  amount: number;
  status: string;
  createdAt: string;
}

const PaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5003/api/payment/getPayments');
        setPayments(response.data);
        setIsLoading(false);
      } catch (err: any) {
        console.error("Error fetching payments:", err);
        setError(err.response?.data?.msg || "Failed to fetch payments");
        toast.error("Error fetching payments");
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Payment History</h1>
      
      {payments.length === 0 ? (
        <div className="text-center text-gray-500">No payments found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Payment ID</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr 
                  key={payment._id} 
                  className="border-b hover:bg-blue-50 transition"
                >
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900 truncate max-w-[150px]">
                      {payment.orderId}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900 truncate max-w-[150px]">
                      {payment.paymentId}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-semibold text-green-600">
                      {formatCurrency(payment.amount)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${payment.status === 'Success' 
                        ? 'bg-green-200 text-green-800' 
                        : 'bg-red-200 text-red-800'}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {formatDate(payment.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;

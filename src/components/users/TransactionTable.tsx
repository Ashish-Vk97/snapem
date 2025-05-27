// components/TransactionsTable.jsx

import React from 'react';
import {
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'; // Install Heroicons if not already

type TransactionStatus = 'Completed' | 'Pending' | 'Failed';

interface Transaction {
  id: string;
  transaction: string;
  amount: string;
  date: string;
  account: string;
  table: string;
  status: TransactionStatus;
}

const transactions: Transaction[] = [
  {
    id: 'TXN001',
    transaction: 'Payment to Vendor A',
    amount: '$1,200.00',
    date: '2025-05-22',
    account: 'Business Checking',
    table: 'Purchases',
    status: 'Completed',
  },
  {
    id: 'TXN002',
    transaction: 'Refund from Vendor B',
    amount: '$-300.00',
    date: '2025-05-21',
    account: 'Business Checking',
    table: 'Returns',
    status: 'Pending',
  },
  {
    id: 'TXN003',
    transaction: 'Subscription Charge',
    amount: '$50.00',
    date: '2025-05-20',
    account: 'Credit Card',
    table: 'Subscriptions',
    status: 'Failed',
  },
];

const statusColors: Record<TransactionStatus, string> = {
  Completed: 'bg-green-100 text-green-800',
  Pending: 'bg-yellow-100 text-yellow-800',
  Failed: 'bg-red-100 text-red-800',
};

const TransactionsTable = () => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-600">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Transaction</th>
            <th className="px-6 py-3">Amount</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Account</th>
            <th className="px-6 py-3">Table</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
          {transactions.map((txn) => (
            <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900">{txn.id}</td>
              <td className="px-6 py-4">{txn.transaction}</td>
              <td className="px-6 py-4">{txn.amount}</td>
              <td className="px-6 py-4">{txn.date}</td>
              <td className="px-6 py-4">{txn.account}</td>
              <td className="px-6 py-4">{txn.table}</td>
              <td className="px-6 py-4">
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusColors[txn.status]}`}>
                  {txn.status}
                </span>
              </td>
              <td className="px-6 py-4 flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;

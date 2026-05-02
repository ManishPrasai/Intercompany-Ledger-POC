"use client";
import React, { useState } from 'react';
import { Plus, FileText, Database, ArrowUpRight } from 'lucide-react';

export default function LedgerPage() {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2024-05-01', ref: 'INV-100', desc: 'Initial Stock', debit: 0, credit: 5000 },
    { id: 2, date: '2024-05-20', ref: 'PAY-200', desc: 'Partial Payment', debit: 2000, credit: 0 }
  ]);

  const addEntry = () => {
    const newTxn = {
      id: Date.now(),
      date: '2024-05-10', // Notice this is between the other two dates!
      ref: 'MAN-50',
      desc: 'Manual Adjustment',
      debit: 500,
      credit: 0
    };
    setTransactions([...transactions, newTxn]);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Inter-Company Ledger</h1>
            <p className="text-slate-500">Real-time transaction synchronization</p>
          </div>
          <button onClick={addEntry} className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
            <Plus size={18} /> New Entry
          </button>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b">
                <tr className="text-xs uppercase text-slate-500 font-semibold">
                  <th className="p-4">Date</th>
                  <th className="p-4">Reference</th>
                  <th className="p-4">Description</th>
                  <th className="p-4 text-right">Debit (-)</th>
                  <th className="p-4 text-right">Credit (+)</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {/* SORTING LOGIC: This handles the 'location adjustment' automatically */}
                {transactions.sort((a, b) => new Date(b.date) - new Date(a.date)).map((txn) => (
                  <tr key={txn.id} className="border-b last:border-0 hover:bg-slate-50 transition">
                    <td className="p-4 text-slate-600 font-mono">{txn.date}</td>
                    <td className="p-4 font-semibold">{txn.ref}</td>
                    <td className="p-4">{txn.desc}</td>
                    <td className="p-4 text-right text-red-500">{txn.debit > 0 ? `-$${txn.debit}` : '-'}</td>
                    <td className="p-4 text-right text-green-600">{txn.credit > 0 ? `+$${txn.credit}` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className="space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Database size={20} className="text-blue-400" />
                <h2 className="font-bold">ERP API Bridge</h2>
              </div>
              <p className="text-xs text-slate-400 mb-4">API Endpoint active at:</p>
              <code className="block bg-slate-800 p-2 rounded text-[10px] text-blue-300 mb-4 whitespace-pre-wrap">
                /api/sync
              </code>
              <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-700 pt-4">
                <span>Status:</span>
                <span className="text-green-400 flex items-center gap-1">● Listening</span>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}

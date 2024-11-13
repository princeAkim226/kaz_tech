'use client';
import { useState } from 'react';

export default function RevenueManagement() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('day');
  const [revenues] = useState([
    { date: '2024-11-13', amount: 120, description: 'Vente 1' },
    { date: '2024-11-13', amount: 50, description: 'Vente 2' },
    { date: '2024-11-06', amount: 200, description: 'Vente hebdomadaire' },
    { date: '2024-10-01', amount: 1500, description: 'Vente mensuelle' },
  ]);
  

  // Filter the revenues based on the selected period
  const filteredRevenues = revenues.filter((revenue) => {
    const today = new Date();
    const revenueDate = new Date(revenue.date);

    if (selectedPeriod === 'day') {
      return revenueDate.toDateString() === today.toDateString();
    }
    if (selectedPeriod === 'week') {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      return revenueDate >= startOfWeek && revenueDate <= today;
    }
    if (selectedPeriod === 'month') {
      return (
        revenueDate.getMonth() === today.getMonth() &&
        revenueDate.getFullYear() === today.getFullYear()
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Gestion des Recettes</h1>

      {/* Period Selection */}
      <div className="flex space-x-4 mb-8">
        <button
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedPeriod === 'day'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
          onClick={() => setSelectedPeriod('day')}
        >
          Recettes du jour
        </button>
        <button
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedPeriod === 'week'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
          onClick={() => setSelectedPeriod('week')}
        >
          Recettes de la semaine
        </button>
        <button
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedPeriod === 'month'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
          onClick={() => setSelectedPeriod('month')}
        >
          Recettes du mois
        </button>
      </div>

      {/* Display Revenue Data */}
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {selectedPeriod === 'day' && 'Recettes du jour'}
          {selectedPeriod === 'week' && 'Recettes de la semaine'}
          {selectedPeriod === 'month' && 'Recettes du mois'}
        </h2>

        {filteredRevenues.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 border-b text-left text-gray-600 font-medium">Date</th>
                <th className="px-4 py-3 border-b text-left text-gray-600 font-medium">Montant</th>
                <th className="px-4 py-3 border-b text-left text-gray-600 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredRevenues.map((revenue, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors border-b last:border-none"
                >
                  <td className="px-4 py-3 text-gray-700">{revenue.date}</td>
                  <td className="px-4 py-3 text-gray-700 font-semibold">
                    {revenue.amount.toLocaleString('fr-FR')} FCFA
                  </td>
                  <td className="px-4 py-3 text-gray-600">{revenue.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center mt-4">
            Aucune recette trouvée pour cette période.
          </p>
        )}
      </div>
    </div>
  );
}

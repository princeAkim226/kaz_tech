"use client";

import { Suspense } from "react"; // Import de Suspense
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Données fictives pour les tickets
const mockTickets = {
  1: { "100 F": 10, "200 F": 5, "300 F": 3, "1000 F": 2, "5000 F": 1 },
  2: { "100 F": 7, "200 F": 2, "300 F": 1, "1000 F": 0, "5000 F": 0 },
  3: { "100 F": 0, "200 F": 0, "300 F": 0, "1000 F": 0, "5000 F": 0 },
};

// Composant TicketsPage
const TicketsPage = () => {
  const searchParams = useSearchParams();
  const accountId = searchParams.get("accountId"); // Récupération de l'ID du compte à partir des paramètres d'URL
  const [ticketsByCategory, setTicketsByCategory] = useState<Record<string, number>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [newCount, setNewCount] = useState<number>(0);

  useEffect(() => {
    if (accountId) {
      const accountTickets = mockTickets[Number(accountId) as keyof typeof mockTickets] || {};
      setTicketsByCategory(accountTickets);
    }
  }, [accountId]);

  const handleUpdateCategory = () => {
    if (selectedCategory) {
      setTicketsByCategory((prevTickets) => ({
        ...prevTickets,
        [selectedCategory]: newCount,
      }));
    }
    setIsModalOpen(false); // Fermer le modal après la mise à jour
    setSelectedCategory("");
    setNewCount(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">
        Tickets disponibles par catégorie
      </h1>
      {Object.keys(ticketsByCategory).length > 0 ? (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <ul className="divide-y divide-gray-200">
            {Object.entries(ticketsByCategory).map(([category, count], index) => (
              <li key={index} className="flex justify-between items-center py-3">
                <span className="text-gray-700 font-medium">{category}</span>
                <span
                  className={`text-sm font-semibold ${
                    count > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {count} ticket{count > 1 ? "s" : ""}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
            >
              Mettre à jour une catégorie
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-center">Aucun ticket disponible pour ce compte.</p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Mettre à jour une catégorie</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Catégorie</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              >
                <option value="" disabled>Sélectionnez une catégorie</option>
                {Object.keys(ticketsByCategory).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Nouveau nombre de tickets</label>
              <input
                type="number"
                value={newCount}
                onChange={(e) => setNewCount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Ex: 10"
                min="0"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleUpdateCategory}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              >
                Mettre à jour
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Wrapper du composant avec Suspense
const TicketsPageWrapper = () => (
  <Suspense fallback={<div>Chargement des tickets...</div>}>
    <TicketsPage />
  </Suspense>
);

export default TicketsPageWrapper;

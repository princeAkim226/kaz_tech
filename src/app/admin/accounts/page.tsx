"use client";

import { useRouter } from "next/navigation";

const accounts = [
  {
    id: 1,
    name: "Sawadogo",
    firstname: "Abdoulaye",
    phone: "+226 70 12 34 56",
    address: "Ouagadougou, Secteur 10",
  },
  {
    id: 2,
    name: "Zongo",
    firstname: "Aïssata",
    phone: "+226 78 45 67 89",
    address: "Bobo-Dioulasso, Secteur 7",
  },
  {
    id: 3,
    name: "Ouédraogo",
    firstname: "Seydou",
    phone: "+226 60 98 76 54",
    address: "Koudougou, Quartier Zongo",
  },
  {
    id: 4,
    name: "Bassolet",
    firstname: "Fatimata",
    phone: "+226 71 23 45 67",
    address: "Ouahigouya, Secteur 4",
  },
  {
    id: 5,
    name: "Nikiéma",
    firstname: "Moussa",
    phone: "+226 76 54 32 10",
    address: "Fada N'Gourma, Secteur 2",
  },
  {
    id: 6,
    name: "Kaboré",
    firstname: "Amadou",
    phone: "+226 79 11 22 33",
    address: "Banfora, Quartier Cascades",
  },
  {
    id: 7,
    name: "Compaoré",
    firstname: "Jacqueline",
    phone: "+226 67 89 01 23",
    address: "Tenkodogo, Secteur 3",
  },
  {
    id: 8,
    name: "Zagre",
    firstname: "Boureima",
    phone: "+226 75 44 55 66",
    address: "Ouagadougou, Secteur 13",
  },
  {
    id: 9,
    name: "Traoré",
    firstname: "Mariama",
    phone: "+226 77 88 99 00",
    address: "Kaya, Secteur 5",
  },
  {
    id: 10,
    name: "Diallo",
    firstname: "Issa",
    phone: "+226 78 65 43 21",
    address: "Dori, Secteur 1",
  },
];

const AccountsPage = () => {
  const router = useRouter();

  const handleAccountSelection = (accountId: number) => {
    // Redirection vers la page des tickets avec l'ID du compte
    router.push(`/admin/tickets?accountId=${accountId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">
        Sélectionner un compte
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-6xl">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="p-4 sm:p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleAccountSelection(account.id)}
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            {account.name} {account.firstname} 
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">📞 {account.phone}</p>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">📍 {account.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountsPage;

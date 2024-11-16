"use client"; // Nécessaire pour utiliser des hooks côté client

import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter(); // Import adapté à l'App Router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation fictive pour l'exemple
    if (email === "kaz@admin.com" && password === "pass123") {
      router.push("/admin/accounts"); // Utiliser le routeur de navigation
    } else {
      setError("Identifiants incorrects. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Connexion Administrateur
        </h2>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          {error && (
            <div className="text-sm text-red-600">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

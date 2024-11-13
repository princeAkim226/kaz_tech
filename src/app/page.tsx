'use client';
import { useState } from 'react';

export default function Home() {
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [connectionCode, setConnectionCode] = useState<string | null>(null);

  // Map durations to respective amounts
  const amountByDuration: { [key: string]: string } = {
    '1h': '100',
    '2h': '200',
    '24h': '300',
    '1 semaine': '1500',
    '1 mois': '5000',
  };

  const handleDurationChange = (duration: string) => {
    setSelectedDuration(duration);
    setPaymentMethod(null); // Reset payment method when duration changes
    setIsOtpSent(false);
    setConnectionCode(null);
    setOtp('');
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
    setIsOtpSent(false);
    setConnectionCode(null);
    setOtp('');
  };

  const handleSendOtp = () => {
    if (paymentMethod === 'Orange Money' && selectedDuration) {
      setIsOtpSent(true);
      const amount = amountByDuration[selectedDuration];
      alert(`Veuillez composer le code suivant sur votre téléphone : *144*4*6*${amount}#`);
    }
  };

  const handleOtpSubmit = () => {
    if (otp === '1234') { // Simulates OTP validation
      setConnectionCode('WX134');
    } else {
      alert("OTP incorrect. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Page de Paiement</h1>

      {/* Selection of Duration */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mb-4">
        <h2 className="text-lg font-semibold mb-4">Choisissez la durée :</h2>
        <div className="grid grid-cols-3 gap-2">
          {['1h', '2h', '24h', '1 semaine', '1 mois'].map((duration) => (
            <button
              key={duration}
              className={`p-2 rounded-lg ${
                selectedDuration === duration ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => handleDurationChange(duration)}
            >
              {duration}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Method Selection (after duration selection) */}
      {selectedDuration && (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mb-4">
          <h2 className="text-lg font-semibold mb-4">Choisissez votre moyen de paiement :</h2>
          <div className="flex space-x-4">
            <button
              className={`w-1/2 p-2 rounded-lg ${
                paymentMethod === 'Orange Money' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => handlePaymentMethodChange('Orange Money')}
            >
              Orange Money
            </button>
            <button
              className={`w-1/2 p-2 rounded-lg ${
                paymentMethod === 'Moov' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => handlePaymentMethodChange('Moov')}
            >
              Moov
            </button>
          </div>
        </div>
      )}

      {/* Instructions for Orange Money */}
      {paymentMethod === 'Orange Money' && !isOtpSent && (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mb-4">
          <h3 className="text-md font-semibold mb-2">Instructions pour Orange Money :</h3>
          <p className="text-gray-600 mb-4">
            Veuillez composer *144*4*6*{amountByDuration[selectedDuration || '']}# sur votre téléphone pour initier le paiement.
          </p>
          <button
            className="w-full bg-blue-500 text-white p-2 rounded-lg"
            onClick={handleSendOtp}
          >
            Envoyer OTP
          </button>
        </div>
      )}

      {/* OTP Input */}
      {isOtpSent && (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mb-4">
          <h3 className="text-md font-semibold mb-2">Entrez le code OTP :</h3>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg mb-4"
            placeholder="Code OTP"
          />
          <button
            className="w-full bg-green-500 text-white p-2 rounded-lg"
            onClick={handleOtpSubmit}
          >
            Valider OTP
          </button>
        </div>
      )}

      {/* Display Connection Code */}
      {connectionCode && (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mb-4">
          <h3 className="text-md font-semibold text-green-600 mb-2">Paiement Réussi !</h3>
          <p className="text-gray-700">
            Votre code de connexion : <span className="font-bold">{connectionCode}</span>
          </p>
        </div>
      )}
    </div>
  );
}

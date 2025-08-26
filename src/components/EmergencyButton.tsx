import { FaPhoneAlt } from 'react-icons/fa';

export default function EmergencyButton() {
  return (
    <a
      href="/emergency"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg text-lg focus:outline-none focus:ring-4 focus:ring-red-300 transition-all"
      aria-label="Emergency Services"
    >
      <FaPhoneAlt className="text-xl" />
      Emergency
    </a>
  );
}
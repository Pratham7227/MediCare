type DoctorCardProps = {
  photoUrl?: string;
  name: string;
  specialization: string;
  hospital: string;
  fees: string;
  onBook?: () => void;
};

export default function DoctorCard({ photoUrl, name, specialization, hospital, fees, onBook }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-blue-100 p-5 flex flex-col items-center gap-3 hover:shadow-lg transition-shadow">
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={name}
          className="w-20 h-20 rounded-full object-cover border-2 border-blue-200 mb-2"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-200 to-green-200 border-2 border-blue-200 mb-2 flex items-center justify-center text-blue-600 font-bold text-xl">
          {name.charAt(0)}
        </div>
      )}
      <div className="text-lg font-semibold text-blue-800">{name}</div>
      <div className="text-sm text-green-700 font-medium">{specialization}</div>
      <div className="text-xs text-blue-500">{hospital}</div>
      <div className="text-sm text-gray-600 mt-1">Fee: <span className="font-bold text-blue-700">{fees}</span></div>
      <button
        onClick={onBook}
        className="mt-3 px-4 py-2 bg-blue-600 hover:bg-green-600 text-white rounded-full font-semibold shadow focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
      >
        Book Appointment
      </button>
    </div>
  );
}
type DrugCardProps = {
  name: string;
  usage: string;
  sideEffects: string;
  contraindications: string;
  warnings: string;
};

export default function DrugCard({ name, usage, sideEffects, contraindications, warnings }: DrugCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-green-100 p-5 flex flex-col gap-2 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">💊</span>
        <span className="text-lg font-semibold text-blue-800">{name}</span>
      </div>
      <div className="text-sm text-gray-700"><span className="font-semibold text-green-700">Usage:</span> {usage}</div>
      <div className="text-sm text-gray-700"><span className="font-semibold text-yellow-700">Side Effects:</span> {sideEffects}</div>
      <div className="text-sm text-gray-700"><span className="font-semibold text-blue-700">Contraindications:</span> {contraindications}</div>
      <div className="text-sm text-gray-700"><span className="font-semibold text-red-700">Warnings:</span> {warnings}</div>
    </div>
  );
}
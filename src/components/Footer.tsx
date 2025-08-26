export default function Footer() {
  return (
    <footer className="bg-white border-t border-blue-100 py-6 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4">
        <div className="text-blue-700 font-semibold">&copy; {new Date().getFullYear()} MediCare. All rights reserved.</div>
        <div className="flex gap-4">
          {/* Social media icon placeholders */}
          <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">F</span>
          <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">T</span>
          <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">I</span>
        </div>
      </div>
    </footer>
  );
}
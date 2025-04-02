import { HandHeart  } from 'lucide-react';
import Logout from './User/Logout';

const Navbar = () => {
  return <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-5 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <HandHeart  className="h-6 w-6 text-blue-900" />
          <span className="text-xl font-bold text-gray-800">EmpowerHub</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="/" className="text-gray-600 hover:text-blue-800 transition-colors">Home</a>
          <a href="/adsUserView" className="text-gray-600 hover:text-blue-800 transition-colors">Donate Now</a>
          <a href="/showDonation" className="text-gray-600 hover:text-blue-800 transition-colors">Donation History</a>
          <a href="/showVacancies" className="text-gray-600 hover:text-blue-800 transition-colors">Job Portal</a>
          <a href="/appliedJobs" className="text-gray-600 hover:text-blue-800 transition-colors">Applied Jobs</a>
          <a href="/userEvent" className="text-gray-600 hover:text-blue-800 transition-colors">Events</a>
          <a href="/user-courses" className="text-gray-600 hover:blue-800 transition-colors">Courses</a>
          <a href="/campaigns" className="text-gray-600 hover:blue-800 transition-colors">Campaign</a>


        </nav>
        <button className="bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded-md font-medium transition-colors">
          <Logout />
        </button>
      </div>
    </header>;
};
export default Navbar;
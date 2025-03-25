import { HandHeart, FacebookIcon, TwitterIcon, InstagramIcon, MailIcon } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 top-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <HandHeart className="h-6 w-6 text-blue-400 mr-2" />
              <span className="text-xl font-bold">EmpowerHub</span>
            </div>
            <p className="text-gray-400 mb-4">
              Making a difference in communities worldwide through compassion and generosity.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Donate Now</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Job Portal</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Events</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Courses</a></li>

            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Our Programs</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Clean Water</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Education</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Healthcare</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community Building</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-2">No.40,</p>
            <p className="text-gray-400 mb-2">Kaduwela Road, Malabe</p>
            <p className="text-gray-400 mb-2">+94 77 444 5555</p>
            <div className="flex items-center">
              <MailIcon className="h-5 w-5 text-gray-400 mr-2" />
              <a href="mailto:info@charityhope.org" className="text-blue-400 hover:text-purple-300 transition-colors">
                info@empowerhub.org
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} EmpowerHub. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;
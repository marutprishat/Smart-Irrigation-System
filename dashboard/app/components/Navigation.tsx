import Link from 'next/link';
import { Tab, TabList, TabGroup } from '@tremor/react';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Navigation = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1.5 rounded-lg shadow-sm">
                  <span className="text-2xl font-bold tracking-tight">LoRa</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">IoT Monitoring</span>
                  <span className="text-xs text-gray-500">Connected</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex space-x-1">
                <Link
                  href="/"
                  className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  href="/timeline"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Timeline
                </Link>
                <Link
                  href="/device-info"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Device Info
                </Link>
                <Link
                  href="/metadata"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Metadata
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <BellIcon className="h-5 w-5" />
            </button>
            <button className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <UserCircleIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 
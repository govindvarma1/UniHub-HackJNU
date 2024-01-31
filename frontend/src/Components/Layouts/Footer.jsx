import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="p-6 text-white bg-gray-700">
      <div className="container flex flex-col items-center mx-auto">
        <h3 className="mb-4 text-3xl font-bold">UniHub Navigation</h3>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/professor/dashboard"
              className="transition duration-300 hover:text-gray-300"
            >
              Professor Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              className="transition duration-300 hover:text-gray-300"
            >
              Admin Dashboard
            </Link>
          </li>
        </ul>
        <p className="mt-4 text-sm text-gray-300">
          &copy; 2024 UniHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

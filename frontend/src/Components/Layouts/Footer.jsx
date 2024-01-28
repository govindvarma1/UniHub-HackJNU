import React from "react";

const Footer = () => {
    return (
        <footer className="p-4 mt-64 text-white bg-gray-800">
            <div className="container mx-auto">
                <p className="text-center">
                    &copy; 2024 UniHub. All rights reserved.
                </p>
                <div className="flex justify-center mt-2">
                    <a href="#" className="mx-2 text-white hover:underline">
                        Privacy Policy
                    </a>
                    <span className="mx-2">|</span>
                    <a href="#" className="mx-2 text-white hover:underline">
                        Terms of Service
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

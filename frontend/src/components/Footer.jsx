import React from "react";

const Footer = () => {
    return (
        <footer className="bg-[#333] text-white py-6 mt-8">
            <div className="container mx-auto text-center">
                {/* Copyright Section */}
                <div className="text-sm">
                    <p>&copy; {new Date().getFullYear()} LitterCam AI. All rights reserved.</p>
                </div>

                {/* Links Section */}
                <div className="mt-4">
                    <a href="/privacy" className="mx-4 text-gray-400 hover:text-white">
                        Privacy Policy
                    </a>
                    <a href="/terms" className="mx-4 text-gray-400 hover:text-white">
                        Terms of Service
                    </a>
                    <a href="/contact" className="mx-4 text-gray-400 hover:text-white">
                        Contact Us
                    </a>
                </div>

                {/* Optional Address Section */}
                <div className="mt-6 text-sm text-gray-400">
                    <p> Bahria University E8 Campus, Islamabad, Pakistan</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

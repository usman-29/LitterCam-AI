import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
    return (
        <div id="contact" className="p-12 bg-gray-100">
            <div>
                <h2 className="text-center text-3xl font-semibold text-gray-800 mb-8">Contact Us</h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Usman Saeed's Section */}
                    <div className="text-center p-6 bg-white rounded-lg shadow-md">
                        <img
                            src={assets.usman}
                            alt="Usman Saeed"
                            className="w-32 h-32 mx-auto rounded-full mb-4"
                        />
                        <h3 className="text-2xl font-semibold mb-4">Usman Saeed</h3>
                        <p className="text-lg text-gray-700 mb-4">Email: contactusman29@gmail.com</p>
                        <p className="text-lg text-gray-700 mb-4">Phone: +923335539340</p>
                        <p className="text-lg text-gray-700 mb-4">
                            LinkedIn:{" "}
                            <a href="https://www.linkedin.com/in/usmanxsaeed"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline">
                                usmanxsaeed
                            </a>
                        </p>
                    </div>

                    {/* Matee Ur Rehman's Section */}
                    <div className="text-center p-6 bg-white rounded-lg shadow-md">
                        <img
                            src={assets.matee}  // Replace with actual image path
                            alt="Matee Ur Rehman"
                            className="w-32 h-32 mx-auto rounded-full mb-4"
                        />
                        <h3 className="text-2xl font-semibold mb-4">Matee Ur Rehman</h3>
                        <p className="text-lg text-gray-700 mb-4">Email: mateerehman42@gmail.com</p>
                        <p className="text-lg text-gray-700 mb-4">Phone: +923485495563</p>
                        <p className="text-lg text-gray-700 mb-4">
                            LinkedIn:{" "}
                            <a href="https://www.linkedin.com/in/mateeurrehman4"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline">
                                mateeurrehman4
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact

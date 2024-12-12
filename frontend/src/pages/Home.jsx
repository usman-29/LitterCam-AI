import React from 'react'
import { assets } from '../assets/assets';

const Home = () => {
    return (
        <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${assets.background})` }}>
            <div className='flex justify-end'>
                <div className="text-black mt-20 w-1/2 p-8 space-y-4">
                    <h2 className="text-5xl">LitterCam AI</h2>
                    <p className="bg-gray-800 text-white inline-block px-4 py-2 rounded-md opacity-90 text-sm">
                        AI-powered solution to combat littering
                    </p>
                    <p className="text-xl mt-4">
                        Improve environmental quality and reduce the risk of litter clearance with
                        <span className="font-bold text-lg text-gray-900"> Artificial Intelligence</span>.
                    </p>
                    <p className="text-lg mt-4">
                        The complete vehicle-based littering solution for street scene, enforcement, and highways maintenance professionals.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Home

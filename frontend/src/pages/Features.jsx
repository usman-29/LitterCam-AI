import React from 'react'

const features = [
    {
        title: 'Littering Instance Detection',
        description: 'Detects the instance of littering.',
    },
    {
        title: 'License Plate Detection',
        description: 'Identify littering vehicles with precision.',
    },
    {
        title: 'Seamless Integration',
        description: 'Works with existing surveillance infrastructure.',
    },
];

const Features = () => {
    return (
        <div id="features" className="py-12 bg-gray-100">
            <h2 className="text-center text-3xl font-semibold text-gray-800 mb-8">Features</h2>
            <div className="flex flex-wrap justify-around">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="text-center w-80 m-5 p-6 bg-white border border-gray-300 rounded-xl shadow-md transition-all transform hover:translate-y-1 hover:shadow-lg"
                    >
                        <h4 className="text-xl font-medium text-gray-700 mb-2">{feature.title}</h4>
                        <p className="text-lg text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Features

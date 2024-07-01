import React from 'react'

const Header = () => {
    return (
        <header className="flex justify-between items-center bg-gray-800 text-white p-4">
            <div className="text-xl font-bold w-full flex items-center">
                <i className="fas fa-solid fa-cube">
                    <img src="https://camo.githubusercontent.com/f27baabc660e31293bb03fe4eda40e4ce9c1873620b0f51b2f221d138f77771c/68747470733a2f2f6b616c7669756d2e636f6d6d756e6974792f696d616765732f736964656261722d32642d6c6f676f2e737667" alt="Logo" className="h-12 mr-2" />
                </i>
                <a href='https://kalvium.com/' className='text-white text-2xl font-bold'>Kalvium Online Code Compiler</a>
            </div>
            <button className="bg-green-500 text-white py-1 px-2 rounded">Programiz</button>
        </header>
    )
}

export default Header
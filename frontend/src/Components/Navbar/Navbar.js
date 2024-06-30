import React from 'react'
import './navbar.css'
import logo from '../../Assets/Kalvium-Logo-SVG.svg'

const Navbar = ({ onLanguageChange, onSubmit }) => {

    const handleLanguageChange = (event) => {
        onLanguageChange(event.target.value);
      };
    
    return (
        <div className='header'>
            <div className="components">
                <img src={logo} alt='' />
                <div className='buttons'>
                    <select name="language" id="language" onChange={handleLanguageChange}>
                        <option value="">Select a language</option>
                        <option value="c">C</option>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                        <option value="nodejs">JavaScript</option>
                        <option value="ruby">Ruby</option>
                        <option value="php">PHP</option>
                    </select>
                    <button onClick={onSubmit}>Compile & Run</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar

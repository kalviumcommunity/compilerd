import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function AppHeader() {
  const [selectedLanguage, setSelectedLanguage] = useState(''); // State to track selected language

  const handleNavClick = (language) => {
    setSelectedLanguage(language); // Update selectedLanguage state when nav item is clicked
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home" className="navbar-brand">Compilered</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#cpp" className={`nav-link ${selectedLanguage === 'cpp' ? 'active' : ''}`} onClick={() => handleNavClick('cpp')}>C++</Nav.Link>
          <Nav.Link href="#python" className={`nav-link ${selectedLanguage === 'python' ? 'active' : ''}`} onClick={() => handleNavClick('python')}>Python</Nav.Link>
          <Nav.Link href="#c" className={`nav-link ${selectedLanguage === 'c' ? 'active' : ''}`} onClick={() => handleNavClick('c')}>C</Nav.Link>
          <Nav.Link href="#javascript" className={`nav-link ${selectedLanguage === 'nodejs' ? 'active' : ''}`} onClick={() => handleNavClick('nodejs')}>Node.js</Nav.Link>
          <Nav.Link href="#java" className={`nav-link ${selectedLanguage === 'java' ? 'active' : ''}`} onClick={() => handleNavClick('java')}>Java</Nav.Link>
          <Nav.Link href="#ruby" className={`nav-link ${selectedLanguage === 'ruby' ? 'active' : ''}`} onClick={() => handleNavClick('ruby')}>Ruby</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppHeader;

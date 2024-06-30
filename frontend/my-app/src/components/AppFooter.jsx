import React from 'react';

function AppFooter() {
  return (
    <footer className="bg-dark text-white text-center p-4 mt-5">
      <div className="mb-3">
        <span className="footer-text">&copy; {new Date().getFullYear()}</span>
        <span className="footer-text">Compilered.</span>
        <span className="footer-text">All rights reserved.</span>
      </div>
      <div className="mb-3">
        <span className="footer-text">Contact us :</span>
        <a href="mailto:xyz@gmail.com" className="text-white footer-link">xyz@gmail.com</a>
        <span className="footer-text">|</span>
        <span className="footer-text">Phone : xxxxxxxxxx</span>
      </div>
      <div>
        <span className="footer-text">Designed by Sai Dhanush Rayapureddy</span>
      </div>
    </footer>
  );
}

export default AppFooter;

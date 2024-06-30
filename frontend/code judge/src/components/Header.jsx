import React from "react";
import logo from "./Logo.png"; // Import the logo file

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center", // Center horizontally
        padding: "10px 20px", // Adjust padding as needed
      }}
    >
      {/* Logo */}
      <div style={{ marginRight: "10px" }}>
        <img
          src={logo} // Use imported logo
          alt="Logo"
          style={{ height: "40px", width: "auto" }} // Adjust height as needed
        />
      </div>

      {/* Title */}
      {/* <h1
        style={{ margin: 0, fontSize: "2.5rem", fontFamily: "Times New Roman" }}
      >
        Code Judge
      </h1> */}
    </div>
  );
};

export default Header;

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}", "./*.html"],
  darkMode:"class",
  theme: {
    extend: {
      colors: {
        primaryWhite: "#fffefe",
        shadowBlack: "#333333",
        primaryPurple: "#368186",
        grayishYellow: "#736b39",
      },
      fontFamily: {
        primary: "Source Code Pro",
      },
      screens: {
        xxl: "1751px",
        mmd: "851px",
        gsm: "571px",
        msm: "491px",
        vsm: "441px",
        vvsm: "351px",
      },
      boxShadow: {
        vsm: "0px 0px 3px #a5a8a8",
        mdm: "0px 0px 5px #727575",
      },
      backgroundColor: {
        'dark-bg': '#2E3136', 
      },
      textColor: {
        'dark-text': '#FFFFFF', 
      },
    },
  },
  plugins: [],
};
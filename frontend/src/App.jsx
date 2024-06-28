import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";

const App = () => {
  return (
    <div className="bg-primaryWhite py-4 m-auto flex flex-col gap-2 items-center 2xl: w-11/12">
      <Header/>
      <Main/>
      <Footer />
    </div>
  );
};

export default App;

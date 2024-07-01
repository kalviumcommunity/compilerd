
import './App.css';
import Header from './components/Header';
import Compiler from './components/Compiler';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div className="h-screen flex bg-gray-900 flex-col">
       <Header/>
       <Compiler/>
       <Footer/>
      </div>
    </>
  );
}

export default App;

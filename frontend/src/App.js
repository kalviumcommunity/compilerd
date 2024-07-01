
import './App.css';
import Header from './components/Header';
import Compiler from './components/Compiler';
// import Temp from './components/Temp';

function App() {
  return (
    <>
      <div className="h-screen flex bg-gray-900 flex-col">
       <Header/>
       <Compiler/>
       {/* <Temp/> */}
      </div>
    </>
  );
}

export default App;

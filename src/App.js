//import logo from './assests/images/logo.svg';
import './assests/css/App.css';

//components
import Conversor from './components/conversor/Conversor';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="App">

      <Header />

      <h1>Currency Converter</h1>

      <div className='centerConversor'>
        <Conversor />
      </div>

      <div className='centerFooter'>
        <Footer />
      </div>

    </div>
  );
}

export default App;

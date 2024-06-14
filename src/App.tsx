import { BrowserRouter } from 'react-router-dom';
import './App.css';
import LandingPage from './Components/Landing-Page/LandingPage';

function App() {
  return (
    <>
    <BrowserRouter>
    <LandingPage />
    </BrowserRouter>
    </>
 
  );
}

export default App;

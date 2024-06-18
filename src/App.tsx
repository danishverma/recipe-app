import { BrowserRouter } from 'react-router-dom';
import './App.css';
import LandingPage from './Components/Landing-Page/LandingPage';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import 'react-loading-skeleton/dist/skeleton.css'
function App() {
  return (
    <>
    <BrowserRouter>
    <LandingPage />
    </BrowserRouter>
    <ToastContainer 
    position='top-center'
    autoClose={1000}/>
    </>
 
  );
}

export default App;

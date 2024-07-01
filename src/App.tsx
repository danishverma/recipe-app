import { BrowserRouter } from 'react-router-dom';
import './App.css';
import LandingPage from './Components/Landing-Page/LandingPage';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-tippy/dist/tippy.css'
import Loading from './Components/Loader/Loading';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
function App() {
  const loading = useSelector((state: RootState) => state.loaderSliceReducer)
  return (
    <>
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
      <ToastContainer
        position='top-center'
        autoClose={1000} />
    {loading ? <Loading /> : null}
    </>
  );
}

export default App;

import { BrowserRouter } from 'react-router-dom';
import './App.css';
import LandingPage from './Components/Landing-Page/LandingPage';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-tippy/dist/tippy.css'
import Loading from './Components/Loader/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { storeUserDetails } from './redux/Slices/authSlice';
import { useEffect } from 'react';
import { checkIsLoading } from './redux/Slices/loader';
import axios from 'axios';
function App() {
  const dispatch = useDispatch()
  const loading = useSelector((state: RootState) => state.loaderSliceReducer)
  const userId = localStorage.getItem("id")
  useEffect(()=>{
    const apiResponse = async() => {
      try {
        dispatch(checkIsLoading(true))
        const user = await axios.get(`${process.env.REACT_APP_API_PREFIX}/users/${userId}`).catch((err)=>{
          throw err
        })
        dispatch(storeUserDetails(user.data.data.data))
      } catch (error) {
        throw error
      } finally {
        dispatch(checkIsLoading(false))
      }
    }
    if(userId){
    apiResponse()
    }
  },[])
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

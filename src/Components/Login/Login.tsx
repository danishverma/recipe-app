import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LoginValues } from '../common/Interfaces';
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { checkLoginStatus, storeUserDetails } from "../../redux/Slices/authSlice";

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors, isDirty, isValid }, reset } = useForm<LoginValues>({
        mode: "all"
    });

    const onSubmitHandler = async (data: LoginValues) => {
        try {
            // console.log(data);
            console.log(`${process.env.REACT_APP_API_PREFIX}/users/login`, 'hhkjhk');
            
            const response = await axios.post(`${process.env.REACT_APP_API_PREFIX}/users/login`, data);
            
            console.log(response);
            localStorage.setItem('token', response.data.data.token);
            dispatch(checkLoginStatus(localStorage.getItem('token')))
            console.log(response.data.data.id, 'id');
            
            dispatch(storeUserDetails(response.data.data.id))
            toast.success(response?.data?.message);
            reset();
            navigate("/");
        } catch (error: any) {
            toast.error(error?.response?.message);
        }
    };
    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input  {...register("email",
                                    {
                                        required: 'Email is Required',
                                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" }
                                    })} id="email" name="email" type="email" autoComplete="email" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                            <p className="mt-1 text-xs text-red-600">{errors.email?.message}</p>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                {/* <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                </div> */}
                            </div>
                            <div className="mt-2">
                                <input {...register("password", { required: 'Password is Required' })} id="password" name="password" type="password" autoComplete="current-password" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                            <p className="mt-1 text-xs text-red-600">{errors.password?.message}</p>
                        </div>

                        <div>
                            <button type="submit"  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                    </form>

                    <p className="mt-5 text-center text-sm text-gray-500">
                        New User?&nbsp;
                        <Link to='/signup' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign Up</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;

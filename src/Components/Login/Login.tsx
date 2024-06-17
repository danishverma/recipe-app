import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { Link } from "react-router-dom"
import { LoginValues } from '../common/Interfaces';

const Login = () => {
    const initialValues: LoginValues = {
        email: '',
        password: ''
      }
      const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid email address').required('Email is Required'),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is Required')
      })
      const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
      })
      const onSubmitHandler = (data: any) => {
        console.log({ data });
        reset();
      }
    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input {...register("email")} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
                                <input {...register("password")} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                            <p className="mt-1 text-xs text-red-600">{errors.password?.message}</p>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        New User?&nbsp;
                        <Link to='/signup' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign Up</Link>
                    </p>
                </div>
            </div>
        </>
    )
}
export default Login
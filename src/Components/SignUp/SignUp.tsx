import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { Link } from "react-router-dom"
import { SignUpValues } from '../common/Interfaces';

const SignUp = () => {
  const initialValues: SignUpValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contact: null
  }
  const validationSchema = Yup.object({
    firstName: Yup.string().min(3, 'First Name must be more than 3 character').max(15, 'First Name must be 15 characters or less').required('First Name is Required'),
    lastName: Yup.string().min(3, 'Last Name must be more than 3 characters').max(20, 'Last Name must be 20 characters or less').required('Last Name is Required'),
    email: Yup.string().email('Invalid email address').required('Email is Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is Required'),
    contact: Yup.number().required('Contact is Required').typeError('Contact must in numbers')
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

      <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up to create your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">


          <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6" action="#" method="POST">
            <div className="name-div flex gap-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                <div className="mt-2">
                  <input {...register("firstName")} id="firstName" name="firstName" type="text" autoComplete="name" required className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <p className="mt-1 text-xs text-red-600">{errors.firstName?.message}</p>
              </div>
              <div>

                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                <div className="mt-2">
                  <input {...register("lastName")} id="lastName" name="lastName" type="text" autoComplete="name" required className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <p className="mt-1 text-xs text-red-600">{errors.lastName?.message}</p>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
              <div className="mt-2">
                <input {...register("email")} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <p className="mt-1 text-xs text-red-600">{errors.email?.message}</p>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div className="mt-2">
                <input {...register("password")} id="password" name="password" type="password" autoComplete="password" required className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <p className="mt-1 text-xs text-red-600">{errors.password?.message}</p>
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium leading-6 text-gray-900">Contact</label>
              <div className="mt-2">
                <input {...register("contact")} id="contact" name="contact" type="text" autoComplete="number" required className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <p className="mt-1 text-xs text-red-600">{errors.contact?.message}</p>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
          </form>



          <p className="mt-10 text-center text-sm text-gray-500">
            Already a User?&nbsp;
            <Link to='/login' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign Up</Link>
          </p>
        </div >
      </div >
    </>
  )
}
export default SignUp
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { SignUpValues } from '../common/Interfaces';
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  console.log('process.env.REACT_APP_SIGNUP_API', process.env.REACT_APP_SIGNUP_API);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<SignUpValues>({
    mode: "all"
  });

  const onSubmitHandler = (data: SignUpValues) => {
    console.log(data);
    axios.post(`${process.env.REACT_APP_SIGNUP_API}`, data)
      .then((res) => { console.log(res.data); toast.success(res.data.message); reset() })
      .catch((err) => { console.error('err ', err); toast.error(err.response.data.message) })
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up to create your account</h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6" action="#" method="POST">
            <div className="name-div flex gap-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                <div className="mt-2">
                  <input {...register("first_name", { required: "First Name is Required", minLength: { value: 3, message: "First Name must be more than 3 characters" }, maxLength: { value: 15, message: "First Name must be 15 characters or less" } })} id="firstName" name="first_name" type="text" autoComplete="name" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <p className="mt-1 text-xs text-red-600">{errors.first_name?.message}</p>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                <div className="mt-2">
                  <input {...register("last_name", { required: "Last Name is Required", minLength: { value: 3, message: "Last Name must be more than 3 characters" }, maxLength: { value: 20, message: "Last Name must be 20 characters or less" } })} id="lastName" name="last_name" type="text" autoComplete="name" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <p className="mt-1 text-xs text-red-600">{errors.last_name?.message}</p>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
              <div className="mt-2">
                <input {...register("email", { required: "Email is Required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })} id="email" name="email" type="email" autoComplete="email" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <p className="mt-1 text-xs text-red-600">{errors.email?.message}</p>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div className="mt-2">
                <input {...register("password", { required: "Password is Required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} id="password" name="password" type="password" autoComplete="new-password" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <p className="mt-1 text-xs text-red-600">{errors.password?.message}</p>
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium leading-6 text-gray-900">Contact</label>
              <div className="mt-2">
                <input {...register("contact", { required: "Contact is Required", pattern: { value: /^\d+$/, message: "Contact must be in numbers" } })} id="contact" name="contact" type="text" autoComplete="tel" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <p className="mt-1 text-xs text-red-600">{errors.contact?.message}</p>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            Already a User?&nbsp;
            <Link to='/login' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign In</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;

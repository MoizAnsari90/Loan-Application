import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { postRequest } from '../Api';
import * as yup from 'yup';

// Validation schema
const schema = yup.object().shape({
  cnic: yup.string()
    .required('CNIC is required')
    .matches(/^\d{5}-\d{7}-\d{1}$/, 'CNIC must be in the format 12345-1234567-1'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  username: yup.string().required('Username is required'),
  phone: yup.string()
    .required('Phone number is required')
    .matches(/^\d{11}$/, 'Phone number must be 11 digits'),
  address: yup.string().required('Address is required'),
  purpose: yup.string().required('Purpose is required'),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = async(data) => {
    try {
      const response = await postRequest('/auth/register',data)
      alert('your registration successfully')
      navigate('/login'); 
      console.log(data);
    } catch (error) {
      alert('your registration not successfully')
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center py-12 sm:px-6 lg:px-8"
    style={{ backgroundImage: "url('../assets/images/slideShow1.6f890b58.jpg')" }}>  
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Create Your Account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-emerald-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 text-white">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-6">
              {/* CNIC */}
              <div>
                <label htmlFor="cnic" className="block text-sm font-medium text-white">
                  CNIC <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    {...register('cnic')}
                    type="text"
                    placeholder="12345-1234567-1"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {errors.cnic && <p className="mt-2 text-sm text-red-600">{errors.cnic.message}</p>}
                </div>
              </div>

              {/* Email and Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="Email"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('password')}
                      type="password"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
                  </div>
                </div>
              </div>

              {/* Username and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-white">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('username')}
                      type="text"
                      placeholder="Password"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="03001234567"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>}
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-white">
                  Address <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    {...register('address')}
                    placeholder='Address'
                    rows={3}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address.message}</p>}
                </div>
              </div>

              {/* Purpose */}
              <div>
                <label htmlFor="purpose" className="block text-sm font-medium text-white">
                  Purpose <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <select
                    {...register('purpose')}
                    className="appearance-none block w-full px-3 py-2 border bg-emerald-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select Purpose</option>
                    <option value="business">Business</option>
                    <option value="personal">Personal</option>
                    <option value="education">Education</option>
                  </select>
                  {errors.purpose && <p className="mt-2 text-sm text-red-600">{errors.purpose.message}</p>}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-900 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
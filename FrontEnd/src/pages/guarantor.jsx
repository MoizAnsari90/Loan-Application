import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { postRequest } from '../Api';
import { useNavigate } from 'react-router';

// Validation Schema
const guarantorSchema = yup.object().shape({
  cnic: yup
    .number()
    .typeError('CNIC must be a number')
    .required('CNIC is required')
    .test('len', 'CNIC must be 13 digits', val => val && val.toString().length === 13),
  guarantor_name: yup.string().required('Full Name is required'),
  relationship: yup.string().required('Relationship is required'),
  dateOfBirth: yup
    .date()
    .required('Date of Birth is required')
    .typeError('Invalid date'),
  occupation: yup.string().required('Occupation is required'),
  income: yup
    .number()
    .typeError('Income must be a number')
    .required('Income is required')
    .min(0, 'Income cannot be negative'),
  address: yup.string().required('Address is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
});

export default function GuarantorForm() {
  const navigator = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(guarantorSchema),
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await postRequest('/guarantor/register', data);
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.userId);
      alert('Guarantor details submitted successfully');
      navigator('/')
    } catch (error) {
      console.error('Error submitting guarantor form:', error);
      alert('An error occurred while submitting the form');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-white"
      style={{ backgroundImage: "url('../assets/images/slideShow1.6f890b58.jpg')" }}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Guarantor Information Form
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 bg-emerald-800 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Personal Information</h3>

                <div>
                  <label className="block text-sm font-medium text-white">
                    CNIC <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('cnic')}
                    type="text"
                    placeholder="12345-1234567-1"
                    className="w-full px-3 py-2 border rounded-md shadow-sm"
                  />
                  {errors.cnic && <p className="text-sm text-red-600">{errors.cnic.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('guarantor_name')}
                      type="text"
                      placeholder="Guarantor_name"
                      className="w-full px-3 py-2 border rounded-md shadow-sm"
                    />
                    {errors.guarantor_name && <p className="text-sm text-red-600">{errors.guarantor_name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white">
                      Relationship <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register('relationship')}
                      className="w-full px-3 py-2 border rounded-md shadow-sm text-white bg-emerald-800"
                    >
                      <option value="">Select Relationship</option>
                      <option value="parent">Parent</option>
                      <option value="sibling">Sibling</option>
                      <option value="relative">Relative</option>
                      <option value="friend">Friend</option>
                    </select>
                    {errors.relationship && <p className="text-sm text-red-600">{errors.relationship.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('dateOfBirth')}
                    type="date"
                    className="w-full px-3 py-2 border rounded-md shadow-sm bg-emerald-800 text-white"
                  />
                  {errors.dateOfBirth && <p className="text-sm text-red-600">{errors.dateOfBirth.message}</p>}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Contact Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('phoneNumber')}
                      type="tel"
                      placeholder='phone number'
                      className="w-full px-3 py-2 border rounded-md shadow-sm"
                    />
                    {errors.phoneNumber && <p className="text-sm text-red-600">{errors.phoneNumber.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder='Email'
                      className="w-full px-3 py-2 border rounded-md shadow-sm"
                    />
                    {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('address')}
                    type="text"
                    placeholder='Address'
                    className="w-full px-3 py-2 border rounded-md shadow-sm"
                  />
                  {errors.address && <p className="text-sm text-red-600">{errors.address.message}</p>}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Occupation Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white">
                      Occupation <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('occupation')}
                      type="text"
                      placeholder='occupation'
                      className="w-full px-3 py-2 border rounded-md shadow-sm"
                    />
                    {errors.occupation && <p className="text-sm text-red-600">{errors.occupation.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white">
                      Monthly Income (PKR) <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('income')}
                      type="number"
                      placeholder='Salary'
                      className="w-full px-3 py-2 border rounded-md shadow-sm"
                    />
                    {errors.income && <p className="text-sm text-red-600">{errors.income.message}</p>}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-emerald-900 hover:bg-emerald-700 rounded-md shadow-sm"
            >
              Submit Guarantor Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
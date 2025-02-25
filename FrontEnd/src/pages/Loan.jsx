import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { postRequest } from '../Api';
import { useNavigate } from 'react-router';

// Validation Schema
const loanSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  category: yup.string().required('Category is required'),
  guarantor: yup.string().required('guarantor is required'),
  // subCategory: yup.string().required('Sub-category is required'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .required('Amount is required')
    .min(1000, 'Minimum loan amount is 1000'),
  duration: yup
    .number()
    .typeError('Duration must be a number')
    .required('Duration is required')
    .min(1, 'Minimum duration is 1 month'),
});

export default function LoanApplicationForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loanSchema),
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await postRequest('/loan/submit', data);
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId);
        alert('Loan application submitted successfully'); 
        navigate('/guarantor');
    } catch (error) {
      console.error('Error submitting loan application:', error);
      alert('An error occurred while submitting the application');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
    style={{ backgroundImage: "url('../assets/images/slideShow1.6f890b58.jpg')" }}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Loan Application Form
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className=" bg-emerald-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 text-white">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              {/* Candidate Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Candidate Information</h3>

                <div>
                  <label className="block text-sm font-medium text-white">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('username')}
                    type="text"
                    placeholder="username"
                    className="w-full px-3 py-2 border rounded-md shadow-sm"
                  />
                  {errors.username && <p className="text-sm text-red-600">{errors.username.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white">
                      Loan Category <span className="text-red-500">*</span>
                    </label>
                    <select {...register('category')} className="w-full px-3 py-2 border rounded-md shadow-sm text-white bg-emerald-800">
                      <option value="">Select Category</option>
                      <option value="personal">Personal Loan</option>
                      <option value="business">Business Loan</option>
                      <option value="education">Education Loan</option>
                    </select>
                    {errors.category && <p className="text-sm text-red-600">{errors.category.message}</p>}
                  </div>

                  <div>
                  <label className="block text-sm font-medium text-white">
                    Guarantor Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('guarantor')}
                    type="text"
                    placeholder="guarantor name"
                    className="w-full px-3 py-2 border rounded-md shadow-sm"
                  />
                  {errors.guarantor && <p className="text-sm text-red-600">{errors.guarantor.message}</p>}
                </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white">
                      Loan Amount (PKR) <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('amount')}
                      type="number"
                      placeholder='amount'
                      className="w-full px-3 py-2 border rounded-md shadow-sm"
                    />
                    {errors.amount && <p className="text-sm text-red-600">{errors.amount.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white">
                      Duration (months) <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('duration')}
                      type="number"
                      placeholder='duration'
                      className="w-full px-3 py-2 border rounded-md shadow-sm"
                    />
                    {errors.duration && <p className="text-sm text-red-600">{errors.duration.message}</p>}
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full py-2 px-4 bg-emerald-900 hover:bg-emerald-700 rounded-md shadow-sm">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

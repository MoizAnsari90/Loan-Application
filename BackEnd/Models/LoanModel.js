import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: false },
  category: { type: String, required: true },
  guarantor: { type: String, required: true },
  amount: { type: Number, required: true },
  duration: { type: Number, required: true },
});

const Loan = mongoose.model('Loan', loanSchema);

export default Loan;
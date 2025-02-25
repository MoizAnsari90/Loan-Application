import Loan from "../Models/LoanModel.js";

// View all loan applications
export const viewApplications = async (req, res) => {
  try {
    const loans = await Loan.find().populate("_id", "username"); // Populate user details
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Update loan application status
export const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (status !== "Approve" && status !== "Reject") {
      return res.status(400).json({ message: "Invalid status. It must be 'Approved' or 'Rejected'." });
    }

    // Find and update the loan
    const loan = await Loan.findByIdAndUpdate(
      _id,
      { status },
      { new: true } // Return the updated document
    );

    if (!loan) {
      return res.status(404).json({ message: "Loan not found." });
    }

    res.status(200).json({ message: "Loan status updated successfully.", loan });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
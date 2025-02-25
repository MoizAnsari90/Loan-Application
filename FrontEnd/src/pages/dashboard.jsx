import { useState, useEffect } from "react";
import { getRequest, putRequest } from "../Api";
import { useNavigate } from "react-router";

const LoanDashboard = () => {
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert('You have been logged out')
    navigate("/");
  }

  // Fetch loan applications
  const fetchLoans = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await getRequest("/admin/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoans(response);
    } catch (error) {
      alert("Failed to fetch loans: " + error);
    }
  };

  // Update loan status
  const updateLoanStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await putRequest(
        `/admin/update/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );
    } catch (error) {
      alert("Failed to update loan status: " + error);
      console.error("Error updating loan status:", error);
    }
  };

  // Fetch loans on component mount
  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="bg-emerald-800 text-white w-64 p-6">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <ul className="space-y-4">
          <li>
            <a href="#" className="flex items-center space-x-2 bg-emerald-800 p-2 rounded-lg">
              <span>🏠</span>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 bg-emerald-800 p-2 rounded-lg">
              <span>📄</span>
              <span>Loan Applications</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 bg-emerald-800 p-2 rounded-lg">
              <span>📊</span>
              <span>Reports</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 bg-emerald-800 p-2 rounded-lg">
              <span>⚙️</span>
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span>👤 Admin</span>
            <button onClick={handleLogout} className="bg-emerald-800 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
              Logout
            </button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Total Loans</h2>
            <p className="text-3xl">{loans.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Pending Loans</h2>
            <p className="text-3xl">{loans.filter((loan) => loan.status === "Pending").length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Approved Loans</h2>
            <p className="text-3xl">{loans.filter((loan) => loan.status === "Approved").length}</p>
          </div>
        </div>

        {/* Loan Applications Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Loan Applications</h2>
          <button
            onClick={fetchLoans}
            className="bg-emerald-800 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 mb-4"
          >
            Refresh Loans
          </button>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">username</th>
                <th className="p-3 text-left">Category</th>
                {/* <th className="p-3 text-left">Subcategory</th> */}
                <th className="p-3 text-left">duration</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan, index) => (
                <tr key={loan._id || index} className="border-b">
                  <td className="p-3">{loan.username}</td>
                  <td className="p-3">{loan.category}</td>
                  {/* <td className="p-3">{loan.subcategory}</td> */}
                  <td className="p-3">{loan.duration}</td>
                  <td className="p-3">PKR {loan.amount}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        loan.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : loan.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => updateLoanStatus(loan._id, "Approved")}
                      className="text-green-600 hover:text-green-700 mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateLoanStatus(loan._id, "Rejected")}
                      className="text-red-600 hover:text-red-700"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoanDashboard;
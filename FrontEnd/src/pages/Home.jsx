import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-white text-center p-6"
      style={{ backgroundImage: "url('../assets/images/slideShow1.6f890b58.jpg')" }}
    >
      <img src="../assets/images/giaic.png" alt="Logo" className="w-24 h-24 mb-4" />
      <h1 className="text-5xl font-bold mb-8">Governor Microfinance Initiative</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 ">
        <div className="bg-emerald-800 text-white bg-opacity-10 p-6 rounded-lg shadow-lg hover:bg-opacity-20 transition duration-300">
          <h2 className="text-2xl font-bold mb-4">Wedding Loans</h2>
          <p>Financial support for weddings, including Valima, Jahez, and more.</p>
        </div>
        <div className="bg-emerald-800 bg-opacity-10 p-6 rounded-lg shadow-lg hover:bg-opacity-20 transition duration-300 text-white">
          <h2 className="text-2xl font-bold mb-4">Home Construction Loans</h2>
          <p>Loans for building or renovating your home.</p>
        </div>
        <div className="bg-emerald-800 bg-opacity-10 p-6 rounded-lg shadow-lg hover:bg-opacity-20 transition duration-300 text-white">
          <h2 className="text-2xl font-bold mb-4">Business Startup Loans</h2>
          <p>Support for starting or expanding your business.</p>
        </div>
        <div className="bg-emerald-800 bg-opacity-10 p-6 rounded-lg shadow-lg hover:bg-opacity-20 transition duration-300 text-white">
          <h2 className="text-2xl font-bold mb-4">Education Loans</h2>
          <p>Loans for university fees and child education.</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/register"
          className="text-lg px-6 py-2 border-2 border-white rounded-lg hover:bg-emerald-800 hover:text-white transition duration-300"
        >
          Register
        </Link>
        <span className="text-2xl">|</span>
        <Link
          to="/login"
          className="text-lg px-6 py-2 border-2 border-white rounded-lg hover:bg-emerald-800 hover:text-white transition duration-300"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;

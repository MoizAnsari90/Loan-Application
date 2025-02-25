import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Home from "./pages/Home";
import { Routes , Route } from "react-router-dom"
import Dashboard from "./pages/dashboard";
import LoanApplicationForm from "./pages/Loan";
import GuarantorForm from "./pages/guarantor";


const App = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />} />  
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/loan-application" element={<LoanApplicationForm/>}/>
          <Route path="/guarantor" element={<GuarantorForm/>}/>
        </Routes>

    </div>
  );
}

export default App;

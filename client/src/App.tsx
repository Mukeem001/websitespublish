import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./layouts/MainLayout";

// Pages
import Home from "./pages/Home/Home";

// Common Pages
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Pricing from "./pages/Pricing/Pricing";
import Features from "./pages/Features/Features";
import Templates from "./pages/Templates/Templates";
import TemplatePreview from "./pages/TemplatePreview/TemplatePreview";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= Website ================= */}

        <Route path="/" element={<MainLayout />}>

          <Route index element={<Home />} />

          <Route path="templates" element={<Templates />} />

          <Route path="pricing" element={<Pricing />} />

          <Route path="features" element={<Features />} />

          <Route path="about" element={<About />} />

          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />



          <Route path="templates/:slug" element={<TemplatePreview />}/>
          <Route path="/dashboard" element={<Dashboard />} />
           



        </Route>

      

      </Routes>
    </BrowserRouter>
  );
}

export default App;
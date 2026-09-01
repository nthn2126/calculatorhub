import { Routes, Route, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import AllCalculators from "./pages/AllCalculators";
import CalculatorPage from "./pages/CalculatorPage";
import CategoryPage from "./pages/CategoryPage";

import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

function NotFound() {
  return (
    <main className="page-container">
      <div className="not-found">
        <h1>Page Not Found</h1>

        <p>
          The page you are looking for does not exist
          or may have been moved.
        </p>

        <Link to="/">
          Go Back Home
        </Link>
      </div>
    </main>
  );
}

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Main pages */}
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/calculators"
          element={<AllCalculators />}
        />

        {/* Individual calculator pages */}
        <Route
          path="/calculators/:slug"
          element={<CalculatorPage />}
        />

        {/* Category pages */}
        <Route
          path="/category/:category"
          element={<CategoryPage />}
        />

        {/* Information pages */}
        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />

        <Route
          path="/terms"
          element={<Terms />}
        />

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
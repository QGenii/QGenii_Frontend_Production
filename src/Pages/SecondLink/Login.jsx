import { useState, useContext } from "react";
import Logo from "../../assets/assets/SecondLink/Logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { businessLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter a valid email";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await businessLogin(email, password);
      navigate("/home1");
    } catch (err) {
      const message =
        err?.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Form */}
        <div className="bg-white shadow-md rounded-xl p-8">
          <div className="mb-4">
            <Link to="/home1" className="text-[#0C316E] text-sm font-medium underline hover:no-underline">
              ← Back to Home
            </Link>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-1 text-center">
            Welcome to Qgenii Business
          </h2>
          <h4 className="text-[0.875rem] text-gray-500 mb-6 text-center">
            Sign in to your business account
          </h4>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="flex flex-col justify-center items-center mb-4">
              <div className="w-[24rem]">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  placeholder="Enter your business email"
                  className={`w-full px-4 py-2 border rounded-lg outline-none transition ${errors.email ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                    }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col justify-center items-center mb-2">
              <div className="w-[24rem] relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-2 pr-16 border rounded-lg outline-none transition ${errors.password ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-8 text-sm text-gray-500 hover:text-gray-800 select-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-center items-start flex-col mt-2 mb-6 w-[24rem] mx-auto">
              <Link
                to="/secondlinkforgetpassword"
                className="text-[#0C316E] text-[0.875rem] font-medium underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-[16.3rem] bg-[#0C316E] text-white py-2.5 rounded-lg font-semibold hover:bg-[#0a2856] transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in…" : "Continue →"}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have a business account?{" "}
            <Link
              to="/secondlinksignup"
              className="text-[#0C316E] font-semibold underline"
            >
              Sign up
            </Link>
          </div>

          {/* Help & Links */}
          <div className="mt-4 text-center text-sm text-gray-600">
            <h4 className="text-[0.75rem] font-normal">
              Get Help with your account
            </h4>
            <a
              href="#"
              className="text-[#0C316E] text-[0.875rem] font-medium underline"
            >
              Contact Qgenii Support
            </a>
            <p className="mt-4 text-xs text-gray-500">
              By signing in, you agree to our{" "}
              <a href="#" className="text-[#0C316E] underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#0C316E] underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="flex justify-center">
          <img
            src={Logo}
            alt="Qgenii Business"
            className="max-w-md w-full"
          />
        </div>
      </div>
    </section>
  );
}

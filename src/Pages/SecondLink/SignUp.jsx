import { useState, useContext } from "react";
import Logo from "../../assets/assets/SecondLink/Logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";

const BUSINESS_SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"];

const INDUSTRIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Retail",
  "Manufacturing",
  "Consulting",
  "Media & Entertainment",
  "Real Estate",
  "Other",
];

export default function SignupPage() {
  const { businessRegister } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessSize: "",
    industry: "",
    jobTitle: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!form.businessName.trim()) newErrors.businessName = "Business name is required";
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
      await businessRegister({
        name: form.name,
        email: form.email,
        password: form.password,
        businessName: form.businessName,
        businessSize: form.businessSize || undefined,
        industry: form.industry || undefined,
        jobTitle: form.jobTitle || undefined,
      });
      navigate("/home1");
    } catch (err) {
      const message =
        err?.response?.data?.message || "Registration failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ id, label, type = "text", placeholder, required, children }) => (
    <div className="flex flex-col mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-black mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id]}</p>}
    </div>
  );

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Side - Form */}
        <div className="bg-white shadow-md rounded-xl p-8">
          <div className="mb-4">
            <Link to="/home1" className="text-[#0C316E] text-sm font-medium underline hover:no-underline">
              ← Back to Home
            </Link>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-1 text-center">
            Create a Business Account
          </h2>
          <h4 className="text-[0.875rem] text-gray-500 mb-6 text-center">
            Start your Qgenii Business journey
          </h4>

          <form onSubmit={handleSubmit} noValidate className="max-w-[24rem] mx-auto">
            {/* Full Name */}
            <Field id="name" label="Full Name" required>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={`w-full px-4 py-2 border rounded-lg outline-none transition ${errors.name ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                  }`}
              />
            </Field>

            {/* Email */}
            <Field id="email" label="Business Email" required>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className={`w-full px-4 py-2 border rounded-lg outline-none transition ${errors.email ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                  }`}
              />
            </Field>

            {/* Business Name */}
            <Field id="businessName" label="Business / Company Name" required>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="Acme Corp"
                className={`w-full px-4 py-2 border rounded-lg outline-none transition ${errors.businessName ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                  }`}
              />
            </Field>

            {/* Job Title */}
            <Field id="jobTitle" label="Your Job Title">
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={form.jobTitle}
                onChange={handleChange}
                placeholder="e.g. Learning & Development Manager"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition"
              />
            </Field>

            {/* Business Size */}
            <Field id="businessSize" label="Company Size">
              <select
                id="businessSize"
                name="businessSize"
                value={form.businessSize}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition bg-white"
              >
                <option value="">Select company size</option>
                {BUSINESS_SIZES.map((s) => (
                  <option key={s} value={s}>{s} employees</option>
                ))}
              </select>
            </Field>

            {/* Industry */}
            <Field id="industry" label="Industry">
              <select
                id="industry"
                name="industry"
                value={form.industry}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition bg-white"
              >
                <option value="">Select industry</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </Field>

            {/* Password */}
            <Field id="password" label="Password" required>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className={`w-full px-4 py-2 pr-16 border rounded-lg outline-none transition ${errors.password ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-2.5 text-sm text-gray-500 hover:text-gray-800 select-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </Field>

            {/* Confirm Password */}
            <Field id="confirmPassword" label="Confirm Password" required>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
                className={`w-full px-4 py-2 border rounded-lg outline-none transition ${errors.confirmPassword ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                  }`}
              />
            </Field>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0C316E] text-white py-2.5 rounded-lg font-semibold hover:bg-[#0a2856] transition mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account…" : "Create Business Account →"}
            </button>
          </form>

          {/* Sign in link */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Already have a business account?{" "}
            <Link
              to="/secondlinklogin"
              className="text-[#0C316E] font-semibold underline"
            >
              Sign in
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
              By signing up, you agree to our{" "}
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
        <div className="sticky top-8 flex justify-center">
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

import { useState } from "react";
import Logo from "../../assets/assets/SecondLink/forgetpassword/Logo.png";
import { Link } from "react-router-dom";
import api from "../../lib/api";
import toast from "react-hot-toast";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/business/forgot-password", { email });
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side */}
        <div className="bg-white shadow-md rounded-xl p-8">
          {submitted ? (
            <div className="text-center py-6">
              <div className="text-green-500 text-5xl mb-4">✉️</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Check your inbox
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                If a Qgenii Business account exists for{" "}
                <strong>{email}</strong>, a password reset link has been sent.
                Check your inbox (and spam folder).
              </p>
              <Link
                to="/secondlinklogin"
                className="text-[#0C316E] text-[0.875rem] font-semibold underline"
              >
                ← Back to Login
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
                Forgot Password?
              </h2>
              <h4 className="text-[0.875rem] text-gray-500 mb-6 text-center">
                Enter your business email and we'll send you a reset link
              </h4>

              <form onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col justify-center items-center mb-4">
                  <div className="w-[24rem]">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-black mb-1"
                    >
                      Business Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter your business email"
                      className={`w-full px-4 py-2 border rounded-lg outline-none transition ${error
                          ? "border-red-500"
                          : "border-gray-300 focus:border-blue-500"
                        }`}
                    />
                    {error && (
                      <p className="text-red-500 text-xs mt-1">{error}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-center mt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-[16.3rem] bg-[#0C316E] text-white py-2.5 rounded-lg font-semibold hover:bg-[#0a2856] transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending…" : "Send Reset Link"}
                  </button>
                </div>

                <div className="text-center mt-5">
                  <Link
                    to="/secondlinklogin"
                    className="text-[#0C316E] text-[0.875rem] font-medium underline"
                  >
                    ← Back to Login
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <img
            src={Logo}
            alt="Forgot password"
            className="max-w-md w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}

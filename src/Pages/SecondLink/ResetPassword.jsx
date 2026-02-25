import { useState, useEffect } from "react";
import Logo from "../../assets/assets/SecondLink/forgetpassword/Logo.png";
import Check from "../../assets/assets/SecondLink/Check.svg";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import api from "../../lib/api";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!token || !email) {
      toast.error("Invalid or missing reset link.");
    }
  }, [token, email]);

  const validate = () => {
    const errs = {};
    if (!newPassword) errs.newPassword = "Password is required";
    else if (newPassword.length < 6) errs.newPassword = "Password must be at least 6 characters";
    if (newPassword !== confirmPassword) errs.confirmPassword = "Passwords do not match";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await api.post("/auth/business/reset-password", {
        email,
        token,
        newPassword,
      });
      setDone(true);
      toast.success("Password reset successfully!");
      setTimeout(() => navigate("/secondlinklogin"), 3000);
    } catch (err) {
      const message = err?.response?.data?.message || "Reset failed. The link may have expired.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side */}
        <div className="shadow-md rounded-xl bg-white p-10 flex flex-col gap-4 items-center">
          {done ? (
            <>
              <img src={Check} alt="Success" className="w-24 h-24" />
              <h2 className="text-2xl font-semibold text-gray-900 text-center">
                Password Reset Successful!
              </h2>
              <p className="text-[0.875rem] text-gray-500 text-center">
                Your password has been updated. Redirecting you to login…
              </p>
              <Link
                to="/secondlinklogin"
                className="text-[#0C316E] text-sm font-semibold underline mt-2"
              >
                Go to Login →
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-gray-900 text-center">
                Set New Password
              </h2>
              <p className="text-[0.875rem] text-gray-500 text-center">
                Enter a new password for your Qgenii Business account
              </p>

              <form onSubmit={handleSubmit} noValidate className="w-full max-w-sm mt-2">
                {/* New Password */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-black mb-1">
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setErrors((p) => ({ ...p, newPassword: "" }));
                      }}
                      placeholder="Min. 6 characters"
                      className={`w-full px-4 py-2 pr-16 border rounded-lg outline-none transition ${errors.newPassword ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-2.5 text-sm text-gray-500 hover:text-gray-800"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-black mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setErrors((p) => ({ ...p, confirmPassword: "" }));
                    }}
                    placeholder="Repeat new password"
                    className={`w-full px-4 py-2 border rounded-lg outline-none transition ${errors.confirmPassword ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                      }`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || !token || !email}
                  className="w-full bg-[#0C316E] text-white py-2.5 rounded-lg font-semibold hover:bg-[#0a2856] transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Resetting…" : "Reset Password"}
                </button>

                <div className="text-center mt-4">
                  <Link
                    to="/secondlinkforgetpassword"
                    className="text-[#0C316E] text-sm underline"
                  >
                    Request a new link
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <img src={Logo} alt="Reset password" className="max-w-md w-full" />
        </div>
      </div>
    </section>
  );
}

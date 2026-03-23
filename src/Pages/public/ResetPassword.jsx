import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { BookOpen } from "lucide-react";
import api from "../../lib/api";
import toast from "react-hot-toast";
import { Container } from "../../Components/layout/Container";
import { Input } from "../../Components/ui/Input";
import { Button } from "../../Components/ui/Button";

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!token || !email) {
      toast.error("Invalid or missing reset link.");
    }
  }, [token, email]);

  const validate = () => {
    const errs = {};
    if (!newPassword) {
      errs.newPassword = "Password is required";
    } else if (newPassword.length < 6) {
      errs.newPassword = "Password must be at least 6 characters";
    }

    if (newPassword !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await api.post("/auth/reset-password", {
        email,
        token,
        newPassword,
      });
      toast.success("Password reset successfully!");
      navigate("/login");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Reset failed. The link may have expired.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BookOpen className="w-12 h-12 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-600 mt-2">
            Choose a new password for your account.
          </p>
        </div>

        <div className="card">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, newPassword: "" }));
                }}
                placeholder="At least 6 characters"
                required
              />
              {errors.newPassword && (
                <p className="text-sm text-red-600 -mt-4">
                  {errors.newPassword}
                </p>
              )}

              <Input
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }}
                placeholder="Repeat new password"
                required
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 -mt-4">
                  {errors.confirmPassword}
                </p>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading || !token || !email}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>

              <div className="text-center mt-4">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Request a new link
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};


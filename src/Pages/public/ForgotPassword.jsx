import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import api from "../../lib/api";
import toast from "react-hot-toast";
import { Container } from "../../Components/layout/Container";
import { Input } from "../../Components/ui/Input";
import { Button } from "../../Components/ui/Button";

export const ForgotPassword = () => {
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
      await api.post("/auth/forgot-password", { email });
      setSubmitted(true);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Something went wrong. Please try again.";
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
          <h1 className="text-3xl font-bold text-gray-900">Forgot Password</h1>
          <p className="text-gray-600 mt-2">
            Enter your account email and we&apos;ll send you a reset link.
          </p>
        </div>

        <div className="card">
          <div className="p-8">
            {submitted ? (
              <div className="text-center space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Check your inbox
                </h2>
                <p className="text-gray-600 text-sm">
                  If an account exists for{" "}
                  <span className="font-semibold">{email}</span>, a password
                  reset link has been sent. Please check your email (and spam
                  folder).
                </p>
                <Link
                  to="/login"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  ← Back to login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="you@example.com"
                  required
                />
                {error && (
                  <p className="text-sm text-red-600 -mt-4">{error}</p>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send reset link"}
                </Button>

                <div className="text-center mt-4">
                  <Link
                    to="/login"
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    ← Back to login
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};


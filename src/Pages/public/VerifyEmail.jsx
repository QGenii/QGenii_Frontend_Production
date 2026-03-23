import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../../lib/api";
import { Container } from "../../Components/layout/Container";
import { BookOpen } from "lucide-react";

export const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("Verification token is missing.");
      return;
    }

    const run = async () => {
      try {
        const res = await api.post("/auth/verify-email", { token });
        setStatus("success");
        setMessage(res.data?.message || "Email verified successfully.");
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          "Verification link is invalid or has expired.";
        setStatus("error");
        setMessage(msg);
      }
    };

    run();
  }, [searchParams]);

  return (
    <Container className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BookOpen className="w-12 h-12 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Verify your email
          </h1>
        </div>

        <div className="card">
          <div className="p-8 text-center space-y-4">
            {status === "loading" && (
              <p className="text-gray-600">Verifying your email...</p>
            )}
            {status !== "loading" && (
              <p
                className={
                  status === "success" ? "text-green-600" : "text-red-600"
                }
              >
                {message}
              </p>
            )}

            <div className="pt-4">
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Go to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};


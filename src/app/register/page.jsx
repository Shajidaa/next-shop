"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleRegister = async (formData) => {
    setLoading(true);
    setServerError("");

    try {
      // Axios call
      const response = await axios.post("/api/auth/register", formData);

      if (response.status === 200 || response.status === 201) {
        router.push("/");
      }
    } catch (err) {
      setServerError(
        err.response?.data?.error || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create Account
          </h2>
          <p className="text-gray-500 mt-2">Join us and start your journey</p>
        </div>

        <RegisterForm
          onSubmit={handleRegister}
          serverError={serverError}
          loading={loading}
        />

        <p className="text-center text-gray-600 mt-8">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

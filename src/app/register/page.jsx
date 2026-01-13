"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth(); // Get register from context
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleRegister = async (formData) => {
    setLoading(true);
    setServerError("");

    // Use the context register function
    const result = await register(formData);

    if (result.success) {
      // User is now set in Context! Redirect to home.
      router.push("/");
    } else {
      setServerError(result.error);
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
        </div>

        <RegisterForm
          onSubmit={handleRegister}
          serverError={serverError}
          loading={loading}
        />

        <p className="text-center text-gray-600 mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

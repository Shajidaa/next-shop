"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function RegisterForm({ onSubmit, serverError, loading }) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && (
        <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-gray-700">
            First Name
          </label>
          <input
            {...register("first_name", { required: "Required" })}
            className={`w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 ${
              errors.first_name ? "border-red-500" : "focus:ring-blue-500"
            }`}
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700">
            Last Name
          </label>
          <input
            {...register("last_name", { required: "Required" })}
            className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="relative">
        <label className="text-sm font-semibold text-gray-700">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          {...register("password", {
            required: "Password required",
            minLength: { value: 6, message: "Minimum 6 characters" },
          })}
          className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-500"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="animate-spin" size={20} />}
        {loading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}

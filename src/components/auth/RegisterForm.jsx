"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  User,
  ArrowRight,
  Check,
  Phone,
  MapPin,
  Building2,
} from "lucide-react";

export default function RegisterForm({ onSubmit, serverError, loading }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-blue-500",
      "bg-green-500",
    ];

    return {
      strength,
      label: labels[strength - 1] || "",
      color: colors[strength - 1] || "bg-gray-300",
    };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
          <div className="w-2 h-2 bg-destructive rounded-full shrink-0"></div>
          <span className="text-sm font-medium">{serverError}</span>
        </div>
      )}

      {/* Name Fields */}
      <div className="grid grid-cols-1 ">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground block">
             Name
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent transition-colors">
              <User size={18} />
            </div>
            <input
              {...register("name", {
                required: "First name is required",
                minLength: { value: 2, message: "Too short" },
              })}
              placeholder="John"
              className={`w-full pl-12 pr-4 py-3 bg-input border rounded-xl outline-none transition-all duration-200 focus:ring-2 focus:ring-ring placeholder:text-muted-foreground ${
                errors.name
                  ? "border-destructive focus:border-destructive"
                  : "border-border focus:border-accent"
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-destructive text-xs mt-1 flex items-center gap-1">
              <span className="w-1 h-1 bg-destructive rounded-full"></span>
              {errors.name.message}
            </p>
          )}
        </div>
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground block">
          Email Address
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent transition-colors">
            <Mail size={18} />
          </div>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="john@example.com"
            className={`w-full pl-12 pr-4 py-3 bg-input border rounded-xl outline-none transition-all duration-200 focus:ring-2 focus:ring-ring placeholder:text-muted-foreground ${
              errors.email
                ? "border-destructive focus:border-destructive"
                : "border-border focus:border-accent"
            }`}
          />
        </div>
        {errors.email && (
          <p className="text-destructive text-xs mt-1 flex items-center gap-1">
            <span className="w-1 h-1 bg-destructive rounded-full"></span>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone and Company Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground block">
            Phone Number
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent transition-colors">
              <Phone size={11} />
            </div>
            <input
              type="tel"
              {...register("phone", { required: "Phone number is required" })}
              placeholder="+1 (555) 000-0000"
              className={`w-full pl-12 pr-4 py-3 bg-input border rounded-xl outline-none transition-all duration-200 focus:ring-2 focus:ring-ring placeholder:text-muted-foreground ${
                errors.phone
                  ? "border-destructive focus:border-destructive"
                  : "border-border focus:border-accent"
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-destructive text-xs mt-1 flex items-center gap-1">
              <span className="w-1 h-1 bg-destructive rounded-full"></span>
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground block">
            Company
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent transition-colors">
              <Building2 size={18} />
            </div>
            <input
              {...register("company", { required: "Company name is required" })}
              placeholder="Acme Inc."
              className={`w-full pl-12 pr-4 py-3 bg-input border rounded-xl outline-none transition-all duration-200 focus:ring-2 focus:ring-ring placeholder:text-muted-foreground ${
                errors.company
                  ? "border-destructive focus:border-destructive"
                  : "border-border focus:border-accent"
              }`}
            />
          </div>
          {errors.company && (
            <p className="text-destructive text-xs mt-1 flex items-center gap-1">
              <span className="w-1 h-1 bg-destructive rounded-full"></span>
              {errors.company.message}
            </p>
          )}
        </div>
      </div>

      {/* Address Field */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground block">
          Address
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent transition-colors">
            <MapPin size={18} />
          </div>
          <input
            {...register("address", { required: "Address is required" })}
            placeholder="123 Main St, City, Country"
            className={`w-full pl-12 pr-4 py-3 bg-input border rounded-xl outline-none transition-all duration-200 focus:ring-2 focus:ring-ring placeholder:text-muted-foreground ${
              errors.address
                ? "border-destructive focus:border-destructive"
                : "border-border focus:border-accent"
            }`}
          />
        </div>
        {errors.address && (
          <p className="text-destructive text-xs mt-1 flex items-center gap-1">
            <span className="w-1 h-1 bg-destructive rounded-full"></span>
            {errors.address.message}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground block">
          Password
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent transition-colors">
            <Lock size={18} />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            placeholder="Create a strong password"
            className={`w-full pl-12 pr-12 py-3 bg-input border rounded-xl outline-none transition-all duration-200 focus:ring-2 focus:ring-ring placeholder:text-muted-foreground ${
              errors.password
                ? "border-destructive focus:border-destructive"
                : "border-border focus:border-accent"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {password && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                  style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {passwordStrength.label}
              </span>
            </div>
          </div>
        )}

        {errors.password && (
          <p className="text-destructive text-xs mt-1 flex items-center gap-1">
            <span className="w-1 h-1 bg-destructive rounded-full"></span>
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground block">
          Confirm Password
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent transition-colors">
            <Lock size={18} />
          </div>
          <input
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            placeholder="Confirm your password"
            className={`w-full pl-12 pr-12 py-3 bg-input border rounded-xl outline-none transition-all duration-200 focus:ring-2 focus:ring-ring placeholder:text-muted-foreground ${
              errors.confirmPassword
                ? "border-destructive focus:border-destructive"
                : "border-border focus:border-accent"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-destructive text-xs mt-1 flex items-center gap-1">
            <span className="w-1 h-1 bg-destructive rounded-full"></span>
            {errors.confirmPassword.message}
          </p>
        )}
        {!errors.confirmPassword &&
          watch("confirmPassword") &&
          watch("confirmPassword") === password && (
            <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
              <Check size={12} />
              Passwords match
            </p>
          )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Creating Account...
          </>
        ) : (
          <>
            Create Account
            <ArrowRight
              size={18}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </>
        )}
      </button>
    </form>
  );
}

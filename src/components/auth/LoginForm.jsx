"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginForm({ onSubmit, serverError, loading }) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
          <div className="w-2 h-2 bg-destructive rounded-full flex-shrink-0"></div>
          <span className="text-sm font-medium">{serverError}</span>
        </div>
      )}

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
            placeholder="Enter your email"
            className={`w-full pl-12 pr-4 py-3 bg-input border rounded-xl outline-none transition-all duration-200 focus:ring-2 focus:ring-ring placeholder:text-muted-foreground ${
              errors.email
                ? "border-destructive focus:border-destructive"
                : "border-border focus:border-accent"
            }`}
          />
        </div>
        {errors.email && (
          <p className="text-destructive text-xs mt-1 flex items-center gap-1">
            <div className="w-1 h-1 bg-destructive rounded-full"></div>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-foreground">
            Password
          </label>
          <a href="#" className="text-xs text-accent hover:text-accent/80 font-medium transition-colors">
            Forgot password?
          </a>
        </div>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent transition-colors">
            <Lock size={18} />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
            placeholder="Enter your password"
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
        {errors.password && (
          <p className="text-destructive text-xs mt-1 flex items-center gap-1">
            <div className="w-1 h-1 bg-destructive rounded-full"></div>
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Signing in...
          </>
        ) : (
          <>
            Sign In
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}

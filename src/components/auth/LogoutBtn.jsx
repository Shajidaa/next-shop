"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = (useState < string) | (null > null);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Logout failed");
        return;
      }

      // Logout successful, redirect to login or home page
      router.push("/");
    } catch (err) {
      setError("An error occurred during logout");
      console.error("Logout error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button onClick={handleLogout} disabled={isLoading} variant="destructive">
        {isLoading ? "Logging out..." : "Logout"}
      </button>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

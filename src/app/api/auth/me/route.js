import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  // Use environment variables for flexibility
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const tenantValue = process.env.NEXT_PUBLIC_TENANT_HEADER;

  try {
    // 1. Get the Bearer token from the incoming request headers
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // 2. Forward the request to your main backend
    // We use the full URL from the environment variable if possible
    const response = await axios.get(`${baseUrl}/v2/auth/me`, {
      headers: {
        Authorization: authHeader, // Passes "Bearer <token>"
        "x-tenant-id": tenantValue, // Standardized header key
        Accept: "application/json",
      },
    });

    // 3. Return the user data to your frontend context
    return NextResponse.json(response.data);
  } catch (error) {
    // Better error logging for debugging
    const status = error.response?.status || 500;
    const message =
      error.response?.data?.message || "Failed to fetch user profile";

    console.error(
      `Profile Error [${status}]:`,
      error.response?.data || error.message
    );

    return NextResponse.json({ error: message }, { status: status });
  }
}

import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const tenantValue = process.env.NEXT_PUBLIC_TENANT_HEADER;
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const response = await axios.get(` ${baseUrl}/v2/auth/me`, {
      headers: {
        Authorization: authHeader,
        "tenant-id": tenantValue,
        Accept: "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Profile Error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: error.response?.status || 500 }
    );
  }
}

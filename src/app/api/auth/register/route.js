import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const tenantHeaderKey = "x-tenant-id";
    const tenantValue = process.env.NEXT_PUBLIC_TENANT_HEADER;

    const response = await fetch(`${baseUrl}/v2/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [tenantHeaderKey]: tenantValue,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}

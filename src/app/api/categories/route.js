import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const tenantValue = process.env.NEXT_PUBLIC_TENANT_HEADER;

    if (!baseUrl || !tenantValue) {
      console.error("Missing Environment Variables:", { baseUrl, tenantValue });
      return NextResponse.json({ error: "Config missing" }, { status: 500 });
    }

    const response = await fetch(`${baseUrl}/client/v1/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

        "x-tenant-id": tenantValue,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("External API Error Response:", data);
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

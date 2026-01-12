export async function GET(request, { params }) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const tenantValue = process.env.NEXT_PUBLIC_TENANT_HEADER;
    const { id } = await params;

    const response = await fetch(`${baseUrl}/client/v1/productDetails/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

        "x-tenant-id": tenantValue,
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const product = await response.json();
    return Response.json(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
    return Response.json(
      { error: "Failed to fetch product details" },
      { status: 500 }
    );
  }
}

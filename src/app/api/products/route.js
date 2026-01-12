export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const tenantHeader = process.env.NEXT_PUBLIC_TENANT_HEADER;

    if (!baseUrl || !tenantHeader) {
      throw new Error(
        "Missing environment variables: NEXT_PUBLIC_BASE_URL or NEXT_PUBLIC_TENANT_HEADER"
      );
    }

    const response = await fetch(`${baseUrl}/client/v1/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        [tenantHeader]: tenantHeader,
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const products = await response.json();
    return Response.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

const API = import.meta.env.VITE_STRAPI_URL!;
const TOKEN = import.meta.env.VITE_STRAPI_TOKEN;

const headers: Record<string, string> = TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {};

// Helper function to handle response and errors
function handleResponse(res: Response) {
  return res.json().then(json => {
    if (!res.ok) {
      const error = new Error(json.message || 'An error occurred');
      (error as any).response = json;
      throw error;
    }
    return json;
  });
}

export async function listProducts(page = 1, pageSize = 12) {
  const url = new URL(`${API}/api/products`);
  
  // Set fields as separate parameters
  url.searchParams.set("fields[0]", "title");
  url.searchParams.set("fields[1]", "slug");
  url.searchParams.set("fields[2]", "price");
  
  // Set pagination
  url.searchParams.set("pagination[page]", String(page));
  url.searchParams.set("pagination[pageSize]", String(pageSize));
  
  // Set sorting
  url.searchParams.set("sort", "updatedAt:desc");
  
  // Set population
  url.searchParams.set("populate[gallery][fields][0]", "url");
  
  const res = await fetch(url, { headers });
  return handleResponse(res);
}

export async function listProductsByCategorySlug(slug: string, page = 1, pageSize = 12) {
  const url = new URL(`${API}/api/products`);
  
  // Set filter by category slug
  url.searchParams.set("filters[categories][slug][$eq]", slug);
  
  // Set fields
  url.searchParams.set("fields[0]", "title");
  url.searchParams.set("fields[1]", "slug");
  url.searchParams.set("fields[2]", "price");
  
  // Set pagination
  url.searchParams.set("pagination[page]", String(page));
  url.searchParams.set("pagination[pageSize]", String(pageSize));
  
  // Set population
  url.searchParams.set("populate[gallery][fields][0]", "url");
  
  const res = await fetch(url, { headers });
  return handleResponse(res);
}

export async function getProductBySlug(slug: string) {
  const url = new URL(`${API}/api/products`);
  
  // Set filter by slug
  url.searchParams.set("filters[slug][$eq]", slug);
  
  // Set population
  url.searchParams.set("populate[gallery][fields][0]", "url");
  url.searchParams.set("populate[categories][fields][0]", "name");
  
  const res = await fetch(url, { headers });
  const json = await handleResponse(res);
  return json.data?.[0] ?? null;
}

export async function getCategories() {
  const url = new URL(`${API}/api/categories`);
  
  // Set fields
  url.searchParams.set("fields[0]", "name");
  url.searchParams.set("fields[1]", "slug");
  
  // Set sorting
  url.searchParams.set("sort", "name:asc");
  
  const res = await fetch(url, { headers });
  return handleResponse(res);
}

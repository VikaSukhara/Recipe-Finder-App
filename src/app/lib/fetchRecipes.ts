interface Recipe {
  id: number;
  title: string;
  image: string;
}

export async function fetchRecipes({
  query,
  cuisine,
  maxReadyTime,
}: {
  query?: string;
  cuisine?: string;
  maxReadyTime?: string;
}): Promise<Recipe[]> {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  if (!apiKey) {
    console.error('API key missing');
    throw new Error('API key missing');
  }

  const params = new URLSearchParams();
  if (query) params.append('query', query);
  if (cuisine) params.append('cuisine', cuisine);
  if (maxReadyTime) params.append('maxReadyTime', maxReadyTime);
  params.append('apiKey', apiKey);

  const url = `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`;
  console.log('Fetching recipes from:', url);

  const res = await fetch(url, { next: { revalidate: 60 } });

  console.log('Response status:', res.status);

  if (!res.ok) {
    const text = await res.text();
    console.error('Failed to fetch recipes:', text);
    throw new Error(`Failed to fetch recipes: ${res.status}`);
  }

  const data = await res.json();
  console.log('Data received:', data);

  return data.results || [];
}

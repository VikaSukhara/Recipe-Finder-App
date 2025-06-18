interface Ingredient {
  id: number;
  name: string;
  amount: {
    metric: {
      value: number;
      unit: string;
    };
  };
}

export interface RecipeDetails {
  title: string;
  extendedIngredients: Ingredient[];
  readyInMinutes: number;
  servings: number;
  summary: string;
}

export async function fetchRecipeDetails(
  id: string,
): Promise<RecipeDetails | null> {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  if (!apiKey) {
    throw new Error('API key missing');
  }

  const res = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`,
  );

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error('Failed to fetch recipe details');
  }

  const data = await res.json();
  return data;
}

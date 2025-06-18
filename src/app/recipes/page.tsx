import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Recipe {
  id: number;
  title: string;
  image: string;
}

interface RecipesPageProps {
  searchParams: {
    query?: string;
    cuisine?: string;
    maxReadyTime?: string;
  };
}

async function fetchRecipes({
  query,
  cuisine,
  maxReadyTime,
}: {
  query?: string;
  cuisine?: string;
  maxReadyTime?: string;
}): Promise<Recipe[]> {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  if (!apiKey) throw new Error("API key missing");

  const params = new URLSearchParams();
  if (query) params.append("query", query);
  if (cuisine) params.append("cuisine", cuisine);
  if (maxReadyTime) params.append("maxReadyTime", maxReadyTime);
  params.append("apiKey", apiKey);

  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const data = await res.json();
  return data.results || [];
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  let recipes: Recipe[] = [];

  try {
    recipes = await fetchRecipes(searchParams);
  } catch (error) {
    return (
      <main className="p-6 max-w-5xl mx-auto bg-blue-100">
        <h1 className="text-2xl font-bold mb-4">Recipes</h1>
        <p className="text-red-600">
          Error loading recipes. Please try again later.
        </p>
      </main>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-blue-100">
      <Link
        href="/"
        className="inline-flex items-center text-blue-700 hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Search
      </Link>

      <h1 className="text-3xl font-bold mb-8 text-blue-900">Recipes</h1>

      {recipes.length === 0 ? (
        <p className="text-gray-600">
          No recipes found matching your criteria.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map(({ id, title, image }) => (
            <li
              key={id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
            >
              <Link href={`/recipes/${id}`} className="block">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-48 object-cover"
                />
                <h2 className="p-4 text-lg font-semibold text-blue-800">
                  {title}
                </h2>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

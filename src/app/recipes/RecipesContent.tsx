import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import RecipeList from './RecipeList';
import { fetchRecipes } from '@/app/lib/fetchRecipes';

interface Recipe {
  id: number;
  title: string;
  image: string;
}

export async function getRecipesContent(searchParams: any) {
  let recipes: Recipe[] = [];
  let errorMessage = '';

  try {
    recipes = await fetchRecipes(searchParams);
  } catch (error) {
    console.error('Fetch recipes error:', error);

    errorMessage = 'Error loading recipes. Please try again later.';
    if (error instanceof Error && error.message.includes('402')) {
      errorMessage =
        'API limit reached. Please try again tomorrow or upgrade your plan.';
    }
  }

  if (errorMessage) {
    return (
      <main className="p-6 max-w-5xl mx-auto bg-blue-100">
        <h1 className="text-2xl font-bold mb-4 text-blue-900">Recipes</h1>
        <p className="text-red-600">{errorMessage}</p>
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
      <RecipeList recipes={recipes} />
    </div>
  );
}

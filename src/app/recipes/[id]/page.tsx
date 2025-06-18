import { fetchRecipeDetails } from '@/app/lib/fetchRecipeDetails';
import RecipeDetailsClient from './RecipeDetailsClient';

export default async function RecipeDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const recipe = await fetchRecipeDetails(params.id);

  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  return <RecipeDetailsClient recipe={recipe} />;
}

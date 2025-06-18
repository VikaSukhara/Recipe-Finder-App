import { getRecipesContent } from './RecipesContent';

export default async function RecipesWrapper({ searchParams }: any) {
  return await getRecipesContent(searchParams);
}

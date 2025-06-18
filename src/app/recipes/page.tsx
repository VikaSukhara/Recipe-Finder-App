import RecipesWrapper from './RecipesWrapper';

export default async function RecipesPage({ searchParams }: any) {
  const content = await RecipesWrapper({ searchParams });
  return content;
}

import React, { Suspense } from 'react';
import Loading from '../recipes/loading';
import RecipesPage from './page';

export default function RecipesPageWrapper(props: any) {
  return (
    <Suspense fallback={<Loading />}>
      <RecipesPage {...props} />
    </Suspense>
  );
}

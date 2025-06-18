import React, { Suspense } from 'react';
import Loading from '../loading';
import RecipeDetailsClient from './RecipeDetailsClient';

export default function RecipePageWrapper(props: any) {
  return (
    <Suspense fallback={<Loading />}>
      <RecipeDetailsClient {...props} />
    </Suspense>
  );
}

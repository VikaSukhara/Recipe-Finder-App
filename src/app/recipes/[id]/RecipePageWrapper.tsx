'use client';

import React, { Suspense } from 'react';
import RecipeDetailsPage from './page';
import Loading from '../loading';

export default function RecipePageWrapper(props: any) {
  return (
    <Suspense fallback={<Loading />}>
      <RecipeDetailsPage {...props} />
    </Suspense>
  );
}

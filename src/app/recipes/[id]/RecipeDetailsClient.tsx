'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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

interface RecipeDetails {
  title: string;
  extendedIngredients: Ingredient[];
  readyInMinutes: number;
  servings: number;
  summary: string;
}

interface RecipeDetailsProps {
  recipe: RecipeDetails;
}

export default function RecipeDetailsClient({ recipe }: RecipeDetailsProps) {
  return (
    <div className="p-6 min-h-screen bg-blue-50 max-w-3xl rounded-lg mx-auto">
      <Link
        href="/"
        className="inline-flex items-center text-blue-700 hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Search
      </Link>

      <h1 className="text-4xl font-bold mb-6 text-blue-900">{recipe.title}</h1>

      <div className="mb-4 text-gray-700">
        <p>
          <strong>Preparation time:</strong> {recipe.readyInMinutes} minutes
        </p>
        <p>
          <strong>Servings:</strong> {recipe.servings}
        </p>
      </div>

      <section className="mb-6 p-4 rounded-md">
        <h2 className="text-2xl font-semibold mb-3 text-blue-800">
          Ingredients:
        </h2>
        <ul className="list-disc list-inside text-black">
          {recipe.extendedIngredients.map((ing) => (
            <li key={ing.id}>
              {ing.name} — {ing.amount?.metric?.value ?? 'N/A'}{' '}
              {ing.amount?.metric?.unit ?? ''}
            </li>
          ))}
        </ul>
      </section>

      <section
        className="prose max-w-none text-black"
        dangerouslySetInnerHTML={{ __html: recipe.summary }}
      />
    </div>
  );
}

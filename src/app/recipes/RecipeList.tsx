'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Recipe {
  id: number;
  title: string;
  image: string;
}

export default function RecipeList({ recipes }: { recipes: Recipe[] }) {
  if (!recipes || recipes.length === 0) {
    return (
      <>
        <p className="text-gray-600">
          No recipes found matching your criteria.
        </p>
      </>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {recipes.map(({ id, title, image }) => (
        <li
          key={id}
          className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
        >
          <Link href={`/recipes/${id}`} className="block">
            <Image
              src={image || '/placeholder.jpg'}
              alt={title}
              className="w-full h-48 object-cover"
              width={300}
              height={200}
              onError={(e) => {
                e.currentTarget.src = '/placeholder.jpg';
              }}
            />
            <h2 className="p-4 text-lg font-semibold text-blue-800">{title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
}

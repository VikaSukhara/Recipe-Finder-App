"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [maxTime, setMaxTime] = useState("");

  const isButtonEnabled = query || cuisine || maxTime;

  const cuisines = [
    "African",
    "Asian",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (cuisine) params.append("cuisine", cuisine);
    if (maxTime) params.append("maxReadyTime", maxTime);

    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-blue-50 min-h-screen p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-blue-900">
        Recipe Finder
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <label className="block mb-5">
          <span className="text-blue-800 font-semibold mb-1 block">
            Search recipe
          </span>
          <input
            type="text"
            placeholder="e.g., pasta"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mt-1 block w-full rounded-md border border-blue-300 bg-blue-50 px-4 py-2 text-blue-900 placeholder-blue-400
              shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 transition"
          />
        </label>

        <label className="block mb-5">
          <span className="text-blue-800 font-semibold mb-1 block">
            Cuisine
          </span>
          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="mt-1 block w-full rounded-md border border-blue-300 bg-blue-50 px-4 py-2 text-blue-900
              shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 transition"
          >
            <option value="" className="text-blue-400">
              Select cuisine
            </option>
            {cuisines.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-8">
          <span className="text-blue-800 font-semibold mb-1 block">
            Max preparation time (minutes)
          </span>
          <input
            type="number"
            min="1"
            placeholder="e.g., 30"
            value={maxTime}
            onChange={(e) => setMaxTime(e.target.value)}
            className="mt-1 block w-full rounded-md border border-blue-300 bg-blue-50 px-4 py-2 text-blue-900 placeholder-blue-400
              shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 transition"
          />
        </label>

        <button
          type="submit"
          disabled={!isButtonEnabled}
          className={`w-full py-3 rounded-md text-white font-semibold transition
            ${
              isButtonEnabled
                ? "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                : "bg-blue-300 cursor-not-allowed"
            }`}
        >
          Next
        </button>
      </form>
    </div>
  );
}

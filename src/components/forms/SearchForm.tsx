// Search form component for finding crafts
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface SearchFormProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchForm({ onSearch, placeholder = "Search crafts..." }: SearchFormProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-lg mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   placeholder-gray-500 dark:placeholder-gray-400"
      />
      <Button type="submit" variant="primary" size="md">
        Search
      </Button>
    </form>
  );
}

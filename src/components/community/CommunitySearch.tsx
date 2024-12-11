'use client';

import { useState } from 'react';

export default function CommunitySearch() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 검색 로직 구현
    console.log('Searching for:', searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <div className="flex-1 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="게시글 검색..."
          className="w-full px-4 py-2 rounded-lg bg-bg-secondary text-text-primary border border-bg-tertiary focus:outline-none "
        />
      </div>
      <button
        type="submit"
        className="px-6 py-2 bg-f1-red text-white rounded-lg hover:bg-f1-red-dark transition-colors"
      >
        검색
      </button>
    </form>
  );
} 
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <div className="w-full mx-auto mb-12">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative w-full group">
          <input 
            type="text" 
            className="block w-full py-4 px-0 text-3xl text-ink bg-transparent border-b-2 border-gray-200 focus:border-black focus:ring-0 transition-colors font-display font-bold placeholder-gray-300" 
            placeholder="Cari daerah..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="absolute right-0 bottom-4 text-ink hover:text-orange transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </form>
      <p className="mt-4 text-sm text-gray-400 font-body">
        <span className="font-bold text-black">Tips:</span> Coba ketik "Setiabudi" atau "Binus Syahdan".
      </p>
    </div>
  );
};

export default SearchBar;

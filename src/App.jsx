import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import KostList from './components/KostList';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dataKost, setDataKost] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Filter States
  const [filterRating, setFilterRating] = useState(false); // Rating >= 4.0
  const [filterPopular, setFilterPopular] = useState(false); // Reviews >= 5
  const [sortBy, setSortBy] = useState('default'); // 'default', 'rating', 'reviews'

  // Limit protection state
  const [requestCount, setRequestCount] = useState(0);
  const MAX_SEARCH_LIMIT = 5;

  useEffect(() => {
    applyFilter();
  }, [dataKost, filterRating, filterPopular, sortBy]);

  const applyFilter = () => {
    if (!dataKost) return;
    
    let result = [...dataKost];

    // 1. Filter Rating (Stricter: 4.0)
    if (filterRating) {
      result = result.filter(item => (item.rating || 0) >= 4.0);
    }

    // 2. Filter Popular (Min 5 Reviews)
    if (filterPopular) {
      result = result.filter(item => (item.reviews || 0) >= 5);
    }

    // 3. Sorting
    if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'reviews') {
      result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }

    setFilteredData(result);
  };

  const toggleSort = () => {
    if (sortBy === 'default') setSortBy('rating');
    else if (sortBy === 'rating') setSortBy('reviews');
    else setSortBy('default');
  };

  const handleSearch = async (query) => {
    // 1. Check Limit
    if (requestCount >= MAX_SEARCH_LIMIT) {
      setError(`Kuota pencarian sesi ini habis (${MAX_SEARCH_LIMIT}x). Refresh halaman untuk reset.`);
      return;
    }

    setSearchQuery(query);
    setIsLoading(true);
    setError(null);
    
    const finalQuery = `Kost ${query}`;

    // 2. Increment Count
    setRequestCount(prev => prev + 1);

    try {
      const response = await axios.get('/api/search', {
        params: { q: finalQuery }
      });

      if (response.data.local_results) {
        setDataKost(response.data.local_results);
      } else {
        setDataKost([]);
      }
    } catch (err) {
      console.error("API Error:", err);
      setError("Gagal mengambil data. Pastikan API Key sudah diset di Cloudflare Dashboard.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-6 font-body">
      <div className="max-w-lg mx-auto">
        <header className="text-center mb-10">
          <div className="inline-block mb-3 px-3 py-1 border border-black rounded-full text-xs font-accent tracking-widest uppercase bg-white">
             Beta v1.0
          </div>
          <h1 className="text-5xl font-display font-black text-ink mb-4 tracking-tight leading-[0.9]">
            Hidden <br/><span className="italic font-medium text-orange">Gem Kost</span> Finder
          </h1>
          <p className="text-lg text-gray-500 font-body leading-relaxed max-w-xs mx-auto">
            Kurasi kost "warga" autentik yang nyaman & terjangkau.
          </p>
        </header>

        <SearchBar onSearch={handleSearch} />
        
        {/* Quota Indicator */}
        <div className="text-center mb-6">
           <span className={`text-xs font-bold py-1 px-3 rounded-full border ${requestCount >= MAX_SEARCH_LIMIT ? 'bg-red-100 text-red-600 border-red-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
             Sisa Kuota: {MAX_SEARCH_LIMIT - requestCount}
           </span>
        </div>

        {/* Filter Chips (Horizontal Scroll) */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-4 no-scrollbar">
          <button 
            onClick={() => setFilterRating(!filterRating)}
            className={`whitespace-nowrap px-4 py-2 rounded-full border border-black text-sm font-bold transition-all ${filterRating ? 'bg-black text-white shadow-none' : 'bg-white text-ink shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'}`}
          >
            {filterRating ? '✓ Rating 4.0+' : '⭐ Rating 4.0+'}
          </button>
          
          <button 
            onClick={() => setFilterPopular(!filterPopular)}
            className={`whitespace-nowrap px-4 py-2 rounded-full border border-black text-sm font-bold transition-all ${filterPopular ? 'bg-black text-white shadow-none' : 'bg-white text-ink shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'}`}
          >
            {filterPopular ? '✓ Populer' : '👥 Populer (>5)'}
          </button>

          <button 
            onClick={toggleSort}
            className="whitespace-nowrap px-4 py-2 rounded-full border border-black text-sm font-bold bg-orange text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[2px] transition-all"
          >
            ⬇️ {sortBy === 'default' ? 'Urutkan' : sortBy === 'rating' ? 'Paling Bagus' : 'Paling Ramai'}
          </button>
        </div>

        <div className="mb-4 text-xs text-gray-400 font-medium uppercase tracking-widest text-right">
           Menampilkan: {filteredData.length} Kost
        </div>

        <KostList 
          dataKost={filteredData} 
          isLoading={isLoading} 
          error={error} 
        />
        
        <footer className="mt-16 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Hidden Gem Kost Finder. Powered by SerpApi & Google Maps.
        </footer>
      </div>
    </div>
  );
}

export default App;
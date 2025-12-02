import React from 'react';

const KostCard = ({ data, index }) => {
  const { title, thumbnail, rating, reviews, address, place_id } = data;
  
  const displayRating = rating || 0;
  const displayReviews = reviews || 0;
  const shortAddress = address ? address.split(',')[0] : 'Alamat tidak tersedia';
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${place_id}`;

  // Placeholder for missing images
  const imageSrc = thumbnail || "https://via.placeholder.com/400x300?text=No+Image";

  // Staggered animation delay based on index
  const animationStyle = {
    animationDelay: `${index * 100}ms`,
    opacity: 0, // Start invisible for animation
  };

  let badge = null;
  if (displayRating >= 4.5) {
    badge = <span className="absolute top-3 right-3 bg-orange text-white text-xs font-accent uppercase tracking-wider font-bold px-3 py-1 border border-black shadow-hard rotate-2">Rekomen</span>;
  } else if (displayRating > 0 && displayRating < 3.5) {
    badge = <span className="absolute top-3 right-3 bg-black text-white text-xs font-accent uppercase tracking-wider font-bold px-3 py-1 border border-white">Cek Dulu</span>;
  }

  return (
    <div 
      className="bg-white border-2 border-black shadow-hard mb-8 p-4 animate-slide-up group hover:-translate-y-1 hover:shadow-none transition-all duration-300"
      style={animationStyle}
    >
      <div className="relative h-56 w-full bg-gray-100 border-b-2 border-black mb-4 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          onError={(e) => {e.target.onerror = null; e.target.src="https://via.placeholder.com/400x300?text=Error+Loading"}}
        />
        {badge}
      </div>
      
      <div className="flex flex-col font-body">
        <div className="flex justify-between items-start mb-2">
           <h3 className="text-2xl font-display font-bold text-ink leading-tight w-3/4" title={title}>{title}</h3>
           <div className="flex flex-col items-end">
             <span className="text-xl font-accent font-black text-orange">{displayRating > 0 ? displayRating : '-'}</span>
             <span className="text-xs text-gray-400 font-medium">{displayReviews} ulasan</span>
           </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-6 font-medium border-l-2 border-gray-200 pl-3">
           {shortAddress}
        </p>
        
        <a 
          href={googleMapsUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block w-full text-center bg-black text-white font-accent font-bold uppercase tracking-widest py-3 border border-black hover:bg-white hover:text-black transition-colors duration-200 text-sm"
        >
          Lihat Lokasi
        </a>
      </div>
    </div>
  );
};

export default KostCard;

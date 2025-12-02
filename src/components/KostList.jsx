import React from 'react';
import KostCard from './KostCard';

const KostList = ({ dataKost, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white h-80 border-2 border-gray-200 animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 border-2 border-red-100 bg-red-50">
        <div className="text-red-600 font-display font-bold text-2xl mb-2">⚠️ Terjadi Kesalahan</div>
        <p className="text-red-500 font-body">{error}</p>
      </div>
    );
  }

  if (!dataKost || dataKost.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 font-display text-2xl italic">Belum ada data kost.</p>
        <p className="text-gray-400 text-sm mt-2 font-body">Coba cari "Tebet" atau "Kemang"</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8">
      {dataKost.map((item, index) => (
        <KostCard key={item.place_id || item.position} data={item} index={index} />
      ))}
    </div>
  );
};

export default KostList;

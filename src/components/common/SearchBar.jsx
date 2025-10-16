import React from 'react';
import { Search, Plus } from 'lucide-react';

export const SearchBar = ({ searchTerm, onSearchChange, onAddNew, placeholder = 'Tìm kiếm...' }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      {onAddNew && (
        <button
          onClick={onAddNew}
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Thêm mới
        </button>
      )}
    </div>
  );
};
export default SearchBar;

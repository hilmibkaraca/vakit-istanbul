'use client';

import { useState, useRef, useEffect } from 'react';
import { ISTANBUL_DISTRICTS } from '@/lib/constants';

interface DistrictSelectorProps {
  selectedDistrict: string;
  onDistrictChange: (district: string) => void;
  onLocationRequest?: () => void;
}

export default function DistrictSelector({
  selectedDistrict,
  onDistrictChange,
  onLocationRequest
}: DistrictSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDistricts, setFilteredDistricts] = useState(ISTANBUL_DISTRICTS);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const filtered = ISTANBUL_DISTRICTS.filter(district =>
      district.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDistricts(filtered);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const selectedDistrictName = ISTANBUL_DISTRICTS.find(
    d => d.code === selectedDistrict
  )?.name || 'İstanbul';

  const handleDistrictSelect = (district: typeof ISTANBUL_DISTRICTS[0]) => {
    onDistrictChange(district.code);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleLocationClick = () => {
    onLocationRequest?.();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between min-w-[140px] px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="truncate">{selectedDistrictName}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-64 overflow-hidden">
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="İlçe ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          
          <div className="max-h-48 overflow-y-auto">
            {onLocationRequest && (
              <button
                onClick={handleLocationClick}
                className="w-full px-3 py-2 text-left text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/20 flex items-center space-x-2 border-b border-gray-200 dark:border-gray-700"
              >
                <span>📍</span>
                <span>Konumumu kullan</span>
              </button>
            )}
            
            {filteredDistricts.map((district) => (
              <button
                key={district.id}
                onClick={() => handleDistrictSelect(district)}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  district.code === selectedDistrict
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                    : ''
                }`}
              >
                {district.name}
                {district.code === selectedDistrict && (
                  <span className="float-right text-emerald-500">✓</span>
                )}
              </button>
            ))}
            
            {filteredDistricts.length === 0 && (
              <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                İlçe bulunamadı
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
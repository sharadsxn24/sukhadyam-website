'use client';

import { DabbaItem } from '@/lib/api/dabba';
import { useState } from 'react';

interface MenuItemCardProps {
  item: DabbaItem;
  selectedQuantity: number;
  onQuantityChange: (quantity: number) => void;
  disabled?: boolean;
}

export function MenuItemCard({
  item,
  selectedQuantity,
  onQuantityChange,
  disabled,
}: MenuItemCardProps) {
  const typeColors: Record<string, string> = {
    COMFORT: 'bg-amber-100 text-amber-800',
    BOWL: 'bg-blue-100 text-blue-800',
    LIGHT: 'bg-green-100 text-green-800',
    SURPRISE: 'bg-purple-100 text-purple-800',
  };

  const maxQuantity = item.quantityLimit || 4;

  return (
    <div
      className={`bg-white rounded-xl p-4 border-2 ${
        selectedQuantity > 0 ? 'border-orange-400' : 'border-gray-200'
      } ${disabled ? 'opacity-50' : ''}`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeColors[item.type] || 'bg-gray-100 text-gray-800'}`}>
              {item.type}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
          <p className="font-bold text-lg text-orange-600">₹{item.price}</p>
        </div>
      </div>

      {!disabled && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <span className="text-sm text-gray-600">Quantity:</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onQuantityChange(Math.max(0, selectedQuantity - 1))}
              disabled={selectedQuantity === 0}
              className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 font-bold disabled:opacity-50 disabled:cursor-not-allowed">
              −
            </button>
            <span className="font-bold text-lg w-8 text-center">{selectedQuantity}</span>
            <button
              onClick={() => onQuantityChange(Math.min(maxQuantity, selectedQuantity + 1))}
              disabled={selectedQuantity >= maxQuantity}
              className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed">
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


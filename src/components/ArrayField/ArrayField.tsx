import React from 'react';

interface ArrayFieldProps {
  label: string;
  items: string[];
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onChangeItem: (index: number, value: string) => void;
}

const ArrayField: React.FC<ArrayFieldProps> = ({ label, items, onAddItem, onRemoveItem, onChangeItem }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      {items.map((item, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="text"
            value={item}
            onChange={(e) => onChangeItem(index, e.target.value)}
            className="mt-1 p-2 w-full border rounded mr-2"
          />
          <button type="button" onClick={() => onRemoveItem(index)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
        </div>
      ))}
      <button type="button" onClick={onAddItem} className="bg-blue-400 text-white px-4 py-2 rounded">Add Item</button>
    </div>
  );
};

export default ArrayField;
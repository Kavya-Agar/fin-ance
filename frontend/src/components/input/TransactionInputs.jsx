import React, { useState } from "react";
import { FiDollarSign } from "react-icons/fi";

export default function InputGrid({
  description, setDescription,
  selectedCategory, setSelectedCategory,
  selectedDate, setSelectedDate,
  amount, setAmount
}) {
  const options = ["Food", "Travel", "Academics", "Rent", "Groceries", "Other"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="rounded border border-stone-300 p-4">
        <h3 className="text-stone-500 mb-2 text-sm">Description</h3>
        <input
          type="text"
          placeholder="Enter description"
          className="w-full border border-gray-300 rounded px-3 py-2 bg-orange-100"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div className="rounded border border-stone-300 p-4">
        <h3 className="text-stone-500 mb-2 text-sm">Select Category</h3>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSelectedCategory(option)}
              className={`px-3 py-1 rounded border text-sm ${
                selectedCategory === option
                  ? "bg-orange-200 text-black border-orange-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded border border-stone-300 p-4">
        <h3 className="text-stone-500 mb-2 text-sm">Date</h3>
        <input
          type="date"
          className="w-full text-stone-400 border bg-orange-100 border-gray-300 rounded px-3 py-2"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
        />
      </div>
      <div className="rounded border border-stone-300 p-4">
        <h3 className="text-stone-500 mb-2 text-sm">Amount</h3>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <FiDollarSign />
          </span>
          <input
            type="number"
            placeholder="0.00"
            min="0.00"
            step="0.01"
            className="w-full pl-10 border border-gray-300 rounded px-3 py-2 bg-orange-100"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

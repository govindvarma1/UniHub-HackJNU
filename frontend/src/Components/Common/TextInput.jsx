import React from 'react'

export default function TextInput({label, name, value, handleChange, error}) {
  return (
    <label className="block mb-2">
          {label}:
          <input
            type="text"
            name={name}
            value={value}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
          />
          <span className="text-xs text-red-500">{error}</span>
        </label>
  )
}

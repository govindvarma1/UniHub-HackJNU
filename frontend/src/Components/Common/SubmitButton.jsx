import React from 'react'

export default function SubmitButton({text}) {
  return (
    <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Submit Project
        </button>
  )
}

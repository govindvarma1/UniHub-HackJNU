import React from "react";

export default function UniversitySearchBar({search, handleSearch}) {
    return (
        <div className="flex items-center content-end justify-center w-full my-4">
            <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search Universities"
                className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <button className="px-4 py-2 text-white bg-blue-500 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                Search
            </button>
        </div>
    );
}

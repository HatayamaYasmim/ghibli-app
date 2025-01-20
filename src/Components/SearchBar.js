import React, { useState } from "react";
import { GoSearch } from "react-icons/go";

const SearchBar = () => {
    const [filme, setFilmes] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const [filteredFilms, setFilteredFilms] = useState([]);


    return (
        <form className="w-[300px] relative">
            <div className="relative">
                <input type="search" placeholder="" className="w-full rounded-full p-2 shadow-lg focus:ring-0 border-none outline-sky-200" />
                <button className="absolute right-1 top-1/3 -translate-y-1/4 p-2 bg-blue-400 rounded-full mr-1 shadow-sm "> <GoSearch color="white" /></button>
            </div>
        </form>
    )
};

export default SearchBar;
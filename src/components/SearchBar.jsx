import { useEffect, useRef } from "react";

export default function SearchBar({ search, setSearch, onSearch, suggestions, setSuggestions, pokemonList }) {
  const wrapperRef = useRef();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
      setSuggestions([]);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = pokemonList
      .filter(name => name.includes(value))
      .slice(0, 10);
    setSuggestions(filtered);
  };

  // Detectar clics fuera del área del buscador
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setSuggestions]);

  return (
    <div className="flex mb-4 items-center justify-center w-full z-10">
      <div ref={wrapperRef} className="relative w-70 sm:w-86">
        <input
          type="text"
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          className="w-full px-4 py-2 md:px-6 md:py-3 text-[#01302c] rounded-l-full bg-white border-y-2 border-l-2 shadow-lg placeholder:text-[#01302c] focus:outline-none transition"
          placeholder="Busca un Pokémon o ID..."
        />
        {suggestions.length > 0 && (
          <ul className="absolute w-full mt-1 bg-white text-black border-gray-300 z-10 max-h-48 overflow-y-auto shadow-xl rounded-lg">
            {suggestions.map((name) => (
              <li
                key={name}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer capitalize"
                onClick={() => {
                  setSearch(name);
                  setSuggestions([]);
                  onSearch(name);
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={() => {
          onSearch();
          setSuggestions([]);
        }}
        className="px-4 py-2 md:px-6 md:py-3 text-[#01302c] font-bold bg-[#51ae5e] border-y-2 border-r-2 border-[#01302c] cursor-pointer rounded-r-full shadow-lg"
      >
        BUSCAR
      </button>
    </div>

  );
}

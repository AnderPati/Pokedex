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
    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center z-10">
      <div ref={wrapperRef} className="relative w-86">
        <input
          type="text"
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          className="w-full px-4 py-3 text-[#01302c] bg-white border-2 shadow-lg placeholder:text-[#01302c] focus:outline-none focus:border-[#279cea] transition"
          placeholder="Busca un Pokémon..."
        />
        {suggestions.length > 0 && (
          <ul className="absolute w-full mt-1 bg-white text-black border border-gray-300 z-10 max-h-48 overflow-y-auto shadow-xl">
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
        className="px-6 py-3 text-[#01302c] font-bold bg-[#51ae5e] border-2 border-[#01302c] cursor-pointer rounded-none shadow-lg"
      >
        BUSCAR
      </button>
    </div>
  );
}

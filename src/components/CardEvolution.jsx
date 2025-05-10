import { useEffect, useState } from "react";

export default function EvolutionChain({ url, onSelectPokemon }) {
  const [chainData, setChainData] = useState({});
  const [loading, setLoading] = useState(true);

  const parseChain = (node) => {
    const list = [];
    const traverse = (stage, depth = 0) => {
      list.push({
        name: stage.species.name,
        level: depth
      });
      if (stage.evolves_to?.length > 0) {
        stage.evolves_to.forEach(child => traverse(child, depth + 1));
      }
    };
    traverse(node);
    return list;
  };

  useEffect(() => {
    const fetchChain = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const data = await res.json();
        const evoNames = parseChain(data.chain);

        const details = await Promise.all(
          evoNames.map(async (entry) => {
            const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${entry.name}`);
            const pokeData = await pokeRes.json();
            return {
              name: pokeData.name,
              sprite: pokeData.sprites.front_default,
              level: entry.level
            };
          })
        );

        const grouped = {};
        details.forEach(poke => {
          if (!grouped[poke.level]) grouped[poke.level] = [];
          grouped[poke.level].push(poke);
        });

        setChainData(grouped);
      } catch (error) {
        console.error("Error loading evolution chain", error);
        setChainData({});
      } finally {
        setLoading(false);
      }
    };

    if (url) fetchChain();
  }, [url]);

  if (loading) return <p className="text-sm text-gray-400">Cargando evolución...</p>;
  if (Object.keys(chainData).length<=1 ) return (
    <div className="rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 p-6 text-white">
      <p className="text-sm text-center text-gray-300">Este pokémon no evoluciona.</p>
    </div>
  );

  const isLinear = Object.values(chainData).every(group => group.length === 1);

  return (
    <div className="rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 p-6 text-white">

      {isLinear ? (
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {Object.values(chainData).map((group, index, arr) => {
            const p = group[0];
            return (
              <div key={p.name} className="flex items-center gap-2">
                <div className="text-center">
                  <img
                    src={p.sprite}
                    alt={p.name}
                    onClick={() => onSelectPokemon(p.name)}
                    className="w-25 h-25 mx-auto cursor-pointer hover:scale-110 transition-transform duration-200"
                    loading="lazy"
                  />
                  <p
                    onClick={() => onSelectPokemon(p.name)}
                    className="capitalize text-sm mt-1 cursor-pointer hover:underline"
                  >
                    {p.name}
                  </p>
                </div>
                {index < arr.length - 1 && <span className="text-xl">▶</span>}
              </div>
            );
          })}
        </div>
      ) : (
        Object.entries(chainData).map(([level, pokes], index, arr) => (
          <div key={level} className="flex flex-col items-center">
            <div className="flex flex-wrap gap-3 justify-center">
              {pokes.map((p) => (
                <div key={p.name} className="text-center">
                  <img
                    src={p.sprite}
                    alt={p.name}
                    onClick={() => onSelectPokemon(p.name)}
                    className="w-25 h-25 mx-auto cursor-pointer hover:scale-110 transition-transform duration-200"
                    loading="lazy"
                  />
                  <p
                    onClick={() => onSelectPokemon(p.name)}
                    className="capitalize text-sm cursor-pointer hover:underline"
                  >
                    {p.name}
                  </p>
                </div>
              ))}
            </div>
            {index < arr.length - 1 && (
              <div className="text-xl">▼</div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

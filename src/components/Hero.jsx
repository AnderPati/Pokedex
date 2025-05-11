import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function getUniqueRandomIds(count, max) {
  const set = new Set();
  while (set.size < count) {
    const id = Math.floor(Math.random() * max) + 1;
    if (![10001, 10002].includes(id)) set.add(id);
  }
  return [...set];
}

const randomOffset = () => Math.floor(Math.random() * 2000) - 1000;

export default function Hero() {
  const [rows, setRows] = useState([[], [], []]);
  const [loadedRows, setLoadedRows] = useState([false, false, false, false]);

  useEffect(() => {
    const generateRow = () =>
      getUniqueRandomIds(25, 1025).map(
        id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      );
    setRows([generateRow(), generateRow(), generateRow()]);
  }, []);

  const handleImageLoad = (rowIndex) => {
    setLoadedRows(prev => {
      const updated = [...prev];
      updated[rowIndex] = true;
      return updated;
    });
  };

  return (
    <div className="relative text-center w-[100svw] overflow-hidden">
  <div className="flex flex-col justify-center space-y-4 opacity-90 pointer-events-none">
    {rows.map((row, rowIndex) => (
      <div
        key={rowIndex}
        className={`flex items-center min-w-max whitespace-nowrap ${
          loadedRows[rowIndex] ? `animate-marquee${rowIndex + 1}` : ""
        }`}
      >
        {[...row, ...row].map((src, i) => (
          <motion.img
            initial={{ opacity: 0, x: randomOffset(), y: 20, scale: 1.05 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
            key={`${rowIndex}-${i}`}
            src={src}
            alt={`poke-${i}`}
            className="h-24 w-32 mx-4 object-contain"
            onLoad={() => handleImageLoad(rowIndex)}
            loading="lazy"
          />
        ))}
      </div>
    ))}
  </div>
</div>

  );
}

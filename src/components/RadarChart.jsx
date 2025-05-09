import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Traducción de stats y su orden personalizado
const statOrder = [
  "hp",               // arriba
  "attack",           // arriba derecha
  "defense",          // abajo derecha
  "speed",            // abajo
  "special-defense",  // abajo izquierda
  "special-attack"    // arriba izquierda
];

const statTranslations = {
  hp: "PS",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "At. Esp.",
  "special-defense": "Def. Esp.",
  speed: "Velocidad"
};

export default function RadarChart({ stats }) {
  // Convertir array a objeto para acceso rápido
  const statMap = Object.fromEntries(stats.map(stat => [stat.stat.name, stat.base_stat]));

  // Ordenar y traducir
  const labels = statOrder.map(key => statTranslations[key] || key);
  const values = statOrder.map(key => statMap[key] || 0);
  const maxStat = 255;

  const data = {
    labels,
    datasets: [{
      data: values,
      backgroundColor: 'rgba(34,197,94,0.2)',
      borderColor: 'rgba(34,197,94,1)',
      borderWidth: 2
    }]
  };

  const options = {
  esponsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  scales: {
    r: {
      min: 0,
      max: maxStat,
      pointLabels: {
        color: "#ffffff", // Texto blanco
        font: {
          family: "'Poppins', cursive",
          size: 14
        }
      },
      ticks: {
        color: "white", // Texto blanco
        font: {
          family: "'Poppins', cursive",
          size: 10
        },
        backdropColor: 'transparent' // Elimina fondo detrás de los ticks
      },
      angleLines: {
        color: "rgba(255, 255, 255, 0.5)" // Líneas angulares también blancas si deseas
      },
      grid: {
        color: "rgba(255, 255, 255, 0.3)" // Líneas del grid más visibles y suaves
      }
    }
  },
  elements: {
    point: {
      radius: 6, // Tamaño de los puntos
      backgroundColor: 'rgba(34,197,94,1)'
    }
  }
};

  return <Radar data={data} options={options} />;
}

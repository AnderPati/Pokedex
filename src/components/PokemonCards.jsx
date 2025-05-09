import CardGeneralInfo from "./CardGeneralInfo";
import CardAbilitiesMoves from "./CardAbilitiesMoves";
import CardTypeEffectiveness from "./CardTypeEffectiveness";
import CardEvolution from "./CardEvolution"

export default function PokemonDetails({ pokemon, onSelectPokemon }) {
  return (
    <div>
      <div className="mt-50 md:mt-100 lg:mt-0 mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2fr] gap-6">
        {/* Columna vacía para dejar espacio visual a la imagen */}
        <div className="hidden lg:block grid-cols-2" />
        
        {/* Contenido principal */}
        <div className="grid gap-6 lg:grid-cols-3 grid-cols-1">
          <div className="hidden lg:block" />
          <div className="lg:col-span-2">
            <CardGeneralInfo pokemon={pokemon} />
          </div>
          <div className="hidden lg:block" />
          <div className="lg:col-span-2">
            <CardEvolution url={pokemon.evolution_chain_url} onSelectPokemon={onSelectPokemon} />
          </div>
        </div>

        <div className="hidden lg:block" />
        <div className="grid gap-6 lg:grid-cols-2  grid-cols-1">
          <CardTypeEffectiveness pokemon={pokemon} />
          <CardAbilitiesMoves pokemon={pokemon} />
        </div>
      </div>
    </div>
  );
}
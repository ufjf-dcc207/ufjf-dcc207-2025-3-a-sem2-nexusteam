import "./estilos/Filtro.css";

type FiltroProps = {
  filtros: {
    nome: string;
    estrela: number;
    status: string;
  };
  setFiltros: (filtros: FiltroProps["filtros"]) => void;
}

export function Filtro({ filtros, setFiltros }: FiltroProps) {
  return (
    <div className="container-busca">
      <div className="interface-busca">
        <input
          type="text"
          className="campo-texto"
          placeholder="Buscar por nome..."
          value={filtros.nome}
          onChange={(texto) => setFiltros({ ...filtros, nome: texto.target.value })}
        />
        <select
          className="campo-select divisa-esquerda"
          value={filtros.estrela}
          onChange={(estrela) => setFiltros({ ...filtros, estrela: Number(estrela.target.value) })}
        >
          <option value={0}>🌟</option>
          <option value={1}>⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={5}>⭐⭐⭐⭐⭐</option>
        </select>
        <select
          className="campo-select divisa-esquerda"
          value={filtros.status}
          onChange={(status) => setFiltros({ ...filtros, status: status.target.value })}
        >
          <option value="">Todos</option>
          <option value="Foragido">Foragido</option>
          <option value="Capturado">Capturado</option>
          <option value="Morto">Morto</option>
          <option value="Desconhecido">Desconhecido</option>
        </select>
      </div>
    </div>
  );
}
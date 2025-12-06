import { useState } from 'react';
import { filtrarPersonagem } from '../../utilitarios/utils';
import type { Procurado } from '../../ProcessadorListas';

export function useFiltroProcurados(listaOriginal: Procurado[]) {
    const [filtros, setFiltros] = useState({
        nome: "",
        status: "",
        estrela: 0
    });
    const listaFiltrada = filtrarPersonagem(listaOriginal, filtros.nome, filtros.status, filtros.estrela);
    return { filtros, setFiltros, listaFiltrada };
}
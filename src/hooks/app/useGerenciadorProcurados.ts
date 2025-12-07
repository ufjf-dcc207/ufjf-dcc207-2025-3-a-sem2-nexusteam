import { useState } from "react";
import { ListaProcurados } from "../../ProcessadorListas";
import type { Procurado } from "../../ProcessadorListas";


export function useGerenciadorProcurados() {
    const [listaAtualizada, setListaAtualizada] = useState<Procurado[]>(ListaProcurados);

    const adicionarProcurado = (novo: Procurado) => {
        setListaAtualizada(prevLista => [novo, ...prevLista]);
    }
    const removerProcurado = (id: number) => {
        setListaAtualizada(prevLista => prevLista.filter(p => p.id !== id));
    }
    return { listaAtualizada, adicionarProcurado, removerProcurado };
}
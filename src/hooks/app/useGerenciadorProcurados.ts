import { useState } from "react";
import { ListaProcurados } from "../../ProcessadorListas";
import type { Procurado } from "../../ProcessadorListas";
import { useNavegacao } from "./useNavegacao";


export function useGerenciadorProcurados() {
    const [listaAtualizada, setListaAtualizada] = useState<Procurado[]>(ListaProcurados);
    const { setMostrarFormAddCriminoso } = useNavegacao();

    const adicionarProcurado = (novo: Procurado) => {
        setListaAtualizada(prevLista => [novo, ...prevLista]);
    }
    const removerProcurado = (id: number) => {
        setListaAtualizada(prevLista => prevLista.filter(p => p.id !== id));
    }

    const submeterNovoCriminoso = (novo: Procurado) => {
        adicionarProcurado(novo);
        setMostrarFormAddCriminoso(false);
    };

    const cancelarNovoCriminoso = () => {
        setMostrarFormAddCriminoso(false);
    };

    const removerCriminoso = (id: number) => {
        removerProcurado(id);
    };

    return { listaAtualizada, submeterNovoCriminoso, cancelarNovoCriminoso, removerCriminoso };
}
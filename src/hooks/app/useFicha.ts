import { useState } from "react";
import type { Procurado } from "../../ProcessadorListas";

export function useFicha() {
    const [personagemSelecionadoFicha, setPersonagemSelecionadoFicha] = useState<Procurado | null>(null);

    const clickVerFicha = (personagem: Procurado) => {
        setPersonagemSelecionadoFicha(personagem);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const clickVoltar = () => {
        setPersonagemSelecionadoFicha(null);
    };

    const clickPegarRecompensa = () => {
        alert("Recompensa Pega!");
    };

    return {
        personagemSelecionadoFicha,
        clickVerFicha,
        clickVoltar,
        clickPegarRecompensa
    };
}
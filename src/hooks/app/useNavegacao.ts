import { useState } from "react";

export function useNavegacao() {
    const [mostrarFormAddCriminoso, setMostrarFormAddCriminoso] = useState(false);
    const [mostrarRemocaoCriminoso, setMostrarRemocaoCriminoso] = useState(false);

    const clickOn = () => {
        setMostrarFormAddCriminoso(true);
        setMostrarRemocaoCriminoso(false);
    };

    const clickRemover = () => {
        setMostrarRemocaoCriminoso(true);
        setMostrarFormAddCriminoso(false);
    };

    const voltarPrincipal = () => {
        setMostrarRemocaoCriminoso(false);
        setMostrarFormAddCriminoso(false);
    };

    return {
        mostrarFormAddCriminoso,
        mostrarRemocaoCriminoso,
        setMostrarFormAddCriminoso,
        setMostrarRemocaoCriminoso,
        clickOn,
        clickRemover,
        voltarPrincipal
    };
}
import { useState } from 'react';
import type { Status } from '../../Personagem';
import {
    calculaRecompensaAtual, novoStatusAtual, retornaRenderEstrelas,
    situacaoStatus, trataRecompensa
} from '../../utilitarios/utils';

export function usePersonagem(nivelPerigo: number, situacao: any, recompensaValida: string) {
    const [atributos, setAtributos] = useState({
        estrela: retornaRenderEstrelas(nivelPerigo),
        status: situacao,
        recompensa: recompensaValida
    });
    const [nivelAtual, setNivelAtual] = useState(nivelPerigo);

    const onMudarStatus = () => {
        let novoStatus: Status;
        novoStatus = novoStatusAtual(atributos.status);
        setAtributos({ ...atributos, status: situacaoStatus(novoStatus) })
    };

    const onVoltarStatus = () => {
        let novoStatus: Status;
        if (atributos.status === 'desconhecido') {
            novoStatus = 'Morto';
        } else if (atributos.status === 'morto') {
            novoStatus = 'Capturado';
        } else if (atributos.status === 'capturado') {
            novoStatus = 'Foragido';
        } else {
            novoStatus = 'Desconhecido';
        }
        setAtributos({ ...atributos, status: situacaoStatus(novoStatus) })
    };

    const recalcularRecompensa = (nivel: number) => {
        return trataRecompensa(calculaRecompensaAtual(nivel), atributos.status);
    };

    const onAdicionarEstrela = () => {
        if (nivelAtual < 5) {
            const novoNivel = nivelAtual + 1;
            const novaRecompensa = recalcularRecompensa(novoNivel);
            setNivelAtual(novoNivel);
            setAtributos({
                ...atributos,
                estrela: '⭐'.repeat(novoNivel) + '☆'.repeat(5 - novoNivel),
                recompensa: novaRecompensa
            });
        }
    };

    const onRemoverEstrela = () => {
        if (nivelAtual > 1) {
            const novoNivel = nivelAtual - 1;
            const novaRecompensa = recalcularRecompensa(novoNivel);
            setNivelAtual(novoNivel);
            setAtributos({
                ...atributos,
                estrela: '⭐'.repeat(novoNivel) + '☆'.repeat(5 - novoNivel),
                recompensa: novaRecompensa
            });
        }
    };
    return {
        atributos,
        nivelAtual,
        onMudarStatus,
        onVoltarStatus,
        onAdicionarEstrela,
        onRemoverEstrela
    };
}
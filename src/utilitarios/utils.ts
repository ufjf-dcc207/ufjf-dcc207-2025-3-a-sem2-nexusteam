import type { Status } from "../Personagem";
import type { Procurado } from "../ProcessadorListas";

export function filtrarPersonagem(lista: Procurado[], filtroNome: string = "", filtroStatus: string = "", filtroEstrela: number = 0) {
    return lista.filter((personagem) => {
        const nomeValido =
            !filtroNome || personagem.Nome.toLowerCase().includes(filtroNome.toLowerCase()) ||
            personagem.Subnome.toLowerCase().includes(filtroNome.toLowerCase());

        const statusValido =
            !filtroStatus || personagem.Status.toLowerCase() === filtroStatus.toLowerCase();

        const estrelaValido =
            !filtroEstrela || personagem.NivelPerigo === filtroEstrela;

        return nomeValido && statusValido && estrelaValido;
    })
}


export const dataValida = (data: string): boolean => {
    const m = /^\d{4}-\d{2}-\d{2}$/.exec(data);
    if (!m) return false;

    const [y, mth, d] = data.split("-").map(Number);
    const dt = new Date(y, mth - 1, d);

    return (
        dt.getFullYear() === y &&
        dt.getMonth() === mth - 1 &&
        dt.getDate() === d
    );
};


export function situacaoStatus(status: Status): string {
    switch (status) {
        case "Foragido":
            return 'foragido';
        case "Morto":
            return 'morto';
        case "Capturado":
            return 'capturado';
        default:
            return 'desconhecido';
    }
}

export function validaUrlImagem(valor: string): boolean {
    if (!valor) return false;
    try {
        const u = new URL(valor);
        return ["http:", "https:"].includes(u.protocol);
    } catch {
        return false;
    }
};

export const statusValido = (status: string): Status =>
    ["Foragido", "Morto", "Capturado", "Desconhecido"].includes(status as Status) ? (status as Status) : "Desconhecido";

export const idadeValida = (idade: number | string): number | string => {
    if (typeof idade === 'number') {
        if (idade === -1) {
            return "Desconhecida";
        }
        if (idade > 0) {
            return idade;
        }
        return "Idade inválida";
    }
    else {
        return "Desconhecida";
    }
}

export function trataIdade(idade: number): number {
    if (typeof idade === 'number') {
        return idade;
    } else {
        return 0;
    }
}

export function formataIdade(idade: number | string): string {
    if (idade === "Desconhecida") {
        return "desconhecida";
    }
    return "";
}

export const nivelPerigoValido = (nivelPerigo: number): number => {
    if (nivelPerigo < 1) {
        return 1;
    } else if (nivelPerigo > 5) {
        return 5;
    } else {
        return nivelPerigo;
    }
}

export function trataRecompensa(recompensa: number, status: string): string {
    if (status === "Morto" || status === "Capturado") {
        return "Indisponível";
    } else if (recompensa <= 0) {
        return "Recompensa inválida";
    } else {
        return `R$${recompensa.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
}

export function checaDataNascimento(dataNascimento: string): string {
    if (dataNascimento === "Desconhecido") {
        return "desconhecido";
    }
    return "";
}

export function retornaRenderEstrelas(nivelPerigo: number): string {
    return '⭐'.repeat(nivelPerigo) + '☆'.repeat(5 - nivelPerigo);
}

export function garantiaRemocaoCriminoso(id: number, onRemover: (id: number) => void): void {
    if (window.confirm(`Tem certeza que deseja remover o criminoso com ID ${id}?`)) {
        onRemover(id);
    }
}

export function trataData(dataNascimento: string): string {
    if (dataNascimento === "Desconhecido") {
        return "Desconhecido";
    }
    else {
        if (dataValida(dataNascimento)) {
            return new Date(dataNascimento + "T00:00:00").toLocaleDateString('pt-BR');
        }
    }
    return "(data inválida)";
}

export function buscaUser(usuario: { email: string; senha: string; }, credencialLogin: { email: string; senha: string; }): boolean {
    return usuario.email === credencialLogin.email && usuario.senha === credencialLogin.senha
}

export function buscarUsuario<T extends { email: string; senha: string }>(listaUsuarios: T[], credenciais: { email: string; senha: string }): T | undefined {
    return listaUsuarios.find((usuario) => buscaUser(usuario, credenciais));
}

export function formataPalavra(palavra: string): string {
    return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
}

export function mudarEstiloImgPorStatus(status: Status | string) {
    if (status === 'morto') {
        return 'imagem-morto';
    } else if (status === 'capturado') {
        return 'imagem-capturado';
    } else if (status === 'foragido') {
        return 'imagem-foragido';
    } else {
        return 'imagem-desconhecido';
    }
};

export function novoStatusAtual(status: Status | string): Status {
    if (status === 'foragido') {
        return 'Capturado';
    } else if (status === 'capturado') {
        return 'Morto';
    } else if (status === 'morto') {
        return 'Desconhecido';
    } else {
        return 'Foragido';
    }
};

export function calculaRecompensaAtual(nivel: number): number {
    const razao = 225000;
    const offset = 125000;
    return (nivel * razao) - offset;
}
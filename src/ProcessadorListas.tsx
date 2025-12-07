import type { Status } from "./Personagem";
import procurados from "./dados/procurados.json";
import usuarios from "./dados/bancoLogin.json";

export type Procurado = {
    id: number;
    Nome: string;
    Subnome: string;
    Idade: number;
    DataDeNascimento: string;
    Imagem: string;
    Status: Status;
    NivelPerigo: number;
    Recompensa: number;
    Peso: string;
    Altura: string;
    Descricao: string;
    Crimes: string[];
    UltimaLocalizacao: string;
};

export type InfoUsuario = {
    nome: string;
    email: string;
    senha: string;
    nivelAcesso: string;
    imagemPerfil: string;
};

export const ListaProcurados = procurados as Procurado[];
export const Usuario: InfoUsuario[] = usuarios as InfoUsuario[];
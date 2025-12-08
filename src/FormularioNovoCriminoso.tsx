import { useState } from "react";
import type { Procurado } from "./ProcessadorListas";
import type { Status } from "./Personagem";
import { validaUrlImagem, statusValido, trataIdade } from "./utilitarios/utils";
import "./estilos/FormularioNovoCriminoso.css";


type FormularioProps = {
    submeter: (novoPersonagem: Procurado) => void;
    cancelaSubmeter: () => void;
    ultimoId: number;
}
type DadosFormularioCriminoso = {
    Nome: string;
    Subnome: string;
    Imagem: string;
    Idade: number | string;
    DataDeNascimento: string;
    Status: Status | string;
    NivelPerigo: number;
    Recompensa: number;
    Peso: string;
    Altura: string;
    caminhoImagem: string;
    Descricao: string;
    Crimes: string;
    UltimaLocalizacao: string;
};


export default function FormularioNovoCriminoso({ submeter, cancelaSubmeter, ultimoId }: FormularioProps) {
    const [dados, setDados] = useState<DadosFormularioCriminoso>({
        Nome: "",
        Subnome: "",
        Idade: "",
        DataDeNascimento: "",
        Status: "",
        NivelPerigo: 0,
        Imagem: "",
        Peso: "",
        Altura: "",
        UltimaLocalizacao: "",
        Recompensa: 0,
        caminhoImagem: "",
        Descricao: "",
        Crimes: ""
    });
    const [previewValida, setPreviewValida] = useState<boolean>(true);

    const inputUsuario = (entrada: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = entrada.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        const { name, type } = target;

        if (type === "date") {
            setDados(prev => ({
                ...prev,
                DataDeNascimento: (target as HTMLInputElement).value,
            }));
            return;
        }
        if (type === "number") {
            const numero = (target as HTMLInputElement).valueAsNumber;
            const vazio = (target as HTMLInputElement).value === "";


            if (name === "Idade") {
                setDados(prev => ({
                    ...prev,
                    Idade: vazio || Number.isNaN(numero) ? "" : numero,
                }));
                return;
            }

            setDados(prev => ({
                ...prev,
                [name]: Number.isNaN(numero) ? 0 : numero,
            }));
            return;
        }

        setDados(prev => ({
            ...prev,
            [name]: (target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).value,
        }));

        if (name === "caminhoImagem") {
            const valor = (target as HTMLInputElement).value.trim();
            const ehUrl = validaUrlImagem(valor);
            setPreviewValida(ehUrl);
            setDados(prev => ({
                ...prev,
                Imagem: ehUrl ? valor : ""
            }));
        }
    };

    const submeterFormulario = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        const idadeNormalizada = trataIdade(Number(dados.Idade));
        const statusNormalizado: Status = statusValido(String(dados.Status));
        const crimesArray = dados.Crimes.split(',').map(c => c.trim()).filter(c => c.length > 0);
        submeter({
            id: ultimoId + 1,
            Nome: dados.Nome,
            Subnome: dados.Subnome,
            Idade: idadeNormalizada,
            DataDeNascimento: dados.DataDeNascimento,
            Status: statusNormalizado,
            NivelPerigo: dados.NivelPerigo,
            Peso: dados.Peso || "Desconhecido",
            Altura: dados.Altura || "Desconhecido",
            UltimaLocalizacao: (dados.UltimaLocalizacao || "").trim(),
            Imagem: dados.Imagem || "Procurados/default.png",
            Recompensa: dados.Recompensa,
            Descricao: dados.Descricao || "Sem descrição",
            Crimes: crimesArray,
        });
        setDados({
            Nome: "",
            Subnome: "",
            Idade: 0,
            DataDeNascimento: "",
            Status: "",
            UltimaLocalizacao: "",
            NivelPerigo: 0,
            Imagem: "",
            Recompensa: 0,
            Peso: "",
            Altura: "",
            caminhoImagem: "",
            Descricao: "",
            Crimes: ""
        });
        setPreviewValida(true);
    };
    return (
        <div className="container-formulario">
            <form className="formulario-criminoso" onSubmit={submeterFormulario}>
                <h3>Adicionar Novo Criminoso</h3>

                <label>Nome Completo (Obrigatório):</label>
                <input
                    type="text"
                    name="Nome"
                    value={dados.Nome}
                    onChange={inputUsuario} required
                    placeholder="Ex: Cesar Oliveira Cohen"
                />

                <label>Subnome / Codinome:</label>
                <input
                    type="text"
                    name="Subnome"
                    value={dados.Subnome}
                    onChange={inputUsuario}
                    placeholder="Ex: Kaiser"
                />

                <label>Peso:</label>
                <input
                    type="text"
                    name="Peso"
                    value={dados.Peso}
                    onChange={inputUsuario}
                    placeholder="Ex: 70kg"
                />

                <label>Altura:</label>
                <input
                    type="text"
                    name="Altura"
                    value={dados.Altura}
                    onChange={inputUsuario}
                    placeholder="Ex: 1.75m"
                />

                <label>Idade:</label>
                <input
                    type="number"
                    name="Idade"
                    value={dados.Idade}
                    onChange={inputUsuario}
                    min="0"
                    placeholder="0"
                />
                <label>Data de Nascimento:</label>
                <input
                    type="date"
                    name="DataDeNascimento"
                    value={dados.DataDeNascimento}
                    onChange={inputUsuario}
                />

                <label>Última Localização:</label>
                <input
                    type="text"
                    name="UltimaLocalizacao"
                    value={dados.UltimaLocalizacao}
                    onChange={inputUsuario}
                    placeholder="Ex: Distrito Central, Nexus City"
                />

                <label>Nível de Perigo (1 a 5):</label>
                <select name="NivelPerigo" value={dados.NivelPerigo} onChange={inputUsuario}>
                    <option value={1}>⭐</option>
                    <option value={2}>⭐⭐</option>
                    <option value={3}>⭐⭐⭐</option>
                    <option value={4}>⭐⭐⭐⭐</option>
                    <option value={5}>⭐⭐⭐⭐⭐</option>
                </select>
                <label>Status Atual:</label>
                <select name="Status" value={dados.Status} onChange={inputUsuario}>
                    <option value="Foragido">Foragido</option>
                    <option value="Capturado">Capturado</option>
                    <option value="Morto">Morto</option>
                    <option value="Desconhecido">Desconhecido</option>
                </select>
                <label>Recompensa (R$):</label>
                <input type="number" name="Recompensa" value={dados.Recompensa} onChange={inputUsuario} min="0" />

                <label>Caminho da Imagem (Ex: Procurados/novo.png):</label>
                <input
                    type="text"
                    name="caminhoImagem"
                    value={dados.caminhoImagem}
                    onChange={inputUsuario}
                    placeholder="URL completa (https://...) ou deixe vazio"
                />
                <label>Descrição:</label>
                <textarea
                    name="Descricao"
                    value={dados.Descricao}
                    onChange={inputUsuario}
                    rows={3}
                    placeholder="Detalhes, características, observações..."
                />
                <label>Crimes (separar por vírgulas):</label>
                <textarea
                    name="Crimes"
                    value={dados.Crimes}
                    onChange={inputUsuario}
                    rows={2}
                    placeholder="Roubo, Falsificação, Contrabando..."
                />
                <div style={{ marginTop: '8px' }}>
                    {dados.Imagem ? (
                        previewValida ? (
                            <img
                                src={dados.Imagem}
                                alt="Preview"
                                style={{ maxWidth: '140px', maxHeight: '140px', border: '1px solid #D9BE6C', borderRadius: '6px' }}
                                onError={() => setPreviewValida(false)}
                            />
                        ) : (
                            <span style={{ color: '#ff8080', fontSize: '0.85rem' }}>URL inválida ou imagem indisponível.</span>
                        )
                    ) : (
                        <span style={{ fontSize: '0.8rem', color: '#D9BE6C' }}>Sem imagem definida. Será usado padrão.</span>
                    )}
                </div>

                <div className="botoes-formulario">
                    <button type="submit" className="botao-salvar">Salvar Criminoso</button>
                    <button type="button" className="botao-cancelar" onClick={cancelaSubmeter}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}
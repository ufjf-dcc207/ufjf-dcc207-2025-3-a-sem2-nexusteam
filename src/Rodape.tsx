import './estilos/Rodape.css';

export default function Rodape() {
    return (
        <>
            <footer className="rodape-container">

                <div className="rodape-secao">
                    <h3 className="rodape-titulo">NEXUS CITY P.D.</h3>
                    <p className="rodape-texto">
                        Sistema de Gerenciamento de Recompensas e Procurados.
                        <br />
                        <em>© 2025 by Gianlucca Paiva and Gabriel Lineker is licensed under CC BY-NC-SA 4.0</em>

                    </p>
                </div>

                <div className="rodape-secao">
                    <h3 className="rodape-titulo">BANCO DE DADOS GLOBAL</h3>
                    <ul className="rodape-links">
                        <li>
                            <a href="https://www.interpol.int/en/How-we-work/Notices/Red-Notices/View-Red-Notices" target="_blank" rel="noopener noreferrer">
                                Interpol: Red Notices
                            </a>
                        </li>
                        <li>
                            <a href="https://www.fbi.gov/wanted" target="_blank" rel="noopener noreferrer">
                                FBI: Most Wanted
                            </a>
                        </li>
                        <li>
                            <a href="https://www.mj.gov.br/" target="_blank" rel="noopener noreferrer">
                                Ministério da Justiça
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="rodape-secao">
                    <h3 className="rodape-titulo">DESENVOLVIMENTO</h3>
                    <p className="rodape-texto">
                        Projeto desenvolvido para fins acadêmicos.
                    </p>
                    <a
                        href="https://github.com/ufjf-dcc207/ufjf-dcc207-2025-3-a-sem01-nexus-team"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="botao-licenca"
                    >
                        REPOSITÓRIO DO GITHUB
                    </a>
                </div>

            </footer>
        </>
    );
}
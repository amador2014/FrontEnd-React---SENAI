// BIBLIOTECAS
import React, { Component } from "react";

// CSS
import '../../assets/css/flexbox.css';
import '../../assets/css/reset.css';
import '../../assets/css/style.css';

// IMG
import logo from '../../assets/img/icon-login.png';

// COMPONENTES
import Rodape from '../../components/Rodape.js';
import titulo from '../../components/Titulos.js'
import Titulo from "../../components/Titulos.js";
//import { promises } from "fs";

class Categorias extends Component {

    //Vai construir o state e definir os atributos do componente
    constructor() {
        super();
        this.state = {
            lista: [ // A lista será os dados para a table :) 
                // { idCategoria: 1, nome: 'Design' },
                // { idCategoria: 2, nome: 'Jogos' },
                // { idCategoria: 3, nome: 'Meetup' },
            ],
            nome: ''
        }
    }

    // Conexão
    cadastrarCategoria = (event) => {
        event.preventDefault();
        //console.log(this.state.nome);

        fetch('http://192.168.7.85:5000/api/categorias', {
            method: "POST",
            body: JSON.stringify({ nome: this.state.nome }),
            headers: {
                "Content-Type": "application/json"
            }

        })
            .then(promessa => this.listarCategorias())
            .catch(erro => console.log(erro))

    }

    // Captando valor SENDO QUE O EVENT É O INPUT
    nomeCategoria = (event) => {
        this.setState({ nome: event.target.value });
    }

    componentDidMount() {
        this.listarCategorias();
    }

    listarCategorias = () => {
        fetch('http://192.168.7.85:5000/api/categorias')
            .then(promessa => promessa.json())
            .then(data => this.setState({ lista: data }))
            //.catch(erro => console.log(erro));
    }

    //ArrowFunction são para as criadas
    adicionaItem = (event) => {
        //estado da categoria
        event.preventDefault();

        let lista = { idCategoria: 4, nome: 'Nova categoria' };
        let lista_state = this.state.lista;

        lista_state.push(lista);
        //console.log(lista_state);

        this.setState({ lista: lista_state });
    }

    //Function são as functions do react
    render() {
        return (
            <div>
                <header className="cabecalhoPrincipal">
                    <div className="container">
                        <img src={logo} />
                        <nav className="cabecalhoPrincipal-nav">Administrador</nav>
                    </div>
                </header>

                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                        {/* <h1 className="conteudoPrincipal-cadastro-titulo">Categorias</h1> */}
                        <Titulo titulo='Categorias' />
                        <div className="container" id="conteudoPrincipal-lista">
                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Título</th>
                                    </tr>
                                </thead>

                                <tbody id="tabela-lista-corpo">
                                    {/* This é a classe Categoria */}
                                    {this.state.lista.map(element => {
                                        return (
                                            <tr key={element.idCategoria}>
                                                <td>{element.idCategoria}</td>
                                                <td>{element.nome}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="container" id="conteudoPrincipal-cadastro">
                            <h2 className="conteudoPrincipal-cadastro-titulo">Cadastrar Categoria</h2>
                            <form onSubmit={this.cadastrarCategoria} >
                                <div className="container">
                                    <input
                                        type="text"
                                        className="className__categoria"
                                        id="input__categoria"
                                        placeholder="tipo do evento"
                                        onChange={this.nomeCategoria}
                                        value={this.state.nome}
                                    />
                                    <button
                                        id="btn__cadastrar"
                                        //onClick={this.adicionaItem}
                                        className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                                    >Cadastrar</button>
                                </div>
                            </form>
                        </div>
                    </section>
                </main>
                <Rodape />
            </div >
        );
    };
}

//Defaut Categorias
export default Categorias;

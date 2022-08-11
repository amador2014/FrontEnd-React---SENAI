// BIBLIOTECAS
import React, { Component } from "react";

// CSS
import "./App.css";

export default class Cep extends Component {
  //Construir o constructor
  constructor() {
    super(); //pegar as caracteristicas do component
    this.state = {
      //JSON
      listaCep: "",
      cep: "",
    };
  }

  valorInput = (event) => {
    this.setState({ cep: event.target.value });
    console.log(this.state.cep);
  };

  listarCep = (event) => {
    //console.log(this.state.cep);
    //console.log(event.target.value);

    fetch("https://viacep.com.br/ws/" + this.state.cep + "/json/")
      .then((promise) => promise.json())
      .then((data) => {
        this.setState({
          listaCep: data,
        });
        //console.log(this.state);
      })
      .catch((erro) => alert("CEP Inexistente"));

    //event.target.value = "";
    //console.log(this.state);
  };

  render() {
    return (
      <div className="App">
        <section>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="CEP sem pontuação"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              value={this.state.cep}
              onChange={this.valorInput}
            />

            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={this.listarCep}
              >
                Buscar
              </button>
            </div>
          </div>
        </section>

        <section id="taleSection">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">CEP</th>
                <th scope="col">Logradouro</th>
                <th scope="col">Complemento</th>
                <th scope="col">Bairro</th>
                <th scope="col">Localidade</th>
                <th scope="col">Uf</th>
              </tr>
            </thead>
            <tbody className="tableBody">
              <tr className="linha">
                <th>{this.state.listaCep.cep}</th>
                <th>{this.state.listaCep.logradouro}</th>
                <th>{this.state.listaCep.complemento}</th>
                <th>{this.state.listaCep.bairro}</th>
                <th>{this.state.listaCep.localidade}</th>
                <th>{this.state.listaCep.uf}</th>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

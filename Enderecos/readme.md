# Endereços - Via Cep

<p>
    <img src="https://github.com/amadorgabriel/2s2019-fullstack-exercises/blob/master/Enderecos/client/public/enderecos-viacep.png" height="400px">
</p>

### Subpastas

- `/client`: aplicação frontend.
- `/database`: scripts SQL Server.
- `/server`: api C#.

&nbsp;

## 📋 Desafio
Dada a API do viacep: https://viacep.com.br/

- [ ] Criar uma interface em React para que ao usuário digitar um cep de entrada, os campos de: logradouro, complemento, bairro, localidade e uf sejam preenchidos automaticamente pelo resultado que será obtido da API.
- [ ] Caso o usuário digite um valor inválido, mostre uma mensagem de erro.

### Desafios Extras

- [ ] Validar o input do usuário que deverá ser somente do tipo inteiro.
- [ ] Inserir os dados recebidos na api de endereços.

### Instruções

- Execute o arquivo run.bat em enderecos\Senai.Enderecos.WebApi para subir a api.
- Execute no SSMS o arquivo enderecos.sql para criar o banco de dados.
- Endpoint: POST localhost:5000/api/endereco

&nbsp;

Feito com 💜 

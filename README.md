# LeiloesAPI
> API de uma aplicação web para realizar lances e incluir novos itens em um leilão virtual

## Tecnologias Utilizadas
- VueJS
- Javascipt, HTML e CSS
- MySQL

## Pré-Requisitos
- NodeJs e NPM - [como instalar](https://www.npmjs.com/get-npm)
- MySQL

## Instalação

- Criar base de dados _"leiloes"_ no MySQL

- Clone o repositório:

`$ git clone https://github.com/alexandrebing/LeiloesFront.git`

- Entre no diretório:

`$ cd LeiloesFront`

- Instale as dependências:

`$ npm install`

- Crie um arquivo `.env` com os dados do `.env.sample` e altere os dados do seu BD

```
	DB_DATABASE=leiloes
	DB_USERNAME=root //SEU USUARIO
	DB_PASSWORD=senha //SUA SENHA
	SECRET=abc123456 //INCLUIR ESSA LINHA, ESCOLHER SECRET
```
- Atualize os scripts do Knex para a ultima versão:
	
	`$ knex migrate:latest`

- Rode os scripts do Knex para povoar o BD com dados default:

	`$ knex seed:run`
	
- Inicie a aplicação:

`$ npm start`

## POSTMAN Collection

https://www.getpostman.com/collections/a7e6c54a6f239c94c54a
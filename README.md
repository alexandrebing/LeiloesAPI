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

- Altere o arquivo `.env` e inclua os dados do seu BD

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

## Rotas

### GET /auctions

Orderred by title desc

Response:
```json
[
  { 
    "id" "2", 
    "title": "Desktop", 
    "price": 1599.00, 
    "createdAt": "2019-06-20T00:30:30.799Z"
  },
  { 
    "id" "1", 
    "title": "Notebook", 
    "price": 1999.00, 
    "createdAt": "2019-06-20T00:30:30.799Z"
  }
]
```

### GET /auctions/:id
Ordered by createdAt desc

Response:
```json
[
  {
    "id": "2",
    "price": 2399.00,
    "createdAt": "2019-06-21T00:45:50.799Z"
  }
  {
    "id": "1",
    "price": 2199.00,
    "createdAt": "2019-06-20T00:45:50.799Z"
  }
]
```


### POST /auctions/:id/bids

Request:
```json
{
  "price": 2199.00
}
```

Response:

No content response (204)

Status 400 (Preço abaixo ou igual do valor atual do leilão)
```json
{ "code: "INVALID_PRICE" }
```

Status 404 (Não encontrou leilão com o id informado)
```json
{ "code: "RESOURCE_NOT_FOUND" }
```